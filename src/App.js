import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Cards, SearchBar, HeadBar, Chart } from './Components';
import { fetchData, fetchDailyData,fetchDailyDataAll } from './api';
import {listState} from './Components/CountryPicker/CountryPicker'
console.log(fetchDailyDataAll(listState))
//37 size
class App extends Component {
  
  state = {
    data: {},
    location: '',
  }

  async componentDidMount() {
    const fetchedData = await fetchData('MH');
    this.setState({ data: fetchedData })
  }

  render() {
    const {data} = this.state;
    return (
      <div>
        <HeadBar></HeadBar>
        <SearchBar></SearchBar>
        <Cards data={data}></Cards>
        <Chart></Chart>

        
      </div>
    )
  }
}

export default App;

