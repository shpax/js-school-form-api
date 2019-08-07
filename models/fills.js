const uuid = require('uuid/v4');
const db = require('../db/db');

async function createFill({ formId, fields, domain }) {
  const fillData = {
    id: uuid(),
    formId, 
    fields,
    domain,
  }

  const data = await db.load();

  data.fills.push(fillData);

  await db.save(data);

  return fillData;
};


async function getFills(formId) {
  const data = await db.load();

  return data.fills.filter(f => f.formId === formId);
}


module.exports = {
  createFill,
  getFills,
}