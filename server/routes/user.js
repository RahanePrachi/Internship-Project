const express = require("express");
const User = require("../models/Users.js");
const bcrypt =require("bcrypt") ;

const router = express.Router();

/* Getting user by id */
router.get("/getuser/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("activeTransactions")
      .populate("prevTransactions");
    const { password, updatedAt, ...other } = user._doc;

    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

/* Getting all members in the library */
router.get("/allmembers", async (req, res) => {
  try {
    const users = await User.find({})
      .populate("activeTransactions")
      .populate("prevTransactions")
      .sort({ _id: -1 });

    res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

/* Delete user by id */
router.delete("/deleteuser/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).send({
        success: true,
        data: { user },
        message: "Account has been deleted",
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

router.put("/updateuser/:id", async (req, res) => {
    try {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
            if (!user) {
                return res.status(404).json("User not found");
            }
            res.status(200).json("Account has been updated");
        } else {
            return res.status(403).json("You can update only your account!");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json("Internal Server Error");
    }
});

/* Adding transaction to active transactions list */
router.put("/:id/move-to-activetransactions" , async (req,res)=>{
      try{
          const user = await User.findById(req.body.userId);
          await user.updateOne({$push:{activeTransactions:req.params.id}})
          res.status(200).json("Added to Active Transaction")
      }
      catch(err){
          res.status(500).json(err)
      }
})
/* Adding transaction to previous transactions list and removing from active transactions list */
router.put("/:id/move-to-prevtransactions", async (req,res)=>{
      try{
          const user = await User.findById(req.body.userId);
          await user.updateOne({$pull:{activeTransactions:req.params.id}})
          await user.updateOne({$push:{prevTransactions:req.params.id}})
          res.status(200).json("Added to Prev transaction Transaction")
      }
      catch(err){
          res.status(500).json(err)
      }
})


module.exports = router;
