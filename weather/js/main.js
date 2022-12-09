import WeatherController from './WeatherController.js';
import Helpers from './utilities.js';

//console.log("main loading...")
const controller = new WeatherController('locationsList');
controller.init();

Helpers.onTouch("#AddLocationBtn", (ev) => {
    console.log(Helpers.qs("#NewLocation"))
    controller.addLocation(Helpers.qs("#NewLocation").value);
});

Helpers.onTouch("#CancelLocationBtn", (ev) => {
    document.querySelector(".add-location").classList.remove("show");
    Helpers.qs("#ShowAddBtn").style.display = "";
});

Helpers.onTouch("#ShowAddBtn", (ev) => {
    document.querySelector(".add-location").classList.add("show");
    Helpers.qs("#ShowAddBtn").style.display = "none";
});
