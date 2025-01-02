const Product = require("../../model/product.model");

//[GET] /product
module.exports.index = async(req,res) =>{ // noi chuoi product ben kia r
    const product = await Product.find({
        status: "In Stock",
        deleted: false
    }).sort({position: "desc"});

    const newProduct = product.map(item => {
        item.priceNew = (item.price*(100-item.discountPercentage)/100).toFixed(0);
        return item
    });

    // console.log(product);

    res.render("client/pages/products/index",{
        pageTitle: "Products List",
        product:newProduct
    }) // mac dinh se di vao views dau tien
}
//[GET] /products/:slug 
module.exports.detail = async(req,res) =>{ 
    
    try {
        const find = {
            deleted: false,
            slug : req.params.slug,
            status : "In Stock"
        };
        const product = await Product.findOne(find);
        console.log(product);
        res.render("client/pages/products/detail",{
            pageTitle: product.title,
            product:product
        });
    } catch(error){
        res.redirect(`/products`)
    }
}
