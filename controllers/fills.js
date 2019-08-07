const fillsModel = require('../models/fills');

async function fillForm(req, res) {
  const { formId, domain } = req.params;
  const { fields } = req.body;

  const fill = await fillsModel.createFill({ formId, fields, domain });

  res.send(fill);
}

async function getFills(req, res) {
  const { formId } = req.params;
  const fillsList = await fillsModel.getFills(formId);
  
  res.send(fillsList);
}

module.exports = {
  fillForm,
  getFills,
}