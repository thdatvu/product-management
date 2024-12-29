//Change Status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonsChangeStatus.length>0){
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");

    buttonsChangeStatus.forEach(button => {
        button.addEventListener("click", ()=>{
            const currentStatus = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");

            let statusChange = currentStatus == "In Stock" ? "Out Stock" : "In Stock";
            // console.log(currentStatus);
            // console.log(id);
            // console.log(statusChange);

            const action = path + `/${statusChange}/${id}?_method=PATCH`;       
            formChangeStatus.action = action;

            formChangeStatus.submit(); // ham` trong js de submit ma` ko can nut 
        });
    });
}
//End Change Status

//Delete Item
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length>0){
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");
    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Are you sure you want to delete this product?");
            if(isConfirm){
                const id = button.getAttribute("data-id");
               // console.log(id);
                const action = `${path}/${id}?_method=DELETE`;
                console.log(action);
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        });
    });
}
//End Delete Item