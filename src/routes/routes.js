const { Router } = require('express');
const ReportController = require('../controllers/ReportController');

const router = Router();

router.post('/v1/denuncias', ReportController.store);

module.exports = router;