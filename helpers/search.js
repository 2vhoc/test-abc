module.exports = (query)=>{
    let objectSearch = { // lý do cho keyword vào object là có thể return cùng với các object khác trong tương lai, ví dụ: status, category, price...
        keyword: "" // gửi ngược lại keyword để hiển thị trên ô input tìm kiếmw
        
    };
  if(query.keyword) { // nếu có keyword truyền vào từ url thì gán vào objectSearch.keyword
    objectSearch.keyword = query.keyword; // định nghĩa lại keyword để gửi ngược lại cho view hiển thị trên ô input tìm kiếm

    const regex = new RegExp(objectSearch.keyword, "i"); // tạo regex để tìm kiếm không phân biệt hoa thường 
    objectSearch.regex = regex;  // nếu có regex truyền vào thì thêm vào objectSearch 
    }
    return objectSearch; 
}