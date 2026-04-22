import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, "..");
const bundlePath = join(root, "app.bundle.js");
const outputPath = join(root, "大健康雙面板 Demo.html");
const interactivePath = join(root, "大健康雙面板 互動版.html");
const readableAliasPath = join(root, "presentation.html");
const interactiveAliasPath = join(root, "interactive.html");

const bundleCode = await readFile(bundlePath, "utf8");

const injectedStyles = [];
const domNodes = new Map();
const fakeDocument = {
  getElementById(id) {
    if (id === "root") return {};
    return domNodes.get(id) || null;
  },
  createElement() {
    return { id: "", textContent: "" };
  },
  head: {
    appendChild(node) {
      if (node?.id) domNodes.set(node.id, node);
      injectedStyles.push(node?.textContent || "");
    },
  },
};

const previousGlobals = {
  React: globalThis.React,
  ReactDOM: globalThis.ReactDOM,
  window: globalThis.window,
  document: globalThis.document,
  __KLF_APP__: globalThis.__KLF_APP__,
};
const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, "navigator");

globalThis.React = React;
globalThis.ReactDOM = {
  createRoot() {
    return { render() {} };
  },
};
globalThis.window = globalThis;
globalThis.document = fakeDocument;
Object.defineProperty(globalThis, "navigator", {
  value: { userAgent: "static-render" },
  configurable: true,
  writable: true,
});

try {
  new Function(bundleCode)();

  const App = globalThis.__KLF_APP__;

  if (!App) {
    throw new Error("Static render failed: App not found on globalThis.__KLF_APP__");
  }

  const extraStyles = injectedStyles.join("\n");

  const baseHtml = `<!doctype html>
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
${extraStyles}
</style>
</head>
<body>
<div id="root"></div>
<script src="./vendor/react.development.js"></script>
<script src="./vendor/react-dom.development.js"></script>
<script src="./app.bundle.js"></script>
</body>
</html>
`;

  const interactiveHtml = `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8" />
<title>大健康俱樂部 · 雙面板 互動版</title>
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
<script src="./vendor/react.development.js"></script>
<script src="./vendor/react-dom.development.js"></script>
</head>
<body>
<div id="root"></div>
<script src="./app.bundle.js"></script>
</body>
</html>
`;

  await Promise.all([
    writeFile(outputPath, baseHtml, "utf8"),
    writeFile(interactivePath, interactiveHtml, "utf8"),
    writeFile(readableAliasPath, baseHtml, "utf8"),
    writeFile(interactiveAliasPath, interactiveHtml, "utf8"),
  ]);
} finally {
  globalThis.React = previousGlobals.React;
  globalThis.ReactDOM = previousGlobals.ReactDOM;
  globalThis.window = previousGlobals.window;
  globalThis.document = previousGlobals.document;
  globalThis.__KLF_APP__ = previousGlobals.__KLF_APP__;

  if (navigatorDescriptor) {
    Object.defineProperty(globalThis, "navigator", navigatorDescriptor);
  } else {
    delete globalThis.navigator;
  }
}
