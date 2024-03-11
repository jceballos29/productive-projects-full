import pino from 'pino';

export const logger = pino({
	level: 'debug',
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
			crlf: false,
			errorLikeObjectKeys: ['err', 'error'],
			errorProps: '',
			levelFirst: false,
			messageKey: 'msg',
			translateTime: 'SYS:standard',
			ignore: 'pid,hostname',
		},
	},
	timestamp: pino.stdTimeFunctions.isoTime,
});
