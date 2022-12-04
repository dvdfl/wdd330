import Storage from './storage.js';
import Helpers from './utilities.js';
import WeatherApi from './weather-api.js';

const TodosStorageKey = "myLocationsList"
/**
 * Creates Html list items
 * @param {Array} list
 * @param {HtmlElement} element
  */
function renderTodoList(list, element) {
    element.innerHTML = '';
    list.forEach((item, idx) => {
        //element.innerHTML += `<li data-taskid="${item.id}"><label class="task-conent">${item.name}</label>${item.weather[0].description}<button type="button" id="RemoveTask${idx}">X</button></li>`;
        element.innerHTML += `<li class="location" data-taskid="${item.localid}" id="locItem_${item.localid}"><h2 >${item.name}</h2></li>`;
    });
}
function populateData(item) {
    console.log(item);
    const el = document.getElementById("locItem_" + item.localid);
    // wind speed
    const wspeed = item.wind.speed.toFixed(1);
    const humidity = item.main.humidity.toFixed(0);
    const iconsrc = `https://openweathermap.org/img/w/${item.weather[0].icon}.png`;
    el.innerHTML = `<div><img src="${iconsrc}" alt="weather icon"></div><div><h2>${item.name}</h2><h3>${item.weather[0].description}</h3></div>`;
    el.innerHTML += `<div><h2>${item.main.temp.toFixed(0)} ℉</h2><h3>Max:${item.main.temp_max.toFixed(0)}<br>Min:${item.main.temp_min.toFixed(0)}</h3></div>`;
}
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

export default class Locations {
    constructor(listId) {
        this._listId = listId;
        this._filter = null;
        this._api = new WeatherApi();
        this.locationsList = this.getLocations(TodosStorageKey);
        this.listLocations();
    }
    getLocations(key) {
        let storedList = Storage.getData(key);
        if (!storedList) {
            this.locationsList = [];
            //this.saveTodo(
            //    {
            //    "localid": new Date().getTime(),
            //    "name": "London",
            //    "lat": 51.5085,
            //    "lon": -0.1257,
            //    "country": "GB"
            //    }, key);
            //storedList = Storage.getData(key);
            storedList = [{
                         "localid": new Date().getTime(),
                         "name": "London",
                         "lat": 51.5085,
                         "lon": -0.1257,
                         "country": "GB"
            }];
            return storedList;
        }
        return storedList ? JSON.parse(storedList) : new Array();
    }
    /**
     * Saves List on local storage
     * @param {Task} task
     * @param {String} key
     */
    saveTodo(task, key) {
        if (task) {
            this.locationsList.push(task)
        }
        Storage.setData(key, JSON.stringify(this.locationsList))
    }

    addLocation() {
        // new task textbox element
        const newContentTbx = Helpers.qs('#newItem');
        // textbox value
        const newTodoContent = newContentTbx.value;
        // if empty exit function
        if (!newTodoContent.trim()) {
            return;
        }
        // creating new task object
        const todoItem = { id: new Date().toString(), content: newTodoContent, completed: false };
        //saving new item
        this.saveTodo(todoItem, TodosStorageKey);
        // updating UI
        newContentTbx.value = "";
        this.listLocations();
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
        this.saveTodo(null, TodosStorageKey);
        this.listLocations();
    }
    /**
     * Removes Task from list
     * @param {any} taskId
     */
    removeTodo(taskId) {
        // fiding task in list
        const task = this.locationsList.find(task => task.id === taskId)
        // removing item from list
        this.locationsList.splice(this.locationsList.indexOf(task), 1)
        //Saving data
        this.saveTodo(null, TodosStorageKey);
        //updating UI
        this.listLocations();
    }
    /**
     * Populates HTML list with filtered items 
     */
    listLocations() {
        // Filtering list
        const list = getFilteredList(this.locationsList, this._filter);
        
        list.forEach(loc => {
            this._api.fetchLocation(loc.name + "," + loc.country).then(res => {
                //console.log(res)
                for(var p in res) {
                    loc[p] = res[p];
                }
                populateData(loc);
                //console.log(loc)
            })
        })
        

        // populating HTML list
        renderTodoList(list, Helpers.qs('#' + this._listId));
        // Adding handlres for lis item elements
        Array.from(Helpers.qsa('#' + this._listId + '>li'))
            .forEach(item => {
                // Get Checkbox element
                //const doneCbx = item.querySelector("input[type=checkbox]")
                // Adding handler for Checkbox
                //Helpers.onChangeEl(doneCbx, () => { this.completeTodo(item.dataset.taskid, doneCbx) })
                // Get Button element
                //const deleteBtn = item.querySelector("button")
                // Adding handler for Delete [X] button
                //Helpers.onTouchEl(deleteBtn, () => { this.removeTodo(item.dataset.taskid) })
            });
        // Updating Task count text
        //Helpers.qs("#TaskCount").innerText = this.locationsList.filter(item => !item.completed).length;
    
    }
    /**
     * Updates list filter
     * @param {Bool} completed
     */
    filterList(completed) {
        // sets filter
        this._filter = completed;
        // Updates HTML list on page
        this.listLocations();
    }
}