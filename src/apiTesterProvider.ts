import * as vscode from 'vscode';

export class ApiTesterProvider implements vscode.TreeDataProvider<ApiTesterItem> {
	constructor(private context: vscode.ExtensionContext) {}

	getTreeItem(element: ApiTesterItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: ApiTesterItem): Thenable<ApiTesterItem[]> {
		if (!element) {
			return Promise.resolve([new ApiTesterItem('Open API Tester', vscode.TreeItemCollapsibleState.None, this.context)]);
		}
		return Promise.resolve([]);
	}
}

export class ApiTesterItem extends vscode.TreeItem {
	constructor(label: string, collapsibleState: vscode.TreeItemCollapsibleState, context: vscode.ExtensionContext) {
		super(label, collapsibleState);
		this.command = {
			command: 'api-tester.open',
			title: 'Open API Tester'
		};
		this.iconPath = {
			light: vscode.Uri.joinPath(context.extensionUri, 'resources', 'icon-light.svg'),
			dark: vscode.Uri.joinPath(context.extensionUri, 'resources', 'icon-dark.svg')
		};
	}
}