const formsModel = require('../models/forms')

async function getForm(req, res) {
  const { id } = req.params;
  const formData = await formsModel.getForm(id);

  res.send(formData);
}

async function createForm(req, res) {
  const { domain } = req.params;
  const { name, fields } = req.body;
  const formData = await formsModel.createForm({ name, domain, fields});
  
  res.send(formData);
}

async function updateForm(req, res) {
  const { id } = req.params;
  const { name, fields } = req.body;

  const formResponse = await formsModel.updateForm({ id, name, fields });

  res.send(formResponse);
}

async function listForms(req, res) {
  const { domain } = req.params;

  const formsData = await formsModel.listForms(domain);
  const formsResponse = formsData.map(({id, name, fields_count: fields }) => {
    return {
      id,
      name,
      fields,
    }
  });

  res.send(formsResponse);
}

module.exports = {
  getForm,
  createForm,
  listForms,
  updateForm,
}