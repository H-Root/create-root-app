#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const program = new Command();

program
  .name('my-cli')
  .version('1.0.0')
  .description('CLI to create a new project with custom tools');

console.log(`
 ██████╗██████╗ ███████╗ █████╗ ████████╗███████╗    ██████╗  ██████╗  ██████╗ ████████╗    █████╗ ██████╗ ██████╗ 
██╔════╝██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██╔════╝    ██╔══██╗██╔═══██╗██╔═══██╗╚══██╔══╝   ██╔══██╗██╔══██╗██╔══██╗
██║     ██████╔╝█████╗  ███████║   ██║   █████╗█████╗██████╔╝██║   ██║██║   ██║   ██║█████╗███████║██████╔╝██████╔╝
██║     ██╔══██╗██╔══╝  ██╔══██║   ██║   ██╔══╝╚════╝██╔══██╗██║   ██║██║   ██║   ██║╚════╝██╔══██║██╔═══╝ ██╔═══╝ 
╚██████╗██║  ██║███████╗██║  ██║   ██║   ███████╗    ██║  ██║╚██████╔╝╚██████╔╝   ██║      ██║  ██║██║     ██║     
 ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝    ╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝      ╚═╝  ╚═╝╚═╝     ╚═╝     
`)

program
  .command('init <project-name>')
  .description('Initialize a new project with a selected template')
  .action(async (projectName) => {
    // Prompt user for template selection
    const { template } = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: 'Choose a template to start with:',
        choices: [
          { name: 'CRA', value: 'cra' },
          { name: 'Vite', value: 'vite' },
        ],
      },
    ]);

    // Define paths based on the template choice
    const projectPath = path.join(process.cwd(), projectName);
    const templatePath = path.join(new URL('.', import.meta.url).pathname, `../templates/${template}`);

    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath, { recursive: true });
    }

    // Copy the selected template into the new project directory
    fs.cpSync(templatePath, projectPath, { recursive: true });
    console.log(`Project '${projectName}' created with ${template === 'cra' ? 'Create React App' : 'Vite'} template at ${projectPath}`);

    // Install dependencies
    console.log('Installing dependencies...');
    exec(`cd ${projectPath} && npm install`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error installing dependencies: ${stderr}`);
        return;
      }
      console.log(stdout);
      console.log('Setup complete!');
    });
  });

program.parse(process.argv);
