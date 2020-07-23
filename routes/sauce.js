const express = require('express');

const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

router.post('/', sauceCtrl.createSauce);
router.post('/:id/like', sauceCtrl.postLike);

router.put('/:id', sauceCtrl.modifySauce);

router.delete('/:id', sauceCtrl.deleteSauce);

router.get('/:id', sauceCtrl.getOneSauce);

router.get('/', sauceCtrl.getAllSauce);

module.exports = router;