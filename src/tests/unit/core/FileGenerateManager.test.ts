import sinon from 'sinon';
import * as utils from '@/utils';
import { FileGenerateManager } from '@/core/FileGenerateManager';
import { FileService } from '@/core/FileService';
import { TemplateGenerator as TG } from '@/core/TemplateGenerator';
import { config } from '@/config';

describe('FileGenerateManager', () => {
  let createDir;
  let genJs;
  let generateTemplate;
  let genStyle;
  let genTest;
  let genBarrel;

  beforeEach(() => {
    createDir = sinon.stub(FileService.prototype, 'createDir');
    genJs = sinon.stub(FileService.prototype, 'genJs');
    genStyle = sinon.stub(FileService.prototype, 'genStyle');
    genTest = sinon.stub(FileService.prototype, 'genTest');
    genBarrel = sinon.stub(FileService.prototype, 'genBarrel');
    generateTemplate = sinon.stub(TG.prototype, 'generateTemplate');
  });

  afterEach(() => {
    createDir.restore();
    genJs.restore();
    generateTemplate.restore();
    genStyle.restore();
    genTest.restore();
    genBarrel.restore();
  });

  it('should create Hook', () => {
    const variables = utils.getHookVariables({ name: 'api' });
    FileGenerateManager.generateHook(variables);

    sinon.assert.calledOnce(genJs);
    sinon.assert.calledOnce(createDir);
    sinon.assert.calledOnce(generateTemplate);
  });

  it('should create HOC', () => {
    const variables = utils.getHOCVariables({ name: 'api' });
    FileGenerateManager.generateHOC(variables);

    sinon.assert.calledOnce(generateTemplate);
    sinon.assert.calledOnce(createDir);
    sinon.assert.calledOnce(genJs);
  });

  it('should create Component with Style', () => {
    const cfgMock = sinon.stub(config, 'cssModules').value(false);
    const variables = utils.getComponentVariables({ name: 'api' });
    FileGenerateManager.generateComponent(variables);

    sinon.assert.calledOnce(generateTemplate);
    sinon.assert.calledOnce(createDir);
    sinon.assert.calledOnce(genJs);
    sinon.assert.calledWith(genStyle, '');

    cfgMock.restore();
  });

  it('should create Component with Test', () => {
    const variables = utils.getComponentVariables({ name: 'api', test: true });
    FileGenerateManager.generateComponent(variables);

    sinon.assert.calledTwice(generateTemplate);
    sinon.assert.calledOnce(createDir);
    sinon.assert.calledOnce(genJs);
    sinon.assert.calledOnce(genStyle);
    sinon.assert.calledOnce(genTest);
  });

  it('should create Component with Barrel', () => {
    const variables = utils.getComponentVariables({
      name: 'api',
      barrel: true,
    });
    FileGenerateManager.generateComponent(variables);

    sinon.assert.calledTwice(generateTemplate);
    sinon.assert.calledOnce(createDir);
    sinon.assert.calledOnce(genJs);
    sinon.assert.calledOnce(genStyle);
    sinon.assert.calledOnce(genBarrel);
  });

  it('should create Component with CSS Module', () => {
    const configCssModules = sinon.stub(config, 'cssModules').value(true);
    const variables = utils.getComponentVariables({ name: 'api' });
    FileGenerateManager.generateComponent(variables);

    sinon.assert.calledOnce(generateTemplate);
    sinon.assert.calledOnce(createDir);
    sinon.assert.calledOnce(genJs);
    sinon.assert.calledWith(genStyle, '.root {}');

    configCssModules.restore();
  });
});
