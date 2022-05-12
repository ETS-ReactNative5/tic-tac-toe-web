import React, {useEffect,useRef,useState} from "react";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { VictoryPie } from "victory-pie";

import MaterialTable from "material-table";
import Header from "../Header";
import { API } from "../../../Config";



const Dashboard = ()=>{
    const [namelist, setNamelist] = useState([]);
    const [data, setData] = useState([]);
    const [xAxis,setXaxis] = useState([]);
    const [yAxis,setYaxis] = useState([]);
    const [dateArray,setDateArray] = useState([]);
    const [lossArray,setLossArray] = useState([]);
    const [winAraay,setWinAraay] = useState([]);

  
    useEffect(() => {
        ShowHistory();
        getUserlistByid();
        getWinUser();
        getLossUser();
        getwinDaybyid();

    }, []);

    const getUserlistByid = () => {
        const id = JSON.parse(localStorage.getItem('users')).id;

        fetch(API+"/user/list/by/" + id,
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
                    setNamelist(resp.data[0]);
                   
                });
            }
            


        })
    }

    const myData = [
        { x: "Won", y: xAxis },
        { x: "Loss", y: yAxis },
        
      ];
    const getWinUser = () => {
 
     
        const uid = JSON.parse(localStorage.getItem('users')).id;
      
        fetch(API+"/win/by/" + uid,
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
                    setXaxis(resp.result);
                });
            }
            


        })
    }
    const getLossUser = () => {
 
     
        const uid = JSON.parse(localStorage.getItem('users')).id;
      
        fetch(API+"/loss/by/" + uid,
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
                    setYaxis(resp.result);
                });
            }
            


        })
    }

    const ShowHistory = () => {
 
        const name = JSON.parse(localStorage.getItem('users')).name;
        const uid = JSON.parse(localStorage.getItem('users')).id;
        console.log(name)
      
        fetch(API+"/history/list/" + uid,
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
                         
                        })
                    })
                    setData(_temp);


                });
            }
            


        })
    }


    const getwinDaybyid = () => {
     
        const uid = JSON.parse(localStorage.getItem('users')).id;
      
        fetch(API+"/get/winday/" + uid,
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
                    setDateArray(resp.dateArray);
                    setWinAraay(resp.winAraay);
                    setLossArray(resp.lossArray);
                });
            }
            
        })
    }

    return(
        <div className="recordlist-bg">
            <Header />
            <div className="container">
                <div className="heading-dashboard">
                    {
                        <h3>Welcome {namelist.name},</h3>
                    }
                </div>
                <div className="row">
                    <div className="col-lg-6">
                    <div className="chart-box">
                            <Bar data={{
                                labels: dateArray,
                                datasets: [{
                                    label: 'Won',
                                    data:winAraay,
                                    backgroundColor: "green"
                                },
                                {
                                    label: 'Loss',
                                    data:lossArray,
                                    backgroundColor: "red"
                                }
                            ]
                            }}
                            options={{
                                scales:{
                                    yAxis:[
                                        {
                                            
                                            ticks:{
                                                beginAtZero: true
                                            }
                                        }
                                    ]
                                }
                            }}

                             />
                    </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="chart-box">
                        <VictoryPie
                            data={myData}
                            colorScale={["blue", "red"]}
                            radius={100}
                        />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
            <div className="table-box">
            <div style={{ maxWidth: "100%" }} className="table-box">
                        <MaterialTable options={{
                                    headerStyle:{backgroundColor:'#000',color:'#fff'},
                                    search: false,
                                    showTitle: false,
                                    toolbar:false,
                            }}
                            columns={[
                               
                                { title: "User name", field: "username" },
                                { title: "Date", field: "Date" },
                                { title: "Email", field: "email" },
                                { title: "Result", field: "Result" },
                                
                                
                               
                            ]}
                            data={data}
                           
                        />
                    </div>
            </div>
            </div>
        </div>
    )

}

export default Dashboard;