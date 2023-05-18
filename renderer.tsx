
import { Renderer } from "@k8slens/extensions";
import type { InstalledExtension } from "@k8slens/extensions/dist/src/extensions/extension-discovery/extension-discovery"
import { LLM } from "./src/renderer/LLM";

export default class LensLLMExtensionRenderer extends Renderer.LensExtension {
  constructor(args: InstalledExtension) {
    super(args);
  }

  async onActivate() {
    console.log("🦄🦄🦄🦄🦄🦄 LLM Extension activated 🦄🦄🦄🦄🦄");

    this.topBarItems = [
      {
        components: {
          Item: () => {
            return <LLM />
          },
        },
      },
    ]
  }
}
