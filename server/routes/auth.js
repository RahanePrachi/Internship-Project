const express=require("express");
const User =require("../models/Users");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const { auth } = require("../middleware/auth");
const router = express.Router();

/* User Registration */
router.post("/register", async (req, res) => {
  try {
    /* Salting and Hashing the Password */
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    /* Create a new user */
    const newuser = await new User({
      userType: req.body.userType,
      userFullName: req.body.userFullName,
      admissionId: req.body.admissionId,
      employeeId: req.body.employeeId,
      age: req.body.age,
      dob: req.body.dob,
      gender: req.body.gender,
      address: req.body.address,
      mobileNumber: req.body.mobileNumber,
      email: req.body.email,
      password: hashedPass,
      isAdmin: req.body.isAdmin,
    });

    /* Save User and Return */
    const user = await newuser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

/* User Login */
// router.post("/signin", async (req, res) => {
//   try {
//     console.log(req.body, "req");
//     const user =req.body.admissionId 
//       ? await User.findOne({
//           admissionId: req.body.admissionId,
//           // userType:"Student"
//         })
//       : await User.findOne({
//           employeeId: req.body.employeeId,
//           // userType:"Admin",
//         });

    
//     console.log(user, "user");

//     !user && res.status(404).json("User not found");
    
//     const validPass = await bcrypt.compare(req.body.password, user.password);
//     !validPass && res.status(400).json("Wrong Password");

   

//     res.status(200).json(user);
//   } catch (err) {
//     console.log(err);
//   }
// });


// router.post("/signin",async (req, res) => {
//   const { admissionId, employeeId, password } = req.body;

//   try {
//     // Determine which field to use based on provided data (admissionId or employeeId)
//     const field = admissionId ? 'admissionId' : 'employeeId';
//     const user = await User.findOne({ [field]: admissionId || employeeId });

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid Admission ID or Employee ID' });
//     }

//     // Compare the provided password with the hashed password stored in the database
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid Password' });
//     }

//     // If authentication is successful, you can return a success message or user data
//     res.status(200).json({ message: 'Authentication successful', user });
//   } catch (error) {
//     console.error('Authentication error:', error);
//     res.status(500).json({ message: 'Authentication failed' });
//   }
// });


// const bcrypt = require('bcrypt');
// const User = require('../models/User'); // Assuming User model is properly defined

router.post("/signin", async (req, res) => {
  try {
    // Destructure the request body to extract admissionId, employeeId, and password
    const { admissionId, employeeId, password } = req.body;

    let user;

    // Check if admissionId is provided (student login) or employeeId is provided (admin/staff login)
    if (admissionId) {
      // Find user by admissionId (assuming admissionId is unique for students)
      user = await User.findOne({ admissionId });
    } else if (employeeId) {
      // Find user by employeeId (assuming employeeId is unique for admins/staff)
      user = await User.findOne({ employeeId });
    }

    // Check if user was found
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare password provided in request with hashed password stored in the database
    const validPass = await bcrypt.compare(password, user.password);

    // Check if password is valid
    if (!validPass) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // If user and password are valid, send user information in response
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Controller for Changing Password
router.post("/changepassword", auth, async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.userFullName} `
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
}) 

module.exports=router;
