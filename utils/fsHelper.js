const path = require('path');
const util = require('util');
const fs = require('fs');
const fsPromises = require('fs').promises;

const unlinkFile = util.promisify(fs.unlink);

const catchAsync = require('./catchAsync');

exports.createFolder = catchAsync(async (relativePath) => {
  const fullPath = path.resolve(relativePath);

  await fsPromises.mkdir(fullPath, { recursive: true });
});

// uploads/_____

const fileExists = async (filePath) => {
  try {
    console.log(filePath);
    await fsPromises.access(filePath);
    console.log('✅ file exists');
    return true;
  } catch (err) {
    console.log(err);
    console.log('⛔ File does not exists');
    return false;
  }
};

exports.deleteFiles = catchAsync(async (imageFilePath = []) => {
  if (imageFilePath.length === 1 && imageFilePath[0] === '') {
    return;
  }
  const deletions = imageFilePath.map(async (relativePath) => {
    /**
     * file = uploads/accommodations/id/filename
     */

    const absolutePath = path.resolve(relativePath);

    if (await fileExists(absolutePath)) {
      await unlinkFile(absolutePath);
      console.log(`Deleted ${relativePath}`);
    } else {
      console.log(`⚠️ Skipped missing file: ${relativePath}`);
    }
  });
  await Promise.all(deletions);
});
