import fs from 'fs-extra';
import { runGenerator } from '@/.';
import { config } from '@/config';
import path from 'path';

const getAnswers = () => ({
  name: 'button',
  test: true,
  hooks: ['useState'],
  mods: ['propTypes'],
});

describe('Component', () => {
  let cleaned = false;
  let answers;
  const type = 'component';
  const dirPath = './src/tests/tmp/components/';

  beforeEach(() => {
    config.reset();
    config.update({
      path: dirPath,
      fileNameCase: 'kebab',
    });

    answers = getAnswers();

    if (!cleaned && fs.pathExistsSync(dirPath)) {
      cleaned = true;
      fs.rmdirSync(dirPath, { recursive: true });
    }
  });

  it('should create component: js/sass/test', async () => {
    config.update({
      styles: 'scss',
    });

    answers.name = 'js/sass/test';

    await runGenerator({}, { answers, type });
  });

  it('should create component: jsx/stylus', async () => {
    config.update({
      styles: 'stylus',
      jsxExt: true,
    });

    answers.name = 'jsx/stylus';
    answers.test = false;

    await runGenerator({}, { answers, type });
  });

  it('should create component ts/scss-module/test', async () => {
    config.update({
      styles: 'scss',
      typescript: true,
      jsxExt: false,
      cssModules: true,
    });

    answers.name = 'ts/scss-module/test';

    await runGenerator({}, { answers, type });
  });

  it('should create component: ts/scss-module/test', async () => {
    config.update({
      styles: 'scss',
      typescript: true,
      jsxExt: false,
      cssModules: true,
      wrapFolder: false,
      path: path.resolve(dirPath, 'wrap-folder'),
    });

    answers.name = 'ts/scss-module/test';

    await runGenerator({}, { answers, type });
  });

  it('should create component: ts/css/test/barrel (arrow/default)', async () => {
    config.update({
      styles: 'css',
      typescript: true,
      arrowFunction: true,
      exportType: 'default',
    });

    answers.name = 'ts/css/test/barrel (arrow-fn)';
    answers.barrel = true;

    await runGenerator({}, { answers, type });
  });

  it('should create component: js/css/test/barrel (arrow/exported)', async () => {
    config.update({
      styles: 'css',
      arrowFunction: false,
      jsxExt: false,
      exportType: 'named',
    });

    answers.name = 'js/css/test/barrel (export-named)';
    answers.barrel = true;

    await runGenerator({}, { answers, type });
  });

  it('should create component: js/css/barrel/test', async () => {
    config.update({
      styles: 'css',
      jsxExt: false,
    });

    answers.name = 'js/css/barrel/test';
    answers.barrel = true;

    await runGenerator({}, { answers, type });
  });
});
