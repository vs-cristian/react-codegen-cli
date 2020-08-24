#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';

import { config } from '@/config';
import { IConfig } from '@/types';
import { FileGenerateManager } from '@/core/FileGenerateManager';
import testAnswers from './answers.json';
import testConfig from './config.json';

fs.emptyDirSync(path.resolve(__dirname, '../../src/__tests__/generated'));

config.update(testConfig as IConfig);

FileGenerateManager.generateComponent(testAnswers);
FileGenerateManager.generateHook(testAnswers);
FileGenerateManager.generateHOC(testAnswers);
