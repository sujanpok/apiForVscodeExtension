// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ApiTesterProvider } from './apiTesterProvider';
import { getWelcomeContent, getWebviewContent } from './apiTesterWebview';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "api-tester" is now active!');

	// Show welcome page on startup
	showWelcomePage(context);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('api-tester.open', () => {
		// Create and show a new webview
		const panel = vscode.window.createWebviewPanel(
			'apiTester',
			'API Tester',
			vscode.ViewColumn.One,
			{
				enableScripts: true
			}
		);

		// Set the HTML content for the webview
		panel.webview.html = getWebviewContent();
	});

	// Register the TreeDataProvider for the views
	const provider = new ApiTesterProvider(context);
	vscode.window.registerTreeDataProvider('apiTesterView', provider);

	context.subscriptions.push(disposable);
}

function showWelcomePage(context: vscode.ExtensionContext) {
	const panel = vscode.window.createWebviewPanel(
		'apiTesterWelcome',
		'Welcome to API Tester',
		vscode.ViewColumn.One,
		{}
	);

	panel.webview.html = getWelcomeContent();
}

// This method is called when your extension is deactivated
export function deactivate() {}
