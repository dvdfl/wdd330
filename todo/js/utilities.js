export default class Helpers {
    static qs(selector) { return document.querySelector(selector); }
    static qsa(selector) { return document.querySelectorAll(selector); }
    static onTouch(elementSelector, callback) {
        this.qs(elementSelector).addEventListener('touchend', callback);
    }
    static onTouchEl(element, callback) {
        element.addEventListener('touchend', () => { callback() });
    }
    static onChangeEl(element, callback) {
        element.addEventListener('change', () => { callback() });
    }
}