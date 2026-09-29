const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug)

const productsChema = new mongoose.Schema({
    
    title: String ,
    price: Number,
    discountPercentage: Number ,
    thumbnail: String ,
    status: String,
    stock: Number,
    // tạo gạch nối tên sp trong database 
    slug: { // đuôi sau url
         type: String,
         slug: "title", 
         unique: true // tránh trùng sp 
    },
    position: {
        type: Number,
        default: 0
    },
    deleted: {
        type: String,
        default: "false"
    },
    deletedAt: {
        type: Date,
        default: null
    }
    
}, {
    timestamps: true // thêm ngày giờ thêm mới sp 
})



const Product = mongoose.model("Product", productsChema,"products")

module.exports = Product  