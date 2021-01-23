import { expect } from 'chai';
import sinon from 'sinon';

import { Logger } from '@/core/Logger';

import chalk from 'chalk';
import { changeCase } from '@/utils';

describe('Util: changeCase', () => {
  it('should change case to camel', () => {
    const result = changeCase('test-string', 'camel');
    expect(result).to.be.equal('testString');
  });

  it('should change case to pascal', () => {
    const result = changeCase('test-string', 'pascal');
    expect(result).to.be.equal('TestString');
  });

  it('should change case to snake', () => {
    const result = changeCase('test-string', 'snake');
    expect(result).to.be.equal('test_string');
  });

  it('should change case to snakeUpper', () => {
    const result = changeCase('test-string', 'snakeUpper');
    expect(result).to.be.equal('TEST_STRING');
  });

  it('should change case to kebab', () => {
    const result = changeCase('test-string', 'kebab');
    expect(result).to.be.equal('test-string');
  });

  it('should warn if case is not supported', () => {
    const logger = sinon.mock(Logger);
    logger.expects('warn').yields(chalk).returns('This is mocked Warn');

    // @ts-ignore
    changeCase('test-string', 'fake-case');

    logger.verify();
    logger.restore();
  });
});
