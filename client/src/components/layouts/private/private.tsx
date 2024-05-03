'use client';
import React from 'react';
import styles from './private.module.css';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

export interface PrivateLayoutProps {
	// types...
}

const { Header, Content, Sider, Footer } = Layout;

const PrivateLayout: React.FC<PrivateLayoutProps> = () => {
	return (
		<Layout className={styles.private}>
			<Sider theme='light' style={{ background: '#f5f5f5' }}></Sider>
			<Layout>
				<Header style={{ background: '#f5f5f5' }}></Header>
				<Content style={{ paddingRight: 20}}> 
					<div className={styles.content}>
						<Outlet />
					</div>
				</Content>
				<Footer></Footer>
			</Layout>
		</Layout>
	);
};

export default PrivateLayout;
