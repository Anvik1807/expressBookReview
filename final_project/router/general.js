const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(JSON.stringify(books,null,4))
    },6000)});
    myPromise1.then((successMessage) => {
    console.log("From Callback " + successMessage)
    });
  res.send(JSON.stringify(books,null,4));
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let filteredBook = Object.values(books).filter((book) => book.isbn === isbn);
  if (filteredBook.length > 0) {
  res.send(filteredBook);
  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(JSON.stringify(filteredBook))
    },6000)});
    myPromise1.then((successMessage) => {
    console.log("From Callback " + successMessage)
    });
  } else {
    res.send(`ISBN attribute ${isbn} not found`);
  }
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let filteredBook = Object.values(books).filter((book) => book.author === author);
  if (filteredBook.length > 0) {
  res.send(filteredBook);
  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(JSON.stringify(filteredBook))
    },6000)});
    myPromise1.then((successMessage) => {
    console.log("From Callback " + successMessage)
    });
  } else {
    res.send(`Author ${author} not found`);
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let filteredBook = Object.values(books).filter((book) => book.title === title);
  if (filteredBook.length > 0) {
  res.send(filteredBook);
  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(JSON.stringify(filteredBook))
    },6000)});
    myPromise1.then((successMessage) => {
    console.log("From Callback " + successMessage)
    });
  } else {
    res.send(`Book Title ${title} not found`);
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let filteredBook = Object.values(books).filter((book) => book.isbn === isbn);
  if (filteredBook.length > 0) {
    var string = JSON.stringify(filteredBook);
       var objectValue = JSON.parse(string);
       
  res.send(objectValue[0].reviews);
  } else {
    res.send(`ISBN attribute ${isbn} not found`);
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
