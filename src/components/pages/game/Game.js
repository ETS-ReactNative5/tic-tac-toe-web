import React, { useState } from 'react';
import Header from "../Header";
import { API } from "../../../Config";

import Board from '../board/Board';
import Clear from '../Buttons/Clear';

function Game() {

	const [board, setBoard] = useState(['_', '_', '_', '_', '_', '_', '_', '_', '_'])
	const [displayMessage, setDisplayMessage] = useState(' ')
	const [wins, setWins] = useState(0)
	const [ties, setTies] = useState(0)
	const [losses, setLosses] = useState(0)

  

	return (
		<div>
      <Header />
			<div>
				<Board 
					board={board}
					setBoard={setBoard}
					displayMessage={displayMessage}
					setDisplayMessage={setDisplayMessage}
					wins={wins} setWins={setWins}
					ties={ties} setTies={setTies}
					losses={losses} setLosses={setLosses}
				/>
		
				<Clear displayMessage={displayMessage}
        wins={wins}
        ties={ties}
        losses={losses}
					setBoard={setBoard}
					setDisplayMessage={setDisplayMessage}
					setWins={setWins}
					setLosses={setLosses}
					setTies={setTies}
				/>
			</div>
			
		</div>
	)
}

export default Game;