import React, { useState, useEffect } from "react";
import { fetchDataMiniChart, fetchDailyDataAll, fetchDataAll, growthRate } from '../../api';
import * as d3 from "d3";
import './LineChart.css';
import { listState } from '../CountryPicker/CountryPicker';


//confirmed,deceased,recovered
function GetDataAll() {

    const [DataAll, setDataAll] = useState([]);
    const [CurrentData, setCurrentData] = useState([]);
    const [GrowthRate, setGrowthRate] = useState([]);
    const [MiniChart, setMiniChart] = useState([]);

    useEffect(() => {
        const fetchAPIAll = async () => {
            setDataAll(await fetchDailyDataAll(listState));
        }
        const fetchAPICurrent = async () => {
            setCurrentData(await fetchDataAll(listState));
        }
        const fetchGrowthRate = async () => {
            setGrowthRate(await growthRate(listState));
        }
        const fetchMiniChart = async () => {
            setMiniChart(await fetchDataMiniChart(listState));
        }
        fetchMiniChart();
        fetchGrowthRate();
        fetchAPIAll();
        fetchAPICurrent();
    }, []);

    var dataGroup = d3.nest()
        .key(function (d) {
            return d.state;
        })
        .entries(DataAll)

    var dataGroup2 = d3.nest()
        .key(function (d) {
            return d.state;
        })
        .entries(CurrentData)

    var dataGroup3 = d3.nest()
        .key(function (d) {
            return d.state;
        })
        .entries(GrowthRate)

    var dataGroup4 = d3.nest()
        .key(function (d) {
            return d.state;
        })
        .entries(MiniChart)

    return (
        <div>
            <div className="LineChart">
                <div id="fruitDropdown"></div>
                <LineChart DataAll={DataAll} dataGroup={dataGroup} currentData={dataGroup2} growthRate={dataGroup3} miniChart={dataGroup4} />
            </div>
        </div>)
}


// <div className="AgeChart">
//                 <AgeChart DataAll={DataAll} dataGroup={dataGroup} />
//             </div>


