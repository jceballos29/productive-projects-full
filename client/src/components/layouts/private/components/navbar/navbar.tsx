'use client';
import React from 'react';
import styles from './navbar.module.css';
import { Logotype } from '../../../../logotype';

export interface NavbarProps {
	// types...
}

const Navbar: React.FC<NavbarProps> = () => {
	return (
		<div className={styles.navbar}>
			<Logotype />
		</div>
	);
};

export default Navbar;
