//export function getJSON(url) {
//    fetch(url).then(resp => {
//        if (resp.ok) {
//            return resp.json();
//            //resp.json().then(result => {
//            //    return result;
//            //})
//        }
//        else {
//            throw Error(response.statusText);
//        }
//    });
//};

export function getJSON(url) {
    return fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

//var jsonData = getJSON("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02")
//console.log(jsonData);


export const getLocation = function (options) {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};