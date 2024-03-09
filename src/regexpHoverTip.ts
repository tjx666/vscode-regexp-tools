import type {
    CancellationToken,
    HoverProvider,
    Position,
    ProviderResult,
    TextDocument,
} from 'vscode';
import { Hover, MarkdownString } from 'vscode';

export default class RegexpHoverProvider implements HoverProvider {
    provideHover(
        document: TextDocument,
        position: Position,
        _token: CancellationToken,
    ): ProviderResult<Hover> | undefined {
        const currentLine = document.lineAt(position.line);
        const currentLineText = currentLine.text.slice(0, 1000);
        // https://github.com/chrmarti/vscode-regex/blob/41062efe8aa5113e8902742ae270e090a3de5c5e/src/extension.ts#L14
        const jsRegexpRegexp =
            // eslint-disable-next-line regexp/prefer-character-class, regexp/no-super-linear-backtracking
            /(^|\s|[()={},:?;])(\/((?:\\\/|\[[^\]]*\]|[^/])+)\/([gmdsuyi]*))(\s|[()={},:?;]|$)/g;
        const matchArray = currentLineText.matchAll(jsRegexpRegexp);

        let hoverRegexpString: string | undefined;
        let flags: string | undefined;
        for (const match of matchArray) {
            if (match.index === undefined) {
                continue;
            }

            const start = match.index + match[1].length;
            const end = Math.max(start, start + match[2].length - 1);

            const regexpString = currentLineText.slice(start, end);
            const isMultilineComment = regexpString.startsWith('/*') && regexpString.endsWith('*/');
            if (!isMultilineComment && position.character >= start && position.character <= end) {
                hoverRegexpString = match[3];
                flags = match[4];
                break;
            }
        }

        if (hoverRegexpString !== undefined) {
            const regexpParamValue = encodeURIComponent(hoverRegexpString);
            const textParamValue =
                encodeURIComponent(`Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna
aliqua. Ut enim ad minim veniam, quis nostrud exercitation
ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
occaecat cupidatat non proident, sunt in culpa qui officia
deserunt mollit anim id est laborum.
abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ
0123456789 _+-.,!@#$%^&*();\/|<>"'
12345 -98.7 3.141 .6180 9,000 +42
555.123.4567	+1-(800)-555-2468
foo@demo.net	bar.ba@test.co.uk
www.demo.com	http://foo.co.uk/
https://marketplace.visualstudio.com/items?itemName=chrmarti.regex
https://github.com/chrmarti/vscode-regex`);
            const contents = new MarkdownString(
                `[regex101](https://regex101.com/?regex=${regexpParamValue}&flavor=javascript&flags=${flags}&testString=${textParamValue})`,
            );
            const hover = new Hover(contents);
            return hover;
        }
        return undefined;
    }
}
