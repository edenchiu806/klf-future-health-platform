# 康樂富未來大健康平台 Demo

這個資料夾是從 `/Users/eden/Downloads/大健康平台.zip` 直接落地出的本地可維護版本。

## 主要入口

- `大健康雙面板 Demo.html`：預設展示入口，已改成靜態可讀版
- `大健康雙面板 互動版.html`：保留互動切換版本
- `大健康雙面板 單檔版.html`：不依賴外部 CDN 的單檔可開版本
- `index.html`：本地預覽入口，會導向主檔
- `theme.jsx` / `radar.jsx` / `panelA-*.jsx` / `panelB-*.jsx`：可直接維護的拆分檔

## 本地預覽

在此資料夾執行：

```bash
npm run dev
```

之後打開 [http://127.0.0.1:4173](http://127.0.0.1:4173)。
