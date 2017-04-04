var attachListeners = function() {

    $("#top5").click(function(event) {
        event.preventDefault();
        console.log("Top 5 Clicked");
        showTopFive();
    });

    $("#new_ingredient_button").click(function(event) {
        console.log("Text Input");
        addNewIngredient();
    });

    $(".recipe").on("click", "a[href^='/recipes/']", function(event) {
        event.preventDefault();
        console.log("clicked");
        ajaxShow(this.pathname);
    });

    $("#ingredients_filter").submit(function(event) {
        event.preventDefault();
        filter(event);
    });

    $("img[alt='Saved']").click(function(event) {
        event.preventDefault();
        save(event);
    })

    $("img[alt='Unsaved']").click(function(event) {
        event.preventDefault();
        save(event);
    })
}

$(document).ready(function() {
    attachListeners();
});

var showTopFive = function() {
    ajaxGet("/most_popular");
}

var addNewIngredient = function() {
  var $new_ingredients = $("#new_ingredients");
  var new_index = $("#new_ingredients input").length/2;
  // var htmlString = `<br><label for="recipe_ingredients_attributes_${new_index}_New Ingredient:">New ingredient:</label><br>`
  var htmlString = `<br><input placeholder="Name" type="text" name="recipe[ingredients_attributes][${new_index}][name]" id="recipe_ingredients_attributes_${new_index}_name"> `
  htmlString += `<input placeholder="Quantity, Ex: '1 tbsp'" type="text" name="recipe[ingredients_attributes][${new_index}][recipe_ingredients_attributes][0][quantity]" id="recipe_ingredients_attributes_${new_index}_recipe_ingredients_attributes_0_quantity">`
  $new_ingredients.append(htmlString);
}

var filter = function(event) {
    filterIngredient = $("select#ingredient_name").val();
    if (filterIngredient != "") {
        ajaxGetFiltered(filterIngredient);
    }
}

var save = function(event) {
    //Try to save recipe to user
    recipeEditURL = $(event.target).parent()[0].pathname;
    queryDB(recipeEditURL)

    //Switch image
    if ($(event.target)[0].alt == "Unsaved") {
        $(event.target)[0].alt = "Saved";
        $(event.target)[0].src = "/assets/saved.png";
    } else {
        $(event.target)[0].alt = "Unsaved";
        $(event.target)[0].src = "/assets/unsaved.png";
    }
}

var currentUser = function() {
    return $(".current-user")[0].id
}

var renderRecipe = function(recipe) {
    var htmlString = `<li><h3 id=${recipe.id} class="recipe"><a href="/recipes/${recipe.id}">${recipe.title} </a>`;
    htmlString += `<a href="/users/${currentUser}/recipes/${recipe.id}/edit">`;
    recipe.users.forEach(function(recipe_user) {
        if (currentUser() == recipe_user.id) {
            htmlString += `<img alt="Saved" src="/assets/saved.png">`;
        }
    });
    if (!htmlString.includes("Saved")) {
        htmlString += `<img alt="Unsaved" src="/assets/unsaved.png">`;
    }
    htmlString += `</a></h3><ul>`
    recipe.ingredients.forEach(function(ingredient) {
        htmlString += `<li>${ingredient.name}, `;
        recipe.recipe_ingredients.forEach(function(recipe_ingredient) {
            if (recipe_ingredient.ingredient_id == ingredient.id) {
                htmlString += `${recipe_ingredient.quantity}</li>`;
            }
        });
    });
    htmlString += `</ul><br><p>${recipe.directions}</p>`;
    htmlString += `</ul>`;
    debugger;
    if(currentUser() == recipe.user_id) {
        htmlString += `<button id="${recipe.id}" type="button">Edit This Recipe</button><br>`
    }
    $("#recipes").append(htmlString);
    attachListeners();
}

////////////////////////////////////////////////////////////////
//AJAX queries
////////////////////////////////////////////////////////////////
var ajaxShow = function(url) {
    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        success: function(response) {
            $("#recipes").empty();
            renderRecipe(response);
        },
        error: function(response) {
            console.log("Error finding recipe.");
        }
    });
}

var ajaxGet = function(url) {
    $.ajax({url: url,
            method: "GET",
            dataType: "json",
            success: function(data) {
                $("#recipes").empty();
                for(let i=0; i<data.length; i++) {
                  renderRecipe(data[i]);
                }
            }
          });
}

var ajaxGetFiltered = function(ingredient) {
    $.ajax({
        url: '/recipes',
        method: "GET",
        dataType: "json",
        data: {
            ingredient: {
                name: ingredient
            }
        },
        success: function(response) {
            $("#recipes").empty();
            response.forEach(recipe => renderRecipe(recipe));
        },
        error: function(err) {
            console.log(err);
        }
    });
}

var ajaxSave = function(url) {
    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        success: function(data) {
            console.log("Successful save");
            return true;
        }
    });
    return false;
}

var queryDB = function(url) {
    //Determine the type of query based on caller function
    query = arguments.callee.caller.name;
    if (query == "save") {
        return ajaxSave(url);
    }
    return false;
}
