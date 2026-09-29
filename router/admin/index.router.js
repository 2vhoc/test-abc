const dashboardRouter = require("./dashboard.router.js");
const system = require("../../config/system.js");
const productRouter = require("./product.router.js");
module.exports=(app)=>{
  const PATH_ADMIN = system.prefixAdmin
  app.use( PATH_ADMIN + "/dashboard",dashboardRouter )
  app.use( PATH_ADMIN + "/products",productRouter )
}
