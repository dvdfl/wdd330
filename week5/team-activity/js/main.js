import Hikes from './hikes.js';

//on load generate list
window.addEventListener("load", () => {
    let hikes = new Hikes('hikes')
    hikes.showHikeList();
});
