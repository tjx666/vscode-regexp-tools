# regexp-tools

some useful tools about regexp

## Features

### Hover Tip

Support go to [reg101](https://regex101.com/), for following js regexp:

```typescript
const regexp = /\d{3}/gis;
```

Will generate url:

[https://regex101.com/?regex=\d{3}&flavor=javascript&flags=gis](https://regex101.com/?regex=%5Cd%7B3%7D&flavor=javascript&flags=gis)

![reg101](https://github.com/tjx666/vscode-regexp-tools/blob/main/assets/screenshots/reg101.gif?raw=true)

### Escape String to RegExp

Just select a text and run command `Escape String to RegExp`, for example will transform:

```javascript
const s = '^adjalks{}[]sadasd/';
```

to:

```javascript
// prettier-ignore
const s = '\^adjalks\{\}\[\]sadasd\/';
```
