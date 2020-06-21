import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Cards, SearchBar} from './Components';


class App extends Component {


  render() {
    return (
      <div>
        <Cards></Cards>
        <SearchBar></SearchBar>
      </div>
    )
  }
}

export default App;

