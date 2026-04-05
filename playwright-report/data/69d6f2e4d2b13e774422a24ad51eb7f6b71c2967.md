# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: post.spec.ts >> 数据管理测试 (Midscene) >> 创建文章并查看
- Location: e2e\post.spec.ts:37:7

# Error details

```
Error: browserContext.close: Test ended.
Browser logs:

<launching> C:\Users\褚涸辙\AppData\Local\ms-playwright\chromium_headless_shell-1217\chrome-headless-shell-win64\chrome-headless-shell.exe --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,BoundaryEventDispatchTracksNodeRemoval,DestroyProfileOnBrowserClose,DialMediaRouteProvider,GlobalMediaControls,HttpsUpgrades,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,Translate,AutoDeElevate,RenderDocument,OptimizationHints --enable-features=CDPScreenshotNewSurface --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --edge-skip-compat-layer-relaunch --enable-automation --disable-infobars --disable-search-engine-choice-screen --disable-sync --enable-unsafe-swiftshader --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --user-data-dir=C:\Users\褚涸辙\AppData\Local\Temp\playwright_chromiumdev_profile-FOLnZ1 --remote-debugging-pipe --no-startup-window
<launched> pid=33904
[pid=33904][err] [0405/232858.591:INFO:CONSOLE:2432] "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools font-weight:bold", source: http://localhost:3000/_next/static/chunks/0rbe_next_dist_0c-68_e._.js (2432)
[pid=33904][err] [0405/232858.686:INFO:CONSOLE:2432] "[HMR] connected", source: http://localhost:3000/_next/static/chunks/0rbe_next_dist_0c-68_e._.js (2432)
[pid=33904][err] [0405/232858.867:INFO:CONSOLE:2432] "[Fast Refresh] rebuilding", source: http://localhost:3000/_next/static/chunks/0rbe_next_dist_0c-68_e._.js (2432)
[pid=33904][err] [0405/232858.984:INFO:CONSOLE:2432] "[Fast Refresh] done in 218ms", source: http://localhost:3000/_next/static/chunks/0rbe_next_dist_0c-68_e._.js (2432)
[pid=33904][err] [0405/232859.723:INFO:CONSOLE:2432] "[Fast Refresh] rebuilding", source: http://localhost:3000/_next/static/chunks/0rbe_next_dist_0c-68_e._.js (2432)
[pid=33904][err] [0405/232859.759:INFO:CONSOLE:2432] "[Fast Refresh] done in 144ms", source: http://localhost:3000/_next/static/chunks/0rbe_next_dist_0c-68_e._.js (2432)
[pid=33904][err] [0405/232908.698:INFO:CONSOLE:2432] "Download the Apollo DevTools for a better development experience: %s https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm", source: http://localhost:3000/_next/static/chunks/0rbe_next_dist_0c-68_e._.js (2432)
```