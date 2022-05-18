import { Computer } from '@material-ui/icons';
import React, { useState } from 'react';

// import Display from '../DisplayMessage/Display';


const Board = (props) => {

// const [board, setBoard] = useState(['_', '_', '_', '_', '_', '_', '_', '_', '_'])
// alert(board)
  const buttonClicked = (index) => {
      var boardCopy = [...props.board]
      if (props.board[index] === '_'){
          boardCopy[index] = 'X'
        if (checkwin(boardCopy)) {
          props.setBoard(boardCopy)
          props.setDisplayMessage("You Won")
          return
        }
       
        var finalBoard = ComputerTurn(boardCopy)

        props.setBoard(finalBoard)
      }
      
      if(props.board[index].length == 'XXXXX'){
        props.setDisplayMessage("Draw")
      }
      
      
  }
  
  const ComputerTurn = (boardCopy) => {
   var newBoard = winTurn(boardCopy, 'O')
   if (newBoard !== null){
    for (let i = 0; i < newBoard.length; i++){
      if (newBoard[i] === '_'){
        newBoard[i] = '-'
      }
    }
    props.setDisplayMessage("You Lost")
    const lossesValue = props.losses + 1
    props.setLosses(lossesValue)
     return newBoard
   }

   newBoard = winTurn(boardCopy, 'X')
   if (newBoard !== null){
     return newBoard
   }

    for (let i = 0; i < boardCopy.length; i++){
        if (boardCopy[i] === '_'){
          boardCopy[i] = 'O'
          return boardCopy
      }
    }
    return boardCopy
    
  }
   const winTurn = (boardCopy, letter) => {
    const winWays = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
    for(let j =0; j < winWays.length; j++){
      const str = boardCopy[winWays[j][0]] + boardCopy[winWays[j][1]] + boardCopy[winWays[j][2]]
      var comparestr = '_' + letter + letter
      if (str === comparestr){
        boardCopy[winWays[j][0]]= 'O'
        return boardCopy
      }
      comparestr = letter + '_' + letter
      if (str ===  comparestr){
        boardCopy[winWays[j][1]]= 'O'
        return boardCopy
      }
      comparestr = letter + letter + '_'
      if (str === comparestr){
        boardCopy[winWays[j][2]]= 'O'
        return boardCopy
      }

    }
    return null
   } 

   const checkwin = (boardCopy) => {
    const winWays = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
    for (let i = 0; i < winWays.length; i++) {
      const str = boardCopy[winWays[i][0]] + boardCopy[winWays[i][1]] + boardCopy[winWays[i][2]]
    
      if (str === 'XXX'){
        var newBoard = boardCopy
        for (let j = 0; j < newBoard.length; j++) {
          if (newBoard[j] === '_'){
            newBoard[j] = '-'
          }
        }
        var newWins = props.wins + 1
        props.setWins(newWins)
        return true
      }
      
    }
    return false
   }

    return (
      <div>
      <div className='game01_bg'>
      <button className='board-game'  onClick={() => buttonClicked(0)}>{props.board[0]}</button> <button className='board-game' onClick={() => buttonClicked(1)}>{props.board[1]}</button> <button className='board-game' onClick={() => buttonClicked(2)}>{props.board[2]}</button> <br />
      <button className='board-game' onClick={() => buttonClicked(3)}>{props.board[3]}</button> <button className='board-game' onClick={() => buttonClicked(4)}>{props.board[4]}</button> <button className='board-game' onClick={() => buttonClicked(5)}>{props.board[5]}</button> <br />
      <button className='board-game' onClick={() => buttonClicked(6)}>{props.board[6]}</button> <button className='board-game' onClick={() => buttonClicked(7)}>{props.board[7]}</button> <button className='board-game' onClick={() => buttonClicked(8)}>{props.board[8]}</button> <br />
  </div>
  <div>
  </div>
      </div>
     
    );
  }

export default Board;
