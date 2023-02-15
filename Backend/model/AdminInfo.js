const mongoose = require('mongoose');

const AdminInfo = new mongoose.Schema({
    aemail: { type: String, required: true},
    aname: { type: String, required: true },
    aphone: { type: String, required: true },
    apass: { type: String, required: true },
}, {timestamps: true});

module.exports = mongoose.model("AdminInfo", AdminInfo);