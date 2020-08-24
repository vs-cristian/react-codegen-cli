import { getUserConfig } from '@/utils';
import { Config } from './Config';

export { Config } from './Config';

const userConfig = getUserConfig();
export const config = new Config(userConfig);
