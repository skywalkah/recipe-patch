var googleScript = function () {

    let addToGroceryBtn = document.querySelector("#addToGroceryBtn");

    function createFetchInputs(event) {
        event.preventDefault();
        let city = document.querySelector(".google-maps-search-input").value.trim();
        let longLatApi = "d79a19024c414b38ac179719bfbf4d90";
        const geoappifyUrl = "https://api.geoapify.com/v1/geocode/search?text=" + city + "&filter=countrycode:us&apiKey=" + longLatApi;
        fetch(geoappifyUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json()
                        .then(function (data) {
                            getLongLat(data, city);
                            console.log(data);
                        })
                }
            })
    }
    function getLongLat(data, city) {
        console.log(data);
        let long = data.features[0].geometry.coordinates[0];
        let lat = data.features[0].geometry.coordinates[1];
        goToGoogleMaps(long, lat, city);
    };

    function goToGoogleMaps(long, lat, city) {
        window.open("https://www.google.com/maps/search/grocery+stores+in+" + city + "/@" + lat + "," + long, "_blank");
    }

    function addIngShoppingList() {
        //create search area
        //create the div to hold the area
        let googleMapsSearchArea = document.createElement("div");
        googleMapsSearchArea.textContent = "Find your local grocery store!";
        googleMapsSearchArea.classList.add("googlemaps-search-area", "field", "has-addons");
        //create an input within the div
        let googlemapsSearchInput = document.createElement("input");
        googlemapsSearchInput.classList.add("input", "google-maps-search-input");
        googlemapsSearchInput.setAttribute("type", "text");
        googlemapsSearchInput.setAttribute("placeholder", "Enter your city here.");
        googleMapsSearchArea.appendChild(googlemapsSearchInput);
        //create a button within the div
        let searchBtnGms = document.createElement("button");
        searchBtnGms.classList.add("button", "searchBtn-googlemaps");
        searchBtnGms.textContent = "Search";
        googleMapsSearchArea.appendChild(searchBtnGms);
        //append div to the aside
        document.querySelector(".shopping-list-aside").appendChild(googleMapsSearchArea);
        document.querySelector(".searchBtn-googlemaps").addEventListener("click", createFetchInputs);
    }
    addToGroceryBtn.addEventListener("click", addIngShoppingList);
    console.log("google script is running");

}

