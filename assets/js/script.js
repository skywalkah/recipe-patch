const getRecipesBtn = document.querySelector('.search-recipe-btn');
const ingredientInput = document.querySelector('.ingredient-input');
const recipeContainer = document.querySelector('.recipes-container');
const apiKey = 'e41259e3d7fb623e3d9f28d013204d49';
const appID = '73cef5af';

getRecipesBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const ingredient = ingredientInput.value.trim();
    if (ingredient) {
        getRecipes(ingredient);
        ingredientInput.value = '';
    }
});

function getRecipes(i) {
    // EDAMAM's API url
    apiUrl = 'https://api.edamam.com/api/recipes/v2?type=public&q=' + i + '&app_id=' + appID + '&app_key=' + apiKey + '&imageSize=LARGE&field=label&field=image&field=url&field=ingredientLines';
    console.log(apiUrl);
    // Lets fetch the data from EDAMAM's API
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log('>>> First fetch >>>', data);
                        displayRecipes(data);
                    });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};

var displayRecipes = function (data) {
    let recipeHTML = '';

    for (let i = 0; i < data.hits.length; i++) {
        const imagePath = data.hits[i].recipe.image;
        const recipeName = data.hits[i].recipe.label;
        const recipeUrl = data.hits[i].recipe.url;
        const recipeIngredients = data.hits[i].recipe.ingredientLines;
        console.log('>>>', typeof recipeIngredients);
        const recipeID = 'modal-' + (i + 1);
        const ingredientList = document.createElement('ul');
        recipeIngredients.forEach(function (ingredient) {
            const li = document.createElement('li');
            li.textContent = ingredient.replace(/,/g, ''); // Remove commas
            ingredientList.appendChild(li);
        });

        // Lets store our html in a variable
        recipeHTML += `
            <div class="card mb-5">
                <div class="card-image">
                    <figure class="image is-4by3">
                        <img src="${imagePath}" alt="${recipeName}">
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
                            <a href="${recipeUrl} target="_blank">
                                <img src="${imagePath}" alt="${recipeName}">
                            </a>
                        </figure>
                    </div>
                    <section class="modal-card-body content">
                        <h3>${recipeName}</h3>
                        <ul>
                            ${Array.from(ingredientList.children).map(li => `<li>${li.textContent}</li>`).join('')}
                        </ul>
                        <button class="button is-success">Add ingredients to grocery list</button>
                    </section>
                </div>
            </div>
        `;
        // We now append our html for the current weather data to its DOM wrapper
        recipeContainer.innerHTML = recipeHTML;
        setupModals();
    }
}