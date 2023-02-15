const mongoose = require('mongoose');

const PMInfo = new mongoose.Schema({
    pemail: { type: String, required: true},
    pname: { type: String, required: true },
    pphone: { type: String, required: true },
    ppass: { type: String, required: true },
}, {timestamps: true});

module.exports = mongoose.model("PMInfo", PMInfo);