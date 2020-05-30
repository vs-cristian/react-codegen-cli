import path from 'path';
import fs from 'fs-extra';

import defaultConfig from '../config/default.json';

export const ROOT = path.dirname(require.main.filename);
export const CONFIG_FILE_NAME = 'react-codegen.json';

export const CONFIG = Object.assign(
  defaultConfig,
  (() => {
    if (fs.pathExistsSync(CONFIG_FILE_NAME)) {
      try {
        const file = fs.readFileSync(CONFIG_FILE_NAME);
        return JSON.parse(file);
      } catch (error) {
        console.error(error);
      }
    }
    return {};
  })()
);

export const EXT = {
  component: CONFIG.typescript ? 'tsx' : `j${CONFIG.jsxExt ? 'sx' : 's'}`,
  script: `${CONFIG.typescript ? 't' : 'j'}s`,
  style: CONFIG.styles,
};
