const mongoose = require("mongoose")

module.exports.connect = async () => {
    try {
        if (!process.env.MONGO_URL) {
            console.error("LỖI: Chưa tìm thấy biến MONGO_URL trong process.env! Vui lòng cấu hình biến môi trường MONGO_URL trên Vercel (Project Settings > Environment Variables).");
            return;
        }
        console.log("Đang kết nối tới URL:", process.env.MONGO_URL); 
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connect success ");
    } catch (error) {
        console.log("connect error");
        console.error(error);
    }
}
