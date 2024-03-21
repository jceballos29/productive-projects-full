'use client';
import React from 'react';
import styles from './Dashboard.module.css';

export type DashboardProps = {
	// types...
};

const Dashboard: React.FC<DashboardProps> = () => {
	return <div className={styles.dashboard}>Dashboard works!</div>;
};

export default Dashboard;
