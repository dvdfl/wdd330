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
    * Creates Html list items
    * @param {Array} list
    * @param {HtmlElement} element
    */
    renderLocationsList(list) {
        this._listEl.innerHTML = '';
        list.forEach((item, idx) => {
            this._listEl.innerHTML += `<li class="location" data-taskid="${item.localid}" id="locItem_${item.localid}"><h2 >${item.name}, ${item.country}</h2></li>`;
        });
    }
    populateData(item, removeHandler, showDetailHandler) {
        console.log(`-- populating location: ${item.name}  --`);
        console.log(item);
        const el = document.getElementById("locItem_" + item.localid);
        const ds = getDegreesSign(this._metricUnits);
        const iconsrc = `https://openweathermap.org/img/w/${item.weather[0].icon}.png`;
        el.innerHTML = `<div><img src="${iconsrc}" alt="weather icon"></div><div><h2>${item.name}, ${item.country}</h2><h3>${item.weather[0].main}</h3></div>`;
        el.innerHTML += `<div><h2>${formatTemp(item.main.temp, this._metricUnits)} </h2><h3>Max:${formatTemp(item.main.temp_max, this._metricUnits)}<br>Min:${formatTemp(item.main.temp_min, this._metricUnits)}</h3></div>`;
        // adding show detail
        el.addEventListener("click", ev => { showDetailHandler(ev, item) })

        //buttons container
        const div = document.createElement("div");
        div.className = "item-baseline";

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "deletebtn";
        removeBtn.textContent = "X";
        removeBtn.addEventListener("click", ev => { removeHandler(ev, item); })
        div.appendChild(removeBtn);
        el.appendChild(div);
    }

    showDetail(loc, backHandler) {
        console.log("show detail")

        const ds = getDegreesSign(this._metricUnits);
        //const ss = getSpeedSign(this._metricUnits);
        this._listEl.innerHTML = "<li class=detail>"
                                + `<h2>${loc.name}</h2>`
                                + `<h3>${loc.weather[0].description}</h3>`
                                + "<ul class=details>" 
                                + `<li>Current Temp: ${formatTemp(loc.main.temp, this._metricUnits)}</li>`
                                + `<li>Min: ${formatTemp(loc.main.temp_min, this._metricUnits)}</li>`
                                + `<li>Max: ${formatTemp(loc.main.temp_max, this._metricUnits)}</li>`
                                + `<li>Feels like: ${formatTemp(loc.main.feels_like, this._metricUnits)}</li>`
                                + `<li>Humidity: ${loc.main.humidity} %</li>`
                                + `<li>Wind: ${formatSpeed(loc.wind.speed, this._metricUnits)}</li>`
                                + "</ul>"
                                + '<p><button type="button" id="BackToListBtn"> &lt; back</button></p>'
                                + "</li>";
        Helpers.onClick("#BackToListBtn", ev => backHandler(ev));
    }

}
function getDegreesSign(isMetric){
    return isMetric ? "℃" : " ℉";
}
function getSpeedSign(isMetric) {
    return isMetric ? "kph" : " mph";
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

