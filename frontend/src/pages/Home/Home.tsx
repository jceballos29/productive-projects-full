'use client';
import React from 'react';
import styles from './Home.module.css';

export type HomeProps = {
	// types...
};

const Home: React.FC<HomeProps> = () => {
	return <div className={styles.home}>Home works!</div>;
};

export default Home;
