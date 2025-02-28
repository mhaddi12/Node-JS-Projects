import { nanoid } from "nanoid";
import Url from "../models/Url.js";
import { removeBgFromImage } from "../remove.bg.js";

export default async (message) => {
  if (message.author.bot) return;

  const channelName = message.channel.name || "DM";
  const attachment = message.attachments.first();
  const imageUrl = attachment ? attachment.url : null;

  console.log(
    `📩 Message received in #${channelName} from ${message.author.tag}: ${
      message.content || "[No Text]"
    } ${imageUrl || "[No Attachment]"}`
  );

  try {
    // 🔹 Process Image Background Removal
    if (imageUrl) {
      try {
        const result = await removeBgFromImage(imageUrl);
        if (channelName !== "bg-remover") {
          return message.reply({
            content: "❌ You can only remove backgrounds in #bg-remover.",
          });
        }
        if (result.success) {
          await message.channel.send({
            content: "✅ Background removed successfully! Here's your image:",
            files: [{ attachment: result.filePath, name: "bg_removed.png" }],
          });
        } else {
          await message.channel.send(
            `❌ Error removing background: ${result.error}`
          );
        }
      } catch (err) {
        console.error("❌ Error in removeBgFromImage:", err);
        await message.channel.send(
          "❌ Failed to process image background removal."
        );
      }
    }

    // 🔹 URL Shortening Logic
    if (message.content.startsWith("create")) {
      if (channelName !== "url-shorten") {
        return message.reply({
          content: "❌ You can only shorten URLs in #url-shorten.",
        });
      }

      const url = message.content.replace("create", "").trim();
      if (!url) {
        return message.reply({ content: "❌ Please provide a valid URL." });
      }

      try {
        new URL(url); // Validate URL format
      } catch (err) {
        return message.reply({
          content: "❌ Invalid URL format. Please provide a proper URL.",
        });
      }

      const urlId = nanoid(6);
      const shortUrl = `http://localhost:3000/${urlId}`;

      const urlEntry = new Url({ urlId, originalUrl: url, shortUrl });
      await urlEntry.save();

      return message.reply({ content: `✅ Shortened URL: ${shortUrl}` });
    }
  } catch (error) {
    console.error("❌ Error processing message:", error);
    return message.reply({
      content: "❌ An error occurred while processing your request.",
    });
  }
};
