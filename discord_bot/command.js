import { REST, Routes } from "discord.js";
import { BOT_TOKEN, CLIENT_ID } from "./config.js";

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];

const registerCommands = async () => {
  const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

  try {
    console.log("Registering commands...");
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log("Commands registered successfully!");
  } catch (error) {
    console.error("Error registering commands:", error);
  }
};

export default registerCommands;
