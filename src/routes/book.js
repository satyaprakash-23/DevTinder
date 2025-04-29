const express = require("express");
const bookRouter = express.Router();
const Book = require("../models/learningRefPopulate/book")
const Author = require("../models/learningRefPopulate/author")
const Publisher = require("../models/learningRefPopulate/publisher")

bookRouter.post("/book/add",async (req,res)=>{
    try{
        const data = new Book(req.body);
        await data.save();
        res.send("Book added");
    }
    catch(err){
        res.send(err.message)
    }
})

bookRouter.post("/author/add",async(req,res)=>{
    try{
        const data = new Author(req.body);
        await data.save();
        res.send("author added")
    }
    catch(err){
        res.send(err.message)
    }
})

bookRouter.post("/publisher/add",async(req,res)=>{
    try{
        const data = new Publisher(req.body);
        await data.save();
        res.send("publisher added successfully")
    }
    catch(err){
        res.send(err.message)
    }
})

bookRouter.get("/get/book",async(req,res)=>{
    const _id = req._id;
    const book = await Book.find(_id).populate("author", "name").populate("publisher","name")
    res.send(book)
})

module.exports = {bookRouter}