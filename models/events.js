const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var eventsSchema = new mongoose.Schema({
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model("Events", eventsSchema);