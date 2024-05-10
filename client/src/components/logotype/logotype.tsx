'use client';
import React from 'react';
import styles from './Logotype.module.css';
import { Flex, theme, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';

export interface LogotypeProps {
	size?: number;
	fontSize?: number;
	name?: boolean;
}

const { Text } = Typography;

const Logotype: React.FC<LogotypeProps> = ({
	size = 28,
	fontSize = 14,
	name = true,
}) => {
	const {
		token: { colorPrimary, colorBgContainer },
	} = theme.useToken();

	return (
		<Link to={ROUTES.HOME} className={styles.logotype}>
			<Flex align='center' justify='center' gap={6}>
				<figure
					className={styles.icon}
					style={{
						width: size,
						height: size,
						backgroundColor: colorPrimary,
						color: colorBgContainer,
						fontSize: fontSize,
					}}
				>
					P
				</figure>
				{name && <Text strong>Proyectos Productivos</Text>}
			</Flex>
		</Link>
	);
};

export default Logotype;
