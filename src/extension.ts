import vscode from 'vscode';

import { escapeStringToRegexp } from './escapeStringToRegexp';
import RegexpHoverProvider from './regexpHoverTip';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.languages.registerHoverProvider(
            ['javascript', 'javascriptreact', 'typescript', 'typescriptreact', 'vue'],
            new RegexpHoverProvider(),
        ),
        vscode.commands.registerTextEditorCommand(
            'regexp-tools.escapeStringToRegexp',
            (textEditor) => escapeStringToRegexp(textEditor),
        ),
    );
}

export function deactivate() {}
