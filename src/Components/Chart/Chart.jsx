import React, { useState, useEffect } from "react";
import { fetchData, fetchDailyData } from '../../api';
import * as d3 from "d3";

//confirmed,deceased,recovered
function GetData() {

    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    }, []);



    // const LineChart = () => {
    //     var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    //         width = 460 - margin.left - margin.right,
    //         height = 400 - margin.top - margin.bottom;

    //     var svg = d3.select('.LineChart')
    //         .append("svg")
    //         .attr("width", width + margin.left + margin.right)
    //         .attr("height", height + margin.top + margin.bottom)
    //         .append("g")
    //         .attr("transform",
    //             "translate(" + margin.left + "," + margin.top + ")");
    //     console.log(dailyData.date)

    //     // var x = d3.scaleTime()
    //     //     .domain(d3.extent(dailyData.date))
    //     //     .attr("transform","translate(0,"+height+")")
    //     //     .call(d3.axisBottom(x));
    // }

    return (
        <div>
            <div className="LineChart">
                <LineChart dailyData={dailyData} />
            </div>
        </div>)
};

function LineChart(props) {
    if (props.dailyData.date) {
        var margin = { top: 10, right: 30, bottom: 30, left: 60 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        var svg = d3.select('.LineChart')
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        // console.log(d3.extent(props.dailyData.date))
        const xScale = d3.scaleTime().range([0, width]);
        const yScale = d3.scaleLinear().rangeRound([height, 0]);
        var x = d3.scaleTime()
            .domain(d3.extent(props.dailyData.date))
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        var y = d3.scaleLinear()
            .domain([0, d3.max(props.dailyData.recovered)])
            .rangeRound([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y))


        var obj = [];
        // obj[0]={date:props.dailyData.recovered[0],cases:props.dailyData.recovered[4]}
        //  obj[1]={date:props.dailyData.recovered[4],cases:props.dailyData.recovered[6]}
        for (var i = 0; i < props.dailyData.recovered.length - 1; i++) {
            obj[i] = {date: props.dailyData.date[i], cases: props.dailyData.recovered[i]}
        }
        console.log(obj)
        svg.append("path")
      .datum(obj)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.cases) })
        )
            
    }
    return (<div>1</div>)
}

export default GetData;
