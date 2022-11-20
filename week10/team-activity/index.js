import QuakesController  from './QuakesController.js';
//import { getLocation } from './utilities.js';
//const baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02';
////https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-03-02&latitude=43.814540699999995&longitude=-111.78491029999999&maxradiuskm=100

//function testGetQuakesForLocation() {
//    // call the getLocation function to get the lat/long

//    // use that information to build out the correct URL
//    const geoUrl = baseUrl + getLocation();// add location information here
//  // use the url to request the correct quakes
//    console.log(geoUrl);
//  //log out the quakes for now.
//}
//getQuakesForLocation();


let controller = new QuakesController("#quakeList");
controller.init();