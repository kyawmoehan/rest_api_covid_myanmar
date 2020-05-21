const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

const MyanmarController = require('../controllers/myanmar');

router.get('/', MyanmarController.myanmar_get);

router.post('/', checkAuth, MyanmarController.myanmar_post);

router.patch('/:id', checkAuth, MyanmarController.myanmar_patch);

router.delete('/:id', checkAuth, MyanmarController.myanmar_delete);

module.exports = router;