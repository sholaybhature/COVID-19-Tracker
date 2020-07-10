import React, { useState, useEffect } from "react";
import { fetchDailyData_Chart, fetchDailyDataAll } from '../../api';
import * as d3 from "d3";
import './AgeChart.css';

function chart() {
    return (
        <div>
            <div className="AgeChart">
                <AgeChart />
            </div>
        </div>)
}

function AgeChart() {
    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    var svg = d3.select(".AgeChart")
        .attr('id', 'AgeChart')
        .append("svg")
        .classed('my-svg-agechart', true)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    return null;
}

export default chart;