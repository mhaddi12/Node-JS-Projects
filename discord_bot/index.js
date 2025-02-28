import { Client, Events } from "discord.js";
import { BOT_TOKEN, BOT_INTENTS } from "./config.js";
import registerCommands from "./command.js";
import readyEvent from "./events/ready.js";
import messageCreateEvent from "./events/messageCreate.js";
import interactionCreateEvent from "./events/interactionCreate.js";
import connectDB from "./config/db.js";
import urlShortener from "./routes/urlRoutes.js";

import express from "express";
const app = express();

app.use(express.json());
app.use("/", urlShortener);

const client = new Client({ intents: BOT_INTENTS });

await connectDB();

client.once(Events.ClientReady, readyEvent);
client.on(Events.MessageCreate, messageCreateEvent);
client.on(Events.InteractionCreate, interactionCreateEvent);
await registerCommands();

client.login(BOT_TOKEN);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
