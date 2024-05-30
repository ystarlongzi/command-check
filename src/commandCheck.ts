import { execSync } from 'child_process';
import semver from 'semver/preload';

export interface CommandCheckOptions {
  version: string | true;
  versionCommand?: string;
}

function getCommandVersion(versionCmd: string) {
  const versionStr = execSync(versionCmd, {
    encoding: 'utf8',
  });
  const [version] = /(\d+\.){2}(\d+)/.exec(versionStr) || [];

  return version;
}

function isExistCommand(cmdName: string) {
  let stdout: any;

  try {
    if (process.platform === 'win32') {
      stdout = execSync(`where ${cmdName}`, { stdio: [] });
    } else {
      stdout = execSync(`
      command -v ${cmdName} 2>/dev/null && { echo >&1 ${cmdName}; exit 0; }
    `);
    }
  } catch (err) {
    return false;
  }

  return Boolean(stdout);
}

export function commandCheck(
  cmdName: string,
  options: CommandCheckOptions = {
    version: true,
  },
) {
  const isExist = isExistCommand(cmdName);

  if (!isExist) {
    return false;
  }

  if (options.version === true) {
    return isExist;
  }

  const expectVersion = getCommandVersion(`${cmdName} --version`);

  return semver.satisfies(options.version, expectVersion);
}
