'use client';
import React from 'react';
import styles from './Footbar.module.css';
import { Flex, Typography } from 'antd';

export interface FootbarProps {}

const { Text } = Typography;

const Footbar: React.FC<FootbarProps> = () => {
	return (
		<Flex className={styles.footbar} align='center' justify='end'>
			<Text type='secondary'>jceballos.dev © 2024</Text>
		</Flex>
	);
};

export default Footbar;
