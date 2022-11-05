const apiBaseUrl = "https://swapi.dev/api/";
const peopleListContainer = document.getElementById("PeopleListContainer");
const peopleList = document.getElementById("PeopleList");
const peopleDetail = document.getElementById("PeopleDetail");
const peopleNav = {
                        nextBtn : document.getElementById("nextBtn"),
                        prevBtn : document.getElementById("prevBtn")
};
let people = [];
function loadPeople(direction) {
    console.log("direction: " + direction);
    let url = apiBaseUrl + "people/";
    switch (direction) {
        case 'prev':
            url = peopleNav.previous;
            break;
        case 'next':
            url = peopleNav.next;
            break;
    }
    //console.log(url);
    fetch(url).then(response => {
        //console.log(response);
        if (response.ok) {
            peopleList.innerHTML = "";
            response.json().then(data => {
                people = data.results;
                console.log(data);
                peopleNav.next = data.next;
                peopleNav.previous = data.previous;
                //console.table(data.results)
                people.forEach(renderListItem)
                setNavigation();
            })
        }
    });
}
function renderListItem(item, idx) {
    const listItem = document.createElement("li");
    listItem.innerHTML += `<h3>${item.name}</h3><ul><li>height: ${item.height} cm</li><li>weight: ${item.mass} kg</li></ul>`;
    peopleList.appendChild(listItem)
    listItem.addEventListener("click", () => showDetail(idx))

}
function showDetail(idx) {
    peopleListContainer.style.display = "none";
    peopleDetail.style.display = "";
    //removing old div
    if (peopleDetail.querySelector("div"))
        peopleDetail.removeChild(peopleDetail.querySelector("div"));

    const detail = document.createElement("div");
    const person = people[idx];
    detail.innerHTML += `<h3>${person.name}<h3>`;
    detail.innerHTML += `<ul>`;
    detail.innerHTML += `<li>Gender: ${person.gender}</li>`;
    detail.innerHTML += `<li>Birth year: ${person.birth_year}</li>`;
    detail.innerHTML += `<li>Weight: ${person.mass} kg</li>`;
    detail.innerHTML += `<li>Height: ${person.height} cm</li>`;
    detail.innerHTML += `<li>Eye color: ${person.eye_color}</li>`;
    detail.innerHTML += `<li>Hair color: ${person.hair_color}</li>`;
    detail.innerHTML += `<li>Skin color: ${person.skin_color}</li>`;
    detail.innerHTML += `</ul><br><br>`;
    peopleDetail.insertBefore(detail, peopleDetail.firstChild)
}
function hideDetails() {
    peopleListContainer.style.display = "";
    peopleDetail.style.display = "none";
}
function setNavigation() {
    console.log(peopleNav);
    peopleNav.prevBtn.style.display = peopleNav.previous ? "" : "none";
    peopleNav.nextBtn.style.display = peopleNav.next ? "" : "none";
}

peopleNav.prevBtn.addEventListener("click", () => loadPeople('prev'));
peopleNav.nextBtn.addEventListener("click", () => loadPeople('next'));
document.getElementById("backBtn").addEventListener("click", hideDetails);

//initial load
hideDetails();
loadPeople();