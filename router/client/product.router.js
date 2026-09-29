 const express = require('express');
 const router = express.Router();
 const productController = require("../../controller/client/product.controllers")
 router.get('/',productController.index );
 router.get('/:slug',productController.detail );


module.exports = router; // muốn dùng nơi khác phaiphải exprorst 