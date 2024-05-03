import { Routes, Route } from 'react-router-dom';
import {
	MainLayout,
	PrivateLayout,
	PublicLayout,
} from './components';
import { Dashboard, Home, Login } from './pages';
import { ROUTES } from './constants';
import { PrivateGuard } from './guards';

const App = () => {
	return (
		<MainLayout>
			<Routes>
				<Route element={<PublicLayout />}>
					<Route path={ROUTES.HOME} element={<Home />} />
					<Route path={ROUTES.LOGIN} element={<Login />} />
				</Route>
				<Route element={<PrivateLayout />}>
					<Route
						path={ROUTES.DASHBOARD}
						element={
							<PrivateGuard>
								<Dashboard />
							</PrivateGuard>
						}
					/>
				</Route>
			</Routes>
		</MainLayout>
	);
};

export default App;
