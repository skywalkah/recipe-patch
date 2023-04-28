const getRecipesBtn = document.querySelector('.search-recipe-btn');
const ingredientInput = document.querySelector('.ingredient-input');
const recipeContainer = document.querySelector('.recipes-container');
const apiKey = 'e41259e3d7fb623e3d9f28d013204d49';
const appID = '73cef5af';

const loader = "<div class='loader-wrapper is-loading mt-4'><div class='loader'></div></div>";
const errorMessage = "<div class='notification is-danger'><p>Sorry, we couldn't find any recipes.</p></div>";

getRecipesBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const ingredient = ingredientInput.value.trim();
    if (ingredient) {
        recipeContainer.innerHTML = loader;
        getRecipes(ingredient);
        ingredientInput.value = '';
    }
});

function getRecipes(i) {
    // EDAMAM's API url
    const apiUrl = 'https://api.edamam.com/api/recipes/v2?type=public&q=' + i + '&app_id=' + appID + '&app_key=' + apiKey + '&imageSize=LARGE&field=label&field=image&field=url&field=ingredientLines';

    // Lets fetch the data from EDAMAM's API
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        displayRecipes(data);
                    });
            }
        })
        .catch(function (error) {
            console.log(error);
            recipeContainer.innerHTML = errorMessage;
        });
};

// Display the recipes in the page.
var displayRecipes = function (data) {
    let recipeHTML = '';

    // The code below loops through the recipes in the data
    // object and creates an image, recipe name, and list of ingredients for each recipe.
    // It also creates a unique ID for each recipe.

    for (let i = 0; i < 5; i++) {
        // Url path for the image
        const imagePath = data.hits[i].recipe.image;
        // The name of the recipe
        const recipeName = data.hits[i].recipe.label;
        // The url for the recipe
        const recipeUrl = data.hits[i].recipe.url;
        console.log(recipeUrl);
        // The ingredients for the recipe
        const recipeIngredients = data.hits[i].recipe.ingredientLines;
        // The unique ID for the recipe so that we can use the modal on each one
        const recipeID = 'modal-' + (i + 1);
        // Create a UL element so we can add the list of ingredients
        const ingredientList = document.createElement('ul');
        // Lets loop through the ingredients object and create a list element with each ingredient for the recipe
        recipeIngredients.forEach(function (i) {
            // 
            const li = document.createElement('li');
            // Remove commas from the ingredients
            li.textContent = i.replace(/,/g, '');
            // Add the list element to the UL element
            ingredientList.appendChild(li);
        });

        // This is our HTML template for each recipe
        recipeHTML += `
            <div class="card mb-5">
                <div class="card-image">
                    <figure class="image is-4by3">
                        <a class="js-modal-trigger" data-target="${recipeID}">
                            <img src="${imagePath}" alt="${recipeName}">
                        </a>
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content">
                        <h3>${recipeName}</h3>
                        <button
                            class="button is-primary js-modal-trigger"
                            data-target="${recipeID}"
                        >
                            View recipe
                        </button>
                    </div>
                </div>
            </div>
            <div class="modal" id="${recipeID}">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <button class="delete" aria-label="close"></button>
                            <a href="${recipeUrl}" target="_blank">
                                <img src="${imagePath}" alt="${recipeName}">
                            </a>
                        </figure>
                    </div>
                    <section class="modal-card-body content">
                        <h3>${recipeName}</h3>
                        <h4 class="pb-3">Ingredients</h4>
                        <ul>
                            ${Array.from(ingredientList.children).map(li => `<li>${li.textContent}</li>`).join('')}
                        </ul>
                        <p><a href="${recipeUrl}" target="_blank">Recipe source for steps.</a></p>
                        <button class="button is-success" id="addToGroceryBtn">Add ingredients to grocery list</button>
                    </section>
                </div>
            </div>
        `;
        // We now append our html for the current weather data to its DOM wrapper
        recipeContainer.innerHTML = recipeHTML;
        // We can call the call the setupModals function now that the recipes are on the page,
        // to add the event listeners to the modal
        setupModals();
        googleScript();
    }
}