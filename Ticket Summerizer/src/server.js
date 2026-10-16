import "dotenv/config";

import { createApp } from "./app.js";
import { createSummarizeService } from "./summarizeService.js";

const port = Number(process.env.PORT || 8080);
const app = createApp(createSummarizeService());

app.listen(port, () => {
  console.log(`Node.js ticket summarizer listening on port ${port}`);
});