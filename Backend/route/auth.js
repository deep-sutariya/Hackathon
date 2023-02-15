const router = require('express').Router();
const bcrypt = require('bcryptjs')
require('dotenv').config();
const jwt = require('jsonwebtoken');

const PMInfo = require("../model/PMInfo");
const AdminInfo = require("../model/AdminInfo");
const pmhashpassword = require("../middleware/pmhashpassword");


router.post('/pmlogin', async (req, res) => {
    const { pemail, ppass } = req.body;

    const user = await PMInfo.findOne({ pemail: pemail });
    if (user) {
        if (await bcrypt.compare(ppass, user.ppass)) {

            var token = jwt.sign({ email: user.pemail, pass: ppass }, `${process.env.TOCKEN_PRIVATE_KEY}`);

            res.cookie("token", token, {
                expires: new Date(Date.now() + 1800000),  //30 Min
                httpOnly: false
            });

            res.cookie("type", "pm", {
                expires: new Date(Date.now() + 1800000),  //30 Min
                httpOnly: false
            });

            res.status(200).send({
                data: user,
                message: `Hello ${user.pname}, You Logged in successfully!`,
            });

        } else
            res.status(201).send({ message: "Error! : *** Invalid Password ***" });
    } else {
        res.status(202).send({ message: "Error! : *** userNotfound ***" });
    }
})

router.post('/adminlogin', async (req, res) => {
    const { pemail, ppass } = req.body;
    const user = await AdminInfo.findOne({ aemail: pemail });

    if (user) {
        if (await bcrypt.compare(ppass, user.apass)) {

            var token = jwt.sign({ email: user.aemail, pass: apass }, `${process.env.TOCKEN_PRIVATE_KEY}`);

            res.cookie("token", token, {
                expires: new Date(Date.now() + 1800000),  //30 Min
                httpOnly: false
            });

            res.cookie("type", "admin", {
                expires: new Date(Date.now() + 1800000),  //30 Min
                httpOnly: false
            });

            res.status(200).send({
                data: user,
                message: `Hello Admin ${user.aname}, You Logged in successfully!`,
            });

        } else
            res.status(201).send({ message: "Error! : *** Invalid Password ***" });
    } else {
        res.status(202).send({ message: "Error! : *** userNotfound ***" });
    }
})

router.post("/signup", pmhashpassword, async (req, res) => {
    const userexist = await PMInfo.findOne({ pemail: req.body.pemail });
    if (userexist) res.status(202).send({ message: "Email already exists" });
    else {
        const user = new PMInfo({
            pemail: req.body.pemail,
            pname: req.body.pname,
            pphone: req.body.pphone,
            ppass: req.body.ppass,
        });

        const data = await user.save();
        console.log(data);
        res.status(200).send({
            data: data,
            message: `Hello, ${data.pname} You Registered Successfully`,
        });
    }
});

// router.post("/adminsignup", pmhashpassword, async (req, res) => {
//     const user = new AdminInfo({
//         aemail: req.body.aemail,
//         aname: req.body.aname,
//         aphone: req.body.aphone,
//         apass: req.body.apass,
//     });

//     const data = await user.save();
//     console.log(data);
//     res.status(200).send({
//         data: data,
//         message: `Hello, ${data.aname} You Registered Successfully`,
//     });
// });

module.exports = router;