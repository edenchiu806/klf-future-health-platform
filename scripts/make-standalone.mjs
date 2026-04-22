import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const reactPath = join(root, 'vendor', 'react.development.js');
const reactDomPath = join(root, 'vendor', 'react-dom.development.js');
const bundlePath = join(root, 'app.bundle.js');
const outputPath = join(root, '大健康雙面板 單檔版.html');

const escapeInlineScript = (code) => code.replace(/<\/script/gi, '<\\/script');

const reactCode = escapeInlineScript(readFileSync(reactPath, 'utf8'));
const reactDomCode = escapeInlineScript(readFileSync(reactDomPath, 'utf8'));
const bundleCode = escapeInlineScript(readFileSync(bundlePath, 'utf8'));

const html = `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8" />
<title>大健康俱樂部 · 雙面板 Demo</title>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<style>
  @font-face{
    font-family:"KuMincho";
    src:url("./assets/KuMincho-R.otf") format("opentype");
    font-weight:400;
    font-style:normal;
    font-display:swap;
  }
  html, body { margin: 0; padding: 0; background: #FFFFFF; }
  body { font-family: -apple-system, BlinkMacSystemFont, "PingFang TC", "Noto Sans TC", sans-serif; color: #141414; -webkit-font-smoothing: antialiased; }
  * { box-sizing: border-box; }
  button { font-family: inherit; }
</style>
</head>
<body>
<div id="root"></div>
<script>
${reactCode}
</script>
<script>
${reactDomCode}
</script>
<script>
${bundleCode}
</script>
</body>
</html>
`;

writeFileSync(outputPath, html, 'utf8');
