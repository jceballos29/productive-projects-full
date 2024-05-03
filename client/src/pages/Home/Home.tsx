'use client';
import React from 'react';
import styles from './home.module.css';

export interface HomeProps {
	// types...
}

const Home: React.FC<HomeProps> = () => {
	return <div className={styles.home}>
		Home
	</div>;
};

export default Home;
