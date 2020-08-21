import path from 'path';
import { defaultConfig } from '@/config';
import { cosmiconfigSync } from 'cosmiconfig';

import { APP_ROOT, EXPORT_TYPES, STYLE_FORMATS } from '@/constants';
import { Logger } from '@/core/Logger';
import { IConfig } from '@/types';

export function getUserConfig() {
  let config = { ...defaultConfig } as IConfig;

  const explorer = cosmiconfigSync('react-codegen');
  const { config: userConfig } = explorer.search(APP_ROOT) || {};

  if (userConfig) {
    if (userConfig.styles) {
      userConfig.styles = userConfig.styles.toLowerCase();
      const formats = STYLE_FORMATS.map(v => v.toLowerCase());
      const isSupported = formats.includes(userConfig.styles);

      if (!isSupported) {
        Logger.warn(`Unknown stylesheet format - ${userConfig.styles}`);
        Logger.warn(`Using default value - ${defaultConfig.styles}`);
        userConfig.styles = 'css';
      }
    }

    if (userConfig.exportType && !EXPORT_TYPES.includes(userConfig.exportType)) {
      Logger.warn(`Unknown export type - ${userConfig.exportType}`);
      Logger.warn(`Using default value - ${defaultConfig.exportType}`);
    }

    config = Object.assign(config, userConfig);
  }

  if (config.path) {
    config.path = path.resolve(APP_ROOT, config.path);
  }

  return config;
}
