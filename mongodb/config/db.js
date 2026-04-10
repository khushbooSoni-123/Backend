const {default:mongoose} = require("mongoose");

const connectDb = async()=>{
    try{
        await mongoose.connect("mongodb://0.0.0.0/tillu");
        console.log("mongodb connected");
        
    } catch(error){
        console.log("error in connecting mongoDb",error);
    }
};

module.exports = connectDb;