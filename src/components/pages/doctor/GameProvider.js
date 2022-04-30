import React, {useEffect,useRef,useState} from "react";
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import MaterialTable from "material-table";
import Header from "../Header";
import validator from 'validator';
import { API } from "../../../Config";


const GameProvider = ()=>{
    const [namelist, setNamelist] = useState([]);
    const [data, setData] = useState([]);
    const [addformModel, setAddformModel] = useState(false);
    const addformModelToggle = () => setAddformModel(!addformModel);
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const [emailError, setEmailError] = useState('')
 
  
    useEffect(() => {
        usertype3Histroylist();

    }, []);

  
    const usertype3Histroylist = () => {
 
        const doctor = JSON.parse(localStorage.getItem('users')).id;
        console.log(doctor)
      
        fetch(API+"/get/patient/list/" + doctor,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',

                },
            }
        ).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {
                    console.warn("result", resp);
                    let _temp = [];
                    resp.data.map((v, i) => {
                        _temp.push({
                            username: v.name,
                            email: v.email,
                            Action: <ul className="action-list">
                            <li><a href={"/GameProvider/" + v.id} className="view-patient">View</a></li>
                            <li><a href={"/doctor/edit/patient/profile/" + v.id} className="view-patient">Edit</a></li>
                            {/* <li><a href="#">Delete</a></li> */}
                          
                        </ul>
                        })
                    })
                    setData(_temp);


                });
            }
            


        })
    }

    const saveGameProvider = () => {
        const doctor = JSON.parse(localStorage.getItem('users')).id;
        console.log(doctor);

        let data = {};
        data['name'] = name.current.value;
        data['email'] = email.current.value;
        data['password'] = password.current.value;
        data['UserType'] = 3;
        data['doctor'] = doctor;
      


        fetch(API+"/doctor", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body:JSON.stringify(data)
        }).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {
                    // console.log("results", resp);
                    addformModelToggle();
                });
            }
            else {
                alert("network error")
            }

        })



    }
    const validateEmail = (e) => {
        var email = e.target.value

        if (validator.isEmail(email)) {
            setEmailError('Valid Email :)')
        } else {
            setEmailError('Enter valid Email!')
        }
    }

    return(
        <div className="recordlist-bg">
            <Header />
            <div className="container">
                <div className="head-game-provider">
                    <div className="game-provider-child">
                        <h3>Game</h3>
                    </div>
                    <div className="game-provider-child">
                        <a href="#" onClick={addformModelToggle}>Add patient</a>
                    </div>
                </div>
            </div>
            <div className="container">
            <div className="table-box">
            <div style={{ maxWidth: "100%" }} className="table-box">
                        <MaterialTable options={{
                                    search: false,
                                    showTitle: false,
                                    toolbar:false,
                            }}
                            columns={[
                               
                                { title: "User name", field: "username" },
                                { title: "Email", field: "email" },
                                { title: "Action", field: "Action" },
                                
                                
                            ]}
                            data={data}
                           
                        />
                    </div>
            </div>
            </div>
            <Modal isOpen={addformModel} toggle={addformModelToggle} centered={true} className="main-pop-box">
                <ModalHeader toggle={addformModelToggle}><span className="ml-1 modal-title2">Game Provider</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                    <div className="gameprovider-box">
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
                        <button onClick={saveGameProvider}>Add</button>
                        
                    </div>
                </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )

}

export default GameProvider;