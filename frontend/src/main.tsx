import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { ConfigProvider, theme } from 'antd';
import store from './services/store';
import es_ES from 'antd/locale/es_ES';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<ConfigProvider
				locale={es_ES}
				theme={{
					// algorithm: [theme.defaultAlgorithm, theme.compactAlgorithm],
          components: {
            Layout: {
              headerBg: '#f5f5f5',
            }
          }
				}}
			>
				<App />
			</ConfigProvider>
		</Provider>
	</React.StrictMode>,
);
