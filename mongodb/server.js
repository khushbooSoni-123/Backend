const express = require("express");
const connectDb = require("./config/db");  
const UserModel = require("./models/user.model");

let app = express();



connectDb();

app.use(express.json());

//create
app.post("/register",async (req,res)=>{
    try{
    let{name,email,password,mobile}=req.body;

    if(!name || !email || !password || !mobile){
    return res.json({
        message:"all feilds are required"
    })
}
     let user = await UserModel.create({
    name,
    email,
    password,
    mobile,
     });

    return res.json({
    message: "User registered",
    user,
  });

}
  catch(error){
     return res.json({
      message: "Internal server error",
      error,
    });
}

});


// Read---


app.get("/users", async (req, res) => {
  try {
    let users = await UserModel.find();
    return res.json({
      message: "Users fetched",
      users,
    });
  } catch (error) {
    return res.json({
      message: "Internal server error",
      error,
    });
  }
});


// dynamic reading---



app.get("/user/:id", async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) {
      return res.json({
        message: "Id is required",
      });
    }
    // let user = await UserModel.findById(id);
    // let user = await UserModel.findOne({
    //   email: id,
    // });
    let user = await UserModel.find({
      email: id,
    });
    return res.json({
      message: "User fetched",
      user,
    });
  } catch (error) {
    return res.json({
      message: "Internal server error",
      error,
    });
  }
});


// update user--
app.put('user/update/:id',async(req,res)=>{
    try{
        let{id}=req.params;

        if(!id){
            return res.json({
                message:"id not found "
            })
        }
        let{name,email,password,number}=req.body;
        if(!name || !email || !password || !number){
            return res.json({
                message:"All feilds all required"
            })
        }
        let userUpadate = await UserModel.findByIdAndUpdate(
            id,
            {
            name,
             email,
             password,
             mobile,
            },
            {
                new:true,
            }
        );

        return res.json({
            message:"user updated",userUpadate:user
        })

    }
    catch(error){
        return res.json({
            message:"internal servar error",error
        })
    };

});


//delete user
app.delete("/user/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) {
      return res.json({
        message: "Id not found! unauthorized user",
      });
    }
    await UserModel.findByIdAndDelete(id);
    return res.json({
      message: "User deleted",
    });
  } catch (error) {
    return res.json({
      message: "Internal server error",
      error,
    });
  }
});



app.listen(3000,()=>{
    console.log("Server is running");
    
})