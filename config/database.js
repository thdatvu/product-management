const mongoose = require("mongoose");

module.exports.connect =async() => { // phai dung async await do ket noi se mat 1 thgian
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connect success!");
    }catch(error){
        console.log("Connect error!!!");
    }
}
