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
    {
      name: 'Hook',
      value: 'hook',
    },
  ],
};

export const name = (genType: string, endStr = ':') => ({
  type: 'input',
  name: 'name',
  message: `${genType} name${endStr}`,
  validate: (str: string) => str.length > 0,
});

export const test = () => ({
  type: 'confirm',
  name: 'test',
  message: 'Create a test file?',
});

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
