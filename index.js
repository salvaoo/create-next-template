#!/usr/bin/env node

const { exec } = require('shelljs');

const questions = [
   {
      type: 'list',
      name: 'templateType',
      message: 'Do you want to create a Next.js project with a pages or app structure?',
      choices: [
         {
            name: 'Pages',
            value: 'pages',
         },
         {
            name: 'App',
            value: 'app',
         },
      ],
   },
   {
      type: 'input',
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
   const inquirer = await import('inquirer');
   const { templateType, projectName } = await inquirer.default.prompt(questions);


   const repoUrl =
      templateType === 'pages'
         ? 'https://github.com/shadcn/next-template.git'
         : 'https://github.com/salvaoo/next-template.git';

   exec(`git clone ${repoUrl} ${projectName}`);
   exec(`cd ${projectName} && rm -rf .git`);

   console.log("Project successfully created!");
}

main();
