const url = 'https://api.covid19india.org/v3/data.json';
const url_timeseries = 'https://api.covid19india.org/v3/timeseries.json';
const url_national = 'https://api.covid19india.org/data.json';


//For fetching data for main graphs
export async function fetchNationalData(){

    try{
        let response = await fetch(url_national);
        let data = await response.json();
        let accessData = data.cases_time_series
        let len = accessData.length - 1
        let confirmed = accessData[len].totalconfirmed
        let deceased = accessData[len].totaldeceased
        let recovered = accessData[len].totalrecovered
        let active = accessData[len].totalconfirmed-accessData[len].totaldeceased-accessData[len].totalrecovered
        return {confirmed, deceased, recovered, active}
    }
    catch(error){
        console.log("Couldn't fetch")
    }
}

//For fetching daily data for states
export async function fetchDailyData(state) {

    const dates = getDates();
    const timestamp = getTimeStamp();

    try {
        const accessObj = state
        let response = await fetch(url_timeseries);
        let data = await response.json()
        let accessData = accessObj.split('.').reduce(function (o, key) {
            return o[key];
        }, data);
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

// Fetch data for all states
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
            let confirmed = accessData.confirmed;
            let deceased = accessData.deceased;
            if (deceased === undefined) {
                deceased = 0;
            }
            let recovered = accessData.recovered;
            let active = confirmed - recovered - deceased
            total = confirmed + deceased + recovered
            let tpr = (confirmed / accessData.tested) * 100
            let active_cent = (active / confirmed) * 100
            let recovery_cent = (recovered / confirmed) * 100
            let deceased_cent = (deceased / confirmed) * 100
            obj.push({
                state: listState[keys[i]], confirmed: confirmed, deceased: deceased, recovered: recovered, total: total, tpr: tpr.toFixed(1) + '%', active: active,
                active_cent: active_cent.toFixed(1), recovery_cent: recovery_cent.toFixed(1), deceased_cent: deceased_cent.toFixed(1)
            });
        }
        return obj
    } catch (error) {
        console.log("Couldn't fetch")
    }
}

// For doubling rate
export async function growthRate(listState) {
    try {

        let obj = []
        var keys = Object.keys(listState);
        let date_ = new Date(new Date().getTime() - (2 * 24 * 60 * 60 * 1000))
        var date_updated = date_.getFullYear() + "-" + "0" + (date_.getMonth() + 1) + "-"  + date_.getDate();
        var previous_updated = date_.getFullYear() + "-" + "0" + (date_.getMonth() + 1) + "-" + (date_.getDate()-7);
       
        if (date_.getDate() >= 17){
            var previous_updated = date_.getFullYear() + "-" + "0" + (date_.getMonth() + 1) + "-" + (date_.getDate()-7);
        }
        else{
            var previous_updated = date_.getFullYear() + "-" + "0" + (date_.getMonth() + 1) + "-" + "0" + (date_.getDate()-7);
        }
        let response = await fetch(url_timeseries);
        let data = await response.json();
        
        for (var i = 0; i < 33; i++) {
            let accessObj = keys[i]
            let accessData = accessObj.split('.').reduce(function (o, key) {
                return o[key];
            }, data);
            let confirmed = accessData[date_updated].total.confirmed;
            let confirmed_previous = accessData[previous_updated].total.confirmed;
            let growth_rate = 7/((Math.log2(confirmed))-Math.log2(confirmed_previous))
            obj.push({
                state: listState[keys[i]], growth_rate: growth_rate.toFixed(1)
            });
        }
        return obj
    } catch (error) {
        console.log("Couldn't fetch")
    }
}

// Fetch daily data for all state
export async function fetchDailyDataAll(listState) {

    const dates = getDates();
    const timestamp = getTimeStamp();
    let obj = []
    var keys = Object.keys(listState);

    try {
        for (var i = 0; i < 33; i++) {
            let accessObj = keys[i]
            let response = await fetch(url_timeseries);
            let data = await response.json()
            let accessData = accessObj.split('.').reduce(function (o, key) {
                return o[key];
            }, data);

            for (let i = 0; i < dates.length - 1; i++) {
                if (accessData[dates[i]]) {
                    obj.push({
                        state: listState[accessObj], date: timestamp[i], confirmed: accessData[dates[i]].total.confirmed, deceased: accessData[dates[i]].total.deceased,
                        recovered: accessData[dates[i]].total.recovered, fatality: ((accessData[dates[i]].total.deceased / accessData[dates[i]].total.confirmed) * 100).toFixed(2)
                    });
                }
            }
        }

        checkNullorZero(obj)
        var newObj = replace(obj)
        var updatedObj = average(newObj)
        return updatedObj

    } catch (error) {
        console.log("Couldn't fetch")
    }

}

