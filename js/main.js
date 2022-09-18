const links = [
  {
    label: "Week 1 notes",
    url: "week1/index.html"
  }
]
//async function fetchData(url,callback) {
//	const response = await fetch(url);
//	if (response.ok) {
//		const data = await response.json();
//		if (console && console.log) console.log(data); // this is for testing the call
//		if(callback) {
//			callback(data);
//		}
//		else {
//			return data;
//		}
//	} else {
//		throw Error(await response.text());
//	}
//}
function loadList() {
	//let data = fetchData("js/main.js")
	console.log(document.getElementById("LinksList"));
	let listEl = document.getElementById("LinksList");
	//data.
	links.forEach(link => {
		listEl.innerHTML += `<li><a href="${link.url}">${link.label}</a></li>`
		console.log(link);
	});
}
loadList();