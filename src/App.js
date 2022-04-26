import React from 'react';
import {BrowserRouter, Routes ,Route,Switch} from 'react-router-dom';
import './components/css/style.css';
import './App.css';

import Home from './components/pages/home/Home';
import Login from './components/pages/login/Login'
import Register from './components/pages/register/Register';
import Game from './components/pages/game/Game';
import Dashboard from './components/pages/recordlisting/Dashboard';
import GameStart from './components/pages/game/GameStart';
import Private from './components/component/Privateroute'
import ResetPassword from './components/pages/resetpassword/ResetPassword'

function App(){
	return(
		<BrowserRouter>			
			<Routes>
				<Route element={<Private />}>
					<Route path="/game" element={<Game />} />
					<Route path="/game/start" element={<GameStart />} />
					<Route path="/dashboard" element={<Dashboard />} />
					</Route>
					<Route path="/reset/password/:token" element={<ResetPassword />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/" element={<Home />} />
			</Routes>
	</BrowserRouter>
	)
}

export default App;
