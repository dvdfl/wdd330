//event listener to remove playing class any time audio stops
const kbdTags = document.getElementsByTagName("kbd");
const audioTags = document.getElementsByTagName("audio");
Array.from(audioTags).forEach(audioTag => {

    audioTag.addEventListener('ended', () => {
        let kbdTag = Array.from(kbdTags).find(e => e.parentElement.dataset.key == audioTag.dataset.key);
        kbdTag.parentElement.classList.remove('playing')
    });

});

window.addEventListener('keypress', ev => {
    console.log(ev.keyCode)
    let tag = Array.from(kbdTags).find(e => e.innerText == ev.key.toUpperCase())
    if (tag) {
        let key = tag.parentElement.dataset.key;
        let audioTag = document.querySelector("audio[data-key='" + key + "']");

        if (!audioTag.paused) {
            audioTag.pause(); //stop playback 
            audioTag.currentTime = 0; //return playback to beginning of sample
        }
        audioTag.play(); //play the audio
        tag.parentElement.classList.add("playing"); //add playing class to button

        const topPostion = tag.parentElement.style.top;// get the top position of element
        if (topPostion) {//if top position exists
            const topValue = Number(topPostion.replace('px', '')); //extract numric value from top postion
            if (topValue === 100) {
                tag.parentElement.style.top = ''; // reset top position
            }
            else {
                tag.parentElement.style.top = (topValue + 10) + 'px'; // add 10 pixels to the position
            }
        }
        else {
            tag.parentElement.style.top = '10px'; // set position to 10 pixels
        }

    }

});