// For active, deceased and recovered sub charts
export async function fetchDataMiniChart(listState) {

    const dates = getDates();
    const timestamp = getTimeStamp();
    let obj = []
    var keys = Object.keys(listState);

    try {
        for (var i = 0; i < 33; i++) {

            let accessObj = keys[i]
            let response = await fetch(url_timeseries);
            let data = await response.json()
            let accessData = accessObj.split('.').reduce(function (o, key) {
                return o[key];
            }, data);

            for (let i = 0; i < dates.length - 1; i++) {
                if (accessData[dates[i]]) {
                    if(accessData[dates[i]].total.deceased){
                        if(accessData[dates[i]].total.recovered){
                            obj.push({
                                state: listState[accessObj], confirmed: accessData[dates[i]].total.confirmed, deceased: (accessData[dates[i]].total.deceased/accessData[dates[i]].total.confirmed)*100,
                                recovered: (accessData[dates[i]].total.recovered/accessData[dates[i]].total.confirmed)*100, fatality: 0, date: timestamp[i],
                                active: ((accessData[dates[i]].total.confirmed-accessData[dates[i]].total.deceased-accessData[dates[i]].total.recovered)/accessData[dates[i]].total.confirmed)*100
                            })
                        }
                        else{
                            obj.push({
                                state: listState[accessObj], confirmed: accessData[dates[i]].total.confirmed, deceased: (accessData[dates[i]].total.deceased/accessData[dates[i]].total.confirmed)*100,
                                recovered: (accessData[dates[i]].total.recovered/accessData[dates[i]].total.confirmed)*100, fatality: 0, date: timestamp[i],
                                active: ((accessData[dates[i]].total.confirmed-accessData[dates[i]].total.deceased)/accessData[dates[i]].total.confirmed)*100
                            })
                        }
                    }
                    else{
                        if(accessData[dates[i]].total.recovered){
                            obj.push({
                                state: listState[accessObj], confirmed: accessData[dates[i]].total.confirmed, deceased: (accessData[dates[i]].total.deceased/accessData[dates[i]].total.confirmed)*100,
                                recovered: (accessData[dates[i]].total.recovered/accessData[dates[i]].total.confirmed)*100, fatality: 0, date: timestamp[i],
                                active: ((accessData[dates[i]].total.confirmed-accessData[dates[i]].total.recovered)/accessData[dates[i]].total.confirmed)*100
                            })
                        }
                        else{
                            obj.push({
                                state: listState[accessObj], confirmed: accessData[dates[i]].total.confirmed, deceased: (accessData[dates[i]].total.deceased/accessData[dates[i]].total.confirmed)*100,
                                recovered: (accessData[dates[i]].total.recovered/accessData[dates[i]].total.confirmed)*100, fatality: 0, date: timestamp[i],
                                active: (accessData[dates[i]].total.confirmed/accessData[dates[i]].total.confirmed)*100
                            })
                        }
                    }
                    
                }
            }
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
        if (obj[col].fatality === "" || obj[col].fatality === 0 || obj[col].fatality === undefined || obj[col].fatality === null || isNaN(obj[col].fatality)) {
            obj[col].fatality = 0
        }

    })
}

// Daily delta values
const replace = (object) => {

    var newObj = []
    for (let i = 1; i < object.length; i++) {
        if (object[i].state === object[i - 1].state) {
            newObj.push({
                state: object[i].state, date: object[i].date, confirmed: object[i].confirmed - object[i - 1].confirmed, deceased: object[i].deceased - object[i - 1].deceased,
                recovered: object[i].recovered - object[i - 1].recovered, fatality: object[i].fatality
            })
        }
        else {
            i = i + 1;
        }
    }
    return newObj

}

// Moving Average
const average = (object) => {

    var newObj = []
    let sumConfirmed = 0;
    let sumDeceased = 0;
    let sumRecovered = 0;
    let fatality = 0;
    for (let i = 5; i < object.length; i++) {
        if (object[i].state === object[i - 1].state) {
            sumConfirmed = parseInt((object[i].confirmed + object[i - 1].confirmed + object[i - 2].confirmed + object[i - 3].confirmed + object[i - 4].confirmed) / 5)
            sumDeceased = parseInt((object[i].deceased + object[i - 1].deceased + object[i - 2].deceased + object[i - 3].deceased + object[i - 4].deceased) / 5)
            sumRecovered = parseInt((object[i].recovered + object[i - 1].recovered + object[i - 2].recovered + object[i - 3].recovered + object[i - 4].recovered) / 5)
            fatality = object[i].fatality
            newObj.push({ state: object[i].state, date: object[i].date, confirmed: sumConfirmed, deceased: sumDeceased, recovered: sumRecovered, fatality: fatality })
        }
        else {
            i = i + 5;
        }
    }
    return newObj
}
