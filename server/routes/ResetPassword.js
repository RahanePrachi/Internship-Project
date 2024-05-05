const User = require("../models/Users.js");
const express = require("express");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const router = express.Router();
//resetPasswordTOken
router.post("/reset-password-token" , async (req, res) => {
    try {
      //get gmail from req.body
      const email = req.body.email;
  
      //check user for this email, email validation
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.json({
          success: false,
          message: "your email is not registered with us.",
        });
      }
      //generate token
      // const token = crypto.randomUUID();
      const token = crypto.randomBytes(20).toString("hex");
  
      //update user by adding token and expiration time
      const updatedDetails = await User.findOneAndUpdate(
        { email: email },
        {
          token: token,
          resetPasswordExpires: Date.now() + 15 * 60 * 1000,
        },
        { new: true }
      ); //new:true=> return updated document in response
      console.log("DETAILS", updatedDetails);
      //create url
  
      //creating frontend link for update password and used differntiating string called token jisase alag alag link banenge
      const url = `http:localhost:3000/update-password/${token}`;
  
      //send mail containing the url
      await mailSender(
        email,
        "Password Reset",
              `Your Link for email verification is ${url}. Please click this url to reset your password.`
      );
  
      //return response
      return res.json({
        success: true,
        message:
          "Email sent successfully, please check email and change password.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong while sending reset password mail. ",
      });
    }
  }) ;

//resetPassword
router.post("/reset-password", async (req, res) => {
    try {
      //fetch data
      const { password, confirmPassword, token } = req.body;
  
      //validation
      if (password != confirmPassword) {
        return res.json({
          success: false,
          message: "password not matching.",
        });
      }
      //get user details from db using token
      const userDetails = await User.findOne({ token: token });
      console.log(userDetails)
      //if no entry - invalid token
      if (!userDetails) {
        return res.json({
          success: false,
          message: "token is invalid.",
        });
      }
      //token time check -> kay time expire hua hai ya nahi
      if (userDetails.resetPasswordExpires < Date.now()) {
        return res.json({
          success: false,
          message: "Token is expired , please regenerate your token",
        });
      }
      //hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      //update pwd
      await User.findOneAndUpdate(
        { token: token },
        { password: hashedPassword },
        { new: true }
      );
      //return response
      return res.status(200).json({
        success: true,
        message: "password reset successful.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while reseting password . ",
      });
    }
  }); 
module.exports=router;