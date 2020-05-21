const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

const RegionsController = require('../controllers/regions');

router.get('/', RegionsController.regions_get);

router.post('/', checkAuth, RegionsController.regions_post);

router.patch('/:id', checkAuth, RegionsController.regions_patch);

router.delete('/:id', checkAuth, RegionsController.regions_delete);

module.exports = router;