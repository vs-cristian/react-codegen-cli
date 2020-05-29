const { CONFIG } = require('../constants');

function getQuestions() {
  const modsChoices = ['useState', 'useEffect'];
  if (!CONFIG.typescript) modsChoices.push('propTypes');

  return [
    {
      type: 'input',
      name: 'name',
      message: 'Component name:',
    },
    {
      type: 'confirm',
      name: 'test',
      message: 'Should create test file?',
    },
    {
      type: 'checkbox',
      name: 'mods',
      message: 'Add modifications:',
      choices: modsChoices,
    },
  ];
}

module.exports = {
  getQuestions,
};
