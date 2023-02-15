const bcrypt = require('bcryptjs');

const pmhashpassword = async(req,res,next)=>{

    try{
        req.body.ppass = await bcrypt.hash(req.body.ppass, 10);
        next();
    }catch(E){
        console.log(E);
        res.status(404).send({message : "Error In Middleware"});
    }
}

module.exports = pmhashpassword