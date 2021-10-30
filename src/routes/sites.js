const express = require('express');
const router = express.Router();
const sitecontroller = require('../app/controllers/Sitescontrollers');

router.get('/order', sitecontroller.order);
router.get('/reports', sitecontroller.report);
router.get('/products', sitecontroller.product);
router.get('/', sitecontroller.home);

module.exports = router;
