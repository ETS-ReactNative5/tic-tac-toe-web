import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import MaterialTable from "material-table";
import Header from "../Header";
import { API } from "../../../Config";



const PatientHistory = () => {
    const [data, setData] = useState([]);
    const { patient } = useParams();


    useEffect(() => {
        ShowHistory();

    }, []);



    const ShowHistory = () => {

       

        fetch(API + "/get/single/user/history/list/" + patient,
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
                                <li><a href={"/doctor/edit/patient/history/" + v.id}>Edit</a></li>
                                <li><a href="#">Delete</a></li>
                            </ul>
                        })
                    })
                    setData(_temp);


                });
            }



        })
    }

    return (
        <div className="recordlist-bg">
            <Header />

            <div className="container">
                <div className="table-box">
                    <div style={{ maxWidth: "100%" }} className="table-box">
                        <MaterialTable options={{
                            search: false,
                            showTitle: false,
                            toolbar: false,
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