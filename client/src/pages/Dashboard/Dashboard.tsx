'use client';
import React from 'react';
import styles from './dashboard.module.css';

export interface DashboardProps {
	// types...
}

const Dashboard: React.FC<DashboardProps> = () => {
	return <div className={styles.dashboard}>Dashboard works!</div>;
};

export default Dashboard;
