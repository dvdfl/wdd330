import WeatherController from './WeatherController.js';
import Helpers from './utilities.js';

//console.log("main loading...")
const controller = new WeatherController('locationsList');
controller.init();

// Panels
const addLocationPnl = document.querySelector("#addLocation");
const settingsPnl = document.querySelector("#settings");

// Display Add location form button
Helpers.onClick("#ShowAddBtn", (ev) => {
    ev.stopPropagation();
    addLocationPnl.classList.toggle("show");
    settingsPnl.classList.remove("show");
});
// Display Settings panel button
Helpers.onClick("#ShowSettings", (ev) => {
    ev.stopPropagation();
    settingsPnl.classList.toggle("show");
    addLocationPnl.classList.remove("show");
});
// Add location Button event handler
Helpers.onClick("#AddLocationBtn", (ev) => {
    ev.stopPropagation();
    //console.log(Helpers.qs("#NewLocation"))
    controller.addLocation(Helpers.qs("#NewLocation"), addLocationPnl);
});
// Save Settings Button event handler
Helpers.onClick("#SaveSettingsBtn", (ev) => {
    ev.stopPropagation();
    controller.saveSettings(Helpers.qs("#metricUnits"), Helpers.qs("#refreshRate"));
    settingsPnl.classList.remove("show");
});
// Cancel/close Add Location panel
Helpers.onClick("#CancelLocationBtn", (ev) => {
    ev.stopPropagation();
    addLocationPnl.classList.remove("show");
});
// Cancel/close Settings panel
Helpers.onClick("#CancelSettingsBtn", (ev) => {
    ev.stopPropagation();
    settingsPnl.classList.remove("show");
});
