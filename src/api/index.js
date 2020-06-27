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
    const timeStamp = getTimeStamp();
    try {
        let response = await fetch(url_timeseries);
        let data = await response.json()
        let confirmed = [];
        let deceased = [];
        let recovered = [];
        let date = []
        for(let i =0; i<dates.length-1; i++){
            if (data.DL[dates[i]]){
            confirmed.push(data.DL[dates[i]].total.confirmed);
            deceased.push(data.DL[dates[i]].total.deceased);
            recovered.push(data.DL[dates[i]].total.recovered);
            date.push(timeStamp[i]);
            }
        }
        fillZero(deceased);
        fillZero(recovered)
        return {confirmed,deceased,recovered,date};
    } catch (error) {
        console.log("Couldn't fetch")
    }
    
}

// To get the dates and fetch data from API
const getDates = () => {
    let now = new Date();
    var daysOfYear = [];
    for (let d = new Date(2020, 2, 1); d <= now; d.setDate(d.getDate() + 1)) {
        if (d.getDate() < 10) {
            var datestring = d.getFullYear()+ "-" + "0" + (d.getMonth()+1)  + "-" + "0"+d.getDate();
        }
        else{
            var datestring = d.getFullYear()+ "-" + "0" + (d.getMonth()+1)  + "-" + d.getDate();
        }
        daysOfYear.push(datestring);
    }
    return daysOfYear
}

const getTimeStamp = () => {
    let now = new Date();
    var daysOfYear = [];
    for (let d = new Date(2020, 2, 1); d <= now; d.setDate(d.getDate() + 1)) {
        daysOfYear.push(d);
    }
    return daysOfYear
}

const fillZero = (arr) => {
    for(let key in arr) {
        if(arr[key] === undefined || arr[key] === null)
            arr[key] = 0;
     }
}