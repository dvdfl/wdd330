﻿import Helpers from "./utilities.js";

export default class LocationsView {
    constructor(listEl) {
        this._listEl = listEl;
        this._metricUnits = true;
    }
    /**
    * Creates Html list items
    * @param {Array} list
    * @param {HtmlElement} element
    */
    renderLocationsList(list) {
        this._listEl.innerHTML = '';
        list.forEach((item, idx) => {
            this._listEl.innerHTML += `<li class="location" data-taskid="${item.localid}" id="locItem_${item.localid}"><h2 >${item.name}</h2></li>`;
        });
    }
    populateData(item, removeHandler, showDetailHendler) {
        console.log("-- populating --");
        console.log(item);
        const el = document.getElementById("locItem_" + item.localid);
        const ds = getDegreesSign(this._metricUnits);
        // wind speed
        const wspeed = item.wind.speed.toFixed(1);
        const humidity = item.main.humidity.toFixed(0);
        const iconsrc = `https://openweathermap.org/img/w/${item.weather[0].icon}.png`;
        el.innerHTML = `<div><img src="${iconsrc}" alt="weather icon"></div><div><h2>${item.name}</h2><h3>${item.weather[0].description}</h3></div>`;
        el.innerHTML += `<div><h2>${item.main.temp.toFixed(0)} ${ds}</h2><h3>Max:${item.main.temp_max.toFixed(0)}<br>Min:${item.main.temp_min.toFixed(0)}</h3></div>`;

        //buttons container
        const div = document.createElement("div");
        //details button
        const detailBtn = document.createElement("button");
        detailBtn.textContent = "+";
        detailBtn.addEventListener("click", p => { showDetailHendler(item) })
        div.appendChild(detailBtn);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.addEventListener("click", p => { removeHandler(item); })
        div.appendChild(removeBtn);
        el.appendChild(div);
    }

    showDetail(loc, backHandler) {
        console.log("show detail")
        const ds = getDegreesSign(this._metricUnits);
        this._listEl.innerHTML = "<li>"
                                + `<h2>${loc.name}</h2>`
                                + `<h3>${loc.weather[0].description}</h3>`
                                + "<ul class=details>" 
                                + `<li>Current Temp: ${loc.main.temp.toFixed(0)}${ds}</li>`
                                + `<li>Min: ${loc.main.temp_min.toFixed(0)}${ds}</li>`
                                + `<li>Max: ${loc.main.temp_max.toFixed(0)}${ds}</li>`
                                + `<li>Feels like: ${loc.main.feels_like.toFixed(0)}${ds}</li>`
                                + `<li>Humidity: ${loc.main.humidity} %</li>`
        
                                + "</ul>"
                                + '<p><button type="button" id="BackToListBtn"> &lt; back</button></p>'
                                + "</li>";
        Helpers.onTouch("#BackToListBtn", p => backHandler());
    }

}
function getDegreesSign(isMetric){
    return isMetric ? " ℉" : "℃" ;
}