import { Route, Routes } from 'react-router-dom';
import { Dashboard, Home, Login } from './pages';
import Loader from './components/Loader';

const App = () => {
	return (
		<main className='bg-sky-50 w-full h-screen flex flex-col relative'>
			<Loader />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</main>
	);
};

export default App;
