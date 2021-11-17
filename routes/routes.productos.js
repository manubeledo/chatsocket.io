const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers.productos');


router.post('/', controller.created);

module.exports = router;