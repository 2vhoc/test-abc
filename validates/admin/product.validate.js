const system = require("../../config/system.js");

module.exports.createPost = (req, res, next) => {
   // 1. Kiểm tra nếu không nhập tiêu đề HOẶC tiêu đề chỉ toàn khoảng trắng
   if(!req.body.title || !req.body.title.trim()) {
      req.flash("error", "Vui lòng nhập tiêu đề!");
      res.redirect(`${system.prefixAdmin}/products`);
      return;
   }
   next();
};
