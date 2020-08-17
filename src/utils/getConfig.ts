import path from 'path';
import { cosmiconfigSync } from 'cosmiconfig';

import defaultConfig from '../config/default.json';
import { APP_ROOT, STYLE_FORMATS } from '../constants';
import { Logger } from '../core/Logger';
import { IConfig } from '../types';

export function getConfig() {
  let config = defaultConfig as IConfig;

  const explorer = cosmiconfigSync('react-codegen');
  const { config: userConfig } = explorer.search(APP_ROOT) || {};

  if (userConfig) {
    if (userConfig.styles) {
      userConfig.styles = userConfig.styles.toLowerCase();
      const formats = STYLE_FORMATS.map(v => v.toLowerCase());
      const isSupported = formats.includes(userConfig.styles);

      if (!isSupported) {
        Logger.warn(`Unknown stylesheet format - ${userConfig.styles}`);
        Logger.warn('Using default - css');
        userConfig.styles = 'css';
      }
    }

    config = Object.assign(config, userConfig);
  }

  if (config.path) {
    config.path = path.resolve(APP_ROOT, config.path);
  }

  return config;
}
