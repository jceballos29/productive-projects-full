'use client';
import React from 'react';
import styles from './Private.module.css';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { Navbar, Topbar } from './components';
import { Footbar } from '../../Footbar';

export interface PrivateLayoutProps {
	// types...
}

const { Header, Content, Sider, Footer } = Layout;

const PrivateLayout: React.FC<PrivateLayoutProps> = () => {
	return (
		<Layout className={styles.private}>
			<Sider
				theme='light'
				width={288}
				style={{ background: '#f5f5f5' }}
			>
				<Navbar />
			</Sider>
			<Layout>
				<Header style={{ background: '#f5f5f5' }}>
					<Topbar />
				</Header>
				<Content style={{ paddingRight: 20 }}>
					<div className={styles.content}>
						<Outlet />
					</div>
				</Content>
				<Footer>
					<Footbar />
				</Footer>
			</Layout>
		</Layout>
	);
};

export default PrivateLayout;
