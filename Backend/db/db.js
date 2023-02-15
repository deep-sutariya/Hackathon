const mongoose = require('mongoose');

const DBConnection = () =>{
    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb+srv://deep:deep@cluster0.zickbgf.mongodb.net/ProjectManagement");
    
    const con = mongoose.connection;

    con.once('open', ()=>{
        console.log("DB Connected");
    })
}

module.exports = DBConnection;