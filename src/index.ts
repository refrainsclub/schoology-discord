import { env } from "bun";
import * as Schoology from "./schoology/client";
import * as Discord from "discord.js";

const FIVE_MINUTES = 5 * 60 * 60 * 1000;

const {
  SCHOOLOGY_KEY,
  SCHOOLOGY_SECRET,
  SCHOOLOGY_BASE_URL,
  SCHOOLOGY_UPDATE_REALM,
  DISCORD_TOKEN,
} = env;

const schoologyClient = new Schoology.Client(
  SCHOOLOGY_KEY,
  SCHOOLOGY_SECRET,
  SCHOOLOGY_BASE_URL,
);

const discordClient = new Discord.Client({
  intents: [Discord.GatewayIntentBits.Guilds],
});

discordClient.once(Discord.Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

discordClient.login(DISCORD_TOKEN);

async function syncUpdates() {
  console.log(`Checking for Schoology updates in ${SCHOOLOGY_UPDATE_REALM}...`);

  const updates = await schoologyClient.getUpdates(SCHOOLOGY_UPDATE_REALM);
  console.log(updates);
}

setInterval(syncUpdates, FIVE_MINUTES);
