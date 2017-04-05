class Recipe {

    //Recipe constructor takes a hash of attributes
    constructor(attributes) {
        this.id = attributes.id;
        this.title = attributes.title;
        this.directions = attributes.directions;
        this.user_id = attributes.user_id;
        this.ingredients = attributes.ingredients;
        this.recipe_ingredients = attributes.recipe_ingredients;
        this.users = attributes.users;
    }

    //this.renderRecipe() renders this recipe in HTML and appends to DOM
    renderRecipe(parent = "#recipes") {
        var htmlString = `<li><h3 id=${this.id} class="recipe"><a href="/recipes/${this.id}">${this.title} </a>`;
        htmlString += `<a href="/users/${currentUser()}/recipes/${this.id}/edit">`;

        //Check if current user has saved this recipe to determine star icon to use
        this.users.forEach(function(recipe_user) {
            if (currentUser() == recipe_user.id) {
                htmlString += `<img alt="Saved" src="/assets/saved.png">`;
            }
        });
        if (!htmlString.includes("Saved")) {
            htmlString += `<img alt="Unsaved" src="/assets/unsaved.png">`;
        }
        htmlString += `</a></h3><ul>`

        //Save this to variable for access inside of the forEach loop below
        var recipe = this;
        this.ingredients.forEach(function(ingredient) {
            htmlString += `<li>${ingredient.name}, `;
            recipe.recipe_ingredients.forEach(function(recipe_ingredient) {
                if (recipe_ingredient.ingredient_id == ingredient.id) {
                    htmlString += `${recipe_ingredient.quantity}</li>`;
                }
            });
        });
        htmlString += `</ul><br><p>${recipe.directions}</p>`;
        htmlString += `</ul>`;

        //Check if current user is owner of recipe and if so add edit button
        if(currentUser() == this.user_id) {
            htmlString += `<a href="/recipes/${this.id}/edit" id="${this.id}" name="edit">Edit This Recipe</a><br>`
        }
        $(parent).append(htmlString);
        attachListeners();
    }
}

//Attach listeners, detaches several listeners beforehand to avoid multiple
//of the same listeners being attached to the same DOM object
var attachListeners = function() {
    $("input[name='commit']").off("click");
    $("input[name='commit']").click(function(event) {
        console.log("Submit button clicked");
        event.preventDefault();
        ajaxSubmit($(this).parent());
    });

    $('img[alt="Delete"]').off("click");
    $('img[alt="Delete"]').click(function(event) {
        console.log("Delete Ingredient Clicked");
        event.preventDefault();
        ajaxDestroy(this.parentNode.pathname);
    });

    $("#home").off("click");
    $("#home").click(function(event) {
        console.log("Home clicked");
        //If current location is root page prevent default and execute ajax requests
        //Otherwiser just perform default action which is go to root page.
        if(location.pathname === "/") {
            event.preventDefault();
            ajaxGet(event.toElement.pathname);
        }
    });

    $("#submitted").off("click");
    $("#submitted").click(function(event) {
        console.log("submitted clicked");
        event.preventDefault();
        showSubmittedRecipes();
    });

    $("#top5").off("click");
    $("#top5").click(function(event) {
        console.log("top5 clicked");
        event.preventDefault();
        showTopFive();
    });

    $("#saved").off("click");
    $("#saved").click(function(event) {
        console.log("saved recipes clicked");
        event.preventDefault();
        ajaxGet(event.toElement.pathname);
    });

    $("#new_ingredient_button").off("click");
    $("#new_ingredient_button").click(function(event) {
        addNewIngredient();
    });

    $(".recipe").on("click", "a[href^='/recipes/']", function(event) {
        event.preventDefault();
        ajaxShow(this.pathname);
    });

    $("#ingredients_filter").submit(function(event) {
        console.log("ingredients filter clicked");
        event.preventDefault();
        filter(event);
    });

    $("img[alt='Saved']").off("click");
    $("img[alt='Saved']").click(function(event) {
        event.preventDefault();
        save(event);
    })

    $("img[alt='Unsaved']").off("click");
    $("img[alt='Unsaved']").click(function(event) {
        event.preventDefault();
        save(event);
    })
}

$(document).ready(function() {
    attachListeners();
    ajaxGet("/recipes");
});

var showSubmittedRecipes = function() {
    ajaxGet("/submitted_recipes");
}

var showTopFive = function() {
    ajaxGet("/most_popular");
}

var addNewIngredient = function() {
  var $new_ingredients = $("#new_ingredients");
  var new_index = $("#new_ingredients input").length/2;
  var htmlString = `<br><input placeholder="Name" type="text" name="recipe[ingredients_attributes][${new_index}][name]" id="recipe_ingredients_attributes_${new_index}_name"> `;
  htmlString += `<input placeholder="Quantity, Ex: '1 tbsp'" type="text" name="recipe[ingredients_attributes][${new_index}][recipe_ingredients_attributes][0][quantity]" id="recipe_ingredients_attributes_${new_index}_recipe_ingredients_attributes_0_quantity">`
  $new_ingredients.hide();
  $new_ingredients.append(htmlString);
  $new_ingredients.fadeIn(1000);
}

var destroyIngredient = function(url) {
    $(`#existing_ingredients a[href='${url}']`).prev().remove();
    $(`#existing_ingredients a[href='${url}']`).prev().remove();
    $(`#existing_ingredients a[href='${url}']`).prev().remove();
    $(`#existing_ingredients a[href='${url}']`).remove();
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
    ajaxSave(recipeEditURL)

    //Switch image
    if ($(event.target)[0].alt == "Unsaved") {
        $(event.target)[0].alt = "Saved";
        $(event.target)[0].src = "/assets/saved.png";
    } else {
        $(event.target)[0].alt = "Unsaved";
        $(event.target)[0].src = "/assets/unsaved.png";
    }
}

//Returns id value of current user according to webpage header
var currentUser = function() {
    return $(".current-user")[0].id
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
            let recipe = new Recipe(response);
            recipe.renderRecipe();
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
                  let recipe = new Recipe(data[i]);
                  recipe.renderRecipe();
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
            for(let i=0; i<response.length; i++) {
              let recipe = new Recipe(response[i]);
              recipe.renderRecipe();
            }
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

var ajaxSubmit = function(form) {
    $.ajax({
        url: form.attr('action'),
        type: form.attr('method'),
        dataType: 'json',
        data: form.serialize(),
        success: function(data) {
            console.log("Success rendering recipe");
            $('form').remove();
            let recipe = new Recipe(data);
            recipe.renderRecipe("body");
            $('h3').parent().replaceWith(function() {
                return $("<ul />", {html: $(this).html()});
            });
        }
    })
}

var ajaxDestroy = function(url) {
    $.ajax({
        url: url,
        method: "DELETE",
        success: function(data) {
            console.log("Delete successful");
            destroyIngredient(this.url);
        }
    });
}
