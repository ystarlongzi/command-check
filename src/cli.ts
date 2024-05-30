#!/usr/bin/env node
import * as nodePath from 'path';
import chalk from 'chalk';
import { program } from 'commander';
import fsEx from 'fs-extra';
import ora from 'ora';
import { commandCheck } from './commandCheck';
import { readConfig } from './readConfig';

const pkg = fsEx.readJsonSync(nodePath.resolve(__dirname, '../package.json'));

program
  .version(pkg.version, '-v, --version')
  .option('-f, --file', 'config file path')
  .action((options) => {
    const spinner = ora({ color: 'yellow' }).start('reading config...');
    const config = readConfig(options.file);

    if (!config) {
      spinner.fail(chalk.redBright('error: configuration file not found'));
      return;
    }

    spinner.succeed();
    spinner.start('checking command...');

    let passed = true;

    Object.entries(config).forEach(([key, val]) => {
      if (passed === false) {
        return;
      }

      if (typeof val !== 'object') {
        val = {
          version: val,
        };
      }

      if (!commandCheck(key, val)) {
        passed = false;
        spinner.fail(
          chalk.redBright(`error: command \`${key}\` does not pass the check.`),
        );
      }
    });

    if (passed) {
      spinner.succeed();
    } else {
      spinner.stop();
      process.exit(1);
    }
  });

program.parse(process.argv);
