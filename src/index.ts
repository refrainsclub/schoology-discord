import * as playwright from "playwright";
import { Client, Poller } from "./schoology";
import { postUpdate } from "./discord";
import { env } from "bun";

const browser = await playwright.chromium.launch();
const page = await browser.newPage();

const client = new Client(page);
await client.login();
console.log("Logged in to Schoology");

const poller = new Poller(client);
poller.start(env.POLLER_INTERVAL, (updates) => {
  console.log(`${updates.length} new update(s) found`);
  updates.forEach(async (update) => await postUpdate(update));
});
