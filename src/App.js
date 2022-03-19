import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/settings" component={ Settings } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}
