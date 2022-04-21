import React, {useEffect,useRef} from "react";
import { useNavigate } from 'react-router-dom';
import { API } from "../../../Config";



const Login = ()=>{

    const name = useRef();
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('users');
        if(auth){
            navigate("/dashboard");
        }
    })
    const savelogin = ()=>{
        let data ={};

        data['email'] = email.current.value;
        data['password'] = password.current.value;
       
    
        fetch(API+"/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
        
                },
                body:JSON.stringify(data)
            }).then((response) => {
                if (response.status == 200) {
                    response.json().then((resp) => {
                        console.log("results", resp);
                        localStorage.setItem("users",JSON.stringify(resp))
                        navigate("/");
                    });
                }
                else {
                    alert("invalid login")
                }
               
            })
    
          
       
    }

    return(
        <div>
        <div className="register-bg">
            <div className="regidter-box">
                <ul className="register-list">
                   
                    <li>
                        <input type="email" placeholder="Enter Email" ref={email} />
                    </li>
                    <li>
                        <input type="password" placeholder="Enter Password" ref={password} />
                    </li>
                </ul>
                <div className="register-btn">
                    <button onClick={savelogin}>Login</button>
                </div>
            </div>
        </div>
    </div>
    )

}

export default Login;