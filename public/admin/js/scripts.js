//Button status
const buttonStatus = document.querySelectorAll("[button-status]");// cac thuoc tinh tu dinh nghia thi` phai dung[]
if(buttonStatus.length>0){
    let url = new URL(window.location.href ); // ham` trong js 

    buttonStatus.forEach(button => {
        button.addEventListener("click",() => {
            const status = button.getAttribute("button-status");
            
            if(status){
                url.searchParams.set("status",status);
            }
            else {
                url.searchParams.delete("status");
            }
            
            window.location.href = url.href;
        });
    });
}
//End Button status

//Form Search
const formSearch = document.querySelector("#form-search");
if(formSearch){
    let url = new URL(window.location.href );
    formSearch.addEventListener("submit",(e)=>{
        e.preventDefault();// chan su kien mac dinh
        const keyword = e.target.elements.keyword.value
        if(keyword){
            url.searchParams.set("keyword",keyword);
        }
        else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
        //console.log(e.target.elements.keyword.value);
    });
}
//End Form Search

//Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if(buttonsPagination) {
    let url = new URL(window.location.href);
    buttonsPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");

            url.searchParams.set("page",page);

            window.location.href = url.href;
        })
    })
}
//End Pagination

//Check box Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputids =  checkboxMulti.querySelectorAll("input[name='id']");
    inputCheckAll.addEventListener("click",() => {
        if(inputCheckAll.checked){
            inputids.forEach(input => {
                input.checked = true;
            });
        }
        else{
            inputids.forEach(input => {
                input.checked = false;
            });
        }
    });
    inputids.forEach(input => {
        input.addEventListener("click", () => {   
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if(countChecked==inputids.length){
                inputCheckAll.checked = true;
            }
            else{
                inputCheckAll.checked = false;
            }
        })
    });

}
//End Check box Multi

//Form change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
    
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

        const typeChange = e.target.elements.type.value;
        if(typeChange == "delete-all"){
            const isConfirm = confirm("Are you sure you want to delete this products");

            if(!isConfirm){
                return;
            }
        }
       // console.log(typeChange);
        if(inputsChecked.length>0){
            let ids = [];
            const inputids = formChangeMulti.querySelector("input[name='ids']");
            inputsChecked.forEach(input => {
                const id = input.value;

                if(typeChange=="change-position") {
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    
                    ids.push(`${id}-${position}`);
                }
                else {
                    ids.push(id);
                }
               
            });
            inputids.value = ids.join(", ");

            formChangeMulti.submit();
        }
        else{
            alert("Please select at least one product")
        }
    });
 }
//End form change Multi
//Show Alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]")
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    },time);
    closeAlert.addEventListener("click",() => {
        showAlert.classList.add("alert-hidden");
    });
}
//End Show Alert
//Upload image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview= document.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change",(e) => {    
        const file = e.target.files[0];
        if(file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    });
}
//End upload image

//Sort
const sort = document.querySelector("[sort]");
if(sort){
    let url = new URL(window.location.href);
    const sortSelect = sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]");
// Sap xep
    sortSelect.addEventListener("change",(e) => {
        const value = e.target.value;     
        const [sortKey,sortValue] = value.split("-");
        url.searchParams.set("sortKey",sortKey);
        url.searchParams.set("sortValue",sortValue);

        window.location.href = url.href;
        
    });
// Xoa sap xep
    sortClear.addEventListener("click",() => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");

        window.location.href = url.href;
    });
    // Them selected cho option
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    if(sortKey&&sortValue){
        const stringSort = `${sortKey}-${sortValue}`;
        const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`);
        optionSelected.selected = true;
    }
}
//End sort