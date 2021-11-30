import config from '../config';

export const backend = `${config.protocol}://${config.host}:${config.port}/${config.route}`;