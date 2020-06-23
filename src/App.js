import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Cards, SearchBar, HeadBar} from './Components';


class App extends Component {


  render() {
    return (
      <div>
        <HeadBar></HeadBar>
        <SearchBar></SearchBar>
        <Cards></Cards>
      </div>
    )
  }
}

export default App;

