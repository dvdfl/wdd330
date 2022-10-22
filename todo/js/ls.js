export default class Storage {
    static getData(key) {
        return localStorage.getItem(key);
    }
    /**
     * Stores data in local storage
     * @param {String} name of data entry
     * * @param {String} data (text or serialized object)
     */
    static setData(name, data) {
        return localStorage.setItem(name, data);
    }
}