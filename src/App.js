import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Cards, SearchBar, HeadBar} from './Components';


class App extends Component {


  render() {
    return (
      <div>
        <HeadBar></HeadBar>
        <Cards></Cards>
        <SearchBar></SearchBar>
      </div>
    )
  }
}

export default App;

