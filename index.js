#!/usr/bin/env node

import pkg from 'shelljs';
const { exec } = pkg;
import prompts from 'prompts';
import ora from 'ora';
import chalk from "chalk";

var logger = {
  error(...args) {
    console.log(chalk.red(...args));
  },
  warn(...args) {
    console.log(chalk.yellow(...args));
  },
  info(...args) {
    console.log(chalk.cyan(...args));
  },
  success(...args) {
    console.log(chalk.green(...args));
  }
};

const questions = [
   {
      type: 'select',
      name: 'templateType',
      message: 'What type of template do you want to generate?',
      initial: 1,
      choices: [
         { title: 'Javascript', value: 'javascript' },
         { title: 'TypeScript', value: 'typescript' },
      ],
   },
   {
      type: 'text',
      name: 'projectName',
      message: 'What is the name of your project?',
      validate: function (input) {
         if (!input) {
            return 'You must enter a name for your project';
         }
         return true;
      },
   },
];

async function main() {
   logger.info('Welcome to the Next.js template generator!');

   const { templateType, projectName } = await prompts(questions);
   const repoUrl =
      templateType === 'typescript'
         ? 'https://github.com/salvaoo/Next-template-typescript.git'
         : 'https://github.com/salvaoo/Next-template-javascript.git';

   const spinner = ora('Starting your project...').start();
   exec(`git clone ${repoUrl} ${projectName} --quiet`, (error, stdout, stderr) => {
      if (error) {
         spinner.fail('Error cloning repository');
         console.error(stderr);
         return;
      }
      spinner.succeed('Project created');
      spinner.start('Cleaning up repository...');
      exec(`cd ${projectName} && rm -rf .git`, (error, stdout, stderr) => {
         if (error) {
            spinner.fail('Error cleaning up repository');
            console.error(stderr);
            return;
         }
         spinner.succeed('Repository cleaned up successfully');
         logger.success("Project successfully created!");
      });
   });
}

main();
