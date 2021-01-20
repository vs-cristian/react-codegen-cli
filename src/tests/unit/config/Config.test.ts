import { expect } from 'chai';
import sinon from 'sinon';
import chalk from 'chalk';

import { Config } from '@/config';
import { Logger } from '@/core/Logger';
import { DEFAULT_CONFIG } from '@/constants';

const sandbox = sinon.createSandbox();

describe('Config', () => {
  let logger;

  beforeEach(() => {
    logger = sinon.mock(Logger);
  });

  afterEach(() => {
    logger.restore();
  });

  it('should use default styles if unsupported provided', () => {
    const defaultStyles = 'scss';

    logger.expects('warn').yields(chalk);
    sandbox.stub(DEFAULT_CONFIG, 'styles').value(defaultStyles);

    // @ts-ignore
    const config = new Config({ path: '/', styles: 'unsupported' });
    expect(config.styles).to.be.equal(defaultStyles);

    logger.verify();
    sandbox.restore();
  });

  it('should use default exportType if unsupported provided', () => {
    const defaultExportType = 'named';

    logger.expects('warn').yields(chalk);
    sandbox.stub(DEFAULT_CONFIG, 'exportType').value(defaultExportType);

    // @ts-ignore
    const config = new Config({ path: '/', exportType: 'unsupported' });
    expect(config.exportType).to.be.equal(defaultExportType);

    logger.verify();
    sandbox.restore();
  });

  it('should set the correct file extension', () => {
    const config = new Config({
      path: '/',
      jsxExt: false,
    });

    expect(config.ext.component).to.be.equal('js');
    expect(config.ext.script).to.be.equal('js');
  });

  it('should set the correct file extension if typescript', () => {
    const config = new Config({
      path: '/',
      typescript: true,
    });

    expect(config.ext.component).to.be.equal('tsx');
    expect(config.ext.script).to.be.equal('ts');
  });

  it('should set the correct file extension if jsxExt', () => {
    const config = new Config({
      path: '/',
      jsxExt: true,
    });

    expect(config.ext.component).to.be.equal('jsx');
    expect(config.ext.script).to.be.equal('js');
  });

  it('should set the correct style file extension if stylus', () => {
    const config = new Config({
      path: '/',
      styles: 'stylus',
    });

    expect(config.ext.style).to.be.equal('styl');
  });

  it('should set the correct style file prefix if cssModules', () => {
    const config = new Config({
      path: '/',
      cssModules: true,
    });

    expect(config.prefixes.style).to.be.equal('module');
  });

  it('should update the config', () => {
    const config = new Config({
      path: '/',
      styles: 'sass',
      exportType: 'named',
    });

    config.update({ styles: 'less' });

    expect(config.styles).to.be.equal('less');
    expect(config.exportType).to.be.equal('named');
  });

  it('should reset the config', () => {
    const config = new Config({
      path: '/',
      styles: 'sass',
      exportType: 'named',
    });

    config.update({ exportType: 'default' });
    config.reset();

    expect(config.exportType).to.be.equal('named');
  });
});
