import axios from 'axios';

const baseURL = 'http://localhost:5000/api';

const api = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use(
	async (config) => {
		const token = localStorage.getItem('accessToken');

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        const response = await api.post('/refresh', {
          refreshToken,
        });

        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('refreshToken', response.data.refreshToken);

          return api(originalRequest);
        }
      }
    }

    return Promise.reject(error);
  },
);


export default api;