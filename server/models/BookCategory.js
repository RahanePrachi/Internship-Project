const mongoose= require("mongoose") ;

const BookCategorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        unique:true
    },
    books:[{
            type:mongoose.Types.ObjectId,
            ref:"Book"
        }]
},
{
    timestamps:true
})
module.exports= mongoose.model("BookCategory",BookCategorySchema)