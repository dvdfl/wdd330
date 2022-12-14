import Storage from './storage.js';
import Helpers from './utilities.js';
import WeatherApi from './weather-api.js';

const TodosStorageKey = "myLocationsList"

/**
 * Filters list of items
 * @param {Array} list
 * @param {Boolean} filter
 * @returns {Array} Filtered List
 */
function getFilteredList(list, filter) {
    if (filter !== null)
        return list.filter(item => item.completed === filter)
    else
        return list;
}

export default class Location {
    constructor(listId) {
        this._listId = listId;
        this._filter = null;
        this._api = new WeatherApi();

    }
    getLocations() {
        let storedList = Storage.getData(TodosStorageKey);
        if (!storedList) {
            storedList = [];
            //storedList = [{
            //             "localid": new Date().getTime(),
            //             "name": "London",
            //             "lat": 51.5085,
            //             "lon": -0.1257,
            //             "country": "GB"
            //}];
            return storedList;
        }
        return storedList ? JSON.parse(storedList) : new Array();
    }
    /**
     * Saves List on local storage
     * @param {Task} task
     * @param {String} key
     */
    saveLocationsList(list) {
        Storage.setData(TodosStorageKey, JSON.stringify(list))
    }

    /**
     * Sets Task as completed, stores it and updates UI
     * @param {String} taskId
     * @param {HtmlElement} chbx
     */
    completeTodo(taskId, chbx) {
        // fiding task in list
        const task = this.locationsList.find(task => task.id === taskId)
        // marking task completed
        task.completed = chbx.checked;
        // saving data
        this.saveLocationsList(null, TodosStorageKey);
        this.listLocations();
    }
    /**
     * Fetches data from API for a location
     * @param {Promise} location promise
     */
    async fetchLocation(loc) {
        return new Promise((resolve, reject) => {
            this._api.fetchLocation(loc.name + "," + loc.country).then(res => {
                //console.log('resp')
                //console.log(res);
                for (var p in res) {
                    loc[p] = res[p];
                }
                resolve(loc);
            })
        })
    }
    /**
     * Searches a location by name (City, State, Country)
     * @returns {Promise} API Request result
     * */
    async findLocation(locationName) {
        return this._api.requestCityByName(locationName);
    }
}