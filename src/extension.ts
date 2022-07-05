import * as vscode from 'vscode';
import RegexpHoverProvider from './regexpHoverTip';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "regexp-tools" is now active!');

    context.subscriptions.push(
        vscode.languages.registerHoverProvider(
            ['javascript', 'javascriptreact', 'typescript', 'typescriptreact', 'vue'],
            new RegexpHoverProvider(),
        ),
    );
}

export function deactivate() {}
