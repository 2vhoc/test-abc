//  Change Status
const buttonChangeStatus = document.querySelectorAll('[button-change-status]');
if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector('#form-change-status');
    const path = formChangeStatus.getAttribute('data-path');
    buttonChangeStatus.forEach((button) => {
        button.addEventListener('click', () => {
            const statusCurrent = button.getAttribute('data-status');
            const id = button.getAttribute('data-id');
            
            let statusChange= statusCurrent === 'active' ? 'inactive' : 'active';   
            // sau khi đổi trạng thái thì sẽ gửi request lên server để đổi trạng thái trong database
            // nên dùng thẻ form  có thể mượn path hoặc path thay vì get bản chất get là đọc
            // form là để gửi trạng thái lên server để thay đổi trạng thái trong database
            const action = path +`/${statusChange}/${id}?_method=PATCH`; // sử dựng method-override để gửi request PATCH lên server
            
            formChangeStatus.action = action 
            formChangeStatus.submit(); // submit form để gửi request lên server để đổi trạng thái trong database
        });
    });
}
// End Change Status


// Delete Item 
const buttonsDelete = document.querySelectorAll('[button-delete]');
if(buttonsDelete.length > 0){
    const formDeleteItem = document.querySelector('#form-delete-status');
    const path = formDeleteItem.getAttribute('data-path');
    buttonsDelete.forEach(button=>{
        button.addEventListener("click",()=>{
            const inConfirm = confirm('bạn có chắc muốn xóa sản phẩm này?')
            if(inConfirm){
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;
                console.log(action );
                formDeleteItem.action = action 
                formDeleteItem.submit()
            }
        })
    })
}
// End Delete Item