//this is a script for rendering the ingredients
function renderIngredScript(){
    //define variables
    let addToGroceryBtns = Array.from(document.querySelectorAll("#addToGroceryBtn"));
    let ingredientListItems = Array.from(document.querySelectorAll(".ingredient-item"));
    let ingredientArray = [];
    //this function creates the shopping list items with input of ingredients
    function createShoppingListItems(igs){
        console.log(igs);
        //clear the shopping list area
        document.querySelector(".shopping-list-area").innerHTML= '';
        //create shopping list items
        for (var i=0; i < igs.length; i++){
            //create the li
            let shoppingListItem = document.createElement("li");
            shoppingListItem.classList.add("shopping-list-item", "block", "is-size-6");
            shoppingListItem.textContent = igs[i];
            shoppingListItem.setAttribute("data-index", i);
            //create the delete Btn
            let deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete", "is-medium", "delete-single-item");
            deleteBtn.setAttribute("data-index", i)
            //append items to DOM
            shoppingListItem.appendChild(deleteBtn);
            document.querySelector(".shopping-list-area").append(shoppingListItem);
        }
        //create start over button
        if(igs.length !== 0){
            let startOverBtn = document.createElement("button");
            startOverBtn.textContent = "Start Over";
            startOverBtn.classList.add("button", "start-overBtn", "is-primary", "mt-2");
            document.querySelector(".shopping-list-area").append(startOverBtn);
        }
    }
    function IngShoppingList() {
        //this grabs the ingredients from the recipe in the DOM
        ingredientListItems.forEach(function (currentListItem){
            //pushes each value into the ingredientArray
            ingredientArray.push(currentListItem.textContent);
        })
        //this sends the ingredientArray to be created in the createShoppingListItems function
        createShoppingListItems(ingredientArray);
        // console.log(ingredientArray);
        //this sets the local storage to the new array
        localStorage.setItem("ingredients", JSON.stringify(ingredientArray))
        //this closes the modal
        closeModal();
    }
    
    function readIngredientsFromStorage (){
        //this gets the ingred from local storage
        let ingredientArray = localStorage.getItem("ingredients");
        //if ingreds exist, parse it
        if (ingredientArray){
            ingredientArray = JSON.parse(ingredientArray);
        //else set it to an empty array
        } else {
            ingredientArray = [];
        }
        //create list items
        createShoppingListItems(ingredientArray);
    }
    function removeShoppingListItem(event){
        let element = event.target;
        //if element clicked on is delete button
        if (element.classList.contains("delete-single-item") === true){
            //get the parent's attribute
            var index = element.parentElement.getAttribute("data-index");
            //cut the value out of the array
            ingredientArray.splice(index, 1);
            //set local storage to new array
            localStorage.setItem("ingredients", JSON.stringify(ingredientArray));
            //create list items
            createShoppingListItems(ingredientArray);
        }
    }
      //event listener for the "add ingredients to shopping list" buttons
      addToGroceryBtns.forEach(function (addToGroceryBtn) {
        addToGroceryBtn.addEventListener("click", IngShoppingList);
    });
    //event listener for the shopping list to listen for deleteing shopping list items
    document.querySelector(".shopping-list-area").addEventListener("click", removeShoppingListItem);

    //do this first
    readIngredientsFromStorage();
}
function googleScript () {
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
