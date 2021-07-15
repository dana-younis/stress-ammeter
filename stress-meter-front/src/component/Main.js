import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../App';
import User from './User';

import io from 'socket.io-client';
import Navbarnav from './Navbarnav';
const SERVER_URL = process.env.SERVER_URL || 'localhost:5000/';
const socket = io(SERVER_URL, { transports: ['websocket'] });
function Main(props) {
  return (
    <>
      <Navbarnav />
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} socket={socket} />} />
        <Route path="/users" render={(props) => <User {...props} socket={socket} />} />

        <Route>
          <div>404</div>
        </Route>
      </Switch>
    </>
  );
}

export default Main;