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


export async function fetchDataAll(listState) {
    try {
        const suffix = '.total';
        var keys = Object.keys(listState);
        let obj = []
        for (var i = 0; i < 33; i++) {
            let total = 0;
            let accessObj = keys[i] + suffix
            let response = await fetch(url);
            let data = await response.json();
            let accessData = accessObj.split('.').reduce(function (o, key) {
                return o[key];
            }, data);
            let confirmed =accessData.confirmed;
            let deceased =accessData.deceased;
            if (deceased=== undefined){
                deceased=0;
            }
            let recovered = accessData.recovered;
            //let tested = accessData.tested;
            let active = confirmed - recovered +  deceased
            total = confirmed + deceased + recovered
            let tpr = (confirmed/accessData.tested)*100 
            obj.push({
                state:listState[keys[i]],confirmed: confirmed, deceased: deceased, recovered: recovered, total: total, tpr:tpr.toFixed(1)+'%', active:active
            });
        }
        //checkNullorZero(obj)
        //console.log(obj)
        return obj
    } catch (error) {
        console.log("Couldn't fetch")
    }
}
fetchDataAll(listState)
export async function fetchDailyDataAll(listState) {
    const dates = getDates();
    const timestamp = getTimeStamp();
    let obj = []
    var keys = Object.keys(listState);

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

            for (let i = 0; i < dates.length - 1; i++) {
                if (accessData[dates[i]]) {
                    obj.push({
                        state: accessObj, date: timestamp[i], confirmed: accessData[dates[i]].total.confirmed, deceased: accessData[dates[i]].total.deceased,
                        recovered: accessData[dates[i]].total.recovered
                    });
                    // confirmed.push(accessData[dates[i]].total.confirmed);
                    // deceased.push(accessData[dates[i]].total.deceased);
                    // recovered.push(accessData[dates[i]].total.recovered);
                    // active.push(accessData[dates[i]].total.confirmed - accessData[dates[i]].total.recovered + accessData[dates[i]].total.deceased)
                    // date.push(timestamp[i]);
                    // stateName.push(accessObj)
                }
            }
            // fillZero(deceased);
            // fillZero(recovered);
            // fillZero(active);
            // fillZero(confirmed);

            //obj.listState[keys[i]] = {state: stateName}
            //obj.push({ state: stateName, date: date, confirmed: confirmed, deceased: deceased, recovered: recovered, active: active })

        }
        checkNullorZero(obj)
        return obj

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

const checkNullorZero = (obj) => {
    const output = Object.keys(obj).map(col => {
        if (obj[col].deceased === "" || obj[col].deceased === 0 || obj[col].deceased === undefined || obj[col].deceased === null || isNaN(obj[col].deceased)) {
            obj[col].deceased = 0
        }
        if (obj[col].recovered === "" || obj[col].recovered === 0 || obj[col].recovered === undefined || obj[col].recovered === null || isNaN(obj[col].recovered)) {
            obj[col].recovered = 0
        }

    })
}