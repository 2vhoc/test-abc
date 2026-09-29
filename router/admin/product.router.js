 const express = require('express');
 const multer = require ( 'multer' ) 
 const router = express.Router();
 const controller = require("../../controller/admin/product.controllers.js")
 const storageMulter = require("../../helpers/storageMulter.js");
 const upload = multer({ storage: storageMulter() }); 
 const validate = require("../../validates/admin/product.validate.js")

 
 router.get('/', controller.index );
 // truyền data từ controller sang view 
 // router động chỉ bóc tách phần đuôi của url ra để lấy id và status 
 router.patch('/change-status/:status/:id', controller.changeStatus ); // bên controller sẽ nhận vào 2 tham số status và id
 router.patch('/change-multi', controller.changeMulti );
 router.delete('/delete/:id', controller.deleteItem );

 router.get('/create', controller.create ); // trả về giao diện 
 router.post(
    '/create',
    upload.single('thumbnail'),
    validate.createPost,
    controller.createPost

 ); // vào controller khác 

 router.get('/edit/:id', controller.edit );
 router.patch(
    '/edit/:id',
    upload.single('thumbnail'),
    validate.createPost,
    controller.editPatch
 );

 router.get('/detail/:id', controller.detail );
 
 module.exports = router

 