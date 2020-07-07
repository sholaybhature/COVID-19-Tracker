import React, { useState, useEffect } from "react";
import { fetchData, fetchDailyData,fetchDailyDataAll } from '../../api';
import * as d3 from "d3";
import './Chart.css';
import {listState} from '../CountryPicker/CountryPicker';

//confirmed,deceased,recovered
function GetData() {

    const [dailyData, setDailyData] = useState([]);
    const [dailyDataAll, setDailyDataAll] = useState([]);

    useEffect(() => {
        
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData('MH'));
            //setDailyDataAll(await fetchDailyDataAll(listState));
        }
        fetchAPI();
    }, []);
    

    return (
        <div>
            <div className="LineChart-Cards">
                <LineChart dailyData={dailyData} chartName={"recovered"} color={'#28A745'} />
            </div>
            <div className="LineChart-Cards">
                <LineChart dailyData={dailyData} chartName={"deceased"} color={'#6C757D'} />
            </div>
            <div className="LineChart-Cards">
                <LineChart dailyData={dailyData} chartName={"active"} color={'#007BFF'} />
            </div>
            <div className="LineChart-Cards">
                <LineChart dailyData={dailyData} chartName={"confirmed"} color={"#FF073A"} />
            </div>

        </div>)
};

function LineChart(props) {
    if (props.dailyData.date) {
        var margin = { top: 10, right: 30, bottom: 30, left: 60 },
            width = 300 - margin.left - margin.right,
            height = 150 - margin.top - margin.bottom;

        var svg = d3.select('#' + props.chartName)
            .append("svg")
            .classed("svg-container", true)
            //.attr("preserveAspectRatio", "xMinYMin meet")
            // .attr("viewBox", "0 0 360 200")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .call(responsivefy)
            .append("g")
            .attr("transform",
                "translate(" +0+ "," + margin.top + ")");
        // console.log(d3.extent(props.dailyData.date))
        const xScale = d3.scaleTime().range([0, width]);
        const yScale = d3.scaleLinear().rangeRound([height, 0]);
        
        var x = d3.scaleTime()
            .domain(d3.extent(props.dailyData.date))
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
        //.call(d3.axisBottom(x).ticks(4));

        var y = d3.scaleLinear()
            .domain([0, d3.max(props.dailyData[props.chartName])])
            .rangeRound([height, 0]);
        svg.append("g")
        //.call(d3.axisLeft(y))
        
        var obj = [];
        for (var i = 0; i < props.dailyData.recovered.length - 1; i++) {
            obj[i] = { date: props.dailyData.date[i], cases: props.dailyData[props.chartName][i] }
        }

        svg.append("path")
            .datum(obj)
            .transition()
            .duration(3000)
            .attr("fill", "none")
            .attr("stroke", props.color)
            .attr("stroke-width", 4.5)
            .attr("d", d3.line()
            .curve(d3.curveBasis)
                .x(function (d) { return x(d.date) })
                .y(function (d) { return y(d.cases) })
            )

    }
    return null;
}

function responsivefy(svg) {
    // container will be the DOM element
    // that the svg is appended to
    // we then measure the container
    // and find its aspect ratio
    const container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style('width'), 10),
        height = parseInt(svg.style('height'), 10),
        aspect = width / height;

    // set viewBox attribute to the initial size
    // control scaling with preserveAspectRatio
    // resize svg on inital page load
    svg.attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMinYMid')
        .call(resize);

    // add a listener so the chart will be resized
    // when the window resizes
    // multiple listeners for the same event type
    // requires a namespace, i.e., 'click.foo'
    // api docs: https://goo.gl/F3ZCFr
    d3.select(window).on(
        'resize.' + container.attr('id'),
        resize
    );

    // this is the code that resizes the chart
    // it will be called on load
    // and in response to window resizes
    // gets the width of the container
    // and resizes the svg to fill it
    // while maintaining a consistent aspect ratio
    function resize() {
        const w = parseInt(container.style('width'));
        svg.attr('width', w);
        svg.attr('height', Math.round(w / aspect));
    }
}

export default GetData;
