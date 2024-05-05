const express=require("express");
const Book =require("../models/Book.js") 
const User=require("../models/Users.js")
const BookTransaction =require("../models/BookTransaction.js") 
const router = express.Router()

router.post("/add-transaction", async (req, res) => {
    try {
            const newtransaction = await new BookTransaction({
                bookId: req.body.bookId,
                borrowerId: req.body.borrowerId,
                bookName: req.body.bookName,
                borrowerName: req.body.borrowerName,
                transactionType: req.body.transactionType,
                fromDate: req.body.fromDate,
                borrowerEmail:req.body.borrowerEmail,
                toDate:req.body.toDate,
                // returnDate:req.body.returnDate     
            })
            const transaction = await newtransaction.save()
            const book = Book.findById(req.body.bookId)
            await book.updateOne({ $push: { transactions: transaction._id } })
            res.status(200).json(transaction)
    }
    catch (err) {
        res.status(504).json(err)
    }
})

router.get("/all-transactions", async (req, res) => {
    try {
        const transactions = await BookTransaction.find({}).sort({ _id: -1 })
        res.status(200).json(transactions)
    }
    catch (err) {
        return res.status(504).json(err)
    }
})

router.put("/update-transaction/:id", async (req, res) => {
    try {
            await BookTransaction.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Transaction details updated successfully");
    }
    catch (err) {
        res.status(504).json(err)
    }
})
router.delete("/remove-transaction/:id", async (req, res) => {
        try {
            const data = await BookTransaction.findByIdAndDelete(req.params.id);
            const book = Book.findById(data.bookId)
            console.log(book)
            await book.updateOne({ $pull: { transactions: req.params.id } })
            res.status(200).json("Transaction deleted successfully");
        } catch (err) {
            return res.status(504).json(err);
        }
})
module.exports=router;