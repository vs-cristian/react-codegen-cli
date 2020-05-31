import path from 'path';
import { cosmiconfigSync } from 'cosmiconfig';

import defaultConfig from '../config/default.json';
import { APP_ROOT } from '../constants';

export function getConfig() {
  let config = defaultConfig;

  const explorer = cosmiconfigSync('react-codegen');
  const { config: userConfig } = explorer.search(APP_ROOT);

  if (userConfig) {
    config = Object.assign(config, userConfig);
  }

  if (config.path) {
    config.path = path.resolve(APP_ROOT, config.path);
  }

  return config;
}
