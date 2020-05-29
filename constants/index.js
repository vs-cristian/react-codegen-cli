const fs = require('fs-extra');
const path = require('path');

const defaultConfig = require('../config/default');

const ROOT = path.dirname(require.main.filename);
const CONFIG_FILE_NAME = 'react-codegen.json';

const CONFIG = Object.assign(
  defaultConfig,
  (function () {
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

const EXT = {
  component: CONFIG.typescript ? 'tsx' : 'j' + (CONFIG.jsxExt ? 'sx' : 's'),
  script: (CONFIG.typescript ? 't' : 'j') + 's',
  style: CONFIG.styles,
};

module.exports = {
  CONFIG,
  ROOT,
  EXT,
};
