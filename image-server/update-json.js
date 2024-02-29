import fs from 'fs';

/**
 * Loads a JSON file, adds a value, and overwrites the file, then calls a callback.
 * @param {string} filePath - The path to the JSON file.
 * @param {string} key - The key under which to add the value.
 * @param {*} value - The value to add.
 * @param {Function} callback - A callback to execute upon completion. Follows the error-first pattern.
 */
export function updateJsonFile(filePath, key, value, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      callback(err);
      return;
    }

    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      callback(parseError);
      return;
    }

    jsonData[key] = value;

    const updatedJsonData = JSON.stringify(jsonData, null, 2);

    fs.writeFile(filePath, updatedJsonData, 'utf8', (writeError) => {
      if (writeError) {
        console.error('Error writing the file:', writeError);
        callback(writeError);
        return;
      }
      console.log('File has been updated successfully.');
      callback(null); // No error, operation successful
    });
  });
}