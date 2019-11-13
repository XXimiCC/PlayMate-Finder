import React from 'react';
import './App.scss';
import {Redirect, Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <>
      <Switch>
        <Route path={'/'} exact component={HomePage} />
        <Redirect to={'/'}/>
      </Switch>
    </>
  );
}

export default App;
