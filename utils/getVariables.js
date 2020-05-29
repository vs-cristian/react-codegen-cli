const { EXT } = require('../constants');
const { getNameCases } = require('./getNameCases');
const { getFileName } = require('./getFileName');

function getVariables(data) {
  return Object.assign(data, {
    componentName: getNameCases(data.name),
    fileName: getFileName,
    ext: EXT,
  });
}

module.exports = {
  getVariables,
};
