import fs from 'fs-extra';

export async function getExtensionName() {
  try {
    const localesPath = '_locales/en/messages.json';
    const manifestPath = 'manifest.json';

    if (await fs.pathExists(localesPath)) {
      const localesData = await fs.readJson(localesPath);
      if (localesData.appName && localesData.appName.message) {
        console.log(
          '✅ Extension name successfully retrieved from messages.json'
        );
        return localesData.appName.message;
      }
    }

    if (await fs.pathExists(manifestPath)) {
      const manifestData = await fs.readJson(manifestPath);
      if (manifestData.name) {
        console.log(
          '✅ Extension name successfully retrieved from manifest.json'
        );
        return manifestData.name;
      }
    }
  } catch (error) {
    console.error('Error retrieving extension name:', error);
    throw error; // Re-throw the error
  }

  throw new Error('Extension name not found');
}
