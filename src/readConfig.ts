import * as nodePath from 'path';

import fsEx from 'fs-extra';

import { CommandCheckOptions } from './commandCheck';

const DEFAULT_CONFIG_FILE_PATH = './command-check.json';

export function readConfig(
  path = DEFAULT_CONFIG_FILE_PATH,
): CommandCheckOptions | undefined {
  path = nodePath.resolve(process.cwd(), path);

  if (fsEx.existsSync(path)) {
    return fsEx.readJsonSync(path);
  }

  const pkg = fsEx.readJsonSync(
    nodePath.resolve(process.cwd(), './package.json'),
  );

  return pkg.commandCheck;
}
