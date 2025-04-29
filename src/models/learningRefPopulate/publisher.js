const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 50,
    }
})

const Publisher = mongoose.model("Publisher",publisherSchema);

module.exports = Publisher;