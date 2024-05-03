import { theme } from 'antd';
import React from 'react';

export interface LogoProps {
	size?: number;
	fontSize?: number;
	letter?: string;
}

const Logo: React.FC<LogoProps> = ({
	size = 100,
	fontSize = 48,
	letter = 'P',
}) => {

	const { 
		token: {
			colorPrimary,
			colorBgContainer
		}
	} = theme.useToken()

	return (
		<div
			style={{
				width: size,
				height: size,
				backgroundColor: colorPrimary,
				color: colorBgContainer,
				fontSize: fontSize,
				fontWeight: 'bold',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: '15%',
			}}
		>
			{letter}
		</div>
	);
};

export default Logo;
