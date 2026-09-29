 const express = require('express');
 const router = express.Router();
 const dashboardController = require("../../controller/admin/dashboard.controllers")
 router.get('/', dashboardController.dashboard );

module.exports = router;