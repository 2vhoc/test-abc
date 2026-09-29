// button status ( bắt sự kiện và truyền lên url cho backend để lọc status )
const buttonStatus = document.querySelectorAll("[button-status]") // thuộc tính tự định nghĩa thêm dấu ngoặc vuông 
if(buttonStatus.length >0){
    let url = new URL(window.location.href) // lấy URL hiện tại của trang web   
    buttonStatus.forEach ( button => {
        button.addEventListener("click",()=>{
            const status = button.getAttribute("button-status")
            if(status){
                url.searchParams.set("status",status) // đổi thành status
            } else{
                url.searchParams.delete("status") // nếu rỗng xóa status 
            }
            window.location.href = url.href // chuyển hướng trình duyệt sang url mới 
        })
    })
}
// end button status 

// from search 
const formSearch = document.querySelector("#form-search")
if(formSearch){
    let url = new URL(window.location.href)
    
    formSearch.addEventListener("submit",(e)=>{
        e.preventDefault() //ngăn chặn sự kiện mặc định của form là submit và load lại trang
        const keyword = e.target.elements.keyword.value
        if(keyword){
            url.searchParams.set("keyword",keyword)
        } else{
            url.searchParams.delete("keyword")
        }
        window.location.href = url.href  
        // console.log(e.target.elements.keyword.value) // ngăn chặn hành vi mặc định của form 
})}  

// Pagination 
const buttonPagination = document.querySelectorAll("[button-pagination]") // thuộc tính tự định nghĩa thêm dấu ngoặc vuông
if(buttonPagination){
    let url = new URL(window.location.href) 
    buttonPagination.forEach(button =>{
        button.addEventListener("click",()=>{
            const page = button.getAttribute("button-pagination")
            

        url.searchParams.set("page",page)

        window.location.href = url.href
        })
    })
}
// end pagination

// Auto close alert
// tìm tất cả phần tử pug chứa thuộc tính data-auto-close
const autoCloseAlerts = document.querySelectorAll("[data-auto-close]")
// kiểm tra xem tồn tại kh 
if(autoCloseAlerts.length > 0){
    autoCloseAlerts.forEach(alert => {
        // chuyển từ string về number 
        const delay = parseInt(alert.getAttribute("data-auto-close"))
        // nếu có t.gian 
        if(delay){
            // sau bằng ấy giây xóa 
            setTimeout(function(){
                // thêm class tạo hiệu ứng mờ dần 
                alert.classList.add('alert-hidden')
                setTimeout(function(){
                    alert.remove()
                }, 150)
            }, delay)
        }
    })
}
// End Auto close alert

// Close alert button
// tùm tất cả các nút bấm tren trang có thuộc tính close-alert
const closeAlertButtons = document.querySelectorAll("[close-alert]")
if(closeAlertButtons.length > 0){
    closeAlertButtons.forEach(btn => {
        btn.addEventListener("click", function(){
            // từ nút vừa bấm truy ngược lên cha (.alert)
            const alert = this.closest(".alert")
            // nếu tồn tại 
            if(alert){
                // thêm class tạo hiệu ứng mờ 
                alert.classList.add('alert-hidden')
                setTimeout(function(){
                    // sau xóa 
                    alert.remove()
                }, 150)
            }
        })
    })
}
// End close alert button

//End Pagination

//Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]") // kiểm tra xem tồn tại kh 
if(checkboxMulti){
    // tìm   input có name là checkall trong checkboxMulti
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
    // tìm tất cả các input có name là id trong checkboxMulti
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']")
    inputCheckAll.addEventListener("click",()=>{
        // tạo phần check đánh dấu tất cả các ô
        if(inputCheckAll.checked){ // nếu true thì tích tất cả 
            inputsId.forEach(input => {
                input.checked = true
            })
        } else{ // ngược lại nếu false thì bỏ tích tất cả 
            inputsId.forEach(input => {
                input.checked = false
            })
        }
    })

    inputsId.forEach(input => {
        input.addEventListener("click",()=>{
            // tìm đến các ô input có name là id và được tích chọn
             const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length // đếm số lượng các ô được tích chọn
             if(countChecked === inputsId.length){ // nếu số lượng các ô được tích chọn bằng tổng số lượng các ô thì tích vào ô checkall
                inputCheckAll.checked = true
             } else{ // ngược lại nếu số lượng các ô được tích chọn khác tổng số lượng các ô thì bỏ tích ô checkall
                inputCheckAll.checked = false
             }
        })
    })
}
// End Checkbox Multi

// Form Change Multi 
const formChangeMulti = document.querySelector("[form-change-multi]") // kiểm tra xem tồn tại thuộc tính kh
if(formChangeMulti){
    formChangeMulti.addEventListener("submit",(e)=>{
        e.preventDefault() // ngăn chặn hành vi mặc định của form là submit và load lại trang
        const checkboxMulti = document.querySelector("[checkbox-multi]")
        // tìm tới các ô đc tích chọn trong checkboxMulti
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked") // tìm trong thẻ input
        const typeChange = e.target.elements.type.value;
        // console.log(typeChange);
        if(typeChange=="delete-all"){   
            const isConfirm = confirm("bạn có chắc muốn xóa những sản phẩm này?")
            if(!isConfirm){
                return; // tất cả những đoạn code dừng hoạt động 

            }
        }

        
        if(inputsChecked.length > 0){ // nếu có ít nhất 1 ô được tích chọn thì submit form
            
            let ids = []
            let positions = []
            const inputIds = formChangeMulti.querySelector("input[name='ids']")
            inputsChecked.forEach(input => {
                const id = input.value
                if(typeChange=="change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    ids.push(`${id}-${position}`)
                } else{
                    ids.push(id)
                }

                
            })
            inputIds.value = ids.join(",") // chuyển mảng ids thành chuỗi và gán vào inputIds
            formChangeMulti.submit() // submit form 

        } else{
            alert("Vui lòng chọn ít nhất 1 bản ghi để thực hiện thao tác") // nếu không có ô nào được tích chọn thì hiển thị thông báo
        }
     })

 }
// End Form Change Multi    

// upload image 

const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]")
    uploadImageInput.addEventListener("change",(e)=>{
        console.log(e);
        // destructuring 
        const file = e.target.files[0]
        if(file){
            // tạo ra một đường dẫn tạm thời cho file trên máy tính của bạn 
            uploadImagePreview.src = URL.createObjectURL(file);
        }


    })
}
const imageClose = document.querySelector("[image-close]");
const uploadImagePreview = document.querySelector("[upload-image-preview]");

if(imageClose && uploadImagePreview){
    imageClose.addEventListener("click",()=>{
        uploadImagePreview.src = "";
    })
}

// end upload image 


