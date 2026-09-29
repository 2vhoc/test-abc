const mongoose = require("mongoose")

module.exports.connect = async () =>{
    try {
        console.log("Đang kết nối tới URL:", process.env.MONGO_URL); 
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connect success ")
        
    } catch (error) {
        console.log("connect error")
        console.error(error);
        throw error;
        
    }
  
}
