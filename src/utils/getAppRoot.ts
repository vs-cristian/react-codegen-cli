import path from 'path';
import findUp from 'find-up';
import { Logger } from '@/core/Logger';

export function getAppRoot() {
  const file = findUp.sync('package.json');

  if (file) {
    return path.dirname(file);
  }

  Logger.warn(
    'Could not find application root. Files will be generated relative to the current directory'
  );

  return process.cwd();
}
