import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

export type PublicLayoutProps = {
	// types...
};

const PublicLayout: React.FC<PublicLayoutProps> = () => {
	return (
		<Layout>
			<Header></Header>
			<Content>
				<Outlet />
			</Content>
			<Footer></Footer>
		</Layout>
	);
};

export default PublicLayout;
