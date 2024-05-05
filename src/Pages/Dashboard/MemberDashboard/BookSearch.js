// src/components/BookSearch.js
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import './BookSearch.css'; // Import CSS file for styling
import { AuthContext } from '../../../Context/AuthContext';

const BookSearch = ({studentName, borrowerId, borrowerEmail}) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const API_URL = "http://localhost:5000/"
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useContext(AuthContext)

    // const [borrowerId, setBorrowerId] = useState("")
    const [borrowerDetails, setBorrowerDetails] = useState([])
    const [bookId, setBookId] = useState("")
    const [recentTransactions, setRecentTransactions] = useState([])
    const [allMembers, setAllMembers] = useState([])
    const [allBooks, setAllBooks] = useState([])

    const [fromDate, setFromDate] = useState(null)
    const [fromDateString, setFromDateString] = useState(null)

    const [toDate, setToDate] = useState(null)
    const [toDateString, setToDateString] = useState(null)



  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books/search?query=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };


   /* Adding a Transaction */
   const addTransaction = async (bookId, borrowerId, bookName, borrowerName, transactionType, fromDate) => {
    // e.preventDefault()
    // setIsLoading(true)
    console.log(bookId, borrowerId, bookName, borrowerName, transactionType, fromDate, borrowerEmail);
    if (bookId !== "" && borrowerId !== "" && transactionType !== "" && fromDate !== null ) {
        const borrower_details = await axios.get(API_URL + "api/users/getuser/" + borrowerId)
        const book_details = await axios.get(API_URL + "api/books/getbook/" + bookId)
        console.log("Borrwer details: ", borrower_details);
        console.log("borrower emaill: ", borrower_details.data.email);
        console.log("book_details : ", book_details);
        /* Checking weather the book is available or not */
        if ((book_details.data.bookCountAvailable > 0 && (transactionType === "Issued" || transactionType === "Reserved")) || (book_details.data.bookCountAvailable === 0 && transactionType === "Reserved")) {
            const transactionData = {
                bookId: bookId,
                borrowerId: borrowerId,
                borrowerName: borrowerName,
                bookName:  bookName,
                transactionType: transactionType,
                fromDate: fromDate,
                borrowerEmail:borrower_details.data.email,
                toDate: toDateString,
                // isAdmin: user.isAdmin
                // isAdmin: isAdmin
            }
            console.log("Transaction Data: ", transactionData);
            try {
                const response = await axios.post(API_URL + "api/transactions/add-transaction", transactionData)
                if (recentTransactions.length >= 5) {
                    (recentTransactions.splice(-1))
                }

                const updatedResults = searchResults.map(book => {
                  if (book._id === bookId) {
                    return {
                      ...book,
                      bookCountAvailable: book.bookCountAvailable - 1,
                      bookStatus: (book.bookCountAvailable - 1) > 0 ? 'Available' : 'Unavailable'
                    };
                  }
                  return book;
                });
          
                // Update the state with new search results
                setSearchResults(updatedResults);
          
                // Show success message
                alert('Book reserved successfully!');
                console.log(response.data)
                await axios.put(API_URL + `api/users/${response.data._id}/move-to-activetransactions`, {
                    userId: borrowerId,
                    // isAdmin: user.isAdmin
                    // isAdmin: isAdmin
                })

                await axios.put(API_URL+"api/books/updatebook/"+bookId,{
                    // isAdmin:user.isAdmin,
                    // isAdmin: isAdmin,
                    bookCountAvailable:book_details.data.bookCountAvailable - 1
                })

                // setRecentTransactions([response.data, ...recentTransactions])
                // // setBorrowerId("")
                // setBookId("")
                // // setTransactionType("")
                // setFromDate(null)
                // setToDate(null)
                // setFromDateString(null)
                // setToDateString(null)
                // alert("Transaction was Successfull 🎉")
            }
            catch (err) {
                console.log(err)
            }
        }
        else{
            alert("The book is not available")
        }
    }
    else {
        alert("Fields must not be empty")
    }
    setIsLoading(false)
}

  return (
    <div className="book-search-container">
      <h2>Book Search</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter book name or category"
        className="book-search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results</h3>
          <table className="book-table">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Author</th>
                
                <th>Language</th>
                <th>Publisher</th>
                <th>Available Count</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((book) => (
                <tr key={book._id}>
                  <td>{book.bookName}</td>
                  <td>{book.author}</td>
                 
                  <td>{book.language}</td>
                  <td>{book.publisher}</td>
                  <td>{book.bookCountAvailable}</td>
                  <td>{book.bookStatus}</td>
                  <td>
                    {book.bookStatus === 'Available' && (
                      <button  onClick={() =>
                        addTransaction(
                          book._id,
                          borrowerId, // Assuming borrowerId is available in scope
                          book.bookName,
                          studentName, // Use studentName as borrowerName
                          'Reserved', // Transaction type can be 'Reserved'
                          new Date().toISOString(), // Current date as fromDate
                          new Date(new Date().setDate(new Date().getDate() + 3)).toISOString()
                        )
                      } className="reserve-button">
                        Reserve
                      </button>
                    )}
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookSearch;
