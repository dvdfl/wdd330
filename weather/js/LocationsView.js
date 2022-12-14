import Helpers from "./utilities.js";

export default class LocationsView {
    constructor(listEl) {
        this._listEl = listEl;
        this._metricUnits = false;
    }
    setUnits(isMetric) {
        this._metricUnits = isMetric;
    }
    /**
    * Creates HTML for list of items
    * @param {Array} list
    * @param {HtmlElement} element
    */
    renderLocationsList(list) {
        this._listEl.innerHTML = '';
        list.forEach((item, idx) => {
            this._listEl.innerHTML += `<li class="location" data-taskid="${item.localid}" id="locItem_${item.localid}"><h2 >${item.name}, ${item.country}</h2></li>`;
        });
    }
    /**
     * Updates Location list item when additional information is available
     * @param {Object} location
     * @param {Function} removeHandler 
     * @param {Function} showDetailHandler 
     * */
    populateData(location, removeHandler, showDetailHandler) {
        console.log(`-- populating location: ${location.name}  --`);
        console.log(location);
        const el = document.getElementById("locItem_" + location.localid);
        const ds = getDegreesSign(this._metricUnits);
        const iconsrc = `https://openweathermap.org/img/w/${location.weather[0].icon}.png`;
        el.innerHTML = `<div><img src="${iconsrc}" alt="weather icon"></div><div><h2>${location.name}, ${location.country}</h2><h3>${location.weather[0].main}</h3></div>`;
        el.innerHTML += `<div class="temps"><h2>${formatTemp(location.main.temp, this._metricUnits)} </h2><h3>Max:${formatTemp(location.main.temp_max, this._metricUnits)}<br>Min:${formatTemp(location.main.temp_min, this._metricUnits)}</h3></div>`;
        // adding show detail
        el.addEventListener("click", ev => { showDetailHandler(ev, location) })

        //buttons container
        const div = document.createElement("div");
        div.className = "item-baseline";

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "deletebtn";
        removeBtn.textContent = "X";
        removeBtn.addEventListener("click", ev => { removeHandler(ev, location); })
        div.appendChild(removeBtn);
        el.appendChild(div);
    }
    /**
     * Displays detail of a location
     * @param {Object} location: Location object 
     * @param {Function} backButtonHandler: Back button handler function
     * */
    showDetail(location, backButtonHandler) {
        // console.log("show detail")
        const iconsrc = `https://openweathermap.org/img/w/${location.weather[0].icon}.png`;
        // const ss = getSpeedSign(this._metricUnits);
        this._listEl.innerHTML = "<li class=detail>"
                                + `<div><img src="${iconsrc}" alt="Weather icon" class="detail-icon">`
                                + `<h2>${location.name}</h2>`
                                + `<h3>${location.weather[0].description}</h3>`
                                + `<h3>${formatTemp(location.main.temp, this._metricUnits)}</h3></div>`
                                + "<ul class=details>" 
                                + `<li>Feels like: ${formatTemp(location.main.feels_like, this._metricUnits)}</li>`
                                + `<li>Min: ${formatTemp(location.main.temp_min, this._metricUnits)}</li>`
                                + `<li>Max: ${formatTemp(location.main.temp_max, this._metricUnits)}</li>`
                                + `<li>Humidity: ${location.main.humidity} %</li>`
                                + `<li>Wind: ${formatSpeed(location.wind.speed, this._metricUnits)}</li>`
                                + "</ul>"
                                + '<p><button type="button" id="BackToListBtn"> &lt; back</button></p>'
                                + "</li>";
        Helpers.onClick("#BackToListBtn", ev => backButtonHandler(ev));
    }

}
function getDegreesSign(isMetric){
    return isMetric ? "℃" : " ℉";
}
function getSpeedSign(isMetric) {
    return isMetric ? "kmph" : " mph";
}

function formatTemp(value, isMetric) {
    let temp = "";
    if (isMetric) {
        temp = farenheitToCelcius(value).toFixed(0);
    }
    else {
        temp = value.toFixed(0);
    }
    return temp + getDegreesSign(isMetric);
}

function farenheitToCelcius(degrees) {
    return (degrees-32) * (5/9)
}


function formatSpeed(value, isMetric) {
    let speed = "";
    if (isMetric) {
        speed = mphToKph(value).toFixed(1);
    }
    else {
        speed = value.toFixed(1);
    }
    return speed + getSpeedSign(isMetric);
}

function mphToKph(degrees) {
    return (degrees-32) * (5/9)
}

