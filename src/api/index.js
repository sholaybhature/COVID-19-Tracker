import axios from 'axios';

const url = 'https://api.covid19india.org/v3/data.json';

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
