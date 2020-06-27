import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Cards, SearchBar, HeadBar, Chart } from './Components';
import { fetchData, fetchDailyData } from './api';


class App extends Component {
  
  state = {
    data: {},
    location: '',
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
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

