#!/usr/bin/env node

import 'source-map-support/register';

import * as Sentry from '@sentry/node';

import yargs from 'yargs';
import { Logger } from './core/Logger';
import { IArgs, runGenerator } from './index';
import { initConfigFile } from './init';

Sentry.init({
  dsn:
    'https://557242b231664cb6a8b160193a8c51bf@o509890.ingest.sentry.io/5604939',
  tracesSampleRate: 1.0,
});

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
      const { directory, wrap } = args;

      runGenerator({ directory, wrap })
        .then(() => process.exit(0))
        .catch(err => {
          console.error(err);
          Sentry.captureException(err);
          process.exit(1);
        });
    },
  })
  .option('wrap', {
    type: 'boolean',
    description: 'Wrap generated files in folder',
  })
  .option('directory', {
    alias: 'd',
    type: 'string',
    description: 'Generate files in custom directory relative to root path',
  })
  .parse();
