# command-check

<p>
  <a href="https://www.npmjs.com/package/umi"><img src="https://badgen.net/npm/v/cmd-check" alt="Version" /></a>
  <a href="https://www.npmjs.com/package/umi"><img src="https://badgen.net/npm/license/cmd-check" alt="License" /></a>
  <a href="https://github.com/ystarlongzi/command-check"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome"></a>
</p>

Checks whether the command exists and whether it matches the specified version.

## Installation
```bash
npm install cmd-check
// or
// yan add cmd-check
```

## Usage
### CLI mode

```bash
Usage: cmd-check [options]

Options:
  -f, --file [file]          # configuration file path. default: command-check.json
  -v, --version              # output the version number
```

Run `cmd-check` in the root folder of a git repository or run as npm script, it will read configuration from `./command-check.json` or `command-check` option of `./package.json` file.

`package.json` example:
```json
{
  "command-check": {
    "node": true,
    "yarn": ">=1.22.0"
  }
}

```

`command-check.json` example:

```json
{
  "node": true,
  "yarn": {
    "version": ">=1.22.0",
    "versionCommand": "yarn -v"
  }
}
```


### code mode
```
import { commandCheck } from 'cmd-check';

// should match command name
const isExistSoffice = commandCheck('soffice');

// should match command name and version
const isExistYarn = commandCheck('yarn', '>1.22.0');
```

## Configuration
### Example
```json
{
  "node": true,
  "yarn": {
    "version": ">=1.22.0",
    "versionCommand": "yarn -v"
  }
}
```

### Props
#### `version`
  - type: `string | true`
  - description: Use [semver](https://www.npmjs.com/package/semver) to match versions. If set to true, no specific version matching is required. If set to `true`, it means that no specific version needs to be matched

#### `versionCommand`
  - type: `string`
  - description: Customize the command for obtaining the version. If not provided, the default version obtaining method will be used.

## License
[MIT](./LICENSE.md)
