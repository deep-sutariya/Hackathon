import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

import userlogo from '../assets/userlogo.jfif';

const Login = async() => {

    const navigate = useNavigate();
    var data;
    const [loginoption, setLoginOption] = useState("pm");

    const [user, setuser] = useState({
        pemail: "",
        ppass: "",
    });


    const handleRestaurent = () => {
        setLoginOption("admin");
        document.getElementById('pm').style.backgroundColor = "white";
        document.getElementById('admin').style.backgroundColor = "var(--light)";
    }
    const handleUser = () => {
        setLoginOption("pm");
        document.getElementById('admin').style.backgroundColor = "white";
        document.getElementById('pm').style.backgroundColor = "var(--light)";
    }

    let name, value;
    function change(e) {
        name = e.target.name;
        value = e.target.value;
        setuser({ ...user, [name]: value });
        e.preventDefault();
    }

    async function loginchecker(e) {
        let loginmsg = document.getElementById("loginmsg");
        e.preventDefault();
        if (loginoption === "") {
            loginmsg.innerText = "Error! : *** Select Login Option ***";
            loginmsg.style = 'color:red;';
        }
        else {
            try {
                data = await axios.post(`/${loginoption}login`, {
                    pemail: user.pemail,
                    ppass: user.ppass,
                });
                if (data.status === 200) {

                    if (loginoption === "pm") {
                        alert(`${data.data.message}`);
                        navigate("/pmhome")
                    }
                    else {
                        alert(`${data.data.message}`);
                        navigate("/adminhome");
                    }

                } else {
                    loginmsg.innerText = data.data.message;
                    loginmsg.style = 'color:red;';
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className='login_main'>
            <div className="login_container">

                <div className="login_heading">
                    <h1>Login</h1>
                </div>

                <div className="login_option">
                    <div className="admin" id="admin" onClick={handleRestaurent}>
                        <img className="logo" src={userlogo} alt="Userlogo" />
                        <span>Admin</span>
                    </div>
                    <div className="pm" id="pm" onClick={handleUser}>
                        <img className="logo" src={userlogo} alt="Userlogo" />
                        <span>Project Manager</span>
                    </div>
                </div>

                <form onSubmit={loginchecker} className="inside_form">
                    <div className="field input-field">
                        <input type="email" placeholder="Email" className="input" name="pemail" value={user.uemail} onChange={change} required />
                    </div>

                    <div className="field input-field">
                        <input
                            type="password"
                            placeholder="Password"
                            className="password"
                            name="ppass" value={user.upass} onChange={change} required
                        />
                        <i className="bx bx-hide eye-icon"></i>
                    </div>

                    <div className="form-link">
                        <Link to="#" className="forgot-pass">
                            Forgot password?
                        </Link>
                    </div>
                    <span id="loginmsg"></span>
                    <div className="field button-field">
                        <button type="submit">Login</button>
                    </div>
                </form>

                <div className="form-link">
                    <span>
                        Don't have an account? {" "}
                        <Link to="/signup" className="link signup-link">
                            Signup
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Login