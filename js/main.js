const links = [
	{
	label: "Week 1 notes",
	url: "week1/index.html"
	},
	{
		label: "Week 2 notes",
		url: "week2/index.html"
	},
	{
		label: "Week 3 notes",
		url: "week3/index.html"
	},
	{
		label: "Week 4 notes",
		url: "week4/index.html"
	},
	{
		label: "Week 5 notes",
		url: "week5/index.html"
	},
	{
		label: "Week 6 project - TODO App",
		url: "todo/index.html"
	},
	{
		label: "Week 7 notes",
		url: "week7/index.html"
	},
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