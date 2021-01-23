import { expect } from 'chai';
import sinon from 'sinon';

import {
  getHOCVariables,
  getHookVariables,
  getComponentVariables,
} from '@/utils';
import { config } from '@/config';

const sandbox = sinon.createSandbox();
const answers = { name: 'test-string' };

describe('Util: getVariables', () => {
  beforeEach(() => {
    sandbox.stub(config, 'fileNameCase').value('kebab');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('* getHOCVariables', () => {
    it('should return processed data', () => {
      const variables = getHOCVariables(answers);
      expect(variables).to.deep.equal({
        ...variables,
        componentName: 'withTestString',
        fileName: 'withTestString',
      });
    });
  });

  describe('* getHookVariables', () => {
    it('should return processed data', () => {
      const variables = getHookVariables(answers);
      expect(variables).to.deep.equal({
        ...variables,
        componentName: 'useTestString',
        fileName: 'useTestString',
      });
    });
  });

  describe('* getComponentVariables', () => {
    it('should return processed data', () => {
      const variables = getComponentVariables(answers);
      expect(variables).to.deep.equal({
        ...variables,
        componentName: 'TestString',
        fileName: 'test-string',
      });
    });
  });
});
