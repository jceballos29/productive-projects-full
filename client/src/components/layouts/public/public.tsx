'use client';
import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footbar, Navbar } from './components';
import styles from './public.module.css';

export interface PublicLayoutProps {
	// types...
}

const { Header, Content, Footer } = Layout;

const PublicLayout: React.FC<PublicLayoutProps> = () => {

	return (
		<Layout className={styles.public}>
			<Header style={{ background: '#f5f5f5' }}>
				<Navbar />
			</Header>
			<Content>
				<div className={styles.content}>
					<Outlet />
				</div>
			</Content>
			<Footer>
				<Footbar />
			</Footer>
		</Layout>
	);
};

export default PublicLayout;
