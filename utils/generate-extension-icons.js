import sharp from 'sharp';
import path from 'path';

// This script generates icons for extension before building.

const sourceImagePath = 'src/images/icon.png'; // Path to the source image
const sourceDirectory = path.dirname(sourceImagePath); // Get the directory of the source image
const sizes = [16, 32, 48, 64, 128]; // Sizes for creating various images

async function resizeAndSaveImages() {
  for (const size of sizes) {
    const outputFilename = `icon${size}.png`; // Form the filename for the output image
    const outputPath = path.join(sourceDirectory, outputFilename); // Form the path to the output file

    try {
      if (size === 128) {
        // Create an intermediate image with size 96x96
        const buffer96 = await sharp(sourceImagePath).resize(96, 96).toBuffer();

        // Create a 128x128 image with a transparent background and insert the intermediate image, centering it
        await sharp({
          create: {
            width: 128,
            height: 128,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          },
        })
          .composite([{ input: buffer96, left: 16, top: 16 }])
          .toFile(outputPath);
      } else {
        // For other sizes, simply resize and save
        await sharp(sourceImagePath).resize(size, size).toFile(outputPath);
      }

      console.log(`✅Image saved: ${outputPath}`);
    } catch (error) {
      console.error(`❌Error processing image: ${error}`);
    }
  }
}

resizeAndSaveImages().catch(console.error);
