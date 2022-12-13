import Helpers from './utilities.js';
import Location from './Location.js';
import LocationsView from './LocationsView.js';
const defaultSettings = { metricUnits : false, refreshRate : 15 }

export default 
	class WeatherController {

	constructor(listId) {
		this._listId = listId;
		this._listEl = document.getElementById(listId);
        this._locationsList = [];
        this._location = new Location();
        this._locationsView = new LocationsView(this._listEl);
        this._settings = defaultSettings;
	}

    init() {
        this.loadSettings();

        this._locationsList = this.getLocations();
		this.listLocations();
    }
    /**
     * updates settings panel with current options
     * */
    loadSettings() {
        Helpers.qs("#metricUnits").checked = this._settings.metricUnits;
        Helpers.qs("#imperialUnits").checked = !this._settings.metricUnits;
        Helpers.qs("#refreshRate").value = this._settings.refreshRate;
        this._locationsView.setUnits(this._settings.metricUnits)
    }
    /**
     * Saves Settings inforamtion and refreshes the screen with new options
     */
    saveSettings(metricEl, refreshRateEl) {
        const reloadList = this._settings.metricUnits != metricEl.checked;
        this._settings.metricUnits = metricEl.checked;
        this._settings.refreshRate = refreshRateEl.value;

        this._locationsView.setUnits(this._settings.metricUnits)
        // will reload screen only if units changed
        if (reloadList) {
            this.listLocations();
        }
    }
    /**
     * Retrieves previously saved locations
     */
    getLocations() {
        return this._location.getLocations();
    }
    /**
     * Saves List on local storage
     * @param {Task} task
     * @param {String} key
     */
    saveList(location) {
        if (location) {
            this._locationsList.push(location)
        }
        this._location.saveLocationsList(this._locationsList)
    }
    /**
     * Adds location to the list and saves the list
     **/
    async addLocation(input, panel) {
        // textbox value
        const newLocationName = input.value;
        // if empty exit function
        if (!newLocationName.trim()) {
            return;
        }
        // creating new task object
        this._location.findLocation(newLocationName).then(
            resp => {
                console.log(resp);
                if (resp.length == 1) {
                    input.value = "";
                    //console.log("will store it")
                    const newLocation = {
                        "localid": new Date().getTime(),
                        "name": resp[0].name,
                        "lat": resp[0].lat,
                        "lon": resp[0].lon,
                        "country": resp[0].country
                    }
                    // saving list locally
                    this.saveList(newLocation);
                    // reloading list on screen
                    this.listLocations();
                    panel.classList.remove("show");
                }
                else {
                    if (resp.length == 0) {
                        alert("No locations found please review your input and try again with.\n The right format shoudl be used: City, State, County");
                    }
                    else {
                        alert("Multiple locations found please review your input and try again with.\n The right format shoudl be used: City, State, County");
                    }
                }
            }
        )
        console.log(newLocationName);
    }
    /**
     * */
    listLocations() {
        this._locationsView.renderLocationsList(this._locationsList);
        this._locationsList.forEach(loc => {
            if (loc.weather) {
                console.log(`location: ${loc.name} is cached`);
                this._locationsView.populateData(loc, this.removeLocation.bind(this), this.showLocationDetail.bind(this));
            }
            else {
                console.log(loc)
                this._location.fetchLocation(loc).then(res => {
                    //console.log(res)
                    loc = res;
                    console.log(loc)
                    this._locationsView.populateData(loc, this.removeLocation.bind(this), this.showLocationDetail.bind(this));
                    //console.log("locations updated?");
                    //console.log(this._locationsList);
                })
            }
        })
    }

    removeLocation(ev, loc) {
        ev.stopPropagation();
        ev.preventDefault();
        if (confirm(`Are you sure you want to remove ${loc.name} from your list?`)) {
            console.log("removeLocation" + loc)
            // fiding task in list
            const task = this._locationsList.find(l => l.id === loc.id)
            // removing item from list
            this._locationsList.splice(this._locationsList.indexOf(task), 1)
            //Saving data
            this.saveList();
            //updating UI
            this.listLocations();
        }
    }

    showLocationDetail(ev, loc) {
        ev.stopPropagation();
        ev.preventDefault();
        this._locationsView.showDetail(loc, this.backToList.bind(this));
    }

    backToList(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.listLocations();
    }
}
