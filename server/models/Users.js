const mongoose= require("mongoose") ;

const UserSchema = new mongoose.Schema({
    userType: {
        type: String,
        require: true,
        enum:["Student", "Admin"],
    },
    userFullName: {
        type: String,
        require: true,
        unique: true
    },
    admissionId: {
        type: String,
        min: 3,
        max: 15,
    },
    employeeId: {
        type: String,
        min: 3,
        max: 15,
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    dob: {
        type: String
    },
    address: {
        type: String,
        default: ""
    },
    mobileNumber: {
        type: Number,
        require: true
    },
    photo: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 6
    },
    
    activeTransactions: [{
        type: mongoose.Types.ObjectId,
        ref: "BookTransaction"
    }],
    prevTransactions: [{
        type: mongoose.Types.ObjectId,
        ref: "BookTransaction"
    }],
    isAdmin: {
        type: Boolean,
        default: false
    },
    token:{
        type:String, 

    },
    resetPasswordExpires:{
        type:Date,
    },
},
    {
        timestamps: true
    });

    module.exports=  mongoose.model("User", UserSchema);