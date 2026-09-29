const multer = require ( 'multer' )
// cấu hình nơi lưu trữ và đặt tên cho file 
module.exports = () => {
    const storage = multer.diskStorage({
        // 1. Định nghĩa thư mục lưu file ảnh vật lý trong dự án
        destination: function (req, file, cb) {
            cb(null, "./public/uploads/");
        },
        // 2. Định nghĩa tên file: kết hợp thời gian độc nhất và tên file gốc (để giữ đuôi .jpg/.png)
        // cb callback gọi lại 
        filename: function (req, file, cb) {
            // chuỗi thời gian độc nhất để tránh trùng sp 
            const uniqueSuffix = Date.now();
            cb(null, `${uniqueSuffix}-${file.originalname}`);
        }
    });

    return storage;
};