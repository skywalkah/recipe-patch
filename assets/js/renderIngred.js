//this is a script for rendering the ingredients
function renderIngredScript() {
    //define variables
    let addToGroceryBtns = Array.from(
        document.querySelectorAll('#addToGroceryBtn')
    );
    let ingredientArray = JSON.parse(localStorage.getItem('ingredients')) || [];
    let shoppingUL = document.querySelector('.shopping-list-area');
    //this function creates the shopping list items with input of ingredients
    function createShoppingListItems(igs) {
        //clear the shopping list area
        document.querySelector('.shopping-list-area').innerHTML = '';
        //create shopping list items
        for (var i = 0; i < igs.length; i++) {
            //create the li
            let shoppingListItem = document.createElement('li');
            shoppingListItem.classList.add(
                'shopping-list-item',
                'block',
                'is-size-6'
            );
            shoppingListItem.textContent = igs[i];
            shoppingListItem.setAttribute('data-index', i);
            //create the delete Btn
            let deleteBtn = document.createElement('button');
            deleteBtn.classList.add(
                'delete',
                'is-medium',
                'delete-single-item'
            );
            deleteBtn.setAttribute('data-index', i);
            //append items to DOM
            shoppingListItem.appendChild(deleteBtn);
            document
                .querySelector('.shopping-list-area')
                .append(shoppingListItem);
        }
        //create start over button
        if (igs.length !== 0) {
            // Create a button element
            let startOverBtn = document.createElement('button');
            // Add text to the button
            startOverBtn.textContent = 'Start Over';
            // Add classes to the button
            startOverBtn.classList.add(
                'button',
                'start-overBtn',
                'is-primary',
                'mt-2'
            );
            // Append the button to the shopping list area
            document.querySelector('.shopping-list-area').append(startOverBtn);
            // Start over button event listener
            startOverBtn.addEventListener('click', function (event) {
                event.preventDefault();
                // We clear localstorage
                localStorage.clear();
                // We empty the shopping list
                shoppingUL.innerHTML = '';
            });
        }
    }

    function readIngredientsFromStorage() {
        //this gets the ingred from local storage
        let ingredientArray = localStorage.getItem('ingredients');
        //if ingreds exist, parse it
        if (ingredientArray) {
            ingredientArray = JSON.parse(ingredientArray);
            //else set it to an empty array
        } else {
            ingredientArray = [];
        }
        //create list items
        createShoppingListItems(ingredientArray);
    }

    function removeShoppingListItem(event) {
        let element = event.target;
        //if element clicked on is delete button
        if (element.classList.contains('delete-single-item') === true) {
            //get the parent's attribute
            var index = element.parentElement.getAttribute('data-index');
            //cut the value out of the array
            ingredientArray.splice(index, 1);
            //set local storage to new array
            localStorage.setItem(
                'ingredients',
                JSON.stringify(ingredientArray)
            );
            //create list items
            createShoppingListItems(ingredientArray);
        }
    }

    //event listener for the "add ingredients to shopping list" buttons
    addToGroceryBtns.forEach(function (addToGroceryBtn) {
        addToGroceryBtn.addEventListener('click', function (e) {
            const thisIngredients =
                e.target.previousElementSibling.previousElementSibling;
            const ingredientListItems =
                thisIngredients.querySelectorAll('.ingredient-item');
            -(
                //this grabs the ingredients from the recipe in the DOM
                ingredientListItems.forEach(function (currentListItem) {
                    //pushes each value into the ingredientArray
                    ingredientArray.push(currentListItem.textContent);
                })
            );
            //this sends the ingredientArray to be created in the createShoppingListItems function
            createShoppingListItems(ingredientArray);
            // console.log(ingredientArray);
            //this sets the local storage to the new array
            localStorage.setItem(
                'ingredients',
                JSON.stringify(ingredientArray)
            );
            //this closes the modal
            closeModal();
            //this scrolls to the top of the page
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    //event listener for the shopping list to listen for deleteing shopping list items
    document
        .querySelector('.shopping-list-area')
        .addEventListener('click', removeShoppingListItem);

    //do this first
    readIngredientsFromStorage();
}
