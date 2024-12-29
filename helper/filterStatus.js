module.exports = (query) => {
    let filterStatus = [
        {
            name:"All",
            status: "",
            class:""
        },
        {
            name:"In Stock",
            status: "In Stock",
            class:""
        },
        {
            name:"Out Stock",
            status: "Out Stock",
            class:""
        }
    ];
    if(query.status){
        const index = filterStatus.findIndex(item => item.status == query.status);
        filterStatus[index].class = "active";
        //console.log(index);
    }
    else{
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
    }
    return filterStatus;
}