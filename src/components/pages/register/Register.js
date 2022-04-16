import React, { useEffect, useRef,useState } from "react";
import { useNavigate } from 'react-router-dom';
import validator from 'validator'


const Register = () => {

    const name = useRef();
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState('')

    const validateEmail = (e) => {
        var email = e.target.value

        if (validator.isEmail(email)) {
            setEmailError('Valid Email :)')
        } else {
            setEmailError('Enter valid Email!')
        }
    }

    useEffect(()=>{
        const auth = localStorage.getItem('users');
        if(auth){
            navigate("/dashboard");
        }
    })


    const saveRegister = () => {
        let data = {};

        data['name'] = name.current.value;
        data['email'] = email.current.value;
        data['password'] = password.current.value;


        fetch("http://localhost:3001/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body:JSON.stringify(data)
        }).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {
                    // console.log("results", resp);
                    localStorage.setItem("users",JSON.stringify(resp))
                    navigate("/dashboard");
                });
            }
            else {
                alert("network error")
            }

        })



    }

    return (
        <div>
            <div className="register-bg">
                <div className="regidter-box">
                    <ul className="register-list">
                        <li>
                            <input placeholder="Enter Name" ref={name} />
                        </li>
                        <li>
                            <input type="text" id="userEmail"
                                onChange={(e) => validateEmail(e)} placeholder="Enter Email" ref={email} />
                            <span style={{
                                fontWeight: 'bold',
                                color: 'red',
                            }}>{emailError}</span>
                        </li>
                        <li>
                            <input placeholder="Enter Password" ref={password} />
                        </li>
                    </ul>
                    <div className="register-btn">
                        <button onClick={saveRegister}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Register;