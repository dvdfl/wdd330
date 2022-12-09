import Helpers from './utilities.js';
import Location from './Location.js';
import LocationsView from './LocationsView.js';
export default 
	class WeatherController {

	constructor(listId) {
		this._listId = listId;
		this._listEl = document.getElementById(listId);
        this._locationsList = [];
        this._location = new Location();
        this._locationsView = new LocationsView(this._listEl);
	}

    init() {
        this._locationsList = this.getLocations();
		this.listLocations();
    }

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
     **/
    addLocation() {
        // new task textbox element
        const newContentTbx = Helpers.qs('#NewLocation');
        // textbox value
        const newLocationName = newContentTbx.value;
        // if empty exit function
        if (!newLocationName.trim()) {
            return;
        }
        // creating new task object
        this._location.findLocation(newLocationName).then(
            resp => {
                console.log(resp);
                if (resp.length == 1) {
                    //console.log("will store it")
                    const newLocation = {
                        "localid": new Date().getTime(),
                        "name": resp[0].name,
                        "lat": resp[0].lat,
                        "lon": resp[0].lon,
                        "country": resp[0].country
                    }
                    this.saveList(newLocation);
                    this.listLocations();
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

    removeLocation(loc) {
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

    showLocationDetail(loc) {
        this._locationsView.showDetail(loc, this.backToList.bind(this));
    }

    backToList() {
        this.listLocations();
    }
}