function LineChart(props) {
    //console.log(props.DataAll)

    if (props.dataGroup[0] && props.currentData[0] && props.growthRate[0] && props.miniChart[0]) {
        console.log(props.miniChart)

        var margin = { top: 10, right: 10, bottom: 10, left: 10 },
            width = 1150 - margin.left - margin.right,
            height = 550 - margin.top - margin.bottom;


        var svg = d3.select(".LineChart")
            .attr('id', 'LineChart')
            .append("svg")
            .classed('my-svg-chart', true)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .call(responsivefy)
            // .attr("viewBox", "0 0 " + width + " " + height )
            // .attr("preserveAspectRatio", "xMidYMid meet")
            .append("g")
            .attr("transform", "translate(" + width / 8 + "," + -10 + ")");



        var fruitMenu = d3.select("#fruitDropdown")
        //console.log(dataGroup)
        fruitMenu
            .append("select")
            .classed('select-box', true)
            .selectAll("option")
            .data(props.dataGroup)
            .enter()
            .append("option")
            .attr("value", function (d) {
                return d.key;
            })
            .text(function (d) {
                return d.key;
            })
            .property("selected", function (d, i) { return i == 17; })

        function make_y_gridline() {
            return d3.axisLeft(y).ticks(4)
        }
        var check = props.dataGroup.filter(function (d) {
            return d.key == "Maharashtra"
        })

        var growth = props.growthRate.filter(function (d) {
            return d.key == "Maharashtra"
        })


        var info = props.currentData.filter(function (d) {
            return d.key == "Maharashtra"
        })

        var mini = props.miniChart.filter(function (d) {
            return d.key == "Maharashtra"
        })

        var len = check[0].values.length - 1
        var valuesCases = [check[0].values[len].confirmed, check[0].values[len].recovered, check[0].values[len].deceased]

        //console.log(check)
        var x = d3.scaleTime()
            .domain(d3.extent(check[0].values, function (d) { return d.date }))
            .range([0, width - width / 6 - width / 4]);

        var y = d3.scaleLinear()
            .domain(d3.extent(check[0].values, function (d) { return d.confirmed }))
            .range([height, 100])

        var x_mini = d3.scaleTime()
            .domain(d3.extent(mini[0].values, function (d) { return d.date }))
            .range([0, 70])


        var y_active = d3.scaleLinear()
            .domain(d3.extent(mini[0].values, function (d) { return d.active }))
            .range([25, 0]);

        var y_recovered = d3.scaleLinear()
            .domain(d3.extent(mini[0].values, function (d) { return d.recovered }))
            .range([25, 0]);

        var y_deceased = d3.scaleLinear()
            .domain(d3.extent(mini[0].values, function (d) { return d.deceased }))
            .range([25, 0]);


        var yAxis =
            svg.append('g')
                .classed('y-axis', true)
                .call(y.axis = d3.axisLeft(y)
                    .ticks(4)
                    .tickSize(0)
                    .tickPadding(5)
                    .tickFormat(function (d) {
                        if ((d / 1000) >= 1) {
                            d = d / 1000 + "k";
                        }

                        return d;
                    }));


        var grid = svg.append('g')
            .attr('class', 'grid')
            .call(make_y_gridline().tickSize(-width + width / 6 + width / 4).tickSizeOuter(0).tickFormat(""))

        var xAxis =
            svg.append('g')
                .classed('x-axis', true)
                .attr('transform', 'translate(0,' + height + ')')
                .call(d3.axisBottom(x).ticks(4));

        var text = svg.append('g')
            .append('text')
            .classed('heading', true)
            .attr("y", d => 200)
            .attr("x", d => 725)
            .style("font-size", "30px")
            .text("Maharashtra")
            .style('fill', '#E05759')

        var textCaseConfirmed =
            svg.append('text')
                .attr("y", d => 225)
                .attr("x", d => 725)
                .style("font-size", "12.5px")
                .style('font-weight', 600)
                .text("+" + valuesCases[0])
                .style('fill', '#007BFF')
        //console.log(info[0].values[0].confirmed)

        var textCaseConfirmedCent =
            svg.append('text')
                .attr("y", d => 255)
                .attr("x", d => 725)
                .style("font-size", "1.15rem")
                .style('font-weight', 600)
                .classed('active-text', true)
                .text("Active")
                .style('fill', 'black')

        var textCaseConfirmedCent_ =
            svg.append('text')
                .attr("y", d => 270)
                .attr("x", d => 725)
                .style("font-size", "1rem")
                .style('font-weight', 600)
                .text(" " + info[0].values[0].active_cent + "%")
                .style('fill', '#007BFF')

        var textCaseRecovereedCent =
            svg.append('text')
                .attr("y", d => 300)
                .attr("x", d => 725)
                .style("font-size", "1.15rem")
                .style('font-weight', 600)
                .classed('recovered-text', true)
                .text("Recovered")
                .style('fill', 'black')

        var textCaseRecoveredCent_ =
            svg.append('text')
                .attr("y", d => 315)
                .attr("x", d => 725)
                .style("font-size", "1rem")
                .style('font-weight', 600)
                .text(" " + info[0].values[0].recovery_cent + "%")
                .style('fill', '#28A745')

        var textCaseDeceasedCent =
            svg.append('text')
                .attr("y", d => 345)
                .attr("x", d => 725)
                .style("font-size", "1.15rem")
                .style('font-weight', 600)
                .classed('deceased-text', true)
                .text("Deceased")
                .style('fill', 'black')

        var textCaseDeceasedCent_ =
            svg.append('text')
                .attr("y", d => 360)
                .attr("x", d => 725)
                .style("font-size", "1rem")
                .style('font-weight', 600)
                .text(" " + info[0].values[0].deceased_cent + "%")
                .style('fill', '#6C757D')

        var growthRate =
            svg.append('text')
                .attr("y", d => 390)
                .attr("x", d => 725)
                .style("font-size", "1.15rem")
                .style('font-weight', 600)
                .classed('growthrate-text', true)
                .text("Doubling Rate")
                .style('fill', 'black')

        var growthRate_ =
            svg.append('text')
                .attr("y", d => 405)
                .attr("x", d => 725)
                .style("font-size", "1rem")
                .style('font-weight', 600)
                .text(" " + growth[0].values[0].growth_rate + " " + "days")
                .style('fill', '#FF6600')

        var disclaimer =
            svg.append('text')
                .attr("y", d => 535)
                .attr("x", d => 725)
                .style("font-size", "0.5rem")
                .style('font-weight', 400)
                .text("*Doubling rate: t/(log(2)(cases until(x+t)-log(2)(cases until(x)) t=7")
                .style('fill', 'gray')

        var disclaimer_ =
            svg.append('text')
                .attr("y", d => 545)
                .attr("x", d => 727)
                .style("font-size", "0.5rem")
                .style('font-weight', 400)
                .text("Higher is better.")
                .style('fill', 'gray')

        var textCaseRecovered =
            svg.append('text')
                .attr("y", d => 225)
                .attr("x", d => 775)
                .style("font-size", "12.5px")
                .style('font-weight', 600)
                .text("+" + valuesCases[1])
                .style('fill', '#28A745')

        var textCaseDeceased =
            svg.append('text')
                .attr("y", d => 225)
                .attr("x", d => 825)
                .style("font-size", "12.5px")
                .style('font-weight', 600)
                .text("+" + valuesCases[2])
                .style('fill', '#6C757D')


        var line_confirmed = svg
            .append('g')
            .append("path")
            .datum(check[0].values)
            .attr("d", d3.line()
                .curve(d3.curveBasis)
                .x(function (d) {
                    return x(d.date);
                })
                .y(function (d) {
                    return y(d.confirmed);
                }))
            .attr('stroke', '#007BFF')
            .attr('stroke-width', 2.5)
            .attr('fill', 'none')

        var line_active_mini = svg
            .append('g')
            .append("path")
            .attr("transform", "translate(825," + 245 + ")")
            .datum(mini[0].values)
            .attr("d", d3.line()
                .curve(d3.curveBasis)
                .x(function (d) {
                    return x_mini(d.date);
                })
                .y(function (d) {
                    return y_active(d.active);
                }))
            .attr('stroke', '#007BFF')
            .attr('stroke-width', 2.5)
            .attr('fill', 'none')


        var line_recovered = svg
            .append('g')
            .append("path")
            .datum(check[0].values)
            .attr("d", d3.line()
                .curve(d3.curveBasis)
                .x(function (d) {
                    return x(d.date);
                })
                .y(function (d) {
                    return y(d.recovered);
                }))
            .attr('stroke', '#28A745')
            .attr('stroke-width', 2.5)
            .attr('fill', 'none')

        var line_recovered_mini = svg
            .append('g')
            .append("path")
            .attr("transform", "translate(825," + 290 + ")")
            .datum(mini[0].values)
            .attr("d", d3.line()
                .curve(d3.curveBasis)
                .x(function (d) {
                    return x_mini(d.date);
                })
                .y(function (d) {
                    return y_recovered(d.recovered);
                }))
            .attr('stroke', '#28A745')
            .attr('stroke-width', 2.5)
            .attr('fill', 'none')


        var line_deceased = svg
            .append('g')
            .append("path")
            .datum(check[0].values)
            .attr("d", d3.line()
                .curve(d3.curveBasis)
                .x(function (d) {
                    return x(d.date);
                })
                .y(function (d) {
                    return y(d.deceased);
                }))
            .attr('stroke', '#6C757D')
            .attr('stroke-width', 2.5)
            .attr('fill', 'none')

        var line_deceased_mini = svg
            .append('g')
            .append("path")
            .attr("transform", "translate(825," + 335 + ")")
            .datum(mini[0].values)
            .attr("d", d3.line()
                .curve(d3.curveBasis)
                .x(function (d) {
                    return x_mini(d.date);
                })
                .y(function (d) {
                    return y_deceased(d.deceased);
                }))
            .attr('stroke', '#6C757D')
            .attr('stroke-width', 2.5)
            .attr('fill', 'none')

        function update(selectedGroup) {
            var dataFilter = props.dataGroup.filter(function (d) {
                return d.key == selectedGroup
            })

            var growth = props.growthRate.filter(function (d) {
                return d.key == selectedGroup
            })


            var info = props.currentData.filter(function (d) {
                return d.key == selectedGroup
            })

            var mini = props.miniChart.filter(function (d) {
                return d.key == selectedGroup
            })

            var len = dataFilter[0].values.length - 1
            var date = dataFilter[0].values[len].date
            var circle_y = [dataFilter[0].values[len].confirmed, dataFilter[0].values[len].recovered, dataFilter[0].values[len].deceased]

            x.domain(d3.extent(dataFilter[0].values, function (d) { return d.date }))
                .range([0, width - width / 6 - width / 4]);
            y.domain(d3.extent(dataFilter[0].values, function (d) { return d.confirmed }))
            x_mini.domain(d3.extent(mini[0].values, function (d) { return d.date }))
            y_active.domain(d3.extent(mini[0].values, function (d) { return d.active }))
            y_recovered.domain(d3.extent(mini[0].values, function (d) { return d.recovered }))
            y_deceased.domain(d3.extent(mini[0].values, function (d) { return d.deceased }))

            //console.log(d3.extent(dataFilter[0].values,function(d){return d.confirmed}))

            text.text(selectedGroup)
            textCaseConfirmed.text("+" + circle_y[0])
            textCaseRecovered.text("+" + circle_y[1])
            textCaseDeceased.text("+" + circle_y[2])
            textCaseConfirmedCent_.text(" " + info[0].values[0].active_cent + "%")
            textCaseRecoveredCent_.text(" " + info[0].values[0].recovery_cent + "%")
            textCaseDeceasedCent_.text(" " + info[0].values[0].deceased_cent + "%")
            growthRate_.text(" " + growth[0].values[0].growth_rate + " " + "days")
            disclaimer.text("")
            disclaimer_.text("")


            xAxis.attr("transform", "translate(0," + y(0) + ")")
                .call(d3.axisBottom(x).ticks(4));
            yAxis.call(y.axis = d3.axisLeft(y)
                .ticks(4)
                .tickSize(0)
                .tickPadding(5)
                .tickFormat(function (d) {
                    if ((d / 1000) >= 1) {
                        d = d / 1000 + "k";
                    }

                    return d;
                }));

            grid.call(make_y_gridline().tickSize(-width + width / 6 + width / 4).tickSizeOuter(0).tickFormat(""))

            line_confirmed
                .datum(dataFilter[0].values)
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                    .curve(d3.curveBasis)
                    .x(function (d) {
                        return x(d.date);
                    })
                    .y(function (d) {
                        //console.log(d.confirmed)
                        return y(d.confirmed);
                    }))

            line_active_mini
                .datum(mini[0].values)
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                    .curve(d3.curveBasis)
                    .x(function (d) {
                        return x_mini(d.date);
                    })
                    .y(function (d) {
                        return y_active(d.active);
                    }))

            line_recovered
                .datum(dataFilter[0].values)
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                    .curve(d3.curveBasis)
                    .x(function (d) {
                        return x(d.date);
                    })
                    .y(function (d) {
                        //console.log(d.confirmed)
                        return y(d.recovered);
                    }))

            line_recovered_mini
                .datum(mini[0].values)
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                    .curve(d3.curveBasis)
                    .x(function (d) {
                        return x_mini(d.date);
                    })
                    .y(function (d) {
                        return y_recovered(d.recovered);
                    }))


            line_deceased
                .datum(dataFilter[0].values)
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                    .curve(d3.curveBasis)
                    .x(function (d) {
                        return x(d.date);
                    })
                    .y(function (d) {
                        //console.log(d.confirmed)
                        return y(d.deceased);
                    }))

            line_deceased_mini
                .datum(mini[0].values)
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                    .curve(d3.curveBasis)
                    .x(function (d) {
                        return x_mini(d.date);
                    })
                    .y(function (d) {
                        return y_deceased(d.deceased);
                    }))


            circle
                .data(circle_y)
                .transition()
                .duration(1000)
                .attr('cx', x(date))
                .attr('cy', function (d, i) { return y(circle_y[i]) })

        }


        fruitMenu.on('change', function () {

            // Find which fruit was selected from the dropdown
            var selectedFruit = d3.select(this)
                .select("select")
                .property("value")

            // Run update function with the selected fruit
            update(selectedFruit)


        });


        svg.append("text")
            .classed('label', true)
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - 6 * margin.left)
            .attr("x", 0 - (height / 2) - 40)
            .attr("dy", "1em")
            .style('font-size', '0.75rem')
            .style("text-anchor", "middle")
            .text("Daily new Cases");

        svg.append("text")
            .classed('label', true)
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - 4.5 * margin.left)
            .attr("x", 0 - (height / 2) - 40)
            .attr("dy", "1em")
            .style('font-size', '0.425rem')
            .style("text-anchor", "middle")
            .style("fill", 'gray')
            .text("(5 day moving average)");

        var len = check[0].values.length - 1
        var date = check[0].values[len].date
        var cirlce_y = [check[0].values[len].confirmed, check[0].values[len].recovered, check[0].values[len].deceased]

        //var date = props.DataAll[len].date
        //var cirlce_y = [props.DataAll[len].confirmed, props.DataAll[len].recovered, props.DataAll[len].deceased]
        var color = ["#007BFF", "#28A745", "#6C757D"]
        var keys_legend = ["Confirmed", "Recovered", "Deceased"]

        svg.selectAll("mydots")
            .data(keys_legend)
            .enter()
            .append("circle")
            .attr("cx", function (d, i) { return 40 + i * 100 })
            .attr("cy", 80) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 3)
            .style("fill", function (d, i) { return color[i] })

        // Add one dot in the legend for each name.
        svg.selectAll("mylabels")
            .data(keys_legend)
            .enter()
            .append("text")
            .attr("x", function (d, i) { return 50 + i * 100 })
            .attr("y", 80) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function (d, i) { return color[i] })
            .text(function (d) { return d })
            .style('font-size', '0.75rem')
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")

        var circle = svg.selectAll('circle-chart')
            .data(cirlce_y)
            .enter().append("circle")
            .attr('id', 'circle')
            .attr('r', 3.5)
            .attr('cx', x(date))
            .attr('cy', function (d, i) { return y(cirlce_y[i]) })
            .style('fill', function (d, i) { return color[i] })



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