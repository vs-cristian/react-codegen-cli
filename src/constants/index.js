import path from 'path';

import { getAppRoot, getConfig } from '../utils';
import { getStylesExtension } from '../utils/getStylesExtension';

export const STYLE_FORMATS = ['CSS', 'SCSS', 'SASS', 'Less', 'Stylus'];
export const APP_ROOT = getAppRoot();
export const ROOT = path.dirname(require.main.filename);
export const CONFIG = getConfig();
export const EXT = {
  component: CONFIG.typescript ? 'tsx' : `j${CONFIG.jsxExt ? 'sx' : 's'}`,
  script: `${CONFIG.typescript ? 't' : 'j'}s`,
  style: getStylesExtension(CONFIG.styles),
};
