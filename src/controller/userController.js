import { User } from "../schema/model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import { sendEmail } from "../utilis/sendemail.js";
import { secretKey } from "../constant.js";

export let createUser = async (req, res) => {
  try {
    let userData = req.body;
    let hashPassword = await bcrypt.hash(userData.password, 10); 
    //passing incoming data, isVerifiedEmail & hashPassword as an object to data
    let data = {
      ...userData,
      isVerifiedEmail: false,
      password: hashPassword,
    };
    let result = await User.create(data);

    //send mail with link after a registration
    //for purpose of making  isVerifiedEmail: false -> true so that we know that the user is genuine
    // but we attach token so that link expires after certain time

    //generate token
    let infoObj = {
      _id: result._id,
    };
    let expiryInfo = {
      expiresIn: `20d`,
    };
    let token = await jwt.sign(infoObj, secretKey, expiryInfo);

    // send email:
    // await sendEmail({
    //   from: '"Account Created " <sgod7444@gmail.com>',
    //   to: data.email,
    //   subject: "Account Create",
    //   html: `
    //     <h1>Account created successfully.</h1>
    //     <p>click link below to continue.</p>
    //     <a href="http://localhost:3000/verify-email?token=${token}">
    //     http://localhost3000/verify-email?token=${token}</a>
    //     `,
    // });

    res.status(200).json({
      success: true,
      message: "user data created successfully.",
      result: result,
      token : token ,
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: error.message,
    });
  }
};

export let readAllUsers = async (req, res) => {
  try {
    // let result = await User.find({});
    let result = await User.find({});

    res.status(200).json({
      success: true,
      message: "user read successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
//--------------------------------------------------------------------------------

export let readSpecificUser = async (req, res) => {
  let userId = req.params.userId;
  try {
    let result = await User.findById(userId);
    res.status(200).json({
      success: true,
      message: "user read successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
//--------------------------------------------------

export let updateUser = async (req, res) => {
  let userId = req.params.userId;
  let userData = req.body;

  try {
    let result = await User.findByIdAndUpdate(userId, userData, {new:true});
    res.status(201).json({
      success: true,
      message: "user updated successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
//----------------------------------------------------------------------------

export let deleteUser = async (req, res) => {
  let userId = req.params.userId;

  try {
    let result = await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "user deleted successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
//----------------------------------------------------------------------------------
//LOGIN
export let loginUser =  ( async (req,res)=>{
//get data
  let email=req.body.email;
  let password=req.body.password;

  try {
    let user = await User.findOne({email:email})//findOne ko output ki ta object ma awuxa ki ta null awuxa.
    console.log(user)
    let hashPassword=user.password;
    //check if user exists?
    if(user===null){
      res.json({
        success:false,
        message:"Email or Password does'nt match. "
      })
      
    }
    //if user exists? then generate token
    else{
      let isValidPassword=await bcrypt.compare(password,hashPassword);
      if (isValidPassword){


        // if user exist ? generate token.
        let infoObj ={ id : user._id};//id ko lagi user._id yesari get garna parxa;
        let expiryInfo={ expiresIn:"365d"};

        let token = jwt.sign(infoObj,secretKey,expiryInfo);
        //console.log(token);
        res.json({
          success:true,
          message:"User logged in successfully.",
          result : token
        })
      }
      else{
        res.json({
          success:false,
          message:"Email or Password does'nt match.",
        })
      }

    }
  } catch (error) {res.json({success:false,message:error.message}) }
})


//catch ko error ma jailey error.message rakhney.
//---------------------------------------------------------------------------------------------
export let myProfile=async(req,res)=>{
  let bearerToken = req.headers.authorization;  
  
  // token get garna lai req.headers.authorization
  //bearerToken = bearer fhgoiahsoidfhglkahsdfghaisdg (yo form ma awuxa)
  // agadiko bearer ani space hatara token matra lina lai :
  //.split(" ") space le xutara array ma rakhxa
  //[1] le index 1 ko value retun garxa
  //["bearer","fhgoiahsoidfhglkahsdfghaisdg"]

  let token = bearerToken.split(" ")[1];
 // console.log(token);

  try {
    let infoObj = jwt.verify(token,secretKey);
    //yo infoObj variable ho jasle yedi true vayo vaney value pass garera lerauxa of infoObj(token ko)
    //yesko secretKey aile as a string xa so "" ma wrap garna pardaina

    //console.log(infoObj);    
    let id = infoObj.id;
    let result = await User.findById(id);

    res.json({
      success : true,
      message : " profile read successfully",
      result : result
    })

} catch (error) {
  //console.log(error.message)
    res.json({
      success : false,
      message : error.message
    })
}

};
export let myProfileUpdate = async(req,res)=>{
//   let userId = req.params.userId;

let userData = req.body;
let bearerToken = req.headers.authorization;
let token = bearerToken.split(" ")[1];

 try {
  let infoObj = jwt.verify(token,secretKey);   
  let id = infoObj.id;
//let result = await User.findByIdAndUpdate(userId, userData);
  let result = await User.findByIdAndUpdate(id, userData,{new:true});

  res.json({
    success : true,
    message : " profile updated successfully",
    result : result
  })

} catch (error) {
  res.json({
    success : false,
    message : error.message
  })
}
}