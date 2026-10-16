import assert from "node:assert/strict";
import test from "node:test";

import { createSummarizeService } from "../src/summarizeService.js";

test("summarize sends the expected prompt and model to OpenAI", async () => {
  let request;
  const client = {
    responses: {
      create: async (input) => {
        request = input;
        return { output_text: "Line one.\nLine two." };
      },
    },
  };
  const service = createSummarizeService({ client, model: "test-model" });

  const result = await service.summarize("Printer is offline.");

  assert.equal(result, "Line one.\nLine two.");
  assert.deepEqual(request, {
    model: "test-model",
    input: "Summarize this support ticket in 2 lines : \n\nPrinter is offline.",
    store: false,
  });
});