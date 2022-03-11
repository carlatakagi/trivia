import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
      {/* adicionei apenas para teste manual - cypress ainda nao roda
      por causa do click do botao */}
    </Switch>
  );
}
