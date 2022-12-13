import WeatherController from './WeatherController.js';
import Helpers from './utilities.js';

//console.log("main loading...")
const controller = new WeatherController('locationsList');
controller.init();

Helpers.onClick("#AddLocationBtn", (ev) => {
    ev.stopPropagation();
    console.log(Helpers.qs("#NewLocation"))
    controller.addLocation(Helpers.qs("#NewLocation"));
});

Helpers.onClick("#SaveSettingsBtn", (ev) => {
    ev.stopPropagation();
    controller.saveSettings(Helpers.qs("#metricUnits"), Helpers.qs("#refreshRate"));
    document.querySelector(".settings").classList.remove("show");
});

Helpers.onClick("#CancelLocationBtn", (ev) => {
    ev.stopPropagation();
    document.querySelector(".add-location").classList.remove("show");
    //Helpers.qs("#ShowAddBtn").style.display = "";
});

Helpers.onClick("#ShowAddBtn", (ev) => {
    ev.stopPropagation();
    document.querySelector(".add-location").classList.add("show");
    document.querySelector(".settings").classList.remove("show");
});

Helpers.onClick("#CancelSettingsBtn", (ev) => {
    ev.stopPropagation();
    document.querySelector(".settings").classList.remove("show");
    //Helpers.qs("#ShowAddBtn").style.display = "";
});

Helpers.onClick("#ShowSettings", (ev) => {
    ev.stopPropagation();
    document.querySelector(".settings").classList.add("show");
    document.querySelector(".add-location").classList.remove("show");
});
