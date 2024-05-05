const express=require('express');
const app=express();
const cookieParser=require("cookie-parser");
const authRoutes =require("./routes/auth.js") ;
const userRoutes =require("./routes/user.js") ;
const bookRoutes =require("./routes/book.js") ;
const transactionRoutes =require("./routes/transactions.js") ;
const categoryRoutes =require("./routes/categories.js") ;
const resetPasswordRoutes=require("./routes/ResetPassword.js")

//middleware
const cors=require('cors');
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)


/* API Routes */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/resetpassword", resetPasswordRoutes);

const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/DLLMS");

const PORT=5000;

app.get("/", (req, res)=>{
    res.send("connected to  server successfully");
})
app.listen(PORT, ()=>{
    console.log(`app listen on port ${PORT}`);
})