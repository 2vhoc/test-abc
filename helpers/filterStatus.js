module.exports=(query)=>{
    let filterStatus = [ // bôi xanh vào status đang được chọn
        { 
          name: "Tất cả",
          status: "",
          class: ""
        },
        {
          name: "Hoạt động",
          status: "active",
          class: ""
        },
        {
          name: "Dừng hoạt động",
          status: "inactive",
          class: ""
        }
      ]
      if(query.status){ // điều kiện nếu status tồn tại trên url thì tìm index của status đó trong mảng filterStatus và gán class = "active" 
        const index = filterStatus.findIndex(item => item.status == query.status)
        filterStatus[index].class = "active"
      } else{ 
        const index = filterStatus.findIndex(item => item.status == "")
        filterStatus[index].class = "active"
      }
      return filterStatus 

}