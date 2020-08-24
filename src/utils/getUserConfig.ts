import { cosmiconfigSync } from 'cosmiconfig';

import { APP_ROOT } from '@/constants';

export function getUserConfig() {
  const explorer = cosmiconfigSync('react-codegen');
  const { config } = explorer.search(APP_ROOT) || {};

  return config;
}
