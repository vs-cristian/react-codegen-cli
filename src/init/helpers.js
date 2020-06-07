import path from 'path';
import fs from 'fs-extra';

import detectIndent from 'detect-indent';
import { APP_ROOT } from '../constants';

export async function updatePackage(scriptName) {
  const packagePath = path.resolve(APP_ROOT, 'package.json');
  const packageContent = fs.readFileSync(packagePath, 'utf-8');

  const pkg = JSON.parse(packageContent);
  const { indent } = detectIndent(packageContent);

  pkg.scripts = pkg.scripts || {};
  pkg.scripts[scriptName] = `react-codegen`;

  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, indent));
}
