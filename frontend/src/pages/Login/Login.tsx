'use client';
import React from 'react';
import styles from './Login.module.css';

export type LoginProps = {
	// types...
};

const Login: React.FC<LoginProps> = () => {
	return <div className={styles.login}>Login works!</div>;
};

export default Login;
