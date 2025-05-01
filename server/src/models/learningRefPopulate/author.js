const { MongoInvalidArgumentError } = require("mongodb");
const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        minLength : 2,
        maxLength : 50,
    },


})

const Author = mongoose.model("Author",authorSchema);
module.exports = Author;