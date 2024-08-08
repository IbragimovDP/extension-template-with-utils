import sharp from 'sharp';
import replaceColor from 'replace-color';
import { getExtensionName } from './get-extension-name.js'; // Importing the function

const accentColor = process.argv[2]; // Now accentColor will be taken from command line arguments
const extensionName = await getExtensionName(); // Getting the extension name

// Function to process images
async function processImages(index) {
  const sourceImagePath = `src/images/screenshot-source-${index}.png`;
  const templateImagePath = `src/images/screenshot-template-${index}.png`;
  const outputImagePath = `docs/images/screenshot${index}.png`;
  const iconPath = 'src/images/icon.png';

  // Creating SVG with text
  const textSvg = `<svg width="290" height="200">
    <text x="0" y="22" letter-spacing="0.85px" font-family="Arial" font-size="22" fill="black">${extensionName}</text>
  </svg>`;

  try {
    if (accentColor) {
      console.log((accentColor ? '✅' : '🟡') + `accentColor: ${accentColor}`);
      const result = await replaceColor({
        image: templateImagePath,
        colors: {
          type: 'hex',
          targetColor: '#8C52FF',
          replaceColor: accentColor,
        },
        deltaE: 10,
      });
      var templateBuffer = await result.getBufferAsync(result.getMIME());
    } else {
      var templateBuffer = await sharp(templateImagePath).toBuffer();
    }
    const templateMetadata = await sharp(templateBuffer).metadata();

    // Preparing the icon
    const resizedIconBuffer = await sharp(iconPath)
      .resize(32, 32) // Resize the icon to 32x32
      .toBuffer();

    // Preparing the array for composite
    const composites = [];

    if (index === 1) {
      // Adding icon and text if index is 1
      composites.push(
        {
          input: resizedIconBuffer,
          top: 470, // Y coordinates for the icon
          left: 1518, // X coordinates for the icon
        },
        {
          input: Buffer.from(textSvg), // Using SVG buffer as overlay
          top: 472,
          left: 1584,
          blend: 'over',
        }
      );
    } else if (index === 2) {
      composites.push({
        input: resizedIconBuffer,
        top: 176, // Y coordinates for the icon
        left: 1962, // X coordinates for the icon
      });
    }

    // Adding the main template image in any case
    composites.push({ input: templateBuffer, blend: 'over' });

    const resizedSourceBuffer = await sharp(sourceImagePath)
      .resize({
        width: templateMetadata.width,
        height: templateMetadata.height,
        fit: 'cover',
        position: 'top',
      })
      .composite(composites)
      .toBuffer();

    await sharp(resizedSourceBuffer)
      .composite([{ input: templateBuffer }])
      .toFile(outputImagePath);

    console.log(
      `✅ Image successfully processed and saved as ${outputImagePath}`
    );
  } catch (err) {
    console.error(`❌ Error processing image:`, err);
  }
}

// Processing images with indexes 1 and 2
processImages(1);
processImages(2);
