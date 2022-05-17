import React, { useState, useRef } from 'react';
import { API } from "../../../Config";

const Clear = (props) => {
    const [Loader, setLoader] = useState(false);
    const result = useRef();

    const saveGame = () => {
        setLoader(true)
        let data = {};

        data['result'] = result.current.value;
        data['email'] = JSON.parse(localStorage.getItem('users')).email;
        data['name'] = JSON.parse(localStorage.getItem('users')).name;
        data['uid'] = JSON.parse(localStorage.getItem('users')).id;


        fetch(API + "/histryplayer", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(data)
        }).then((response) => {
            setLoader(false)
            if (response.status == 200) {
                response.json().then((resp) => {
                    console.log("results", resp);
                    window.location.href = "/dashboard";

                });
            }
            else {
                alert("invalid login")
            }

        })



    }

    const clearScores = () => {
        props.setWins(0)
        props.setLosses(0)
        props.setTies(0)
    }
    const clearBoard = () => {
        var newBoard = ['_', '_', '_', '_', '_', '_', '_', '_', '_']
        props.setBoard(newBoard)
        props.setDisplayMessage('')
    }
   
    return (
        <center>
            <div className='Display_bg'>
                <input value={props.displayMessage} ref={result} />
             
            </div>
           {
               props.displayMessage.length > 1 &&
                <button className='Clear_bg' onClick={saveGame}>
                Save Game
                {
                    Loader &&
                    <div id="loader"></div>
                }
            </button>
           }
            {/* <button className='Clear_bg' onClick={() => clearBoard()}>
                CLEAR BOARD
            </button> */}
        </center>
    )
}
export default Clear;