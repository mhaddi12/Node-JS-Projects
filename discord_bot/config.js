import dotenv from "dotenv";
import { GatewayIntentBits } from "discord.js";

dotenv.config();

export const BOT_TOKEN = process.env.DISCORD_TOKEN;
export const CLIENT_ID = process.env.CLIENT_ID;

export const BOT_INTENTS = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
];
