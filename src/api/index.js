import axios from 'axios';
import { listState } from '../Components/CountryPicker/CountryPicker';

const url = 'https://api.covid19india.org/v3/data.json';
const url_timeseries = 'https://api.covid19india.org/v3/timeseries.json';


export async function fetchData(state) {

    try {
        const suffix = '.total';
        const accessObj = state + suffix
        let response = await fetch(url);
        let data = await response.json();
        let accessData = accessObj.split('.').reduce(function (o, key) {
            return o[key];
        }, data);
        let confirmed = accessData.confirmed;
        let deceased = accessData.deceased;
        let recovered = accessData.recovered;
        let tested = accessData.tested;
        let active = confirmed - recovered + deceased
        return { confirmed, deceased, recovered, tested, active };
    } catch (error) {
        console.log("Couldn't fetch")
    }

}

export async function fetchDailyData(state) {
    const dates = getDates();
    const timestamp = getTimeStamp();

    try {
        //const suffix = '[dates[i]].total';
        const accessObj = state
        //console.log(accessObj)
        let response = await fetch(url_timeseries);
        let data = await response.json()
        let accessData = accessObj.split('.').reduce(function (o, key) {
            return o[key];
        }, data);
        //console.log(accessData["2020-03-17"].total)
        let confirmed = [];
        let deceased = [];
        let recovered = [];
        let date = [];
        let active = [];
        for (let i = 0; i < dates.length - 1; i++) {
            if (accessData[dates[i]]) {
                confirmed.push(accessData[dates[i]].total.confirmed);
                deceased.push(accessData[dates[i]].total.deceased);
                recovered.push(accessData[dates[i]].total.recovered);
                active.push(accessData[dates[i]].total.confirmed - accessData[dates[i]].total.recovered + accessData[dates[i]].total.deceased)
                date.push(timestamp[i]);
            }
        }
        fillZero(deceased);
        fillZero(recovered);
        fillZero(active);
        fillZero(confirmed);

        return { confirmed, deceased, recovered, date, active };
    } catch (error) {
        console.log("Couldn't fetch")
    }

}

// To get the dates and fetch data from API
const getDates = () => {
    let now = new Date();
    let daysOfYear = [];
    let datestring;
    for (let d = new Date(2020, 2, 1); d <= now; d.setDate(d.getDate() + 1)) {
        if (d.getDate() < 10) {
            datestring = d.getFullYear() + "-" + "0" + (d.getMonth() + 1) + "-" + "0" + d.getDate();
        }
        else {
            datestring = d.getFullYear() + "-" + "0" + (d.getMonth() + 1) + "-" + d.getDate();
        }
        daysOfYear.push(datestring);
    }
    return daysOfYear
}

const getTimeStamp = () => {
    let now = new Date();
    let start = new Date(2020, 2, 1)
    let daysOfYear = [];
    for (let d = start; d <= now; d.setDate(d.getDate() + 1)) {
        var loopDay = new Date(d)
        daysOfYear.push(loopDay);
    }
    return daysOfYear
}


const fillZero = (arr) => {
    for (let key in arr) {
        if (arr[key] === undefined || arr[key] === null || isNaN(arr[key]))
            arr[key] = 0;
    }
}

export async function fetchDailyDataAll(listState) {
    const dates = getDates();
    const timestamp = getTimeStamp();
    let obj = []
    var keys = Object.keys(listState);
    // for (var i =0;i<5;i++){
    //     console.log(listState[keys[i]])
    // }
    try {
        for (var i = 0; i < 33; i++) {
            let accessObj = keys[i]
            //console.log(accessObj)
            let response = await fetch(url_timeseries);
            let data = await response.json()
            let accessData = accessObj.split('.').reduce(function (o, key) {
                return o[key];
            }, data);
            //console.log(accessData)
            let confirmed = [];
            let deceased = [];
            let recovered = [];
            let date = [];
            let active = [];
            let stateName = []
            for (let i = 0; i < dates.length - 1; i++) {
                if (accessData[dates[i]]) {

                    confirmed.push(accessData[dates[i]].total.confirmed);
                    deceased.push(accessData[dates[i]].total.deceased);
                    recovered.push(accessData[dates[i]].total.recovered);
                    active.push(accessData[dates[i]].total.confirmed - accessData[dates[i]].total.recovered + accessData[dates[i]].total.deceased)
                    date.push(timestamp[i]);
                    stateName.push(accessObj)
                }
            }
            fillZero(deceased);
            fillZero(recovered);
            fillZero(active);
            fillZero(confirmed);

            //obj.listState[keys[i]] = {state: stateName}
            obj.push({ state: stateName, date: date, confirmed: confirmed, deceased: deceased, recovered: recovered, active: active })
            //return { confirmed, deceased, recovered, date, active };
        }
        console.log(obj)
    } catch (error) {
        console.log("Couldn't fetch")
    }

}