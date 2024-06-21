const express = require('express');
const router = express.Router();
const consultationController = require('../controller/consultationController');
const verifyToken = require('../middleware/authMiddleware'); // Assuming the correct path to auth middleware

// POST /api/consultation/book
router.post('/book', verifyToken, consultationController.book);
router.get('/lists', verifyToken,consultationController.lists);
router.post('/consulationAction', verifyToken,consultationController.action);
router.post('/doctorAssign', verifyToken,consultationController.doctorAssign);
router.post('/prescription',verifyToken,consultationController.prescription);
router.get('/consultationDetails',verifyToken,consultationController.consultationDetails);
router.post('/cancel',verifyToken,consultationController.cancel);

module.exports = router;
