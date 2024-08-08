import fs from 'fs-extra';
import { getExtensionName } from './get-extension-name.js'; // Importing the function

// This script sets up the extension name in the welcome page

async function updateExtensionNameInHTML(extensionName) {
  const sourcePath = '../extension-vite-template/docs/index.html';
  const outputPath = 'docs/index.html';
  try {
    let htmlContent = await fs.readFile(sourcePath, 'utf8');
    htmlContent = htmlContent.replace(/__MSG_appName__/g, extensionName);
    await fs.writeFile(outputPath, htmlContent);
    console.log(`✅ Extension name was successfully updated in ${outputPath}`);
  } catch (error) {
    console.error('❌ Error updating HTML file:', error);
  }
}

async function main() {
  try {
    const extensionName = await getExtensionName();
    await updateExtensionNameInHTML(extensionName);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
