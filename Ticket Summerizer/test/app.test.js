import assert from "node:assert/strict";
import test from "node:test";

import request from "supertest";

import { createApp } from "../src/app.js";

test("POST /api/summarize returns the generated plain-text summary", async () => {
  const service = {
    summarize: async (ticket) => {
      assert.equal(ticket, "The checkout page returns a 500 error.");
      return "Checkout is failing with a server error.\nThe issue blocks purchases.";
    },
  };

  const response = await request(createApp(service))
    .post("/api/summarize")
    .type("text/plain")
    .send("The checkout page returns a 500 error.");

  assert.equal(response.status, 200);
  assert.match(response.headers["content-type"], /^text\/plain/);
  assert.equal(
    response.text,
    "Checkout is failing with a server error.\nThe issue blocks purchases.",
  );
});

test("POST /api/summarize rejects an empty ticket", async () => {
  const service = {
    summarize: async () => {
      throw new Error("should not be called");
    },
  };

  const response = await request(createApp(service))
    .post("/api/summarize")
    .type("text/plain")
    .send("   ");

  assert.equal(response.status, 400);
  assert.equal(response.text, "Ticket text is required.");
});