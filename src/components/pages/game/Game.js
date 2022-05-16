import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Header from "../Header";
import { API } from "../../../Config";

class Game extends Component {
  state = {
    Loader: false,
  }
  constructor() {
    super();

    this.state = {
      result: "",
      winner: undefined,
       
      
    };

    

        
    this.gameState = {
        turn: 'X',
        gameLocked: false,
        gameEnded: false,
       board: Array(9).fill(''),
       totalMoves: 0
    }
  }

  componentDidMount() {
    
   
  }


  savadata(){
    this.setState({Loader: true})
    let url = API+"/histryplayer";
    let result = this.state.result;
    const email = JSON.parse(localStorage.getItem('users')).email;
    const name = JSON.parse(localStorage.getItem('users')).name;
    const uid = JSON.parse(localStorage.getItem('users')).id;
   
    fetch(url,{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body:JSON.stringify({result, email,name,uid})
    }).then((response) => {
      this.setState({Loader: false})
      if (response.status == 200) {
          window.location.href = "/dashboard";
          // console.log("nasim")
      }
      else {
          alert("network error")
      }

  })
  }

 

  clicked(box) {
    
    if(this.gameState.gameEnded || this.gameState.gameLocked) return;

    if(this.gameState.board[box.dataset.square] == '') {
      this.gameState.board[box.dataset.square] = this.gameState.turn;
      box.innerText = this.gameState.turn;
      
      this.gameState.turn = this.gameState.turn == 'X' ? 'O' : 'X',
      
      this.gameState.totalMoves++;
    }

    console.log(this.gameState.totalMoves);

    var result = this.checkWinner();
    
    if(result == 'X') {
      this.gameState.gameEnded = true;
     
      this.setState({
        result: 'X',
        result: 'You Won'
      });
    }
     else if(result == 'O') {
      this.gameState.gameEnded = true;
      
      this.setState({
        result: 'O',
        result: 'You Lost'
      });
    } else if(result == 'draw') {
      this.gameState.gameEnded = true;
      this.setState({
        winner: 'draw',
        winnerLine2: 'Match is drawn'
      })
    }
    
    if(this.gameState.turn == 'O' && !this.gameState.gameEnded) {
      this.gameState.gameLocked = true;
      setTimeout(()=> {
        do {
          var random = Math.floor(Math.random()*9);
        } while(this.gameState.board[random] != '');
        this.gameState.gameLocked = false;
        this.clicked(document.querySelectorAll('.square')[random]);
      }, 1000);

    }

  }

  checkWinner() {
    var moves = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6], [0, 1, 2], [3, 4, 5], [6, 7, 8]];
    var board = this.gameState.board;
    for(let i=0;i<moves.length;i++) {
      if(board[moves[i][0]] == board[moves[i][1]] && board[moves[i][1]] == board[moves[i][2]])
          return board[moves[i][0]];
    }

    console.log(this.gameState.totalMoves);
    if(this.gameState.totalMoves == 9) {
      return 'draw';
    }
  }

  render() {

    const {Loader} = this.state;

    return (
      <div>
        <Header />
      <div id="game">
        
          <input id="status" value={this.state.result} name="result" onChange={(data)=>{this.setState({name:data.target.value})}} />
          <div id="status">{this.state.winnerLine2}</div>
          
          
          {/* <div id="head">
              World's best tic tac toe AI
          </div> */}
          <div id="board" onClick={(e)=>this.clicked(e.target)}>
              <div className="square" data-square="0"></div>
              <div className="square" data-square="1"></div>
              <div className="square" data-square="2"></div>
              <div className="square" data-square="3"></div>
              <div className="square" data-square="4"></div>
              <div className="square" data-square="5"></div>
              <div className="square" data-square="6"></div>
              <div className="square" data-square="7"></div>
              <div className="square" data-square="8"></div>
          </div>
         
          <button className="save-game" onClick={()=>{this.savadata()}}>Save Game
                          {
                                Loader && <div id="loader"></div>       
                            }
          </button>
      </div>      
      </div>
    );
  }
}

export default Game;
