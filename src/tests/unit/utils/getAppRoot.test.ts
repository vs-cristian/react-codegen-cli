import { expect } from 'chai';
import sinon from 'sinon';
import findUp from 'find-up';

import { Logger } from '@/core/Logger';
import { getAppRoot } from '@/utils';

describe('Util: getAppRoot', () => {
  it('should return app root path', () => {
    const logger = sinon.mock(Logger);
    const mockFindUp = sinon.mock(findUp);

    mockFindUp.expects('sync').once().returns(null);
    logger.expects('warn').once().returns('This is mocked Warn');

    const root = getAppRoot();
    expect(root).to.be.equal(process.cwd());

    mockFindUp.verify();
    mockFindUp.restore();

    logger.verify();
    logger.restore();
  });

  it('should return relative path', () => {
    const mockFindUp = sinon.mock(findUp);

    mockFindUp.expects('sync').once().returns('/path/to/package.json');

    const root = getAppRoot();
    expect(root).to.be.equal('/path/to');

    mockFindUp.verify();
    mockFindUp.restore();
  });
});
