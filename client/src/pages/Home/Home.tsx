'use client';
import React from 'react';
import { Link } from 'react-router-dom';

export interface HomeProps {
	// types...
}

const Home: React.FC<HomeProps> = () => {
	return <div>
		<Link to="/dashboard">Dashboard</Link>

	</div>;
};

export default Home;
