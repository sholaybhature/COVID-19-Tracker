import axios from 'axios';

const url = 'https://api.covid19india.org/v3/data.json';
const url_timeseries = 'https://api.covid19india.org/v3/timeseries.json';

export async function fetchData() {
    try {
        let response = await fetch(url);
        let data = await response.json()
        let confirmed = data.DL.total.confirmed;
        let deceased = data.DL.total.deceased;
        let recovered = data.DL.total.recovered;
        let tested = data.DL.total.tested;
        let active = confirmed - recovered + deceased
        return { confirmed, deceased, recovered, tested, active };
    } catch (error) {
        console.log("Couldn't fetch")
    }


}

export async function fetchDailyData() {
    const dates = getDates();
    const timestamp = getTimeStamp();
    try {
        let response = await fetch(url_timeseries);
        let data = await response.json()
        let confirmed = [];
        let deceased = [];
        let recovered = [];
        let date = [];
        let active = [];
        for(let i =0; i<dates.length-1; i++){
            if (data.DL[dates[i]]){
            confirmed.push(data.DL[dates[i]].total.confirmed);
            deceased.push(data.DL[dates[i]].total.deceased);
            recovered.push(data.DL[dates[i]].total.recovered);
            active.push(data.DL[dates[i]].total.confirmed - data.DL[dates[i]].total.recovered + data.DL[dates[i]].total.deceased)
            date.push(timestamp[i]);
            }
        }
        fillZero(deceased);
        fillZero(recovered);
        fillZero(active);
        fillZero(confirmed);
        return {confirmed,deceased,recovered,date,active};
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
            datestring = d.getFullYear()+ "-" + "0" + (d.getMonth()+1)  + "-" + "0"+d.getDate();
        }
        else{
             datestring = d.getFullYear()+ "-" + "0" + (d.getMonth()+1)  + "-" + d.getDate();
        }
        daysOfYear.push(datestring);
    }
    return daysOfYear
}

const getTimeStamp = () => {
    let now = new Date();
    let start = new Date(2020,2,1)
    let daysOfYear = [];
    for (let d = start; d <= now; d.setDate(d.getDate() + 1)) {
        var loopDay = new Date(d)
        daysOfYear.push(loopDay);
    }
    return daysOfYear
}


const fillZero = (arr) => {
    for(let key in arr) {
        if(arr[key] === undefined || arr[key] === null || isNaN(arr[key]))
            arr[key] = 0;
     }
}