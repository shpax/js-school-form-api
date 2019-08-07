const fs = require('fs');
const util = require('util');

const accessAsync = util.promisify(fs.access);
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const DB_PATH = './db.json';
const DEFAULT_DB_STRUCTURE = {
  forms: [],
  fills: [],
  users: [],
};

let data = {};
let dataLoaded = false;

async function load() {
  if (!dataLoaded) {
    try {
      await accessAsync(DB_PATH, fs.constants.F_OK);
    } catch (e) {
      await writeFileAsync(DB_PATH, JSON.stringify(DEFAULT_DB_STRUCTURE));
    }
  
    const fileContents = await readFileAsync(DB_PATH, { encoding: 'utf8'});
    data = JSON.parse(fileContents);
  
    dataLoaded = true;
  }

  if (!data.users) data.users = []; // migration

  return Promise.resolve(data);
}

async function save(data) {
  return writeFileAsync(DB_PATH, JSON.stringify(data));
}

module.exports = {
  load,
  save,
}