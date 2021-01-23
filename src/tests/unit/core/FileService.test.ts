import fs from 'fs-extra';
import path from 'path';
import sinon from 'sinon';
import { FileService } from '@/core/FileService';
import { Logger } from '@/core/Logger';
import chalk from 'chalk';
import { config } from '@/config';

describe('FileService', () => {
  const dir = '/app';
  const fileName = 'app';

  let fsMock;
  let pathStub;
  let loggerMock;
  let fileService;
  let fileServiceMock;

  beforeEach(() => {
    pathStub = sinon.stub(path, 'resolve').returns(dir);

    fsMock = sinon.mock(fs);
    loggerMock = sinon.mock(Logger);
    fileService = new FileService(fileName);
    fileServiceMock = sinon.mock(fileService);
  });

  afterEach(() => {
    fsMock.restore();
    pathStub.restore();
    loggerMock.restore();
    fileServiceMock.restore();
  });

  it('should create wrap folder', () => {
    const wrapFolderMock = sinon.stub(config, 'wrapFolder').value(false);
    const pathMock = sinon.stub(config, 'path').value('/components');
    pathStub.restore();

    fileService = new FileService(fileName);
    expect(fileService.dirPath).to.be.equal('/components');

    pathMock.restore();
    wrapFolderMock.restore();
  });

  it('should not create wrap folder', () => {
    const wrapFolderMock = sinon.stub(config, 'wrapFolder').value(true);
    const pathMock = sinon.stub(config, 'path').value('/components');
    pathStub.restore();

    fileService = new FileService('fileName');
    expect(fileService.dirPath).to.be.equal('/components/fileName');

    pathMock.restore();
    wrapFolderMock.restore();
  });

  it('should create directory', () => {
    fsMock.expects('mkdirpSync').withExactArgs(dir);
    fileService.createDir();
    fsMock.verify();
  });

  it('should return file path', () => {
    const filePath = fileService.getFilePath('jsx');
    expect(filePath).to.equal(`${dir}/${fileName}.jsx`);
  });

  it('should return file path with prefix', () => {
    const filePath = fileService.getFilePath('jsx', 'test');
    expect(filePath).to.equal(`${dir}/${fileName}.test.jsx`);
  });

  it('should create file', () => {
    fsMock.expects('pathExistsSync').returns(false);
    fsMock.expects('writeFileSync').withExactArgs(dir, '');
    loggerMock.expects('success').yields(chalk);

    fileService.genFile(dir, '', 'component');

    fsMock.verify();
    loggerMock.verify();

    loggerMock.restore();
  });

  it('should warn if file already exists', () => {
    fsMock.expects('pathExistsSync').returns(true);
    fsMock.expects('writeFileSync').never();
    loggerMock.expects('warn').yields(chalk);

    fileService.genFile(dir, '', 'test');

    fsMock.verify();
    loggerMock.verify();

    loggerMock.restore();
  });

  it('should create script file', () => {
    fileServiceMock.expects('getFilePath').once().returns(dir);
    fileServiceMock.expects('genFile').withExactArgs(dir, '', 'component');
    fileService.genJs('');

    fileServiceMock.verify();
  });

  it('should create style file', () => {
    fileServiceMock.expects('getFilePath').once().returns(dir);
    fileServiceMock.expects('genFile').withExactArgs(dir, '', 'styles');
    fileService.genStyle('');

    fileServiceMock.verify();
  });

  it('should create test file', () => {
    fileServiceMock.expects('getFilePath').once().returns(dir);
    fileServiceMock.expects('genFile').withExactArgs(dir, '', 'test');
    fileService.genTest('');

    fileServiceMock.verify();
  });
});
