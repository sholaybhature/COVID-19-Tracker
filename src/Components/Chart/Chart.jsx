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
    const LineChart = () => {
        
    }

    return (
        <div>
            <div className="LineChart">
                {LineChart()}
            </div>
        </div>)
};

export default GetData;
