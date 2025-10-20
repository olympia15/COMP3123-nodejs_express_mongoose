const express = require("express")
const BookModel = require("../models/book")
const mongoose = require("mongoose")

const routes = express.Router()

//Get All Books
routes.get("/books", (req, res) => {
    BookModel.find({})
    .then((books) => {
        res.status(200).json({
            status: true,
            message: "Books fetched successfully",
            count: books.length,
            data: books
        })
    })
    .catch((err) => {
        res.status(500).json({
            status: false,
            message: err.message
        })
    })
})

//Add NEW Book
routes.post("/books", async (req, res) => {
    const newBookData = req.body
    try{
        const newBookModel = new BookModel(newBookData)
        const newBook = await newBookModel.save()
        res.status(200).json({
            status: true,
            message: "New book added successfully",
            data: newBook
        })
    } catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        })
    }



})

//Update existing Book By Id
routes.put("/book/:bookId", async (req, res) => {
    const bookId = req.params.bookId
    const updateData = req.body

    try{
        if (!mongoose.Types.ObjectId.isValid(bookId)){
            return res.status(400).json({
                status: false,
                message: "Invalid Book ID"
            })
        }

        // logic to update book
        const updatedBook = await BookModel.findByIdAndUpdate(bookId, updateData, {new: true})
        if (!updatedBook){
            return res.status(404).json({
                status: false,
                message: "Book not found"
            })
        }

        res.status(200).json({
            status: true,
            message: "Book updated successfully",
            data: updatedBook
        })
    } catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
})

//Delete Book By ID
routes.delete("/book/:bookId", async (req, res) => {
    const bookId = req.params.bookId

    try{
        if (!mongoose.Types.ObjectId.isValid(bookId)){
            return res.status(400).json({
                status: false,
                message: "Invalid Book ID"
            })
        }

        // logic to delete book
        const deletedBook = await BookModel.findByIdAndDelete(bookId)
        if (!deletedBook){
            return res.status(404).json({
                status: false,
                message: "Book not found"
            })
        }

        res.status(200).json({
            status: true,
            message: "Book deleted successfully",
            data: deletedBook
        })
    } catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
})

//Get Book By ID
routes.get("/book/:bookId", async (req, res) => {
    const bookId = req.params.bookId

    try{
        if (!mongoose.Types.ObjectId.isValid(bookId)){
            return res.status(400).json({
                status: false,
                message: "Invalid Book ID"
            })
        }

        const book = await BookModel.findById(bookId)
        // can also be done like this
        // const book = await BookModel.find(_id: bookId)

        if (!book){
            return res.status(404).json({
                status: false,
                message: "Book not found"
            })
        }

    } catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
})


//Get All Books in sorted order
routes.get("/books/sort", async (req, res) => {
    try{
        const books = await BookModel.find().sort({title: -1}) // descending order
        res.status(200).json({
            status: true,
            message: "Books fetched and sorted successfully",
            count: books.length,
            data: books
        })
    } catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
})

module.exports = routes