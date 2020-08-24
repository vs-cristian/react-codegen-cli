import { ExportType, IConfig, StyleFormats } from '@/types';
import * as utils from '@/utils';

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
export const APP_ROOT = utils.getAppRoot();
