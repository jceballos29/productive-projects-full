import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ConfigProvider } from 'antd';
import esES from 'antd/locale/es_ES';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './services/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<ConfigProvider
				locale={esES}
				theme={{
					token: {
						fontFamily: 'Poppins, sans-serif',
					// 	colorPrimary: '#1d4ed8',
					// 	colorInfo: '#1d4ed8',
					//   colorTextBase: '#0a0a0a', // Neutral 950
					//   colorBgBase: '#f4f4f5', // Neutral 50
					},
					components: {
						Layout: {
							// headerBg: '#f4f4f5',
							// headerColor: '#0a0a0a',
							headerHeight: 60,
							headerPadding: '0px',
							// bodyBg: '#f4f4f5',
							// footerBg: '#f4f4f5',
							footerPadding: '12px 20px',
						},
					},
				}}
			>
				<BrowserRouter>
					<App />
				</BrowserRouter>	
			</ConfigProvider>
		</Provider>
	</React.StrictMode>,
);
