import path from 'path';

import { getAppRoot, getConfig, getStylesExtension } from '../utils';
import { StyleFormats } from '../types/types';

export const STYLE_FORMATS: StyleFormats[] = ['CSS', 'SCSS', 'SASS', 'Less', 'Stylus'];
export const APP_ROOT = getAppRoot();
export const ROOT = path.dirname(require.main.filename);
export const CONFIG = getConfig();
export const EXT = {
  component: CONFIG.typescript ? 'tsx' : `j${CONFIG.jsxExt ? 'sx' : 's'}`,
  script: `${CONFIG.typescript ? 't' : 'j'}s`,
  style: getStylesExtension(CONFIG.styles),
};
