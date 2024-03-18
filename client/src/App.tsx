import {
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom';
import { Loader } from './components';
import { Dashboard, Home, Login } from './pages';
import { MainLayout } from './components/layouts';
import PrivateRoutes from './guards/PrivateRoutes';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '',
				element: <PrivateRoutes />,
				children: [
					{
						path: '/dashboard',
						element: <Dashboard />,
					},
				],
			},
		],
	},
]);

if (import.meta.hot) {
	import.meta.hot.dispose(() => router.dispose());
}

const App = () => {
	return (
		<RouterProvider router={router} fallbackElement={<Loader />} />
	);
};

export default App;
