import { useEffect, useState } from "react";
import { LLMInstance } from "./model/llm";
import { ModelInitConfig } from "./types/modelApi";
import { detectGPUDevice } from "./tvm";

const noOp = () => {};

export const LLM = () => {
  const [llmInstance, setLLMInstance] = useState<LLMInstance | null>(null);

  const [gpuSupport, setGpuSupport] = useState<boolean | undefined>();

  useEffect(() => {
    detectGPUDevice()
      .then((resp) => {
        if (resp) {
          setGpuSupport(true);
        } else {
          setGpuSupport(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setGpuSupport(false);
      });
  }, []);

  useEffect(() => {
    if (gpuSupport === false) {
      console.log(`🦄🦄🦄🦄🦄🦄 LLM is not supported on this device`);

      return;
    }

    if (gpuSupport === true) {
      const _llmInstance = new LLMInstance(
        {
          kvConfig: {
            numLayers: 64,
            shape: [32, 32, 128],
            dtype: "float32",
          },
          wasmUrl:
            "https://huggingface.co/mrick/react-llm/resolve/main/models/vicuna-7b-v1/vicuna-7b-v1_webgpu.wasm",
          cacheUrl:
            "https://huggingface.co/mrick/react-llm/resolve/main/models/vicuna-7b-v1/params/",
          tokenizerUrl:
            "https://huggingface.co/mrick/react-llm/resolve/main/models/vicuna-7b-v1/tokenizer.model",
          sentencePieceJsUrl:
            "https://cdn.matt-rickard.com/code/sentencepiece.js",
          tvmRuntimeJsUrl:
            "https://cdn.matt-rickard.com/code/tvmjs_runtime.wasi.js",
          maxWindowSize: 2048,
        } as ModelInitConfig,
        noOp
      );

      _llmInstance
        .init(noOp)
        .then(() => {
          console.log(`🦄🦄🦄🦄🦄🦄 LLM inited`);
          setLLMInstance(_llmInstance);
        })
        .catch((error) => {
          console.log(`🦄🦄🦄🦄🦄🦄 LLM failed to init`);
          console.error(error);
        });
    }

    return () => {
      setLLMInstance(null);
    };
  }, [gpuSupport]);

  useEffect(() => {
    if (!llmInstance) {
      return;
    }

    if (llmInstance) {
      // @ts-expect-error
      window.navigator.llm = llmInstance;
      console.log(`🦄🦄🦄🦄🦄🦄 use LLM at window.navigator.llm`);
    }
  }, [llmInstance]);

  return null;
};
