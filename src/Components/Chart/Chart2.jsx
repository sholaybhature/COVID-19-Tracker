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



function MultiLineChart(props) {
    //console.log(props.DataAll)
    if (props.DataAll[0]) {
        console.log(props.DataAll)
        var keys = ['Active', 'Recovered', 'Deceased']
        var margin = { top: 10, right: 10, bottom: 10, left: 10 },
            width = 1200 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom,
            innerRadius = 160,
            outerRadius = Math.min(width, height) / 2.5;
        var svg = d3.select(".MultiLineChart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .call(responsivefy)
            // .attr("viewBox", "0 0 " + width + " " + height )
            // .attr("preserveAspectRatio", "xMidYMid meet")
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");
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
            .domain([0, d3.max(props.DataAll, d => d.confirmed)])
            .range([innerRadius, outerRadius]);

        var z = d3.scaleOrdinal()
            .domain(['active', 'recovered', 'deceased'])
            .range(["#E05759", "#76B7B2", "#616161"])

        svg.append("g")
            .attr("text-anchor", "middle")
            .call(g => g.selectAll("g")
                .data(props.DataAll)
                .join("g")
                .attr("transform", d => `
          rotate(${((x(d.state) + x.bandwidth() / 2) * 180 / Math.PI - 90)})
          translate(${innerRadius},0)
        `)
                .call(g => g.append("text")
                    .attr("transform", d => (x(d.state) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
                        ? "rotate(90)translate(0,8)"
                        : "rotate(-90)translate(0,-4.5)")
                    .text(d => d.tpr)
                    .style("font-size", "8px")
                    .style('opacity', 0.5)))
        // var yAxis = g => g
        //     .attr("text-anchor", "middle")
        //     .call(g => g.append("text")
        //         .attr("y", 0)
        //         .attr("dy", "-15em")
        //         .text("Cases"))



        svg.append('g')
            .append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 210)
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-opacity', 0.05)

        svg.append('g')
            .append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 145)
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-opacity', 0.025)


        var arc = d3.arc()
            .innerRadius(d => y(d[0]))
            .outerRadius(d => y(d[1]))
            .startAngle(d => x(d.data.state))
            .endAngle(d => x(d.data.state) + x.bandwidth())
            .padAngle(0.01)
            .padRadius(innerRadius)


        var stacked = d3.stack().keys(['active', 'recovered', 'deceased'])

        var dataStack = stacked(props.DataAll)

        svg.append("g")
            .selectAll("g")
            .data(props.DataAll)
            .enter()
            .append("g")
            .attr("text-anchor", function (d) { return (x(d.state) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
            .attr("transform", function (d) { return "rotate(" + ((x(d.state) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")" + "translate(" + (y(d.confirmed) + 10) + ",0)"; })
            .append("text")
            .text(function (d) { return (d.state) })
            .attr("transform", function (d) { return (x(d.state) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
            .style("font-size", "11px")
            .attr("alignment-baseline", "middle")

        var tooltip = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .text("a simple tooltip");


        svg.append("g")
            .selectAll('g')
            .data(dataStack)
            .join('g')
            .attr('fill', d => z(d.key))
            .selectAll('path')
            .data(d => d)
            .join('path')
            .attr('d', arc)
            .on('mouseover', function (d, i) {
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '.85');
                    
            })
            .on('mouseout', function (d, i) {
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '1');
            })

        svg.append('g')
            .append('text')
            .classed('case-count', true)
            .attr("y", d => -220)
            .attr("dx", "-0.85em")
            .style("font-size", "8px")
            .style("font-weight", 600)
            .style('opacity', 0.5)
            .text("100k")
        svg.append('g')
            .append('text')
            .classed('case-count', true)
            .attr("y", d => -212)
            .attr("dx", "-0.95em")
            .style("font-size", "8px")
            .style("font-weight", 600)
            .style('opacity', 0.5)
            .text("cases")



        svg.append('g')
            .append('text')
            .attr("y", d => -132)
            .attr("dx", "-3.15em")
            .style("font-size", "8px")
            .style('opacity', 0.5)
            .text("Test Positive Ratio")


        svg.append('g')
            .selectAll('g')
            .data(keys)
            .join('g')
            .attr("transform", (d, i) => `translate(-40,${(i - (4 - 1) / 2) * 20})`)
            .call(g => g.append('rect')
                .attr("width", 9)
                .attr("height", 9)
                .attr("fill", z))
            .call(g => g.append("text")
                .attr("x", 24)
                .attr("y", 9)
                .style("font-size", "12px")
                .style("font-weight", 600)
                .text(d => d))

        // svg.append("g")
        //     .call(xAxis);

        // svg.append("g")
        //     .call(yAxis);

        window.addEventListener('resize', resize);
        d3.select(window).on("resize", resize);
        function resize() {
            var width = window.innerWidth, height = window.innerHeight;
            svg.attr("width", width).attr("height", height);
        }

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

export default GetDataAll;