'use client';
import React from 'react';
import styles from './footbar.module.css';
import { Flex, Typography } from 'antd';

export interface FootbarProps {
	// types...
}

const { Text } = Typography;

const Footbar: React.FC<FootbarProps> = () => {
	return (
		<Flex align='center' justify='end' className={styles.footbar}>
			<Text type='secondary' style={{ fontSize: 12}} >jceballos.dev © 2024</Text>
		</Flex>
	);
};

export default Footbar;
