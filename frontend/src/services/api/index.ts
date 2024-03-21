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
      localStorage.removeItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        const response = await api.post('/auth/refresh', {
          refreshToken,
        });

        if (response.status === 200) {
          const { data: result } = response
          localStorage.setItem('accessToken', result.data.accessToken);
          localStorage.setItem('refreshToken', result.data.refreshToken);

          return api(originalRequest);
        }
      }
    }

    return Promise.reject(error);
  },
);


export default api;