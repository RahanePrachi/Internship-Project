const express =require("express") 
const Book =require("../models/Book.js") 
const BookCategory =require("../models/BookCategory.js") 

const router = express.Router()

/* Get all books in the db */
router.get("/allbooks", async (req, res) => {
    try {
        const books = await Book.find({}).populate("transactions").sort({ _id: -1 });
        res.status(200).json(books)
    }
    catch (err) {
        return res.status(504).json(err);
    }
})

/* Get Book by book Id */
router.get("/getbook/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("transactions")
        res.status(200).json(book)
    }
    catch {
        return res.status(500).json(err)
    }
})

/* Get books by category name*/
// router.get("/", async (req, res) => {
//     const category = req.query.category
//     try {
//         const books = await BookCategory.findOne({ categoryName: category }).populate("books")
//         res.status(200).json(books)
//     }
//     catch (err) {
//         return res.status(504).json(err)
//     }
// })



/* Adding book */
router.post("/addbook", async (req, res) => {
    // if (req.body.isAdmin) {
        try {
            const newbook = await new Book({
                bookName: req.body.bookName,
                alternateTitle: req.body.alternateTitle,
                author: req.body.author,
                bookCountAvailable: req.body.bookCountAvailable,
                language: req.body.language,
                publisher: req.body.publisher,
                bookStatus: req.body.bookSatus,
                categories: req.body.categories
            })
            const book = await newbook.save()
            await BookCategory.updateMany({ '_id': book.categories }, { $push: { books: book._id } });
            res.status(200).json(book)
        }
        catch (err) {
            res.status(504).json(err)
        }
    // }
    // else {
    //     return res.status(403).json("You dont have permission to add a book!");
    // }
})

/* upding book */
router.put("/updatebook/:id", async (req, res) => {
    // if (req.body.isAdmin) {
        try {
            await Book.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Book details updated successfully");
        }
        catch (err) {
            res.status(504).json(err);
        }
    // }
    // else {
    //     return res.status(403).json("You dont have permission to update a book!");
    // }
})

/* Remove book  */
router.delete("/removebook/:id", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            const _id = req.params.id
            const book = await Book.deleteOne({ _id })
            
            await BookCategory.updateMany({ '_id': book.categories }, { $pull: { books: book._id } });
            
            res.status(200).json("Book has been deleted");
        } catch (err) {
            return res.status(504).json(err);
        }
    } else {
        return res.status(403).json("You dont have permission to delete a book!");
    }
})

//search book
// Search for books by title or category
// Search for books by category name or book name
router.get('/search', async (req, res) => {
    const { query } = req.query; // This will contain either category name or book name
    try {
      // Search for books by category name
      const category = await BookCategory.findOne({ categoryName: query }).populate('books');
      // Search for books by book name (title)
      const booksByTitle = await Book.find({ bookName: { $regex: query, $options: 'i' } });
      let searchResults = [];
      if (category) {
        // If a matching category is found, return books under that category
        searchResults = category.books;
      } else {
        // If no category match, add books matching the title search
        searchResults = booksByTitle;
      }
      res.json(searchResults);
    } catch (err) {
      console.error('Error searching books:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

  
module.exports=router;