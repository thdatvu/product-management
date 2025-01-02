
const Product = require("../../model/product.model");

const systemConfig = require("../../config/system")
const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");
const paginationHelper = require("../../helper/pagination")
//[GET] /admin/products
module.exports.index = async(req, res) => {
    //console.log(req.query.status);

    const filterStatus = filterStatusHelper(req.query);    
   
    let find = {
        deleted : false
    };
    if(req.query.status){
        find.status = req.query.status
    }

    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }
// Pagination
    const countProducts = await Product.countDocuments(find); // Dung trc model nen them await

    let objectPagination = paginationHelper({
        currentPage:1,
        limitItems:4
    },
    req.query,
    countProducts
    ) ;
   
// End pagination

//Sort 
    let sort = {};

    if(req.query.sortKey && req.query.sortValue ){
        sort[req.query.sortKey] = req.query.sortValue;
    }
    else{
        sort.position = "desc";
    }

   

//End sort
    const products = await Product.find(find).sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
    //console.log(products)
    res.render("admin/pages/products/index",{
        pageTitle: "Products List",
        products : products,
        filterStatus:filterStatus,
        keyword : objectSearch.keyword,
        pagination: objectPagination
    });
};
//[PATCH]  /admin/products/change-status/:status/:id
module.exports.changeStatus= async (req,res) => {
    // console.log(req.params); // object chua cac router dong
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({_id: id},{status: status});  // chờ update xong status xong moi hien ra giao dien
    req.flash("success","Status updated successfully!")

    res.redirect('back');
}
//[PATCH]  /admin/products/change-multi
module.exports.changeMulti= async (req,res) => {
    // console.log(req.params); // object chua cac router dong
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (type){
        case "active":
            await Product.updateMany({_id:{ $in: ids }},{ status: "In Stock"});
            req.flash("success",`${ids.length} status updated successfully!`);
            break;
        case "inactive":
            await Product.updateMany({_id:{ $in: ids }},{ status: "Out Stock"});
            req.flash("success",`${ids.length} status updated successfully!`);
            break;
        case "delete-all":
            await Product.updateMany({_id:{ $in: ids }},{ 
                deleted: true,
                deletedAt: new Date()
            });
            req.flash("success",`${ids.length} products deleted successfully!`);
            break;
        case "change-position":
            
            for (const item of ids){
                let [id,position] = item.split("-");
                position = parseInt(position);
                await Product.updateOne({_id: id},{
                    position: position
                });  // Ko dung` dc 
                // cach tren vi` no co ve thu 2 khac nhau
            }
            break;
        default:
            break;
    }  
    //phai? cai dat them body-parser thi moi lay dc cac thuoc tinh cua req.body
    res.redirect("back");
}
//[DELETE]  /admin/products/delete/:id
module.exports.deleteItem= async (req,res) => {
    // console.log(req.params); // object chua cac router dong
    const id = req.params.id;

    //await Product.deleteOne({_id: id});  
    await Product.updateOne({_id: id},{
        deleted: true,
        deletedAt: new Date()
    });  
    req.flash("success",`Product updated successfully!`);
    res.redirect('back');
};

//[GET] /admin/products/create
module.exports.create = async(req, res) => {
    res.render("admin/pages/products/create",{
        pageTitle: "Add new product"
    });
}
//[PATCH] /admin/products/create
module.exports.createPost = async(req, res) => {
    if(!req.body.title){
        req.flash("error",`Please enter title!`);
        res.redirect("back");
        return; // ko chay cac doan tiep theo
    }
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position == ""){
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts+1;
    }
    else{s
        req.body.position = parseInt(req.body.position);
    }
    
    const product = new Product(req.body); // tao moi 1 product
    await product.save(); // luu vao database
    res.redirect(`${systemConfig.prefixAdmin}/products`);
};
//[GET] /admin/products/edit/:id
module.exports.edit = async(req, res) => {
   
    try {
        const find = {
            deleted: false,
            _id : req.params.id
        };
        const product = await Product.findOne(find);
      
        res.render("admin/pages/products/edit",{
            pageTitle: "Edit Product",
            product:product
        });
    } catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}
//[PATCH] /admin/products/edit/:id
module.exports.editPatch = async(req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);
    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`; 

    }

    try {
        await Product.updateOne({_id : req.params.id},req.body);
        req.flash("success",`Updated success!`)
    } catch (error) {
        req.flash("success",`Updated fail!`)
    }
    
    res.redirect(`${systemConfig.prefixAdmin}/products`);
}
//[GET] /admin/products/detail/:id
module.exports.detail = async(req, res) => {
   
    try {
        const find = {
            deleted: false,
            _id : req.params.id
        };
        const product = await Product.findOne(find);
        console.log(product);
        res.render("admin/pages/products/detail",{
            pageTitle: product.title,
            product:product
        });
    } catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}
