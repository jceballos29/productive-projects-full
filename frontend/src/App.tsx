import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
import { Dashboard, Home, Login } from './pages';
import { MainLayout, PublicLayout } from './components/layouts';
import { Loader } from './components';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				path: '',
				element: <PublicLayout />,
				children: [
					{
						index: true,
						element: <Home />,
					},
					{
						path: '/login',
						element: <Login />,
					},
				],
			},
			{
				path: '/dashboard',
				element: <Dashboard />,
			},
			// {
			// 	path: '',
			// 	element: <PrivateRoutes />,
			// 	children: [
			// 		{
			// 			path: '/dashboard',
			// 			element: <Dashboard />,
			// 		},
			// 	],
			// },
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
