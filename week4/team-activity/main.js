const squares = Array.from(document.querySelectorAll("main>div"));
let turn = 0;

let clickSquare = function (ev) {

    if (this.classList.contains("selected")) {
        alert("This square has been already selected")
    }
    else {
        this.innerText = (turn % 2 === 0 ? "O" : "X");
        this.classList.add("selected");
        turn++;
    }
}

let resetGame = function () {
    turn = 0;
    squares.forEach(el => {
        el.classList.remove("selected");
        el.innerText = "";
    })
}
squares.forEach(el => {
    el.addEventListener('touchend', clickSquare);
})

const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', resetGame);
