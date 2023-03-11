import vscode from 'vscode';

import RegexpHoverProvider from './regexpHoverTip';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.languages.registerHoverProvider(
            ['javascript', 'javascriptreact', 'typescript', 'typescriptreact', 'vue'],
            new RegexpHoverProvider(),
        ),
    );
}

export function deactivate() {}
