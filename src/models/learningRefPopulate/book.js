const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Author",
  },
  publisher: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Publisher",
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
