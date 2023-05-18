# lens-llm-extension

This extension try to violate all good coding practices, and pollute Lens's renderer process's global `window.navigator.llm` with an LLM powered by WebGPU, because why not.

Most of the code are from <https://github.com/r2d4/react-llm>

This extension likely only runs on a Lens with WebGPU flag enabled and of course you need to have a GPU.

## Need to have a custom Lens build with `--enable-unsafe-webgpu`

Enable WebGPU in Lens's main process with:

```ts
import { app } from "electron";

app.commandLine.appendSwitch("enable-features", "SharedArrayBuffer");
app.commandLine.appendSwitch("enable-unsafe-webgpu");
```

## Install the extension

Download the tgz and install in Lens
<https://github.com/chenhunghan/lens-llm-extension/releases>
