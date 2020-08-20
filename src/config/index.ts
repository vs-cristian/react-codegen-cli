import { Config } from '@/config/Config';
import { getUserConfig } from '@/utils';

export { Config } from './Config';
const userConfig = getUserConfig();
export const config = new Config(userConfig);
