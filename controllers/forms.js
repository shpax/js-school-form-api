const formsModel = require('../model/forms')

async function createForm(req, res) {
  const { domain } = req.params;
  const { name, fields } = req.body;

  const form = await formsModel.createForm({ domain, name, fields });

  res.send(form);
}

async function listForms(req, res) {
  const { domain } = req.params;

  const data = await formsModel.listForms(domain);
  const resData = data.map(({ id, name, fields_count }) => ({ id, name, fields_count }));

  res.send(resData);
}

async function updateForm(req, res) {
  const { name, fields } = req.body;
  const { id } = req.params;

  await formsModel.updateForm({ id: +id, name, fields });

  res.send({ resuly: 'OK' });
}

async function getForm(req, res) {
  const { id } = req.params;
  const form = await formsModel.getForm(+id);

  if (!form) {
    return res.status(404).send({ error: 'form not found'})
  }

  const resData = {
    id: form.id,
    name: form.name,
    fields: form.fields,
    fields_count: form.fields_count,
  }

  res.send(resData);
}

module.exports = {
  createForm,
  listForms,
  getForm,
  updateForm,
};