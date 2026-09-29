module.exports = (objectPagination,query,countProducts)=>{
    if(query.page){ // nếu người dùng truyền lên trên url thì mới lấy ra, còn không thì mặc định là 1
    objectPagination.currentPage = parseInt(query.page) // lý do dùng parseInt chuyển về number bới url trả về string

  }
  //console.log(objectPagination.currentPage)
  objectPagination.skip = ( objectPagination.currentPage - 1 )* objectPagination.limitItems // skip là số lượng sản phẩm cần bỏ qua để lấy ra sản phẩm tiếp theo, ví dụ: page 1 thì skip = 0, page 2 thì skip = 4, page 3 thì skip = 8
  
  const totalPage = Math.ceil(countProducts / objectPagination.limitItems) // tính tổng số trang, dùng Math.ceil để làm tròn lên, ví dụ: 10 sản phẩm, limitItems = 4 thì totalPage = 3
  objectPagination.totalPage = totalPage // thêm tổng số trang vào objectPagination để render ra view
  return objectPagination 
}