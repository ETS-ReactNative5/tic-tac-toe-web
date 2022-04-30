import React, {useEffect,useRef,useState} from "react";
import Plot from 'react-plotly.js';
import MaterialTable from "material-table";
import Header from "../Header";
import { API } from "../../../Config";
import { useParams } from "react-router-dom";


const PatientHistory = ()=>{
    const [data, setData] = useState([]);
    const {Patienthistory} = useParams();
  
    useEffect(() => {
        doctorList();

    }, []);


    const doctorList = () => {
        
        fetch(API+"/get/single/user/history/list/" + Patienthistory,
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
                            Date: new Date(v.date).toLocaleString(),
                            Result: v.result,
                            Action: <ul className="action-list">
                            <li><a href={"/owner/edit/patient/history/" + v.id}>Edit</a></li>
                            <li><a href="#">Delete</a></li>
                        </ul>
                        })
                    })
                    setData(_temp);


                });
            }
            


        })
    }

    return(
        <div className="recordlist-bg">
            <Header />
            <div className="container">
                <div className="heading-dashboard">
                   <h3>Patient History</h3>
                </div>
                
            </div>
            <div className="container">
            <div className="table-box">
            <div style={{ maxWidth: "100%" }} >
                        <MaterialTable options={{
                                    search: false,
                                    showTitle: false,
                                    toolbar:false,
                            }}
                            columns={[
                               
                                { title: "User name", field: "username" },
                                { title: "Date", field: "Date" },
                                { title: "Email", field: "email" },
                                { title: "Result", field: "Result" },
                                { title: "Action", field: "Action" },
                            ]}
                            data={data}
                           
                        />
                    </div>
            </div>
            </div>
        </div>
    )

}

export default PatientHistory;