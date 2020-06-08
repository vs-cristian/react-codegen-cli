#!/usr/bin/env node

import { argv } from 'yargs';
import { Logger } from './core/Logger';
import { runCLI } from './index';

runCLI(argv._[0] === 'init')
  .then(() => process.exit(0))
  .catch(err => {
    Logger.error(err);
    process.exit(1);
  });
