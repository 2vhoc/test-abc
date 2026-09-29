const Product = require("../../models/product.models");

// [GET] /product
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: { $ne: "true" }  
  }).lean().sort({ position: "desc"}); // chuyển đổi dữ liệu từ Mongoose Document sang JavaScript Object để dễ dàng thao tác và render trong view
  products.forEach(item => {
      const priceNew = item.price*(1-item.discountPercentage/100)
      item.priceNew = parseFloat(priceNew.toFixed(2));
      
  });
  
  console.log(products)
  



  res.render("client/pages/product/index",{
    pageTitle: "product",
    products: products
  });
}; 

// [GET] /product/:slug
module.exports.detail = async (req, res) => {
  console.log(req.params.slug);
  try {
    const find = {
      deleted: "false",
      slug: req.params.slug
    };
    const product = await Product.findOne(find);

    console.log(product)

    res.render("client/pages/product/detail", { 
      pageTitle: product.title,
      product: product
    });
  } catch (error) {
    res.redirect(`/product`);
  }
};



 