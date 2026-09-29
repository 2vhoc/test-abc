const express = require('express');
const router = express.Router();
const controllerRouter = require("../../controller/client/home.controllers")
router.get("/",controllerRouter.index)
module.exports = router;
