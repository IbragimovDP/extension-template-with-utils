import fs from 'fs';
import archiver from 'archiver';
import path from 'path';

const rootFolderName = path.basename(process.cwd());
const outputPath = path.resolve(`./`, `./dist-${rootFolderName}.zip`);

const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', function () {
  console.log(
    `✅Archive ${rootFolderName}.zip successfully created. Size: ${archive.pointer()} bytes.`
  );
});

archive.on('error', function (err) {
  throw err;
});

archive.pipe(output);
archive.directory(`./dist-${rootFolderName}/`, false);
archive.finalize();
