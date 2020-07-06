import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Cards, SearchBar, HeadBar, Chart, RadialChart, LineChart } from './Components';
import { fetchData } from './api';
import AOS from "aos";
import "aos/dist/aos.css";

class App extends Component {

  state = {
    data: {},
    location: '',
  }

  async componentDidMount() {
    const fetchedData = await fetchData('MH');
    AOS.init({
      duration : 2000
    })
    this.setState({ data: fetchedData })
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <HeadBar></HeadBar>
        <SearchBar></SearchBar>
        <Cards data={data}></Cards>
        <Chart></Chart>
        <RadialChart></RadialChart>
        <LineChart></LineChart>
        
      </div>
    )
  }
}

export default App;

