const mongoose= require("mongoose") ;
const nodemailer = require("nodemailer")

const BookTransactionSchema = new mongoose.Schema({
    bookId: {
        type: String,
        require: true
    },
    borrowerId: { //EmployeeId or AdmissionId
        type: String,
        require: true
    },
    bookName: {
        type: String,
        require: true
    },
    borrowerName: {
        type: String,
        require: true
    },
    transactionType: { //Issue or Reservation
        type: String,
        enum: ['Reserved', 'Issued'],
        require: true,
    },
    fromDate: {
        type: Date,
        require: true,
    },
    toDate: {
        type: Date,
        require: true,
    },
    returnDate: {
        type: String
    },
    borrowerEmail: {
        type: String,
        required: true // Ensure that borrowerEmail is required
    },
    transactionStatus: {
        type: String,
        default: "Active"
    }
},
    {
        timestamps: true
    }
);

// Pre-save middleware to set toDate based on transactionType and fromDate
BookTransactionSchema.pre('save', function(next) {
    // Check if fromDate is set and toDate is not explicitly provided
    if (this.fromDate && !this.toDate) {
        const toDate = new Date(this.fromDate);

        // Calculate toDate based on transactionType
        if (this.transactionType === 'Reserved') {
            // Set toDate to 3 days after fromDate for Reserved transactions
            toDate.setDate(toDate.getDate() + 3);
        } else if (this.transactionType === 'Issued') {
            // Set toDate to 15 days after fromDate for Issued transactions
            toDate.setDate(toDate.getDate() + 15);
        }

        // Set the calculated toDate field on the current document
        this.toDate = toDate;
    }

    // Proceed to the next middleware or save operation
    next();
});


BookTransactionSchema.post('save', async function(doc) {
    try {
        console.log("Middleware triggered for BookTransaction:", doc);
        console.log("toDate:", doc.toDate);

        if (doc.toDate) {
            const toDate = new Date(doc.toDate);
            const oneDayBeforeReturn = new Date(toDate.getTime() - (24 * 60 * 60 * 1000)); // One day before return date
            const currentDate = new Date();

            // Check if today is one day before the return date
            if (currentDate.toDateString() === oneDayBeforeReturn.toDateString()) {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'prachirahanedummy34@gmail.com',
                        pass: 'nfeprgtnlchxbhch'
                    }
                });

                let mailDetails = {};

                if (doc.transactionType === 'Reserved') {
                    // Send reservation cancellation reminder
                    mailDetails = {
                        from: 'AVCOE Information Technology Library',
                        to: doc.borrowerEmail,
                        subject: 'Reminder: Reservation Cancellation',
                        text: `Dear ${doc.borrowerName},\n\nThis is a reminder that your reservation for "${doc.bookName}" will be automatically cancelled tomorrow. Please contact us if you still need the book.If you not issued the book from library per day 5 rupess fine will be apply for your irresponsible behaviour.\n\nThank you.`
                    };
                } else if (doc.transactionType === 'Issued') {
                    // Send due date reminder for issued book
                    mailDetails = {
                        from: 'AVCOE Information Technology Library',
                        to: doc.borrowerEmail,
                        subject: 'Reminder: Book Due Tomorrow',
                        text: `Dear ${doc.borrowerName},\n\nThis is a reminder that your book "${doc.bookName}" is due for return tomorrow. Please ensure to return it on time.\n\nThank you.`
                    };
                }

                // Send email
                let info = await transporter.sendMail(mailDetails);
                console.log('Email sent successfully');
            }
        }
    } catch (error) {
        console.error('Error sending email:', error);
    }
});

module.exports= mongoose.model("BookTransaction", BookTransactionSchema)