const mongoose = require('mongoose');
const {Schema} = mongoose;

const noteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    title: {
        type: String,
        requred: true
    },
    description: {
        type: String,
        requred: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const notes = mongoose.model('Notes', noteSchema);

module.exports = notes;