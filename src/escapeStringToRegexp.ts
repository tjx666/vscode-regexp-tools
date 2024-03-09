import escapeStringRegexp from 'escape-string-regexp';
import type { TextEditor } from 'vscode';

export async function escapeStringToRegexp(editor: TextEditor): Promise<boolean> {
    return editor.edit((editorBuilder) => {
        const { document, selections } = editor;
        for (const selection of selections) {
            const word = document.getText(selection);
            const pluralizedWord = escapeStringRegexp(word);
            editorBuilder.replace(selection, pluralizedWord);
        }
    });
}
