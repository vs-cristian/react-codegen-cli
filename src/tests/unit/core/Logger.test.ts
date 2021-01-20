import { Logger } from '@/core/Logger';
import sinon from 'sinon';

describe('Logger', () => {
  let consoleLog;

  beforeEach(() => {
    consoleLog = sinon.stub(console, 'log');
  });

  afterEach(() => {
    consoleLog.restore();
  });

  describe('log', () => {
    it('should log the value', () => {
      Logger.log('test');
      sinon.assert.calledOnce(consoleLog);
    });

    it('should log the value and pass chalk instance', () => {
      Logger.log(chalk => chalk.white('test'));
      sinon.assert.calledOnce(consoleLog);
    });
  });

  describe('info', () => {
    it('should log the value', () => {
      Logger.info('test');
      sinon.assert.calledOnce(consoleLog);
    });

    it('should log the value and pass chalk instance', () => {
      Logger.info(chalk => chalk.white('test'));
      sinon.assert.calledOnce(consoleLog);
    });
  });

  describe('warn', () => {
    it('should log the value', () => {
      Logger.warn('test');
      sinon.assert.calledOnce(consoleLog);
    });

    it('should log the value and pass chalk instance', () => {
      Logger.warn(chalk => chalk.white('test'));
      sinon.assert.calledOnce(consoleLog);
    });
  });

  describe('error', () => {
    it('should log the value', () => {
      Logger.error('test');
      sinon.assert.calledOnce(consoleLog);
    });

    it('should log the value and pass chalk instance', () => {
      Logger.error(chalk => chalk.white('test'));
      sinon.assert.calledOnce(consoleLog);
    });
  });

  describe('success', () => {
    it('should log the value', () => {
      Logger.success('test');
      sinon.assert.calledOnce(consoleLog);
    });

    it('should log the value and pass chalk instance', () => {
      Logger.success(chalk => chalk.white('test'));
      sinon.assert.calledOnce(consoleLog);
    });
  });
});
