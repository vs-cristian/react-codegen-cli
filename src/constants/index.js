import path from 'path';

import { getAppRoot, getConfig } from '../utils';

export const APP_ROOT = getAppRoot();
export const ROOT = path.dirname(require.main.filename);
export const CONFIG = getConfig();
export const EXT = {
  component: CONFIG.typescript ? 'tsx' : `j${CONFIG.jsxExt ? 'sx' : 's'}`,
  script: `${CONFIG.typescript ? 't' : 'j'}s`,
  style: CONFIG.styles,
};
