import React, { useState, useEffect } from "react";
import { fetchDataAll } from '../../api';
import * as d3 from "d3";
import styles from './Chart.module.css';
import { listState } from '../CountryPicker/CountryPicker';

function GetDataAll() {

    const [DataAll, setDataAll] = useState([]);

    useEffect(() => {

        const fetchAPIAll = async () => {
            setDataAll(await fetchDataAll(listState));
        }
        fetchAPIAll();
    }, []);
    return (
        <div>
            <div className="MultiLineChart">
                <MultiLineChart DataAll={DataAll} />
            </div>
        </div>)
}

var keys = Object.keys(listState);
var stateName = [];
var n = keys.length;
for (let i = 0; i < keys.length; i++) {
    stateName.push(listState[keys[i]])
}

function MultiLineChart(props) {
    //console.log(props.DataAll)
    if (props.DataAll[0]) {

        var margin = { top: 10, right: 10, bottom: 10, left: 10 },
            width = 975 - margin.left - margin.right,
            height = 1200 - margin.top - margin.bottom,
            innerRadius = 180,
            outerRadius = Math.min(width, height) / 2;
        var svg = d3.select(".MultiLineChart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 100) + ")");
        // var dataGroup = d3.nest()
        //     .key(function (d) {
        //         return d.state;
        //     })
        //     .entries(props.dailyDataAll)
        // console.log(dataGroup)
        var x = d3.scaleBand()
            .domain(props.DataAll.map(d => d.state))
            .range([0, 2 * Math.PI])
            .align(0)

        var y = d3.scaleLinear()
            .domain([0, d3.max(props.DataAll, d => d.total)])
            .range([innerRadius, outerRadius]);

        var z = d3.scaleOrdinal()
            .domain(['confirmed', 'deceased', 'recovered'])
            .range(["#E05759", "#616161", "#76B7B2"])

        // var xAxis = g => g
        //     .attr("text-anchor", "middle")
        //     .call(g => g.selectAll("g")
        //         .data(props.DataAll)
        //         .join("g")
        //         .attr("transform", d => `
        //   rotate(${((x(d.state) + x.bandwidth() / 2) * 180 / Math.PI - 90)})
        //   translate(${innerRadius},0)
        // `)
        //         .call(g => g.append("line")
        //             .attr("x2", -5)
        //             .attr("stroke", "#000"))
        //         .call(g => g.append("text")
        //             .attr("transform", d => (x(d.state) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
        //                 ? "rotate(90)translate(0,16)"
        //                 : "rotate(-90)translate(0,-9)")
        //             .text(d => d.state)))
        // var yAxis = g => g
        //     .attr("text-anchor", "middle")
        //     .call(g => g.append("text")
        //         .attr("y", 0)
        //         .attr("dy", "-15em")
        //         .text("Cases"))
        // svg.append('g')
        //     .append('circle')
        //     .attr('cx', 0)
        //     .attr('cy', 0)
        //     .attr('r', 300)
        //     .attr('fill','none')
        //     .attr('stroke','black')

        var arc = d3.arc()
            .innerRadius(d => y(d[0]))
            .outerRadius(d => y(d[1]))
            .startAngle(d => x(d.data.state))
            .endAngle(d => x(d.data.state) + x.bandwidth())
            .padAngle(0.01)
            .padRadius(innerRadius)

        var stacked = d3.stack().keys(['confirmed', 'recovered', 'deceased'])
        var dataStack = stacked(props.DataAll)
        svg.append("g")
            .selectAll("g")
            .data(props.DataAll)
            .enter()
            .append("g")
            .attr("text-anchor", function (d) { return (x(d.state) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
            .attr("transform", function (d) { return "rotate(" + ((x(d.state) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")" + "translate(" + (y(d.total) + 10) + ",0)"; })
            .append("text")
            .text(function (d) { return (d.state) })
            .attr("transform", function (d) { return (x(d.state) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
            .style("font-size", "11px")
            .attr("alignment-baseline", "middle")

        svg.append("g")
            .selectAll('g')
            .data(dataStack)
            .join('g')
            .attr('fill', d => z(d.key))
            .selectAll('path')
            .data(d => d)
            .join('path')
            .attr('d', arc);

        // svg.append("g")
        //     .call(xAxis);

        // svg.append("g")
        //     .call(yAxis);



    }
    return null;
}

export default GetDataAll;