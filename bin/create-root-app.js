#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import ora from "ora";
import axios from "axios";

const program = new Command();

program
	.name("my-cli")
	.version("1.0.0")
	.description("CLI to create a new project with custom tools");

console.log(`
 ██████╗██████╗ ███████╗ █████╗ ████████╗███████╗    ██████╗  ██████╗  ██████╗ ████████╗    █████╗ ██████╗ ██████╗ 
██╔════╝██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██╔════╝    ██╔══██╗██╔═══██╗██╔═══██╗╚══██╔══╝   ██╔══██╗██╔══██╗██╔══██╗
██║     ██████╔╝█████╗  ███████║   ██║   █████╗█████╗██████╔╝██║   ██║██║   ██║   ██║█████╗███████║██████╔╝██████╔╝
██║     ██╔══██╗██╔══╝  ██╔══██║   ██║   ██╔══╝╚════╝██╔══██╗██║   ██║██║   ██║   ██║╚════╝██╔══██║██╔═══╝ ██╔═══╝ 
╚██████╗██║  ██║███████╗██║  ██║   ██║   ███████╗    ██║  ██║╚██████╔╝╚██████╔╝   ██║      ██║  ██║██║     ██║     
 ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝    ╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝      ╚═╝  ╚═╝╚═╝     ╚═╝     

        your go-to for a ready-to-roll, well-structured React app with smart tooling built-in. 
                        Skip the setup drama and start coding faster! 🚀
`);

program
	.command("init <project-name>")
	.description("Initialize a new project with a selected template")
	.action(async (projectName) => {
		// Prompt user for template selection
		const { template } = await inquirer.prompt([
			{
				type: "list",
				name: "template",
				message: "Choose a template to start with:",
				choices: [
					{ name: "CRA", value: "cra" },
					{ name: "CRA Typescript", value: "cra-ts" },
					{ name: "Vite... Coming Soon ⏳", value: "vite", disabled: true },
					{
						name: "Vite Typescript... Coming Soon ⏳",
						value: "vite-ts",
						disabled: true,
					},
				],
			},
		]);

		// Define paths based on the template choice
		const projectPath = path.join(process.cwd(), projectName);
		const templatePath = path.join(
			new URL(".", import.meta.url).pathname,
			`../templates/${template}`
		);

		if (!fs.existsSync(projectPath)) {
			fs.mkdirSync(projectPath, { recursive: true });
		}

		// Copy the selected template into the new project directory
		fs.cpSync(templatePath, projectPath, { recursive: true });
		console.log(
			`Project '${projectName}' created with ${template} template at ${projectPath}`
		);

		// Install dependencies
		const spinner = ora("Installing dependencies...").start();

		try {
			const jokeResponse = await axios.get(
				"https://api.chucknorris.io/jokes/random"
			);
			spinner.text = `Installing dependencies... Here's a Chuck Norris joke: ${jokeResponse.data.value}`;
		} catch (error) {
			spinner.text =
				"Installing dependencies... Could not fetch a joke, but we’ll still keep going!";
		}

		// Execute dependency installation and manage loader
		exec(`cd ${projectPath} && npm install`, (err, stdout, stderr) => {
			if (err) {
				spinner.fail(`Error installing dependencies: ${stderr}`);
				return;
			}
			spinner.succeed("Dependencies installed successfully!");
			console.log(stdout);
			console.log("Setup complete!");
		});
	});

program.parse(process.argv);
