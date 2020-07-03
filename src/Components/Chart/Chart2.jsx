import React, { useState, useEffect } from "react";
import { fetchDailyDataAll } from '../../api';
import * as d3 from "d3";
import styles from './Chart.module.css';
import { listState } from '../CountryPicker/CountryPicker';

function GetDataAll() {

    const [dailyDataAll, setDailyDataAll] = useState([]);

    useEffect(() => {

        const fetchAPIAll = async () => {
            setDailyDataAll(await fetchDailyDataAll(listState));
        }
        fetchAPIAll();
    }, []);
    return (
        <div>
            <div className="MultiLineChart">
                <MultiLineChart dailyDataAll={dailyDataAll} />
            </div>
        </div>)
}

function MultiLineChart(props) {
    if (props.dailyDataAll[0]) {
        var data = [
            { "Client": "ABC", x: 1, y: 0 }, { "Client": "ABC", x: 50, y: 40 }, { "Client": "ABC", x: 100, y: 100 }, { "Client": "ABC", x: 150, y: 90 }, { "Client": "ABC", x: 200, y: 150 },
            { "Client": "XYZ", x: 1, y: 0 }, { "Client": "XYZ", x: 50, y: 80 }, { "Client": "XYZ", x: 100, y: 200 }, { "Client": "XYZ", x: 150, y: 180 }, { "Client": "XYZ", x: 200, y: 300 }
        ];
        console.log(props.dailyDataAll)
        var dataGroup = d3.nest()
            .key(function (d) {
                return d.state;
            })
            .entries(props.dailyDataAll)
        console.log(dataGroup)
        var margin = {
            top: 30,
            right: 20,
            bottom: 30,
            left: 50
        },

            width = 800 - margin.left - margin.right,
            height = 270 - margin.top - margin.bottom;

        var svg = d3.select('.MultiLineChart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        var x = d3.scaleTime()
            .domain(d3.extent(props.dailyDataAll, function (d) { return d.date }))
            .range([0, width]);
        svg.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x));

        var y = d3.scaleLinear()
            .domain(d3.extent(props.dailyDataAll, function (d) { return d.confirmed }))
            .range([height, 0]);
        svg.append('g')
            .call(d3.axisLeft(y));

        var lineGen = d3.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.confirmed);
            });

        dataGroup.forEach(function (d, i) {
            svg.append('path')
                .attr('d', lineGen(d.values))
                .attr('stroke', 'blue')
                .attr('stroke-width', 1)
                .attr('fill', 'none')
        });


        // svg.append('path')
        //     .datum(data)
        //     .attr('fill', 'none')
        //     .attr('stroke', 'steelblue')
        //     .attr('stroke-width', 1.5)

        //     )
        // var myText = svg.append("text")
        //     .attr("y", height - 10)//magic number here
        //     .attr("x", function () { return x(100) })
        //     .attr('text-anchor', 'middle')
        //     .attr("class", "myLabel")//easy to style with CSS
        //     .text("I'm a label");

        // var line = d3.line()
        //     .x(function (d) {
        //         return x(d.x);
        //     })
        //     .y(function (d) {
        //         return y(d.y);
        //     });


        // svg.append('path')
        //     .data(data)
        //     .attr('class', 'line')
        //     .attr('d', line)
    }
    return null;
}

export default GetDataAll;