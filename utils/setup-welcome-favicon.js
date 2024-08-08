import fse from 'fs-extra';

// this script setup icon as favicon for welcome page

const source = 'src/images/icon.png';
const destination = 'docs/images/icon.png';

fse.copy(source, destination, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('✅ Icon successfully copied!');
});
