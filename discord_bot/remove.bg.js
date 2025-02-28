import { removeBackgroundFromImageUrl } from "remove.bg";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function removeBgFromImage(imageUrl) {
  const outputDir = path.join(__dirname, "out");
  const outputFile = path.join(outputDir, `${Date.now()}.png`);
  const apiKey = process.env.REMOVE_BG_API_KEY;

  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const result = await removeBackgroundFromImageUrl({
      url: imageUrl,
      apiKey,
      size: "regular",
      type: "person",
      outputFile,
    });

    console.log(`✅ File saved to: ${outputFile}`);
    return { success: true, filePath: outputFile, base64: result.base64img };
  } catch (error) {
    console.error("❌ Error removing background:", JSON.stringify(error));
    return { success: false, error };
  }
}
