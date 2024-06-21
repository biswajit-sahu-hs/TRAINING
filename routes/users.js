const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController');
const verifyToken = require('../middleware/authMiddleware');


router.get('/members', verifyToken, usersController.members);
router.get('/doctors', verifyToken,usersController.doctors);
router.get('/admin', verifyToken,usersController.admin);
router.post('/doctorDetail', verifyToken,usersController.doctorDetail);
router.get('/memberAddress', verifyToken, usersController.memberAddress);


module.exports = router;
