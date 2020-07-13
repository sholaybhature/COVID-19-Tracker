import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Cards, SearchBar, HeadBar, Chart, RadialChart, LineChart,AgeChart, Footer } from './Components';
import { fetchData,growthRate, fetchNationalData } from './api';
import AOS from "aos";
import "aos/dist/aos.css";
import { listState } from './Components/CountryPicker/CountryPicker';
console.log(fetchNationalData())
class App extends Component {

  state = {
    data: {},
    location: '',
  }

  async componentDidMount() {
    const fetchedData = await fetchNationalData();
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

