const router = require('express').Router();
const homeController = require('../controllers/home');
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, homeController.home);
router.get('/profile', verifyUser.isLogin);

module.exports = router;