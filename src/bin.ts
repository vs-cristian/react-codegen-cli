#!/usr/bin/env node

import yargs from 'yargs';
import { Logger } from './core/Logger';
import { IArgs, runGenerator } from './index';
import { initConfigFile } from './init';

yargs
  .command(
    'init',
    'Run config initialization wizard',
    () => {},
    () => {
      Logger.log('Starting config initialization wizard');

      initConfigFile()
        .then(() => process.exit(0))
        .catch(err => {
          Logger.error(err);
          process.exit(1);
        });
    }
  )
  .command({
    command: '*',
    handler: (args: IArgs) => {
      const { directory } = args;

      runGenerator({ directory })
        .then(() => process.exit(0))
        .catch(err => {
          Logger.error(err);
          process.exit(1);
        });
    },
  })
  .option('directory', {
    alias: 'd',
    type: 'string',
    description: 'Generate files in custom directory relative to root path',
  })
  .parse();
