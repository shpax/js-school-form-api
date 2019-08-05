const express = require('express');
const forms = require('../controllers/forms');

const router = express.Router();

router.post('/:domain/forms/new', forms.createForm);
router.get('/:domain/forms/list', forms.listForms);
router.put('/:domain/forms/:id', forms.updateForm);
router.get('/:domain/forms/:id', forms.getForm);

module.exports = router;