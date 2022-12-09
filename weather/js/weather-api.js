const url = "https://api.openweathermap.org/data/2.5/weather?";
const geoUrl = "http://api.openweathermap.org/geo/1.0/direct?";
const ak = "e3cf141a197ad7d8f55f34115bd5bcd5";

export default class WeatherApi {
    async fetchLocation(location) {
        try {
            const response = await fetch(`${url}q=${location}&units=imperial&appid=${ak}`);
            if (response.ok) {
                const data = await response.json();
                //console.log(data); // this is for testing the call
                //displayResults(data);
                return data;
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    async requestCityByName(location) {
        try {
            const response = await fetch(`${geoUrl}q=${location}&appid=${ak}`);
            if (response.ok) {
                const data = await response.json();
                //console.log(data); // this is for testing the call
                //displayResults(data);
                return data;
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

}
