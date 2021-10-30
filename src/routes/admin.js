const express = require('express');
const router = express.Router();
const admincontrollers = require('../app/controllers/Admincontrollers');

router.get('/v',admincontrollers.view);
router.get('/edit/:id',admincontrollers.edit);
router.get('/delete/:id',admincontrollers.delete);
router.get('/',admincontrollers.index);



module.exports = router;