const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const accessAsync = util.promisify(fs.access);

const DB_PATH = './db.json';
const DEFAULT_DB_STRUCTURE = {
  forms: [],
  fills: [],
}

let db = {};
let dbLoaded = false;

async function load() {
  if (!dbLoaded) {
    try {
      await accessAsync(DB_PATH, fs.constants.F_OK)
    } catch (e) {
      await writeFileAsync(DB_PATH, JSON.stringify(DEFAULT_DB_STRUCTURE));
    }
  
    db = JSON.parse(await readFileAsync(DB_PATH, { encoding: 'utf8'}));
  
    dbLoaded = true;
  }

  return Promise.resolve(db);
}

async function save(db) {
  return writeFileAsync(DB_PATH, JSON.stringify(db));
}

module.exports = {
  load,
  save
}