import { Config } from '@/config/Config';
import { getUserConfig } from '@/utils';

export { Config } from './Config';
export { default as defaultConfig } from './default.json';

const userConfig = getUserConfig();
export const config = new Config(userConfig);
