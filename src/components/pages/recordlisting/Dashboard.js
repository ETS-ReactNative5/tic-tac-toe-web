import React, {useEffect,useRef} from "react";
import Plot from 'react-plotly.js';
import MaterialTable from "material-table";
import Header from "../Header";


const Dashboard = ()=>{

    return(
        <div className="recordlist-bg">
            <Header />
            <div className="container">
                <div className="heading-dashboard">
                    <h3>Dashboard</h3>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                    <div className="chart-box">
                        <Plot style={{width: "100%", height: "240px"}}
                            data={[
                            {
                                x: [1, 2, 3,4,5,6,7,8],
                                y: [2, 5, 3,7,4,1,8],
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: {color: 'red'},
                            },
                            {type: 'bar', x: [1, 2, 3,4,5,6,7,8], y: [2, 5, 3,7,4,1,8]},
                            ]}
                            layout={ { 
                            showlegend: false,
                            margin: {
                                l: 0,
                                r: 30,
                                b: 20,
                                t: 10,
                                pad: 4
                            },} }
                        />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="chart-box">
                        <Plot style={{width: "100%", height: "240px"}}
                            data={[
                            {
                                x: [1, 2, 3],
                                y: [2, 6, 3],
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: {color: 'red'},
                            },
                            {type: 'line', x: [1, 2, 3], y: [2, 5, 3]},
                            ]}
                            layout={ { 
                            showlegend: false,
                            margin: {
                                l: 30,
                                r: 0,
                                b: 20,
                                t: 10,
                                pad: 4
                            },} }
                        />
                        </div>
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
                                { title: "Date", field: "date" },
                                { title: "Win", field: "win" },
                                { title: "Loss", field: "loss" }, 
                                { title: "Action", field: "Action" },
                                
                               
                            ]}
                            data={[
                                { 
                                    username: "Shayam",
                                    date: "4-4-2022",
                                    win: "won",
                                    loss: "loss",
                                    Action: <ul className="action-list">
                                    <li><a href="#" >delete</a></li>
                                    
                                </ul>
                                  
                                },

                                
                               
                                
                            ]}
                            title="Courses Details"
                        />
                    </div>
            </div>
            </div>
        </div>
    )

}

export default Dashboard;