'use client';
import React from 'react';
import styles from './Navbar.module.css';
import { Logotype } from '../../../../Logotype';

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
