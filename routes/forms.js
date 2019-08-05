const express = require('express')
const formsController = require('../controllers/forms')

const router = express.Router();

router.get('/:domain/forms/list', formsController.listForms);
router.post('/:domain/forms/new', formsController.createForm);
router.get('/:domain/forms/:id', formsController.getForm);
router.put('/:domain/forms/:id', formsController.updateForm);

module.exports = router;