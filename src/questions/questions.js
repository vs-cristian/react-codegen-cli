export const type = {
  type: 'list',
  name: 'type',
  message: 'Select type:',
  choices: [
    {
      name: 'Component',
      value: 'component',
    },
    {
      name: 'High Order Component',
      value: 'hoc',
    },
  ],
};

export const name = genType => ({
  type: 'input',
  name: 'name',
  message: `${genType} name:`,
  validate: str => str.length > 0,
});

export const test = {
  type: 'confirm',
  name: 'test',
  message: 'Create a test file?',
};

export const hooks = args => ({
  type: 'checkbox',
  name: 'hooks',
  message: 'Add hooks:',
  choices: args,
});

export const mods = args => ({
  type: 'checkbox',
  name: 'mods',
  message: 'Add modifications:',
  choices: args,
});
