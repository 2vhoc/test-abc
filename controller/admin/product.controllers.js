const Product = require("../../models/product.models.js")
const filterStatusHelper= require("../../helpers/filterStatus.js")
const searchHelper = require("../../helpers/search.js") 
const paginationHelper = require("../../helpers/pagination.js")
const system = require("../../config/system.js")
// [get] admin/product
module.exports.index = async(req, res) => {
  
  // bộ lọc tìm kiếm 
  const filterStatus = filterStatusHelper(req.query) // gọi hàm filterStatus và truyền vào query của url để lấy ra status đang được chọn
  
  var find = {
    deleted: "false" // mặc định tìm kiếm các sản phẩm chưa bị xóa
  }
  // tìm kiếm theo từ khóa
  const objectSearch = searchHelper(req.query) // gọi hàm searchHelper và truyền vào req để lấy ra keyword và regex
  


  if(objectSearch.regex) { // nếu có regex thì thêm vào find để tìm kiếm theo regex
    find.title = objectSearch.regex // tìm kiếm theo title của sản phẩm 
  }

  if(req.query.status) {
    find.status = req.query.status; // nếu status tồn tại trên url thì thêm vào find để tìm kiếm theo status
  }
  // pagination (phân trang )
  const countProducts = await Product.countDocuments(find) // đếm số lượng sản phẩm 
  let objectPagination =paginationHelper (
    {
    currentPage: 1, 
    limitItems: 4  
  }, req.query,
  countProducts
)
   // end pagination 
  
  const products = await Product.find(find)
  .sort({ position: "desc"}) // sắp xếp từ position lớn đầu tiên 
  .limit(objectPagination.limitItems)
  .skip(objectPagination.skip); // tìm kiếm các sản phẩm theo find, giới hạn số lượng sản phẩm trả về và bỏ qua số lượng sản phẩm đã lấy ra ở các trang trước
  
  res.render("admin/page/product/index.pug",{ // render tới views admin để nó có thẻ sử dụng 
    pageTitle: "Danh sach san pham",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination // sau lấy ra những thông tin truyền ra bên ngoài 
  });
} 


// [PATCH] admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  console.log(req.params) // param là 1 object chứa các tham số truyền vào từ router, ví dụ: {status: "active", id: "63f0e3c7d5a4b2e8c9f0e3c7"}

  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });
  req.flash('success', 'Cập nhật trạng thái sản phẩm thành công');

  const previousPage = req.get('Referer') || '/admin/products';
  // kiểm tra xem trc khi click nó đang ở trình duyệt nào , rồi lưu vào biến 
  // nếu không có thì mặc định là /admin/products
  res.redirect(previousPage);
  // sau khi đổi trạng thái xong thì sẽ redirect về trang trước đó, nếu không có thì mặc định là /admin/products
}

// [DELETE] admin/product/delete/:id
module.exports.deleteItem = async (req, res) => {

  
  const id = req.params.id;

  await Product.updateOne({ _id: id }, 
    { deleted: "true" ,
      deletedAt: new Date()
    }
  );

  const previousPage = req.get('Referer') || '/admin/products';
  // kiểm tra xem trc khi click nó đang ở trình duyệt nào , rồi lưu vào biến 
  // nếu không có thì mặc định là /admin/products
  res.redirect(previousPage);
  // sau khi đổi trạng thái xong thì sẽ redirect về trang trước đó, nếu không có thì mặc định là /admin/products
}

// [PATCH] admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type; // lấy type từ body của request
  const ids = req.body.ids.split(","); // lấy ids từ body của request và tách thành mảng
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phầm`);

      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phầm`);

      break;
    case "delete-all":
      await Product.updateMany({ _id: { $in: ids } },
         { deleted: "true" ,
          deletedAt: new Date()

         }
        );

      break;

    case "change-position":
      for(const item of ids){
        let [id , position] = item.split("-")
        position = parseInt(position)
        // console.log(id);
        // console.log(position)
        await Product.updateOne({ _id: id }, {position: position });
      }
      
      

      break;


    default:
      break;
  }
   const previousPage = req.get('Referer') || '/admin/products';
  // kiểm tra xem trc khi click nó đang ở trình duyệt nào , rồi lưu vào biến 
  // nếu không có thì mặc định là /admin/products
  res.redirect(previousPage);
}

// [get] admin/product/create
module.exports.create = async(req, res) => {
  res.render("admin/page/product/create.pug",{ // render tới views admin để nó có thẻ sử dụng 
    pageTitle: "Thêm mới sản phẩm"
  });
}

// [Post] admin/product/create
module.exports.createPost = async(req, res) => {
  try {
    req.body.price = parseInt(req.body.price) || 0;
    req.body.discountPercentage = parseInt(req.body.discountPercentage) || 0;
    req.body.stock = parseInt(req.body.stock) || 0;

    if (!req.body.position || req.body.position == "") {
      const countProducts = await Product.countDocuments();
      req.body.position = countProducts + 1;
    } else {
      req.body.position = parseInt(req.body.position) || 1;
    }

    if (req.file) {
      req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    const product = new Product(req.body);
    await product.save();

    req.flash("success", "Tạo mới sản phẩm thành công!");
    res.redirect(`${system.prefixAdmin}/products`);
  } catch (error) {
    console.log("============== LỖI SERVER PHÁT SINH Ở ĐÂY ==============");
    console.error(error); 
    res.status(500).send("Lỗi xử lý server!");
  }
};


// [GET] admin/product/edit/:id
module.exports.edit = async(req, res) => {
  try {
    const find = {
      deleted: "false",
      _id: req.params.id
    };
    const product = await Product.findOne(find);
    res.render("admin/page/product/edit.pug", { 
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product
    });
  } catch (error) {
    res.redirect(`${system.prefixAdmin}/products`);
  }
};

// [PATCH] admin/product/edit/:id
module.exports.editPatch = async(req, res) => {
  const id = req.params.id;

  req.body.price = parseInt(req.body.price) || 0;
  req.body.discountPercentage = parseInt(req.body.discountPercentage) || 0;
  req.body.stock = parseInt(req.body.stock) || 0;
  req.body.position = parseInt(req.body.position) || 1;

  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  try {
    await Product.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật sản phẩm thành công!");
    res.redirect(`${system.prefixAdmin}/products`);
  } catch (error) {
    req.flash("error", "Cập nhật thất bại!");
    res.redirect(`${system.prefixAdmin}/products`);
  }
};

// [GET] admin/product/detail/:id
module.exports.detail = async(req, res) => {
  try {
    const find = {
      deleted: "false",
      _id: req.params.id
    };
    const product = await Product.findOne(find);

    console.log(product)

    res.render("admin/page/product/detail.pug", { 
      pageTitle: product.title,
      product: product
    });
  } catch (error) {
    res.redirect(`${system.prefixAdmin}/products`);
  }
};



  
 
