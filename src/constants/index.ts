import { ExportType, IConfig, StyleFormats } from '@/types';
// import { getAppRoot } from '@/utils';
import findUp from 'find-up';
import path from 'path';
import { Logger } from '@/core/Logger';

export const DEFAULT_CONFIG: IConfig = {
  styles: 'scss',
  typescript: false,
  jsxExt: true,
  wrapFolder: true,
  fileNameCase: 'pascal',
  path: 'src/components',
  cssModules: false,
  exportType: 'default',
  arrowFunction: true,
};

export const STYLE_FORMATS: StyleFormats[] = [
  'css',
  'scss',
  'sass',
  'less',
  'stylus',
];

export const EXPORT_TYPES: ExportType[] = ['named', 'default'];

/* istanbul ignore next */
export const APP_ROOT = (() => {
  const file = findUp.sync('package.json');

  if (file) {
    return path.dirname(file);
  }

  Logger.warn(
    'Could not find application root. Files will be generated relative to the current directory'
  );

  return process.cwd();
})();
