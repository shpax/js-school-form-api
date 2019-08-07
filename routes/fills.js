const express = require('express')
const fillsController = require('../controllers/fills')

const router = express.Router();

router.post('/:domain/fills/:formId', fillsController.fillForm);
router.get('/:domain/fills/:formId', fillsController.getFills);

module.exports = router;