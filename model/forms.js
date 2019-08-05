const db = require('./db')

async function createForm({ domain, name, fields }) {
  const data = await db.load();
  const form = {
    id: Math.random(),
    domain,
    name,
    fields,
    fields_count: fields.length
  };

  data.forms.push(form);

  await db.save(data);

  return form;
}

async function listForms(domain) {
  const data = await db.load();

  return data.forms
  .filter(f => f.domain === domain);
}

async function updateForm({ id, name, fields }) {
  const data = await db.load();
  const form = await getForm(id);

  if (!form) throw new Error('Form not found');

  form.name = name;
  form.fields = fields;
  form.fields_count = fields.length;

  await db.save(data);

  return form;
}

async function getForm(id) {
  const data = await db.load();

  return data.forms.filter(f => f.id === id)[0] || null;
}

module.exports = {
  createForm,
  listForms,
  getForm,
  updateForm,
}