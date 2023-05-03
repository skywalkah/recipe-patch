function googleScript() {
    //fetch using Geoappify
    function createFetchInputs(event) {
        event.preventDefault();
        //city will equal the value typed into the input
        let city = document.querySelector(".google-maps-search-input").value.trim();
        // console.log(city);
        let longLatApi = "d79a19024c414b38ac179719bfbf4d90";
        const geoappifyUrl = "https://api.geoapify.com/v1/geocode/search?text=" + city + "&filter=countrycode:us&apiKey=" + longLatApi;
        //this is the fetch itself
        fetch(geoappifyUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json()
                        .then(function (data) {
                            //send data and city values to getLongLat function
                            getLongLat(data, city);
                            console.log(data);
                        })
                }
            })
    }
    function getLongLat(data, city) {
        // console.log(data);
        //get the long and lat from the data
        let long = data.features[0].geometry.coordinates[0];
        let lat = data.features[0].geometry.coordinates[1];
        //send long, lat, and city to goToGoogleMaps function
        goToGoogleMaps(long, lat, city);
    };
    //go to google maps website using long, lat, and city
    function goToGoogleMaps(long, lat, city) {
        window.open("https://www.google.com/maps/search/grocery+stores+in+" + city + "/@" + lat + "," + long, "_blank");
    }
    //event listener for the google maps "let's go shopping!" button
    document.querySelector(".searchBtn-googlemaps").addEventListener("click", createFetchInputs);
}
