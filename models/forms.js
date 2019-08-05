const uuid = require('uuid/v4');
const db = require('../db/db');

async function createForm({ name, fields, domain }) {
  const formData = {
    id: uuid(),
    name, 
    fields,
    domain,
    fields_count: fields.length,
  }

  const data = await db.load();

  data.forms.push(formData);

  await db.save(data);

  return formData;
};


async function getForm(id) {
  const data = await db.load();

  const form = data.forms.filter(f => f.id === id)[0] || null;

  return form;
};

async function listForms(domain) {
  const data = await db.load();

  const forms = data.forms.filter(f => f.domain === domain);

  return forms;
}

async function updateForm({ id, name, fields }) {
  const data = await db.load();

  const form = data.forms.filter(f => f.id === id)[0] || null;

  form.name = name;
  form.fields = fields;
  form.fields_count = fields.length;

  await db.save(data);

  return form;
}

module.exports = {
  createForm,
  getForm,
  updateForm,
  listForms,
}