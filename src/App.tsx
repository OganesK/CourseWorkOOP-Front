import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    )
  }
}

export default App;
