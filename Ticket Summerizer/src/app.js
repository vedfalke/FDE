import express from "express";

export function createApp(summarizeService) {
  if (!summarizeService?.summarize) {
    throw new TypeError("A summarize service is required");
  }

  const app = express();
  app.use(express.text({ type: "*/*", limit: "100kb" }));

  app.post("/api/summarize", async (request, response) => {
    const ticket = typeof request.body === "string" ? request.body : "";

    if (!ticket.trim()) {
      return response
        .status(400)
        .type("text/plain")
        .send("Ticket text is required.");
    }

    try {
      const summary = await summarizeService.summarize(ticket);
      return response.type("text/plain").send(summary);
    } catch (error) {
      console.error("Failed to summarize ticket:", error);
      return response
        .status(500)
        .type("text/plain")
        .send("Unable to summarize the ticket.");
    }
  });

  return app;
}