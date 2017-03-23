var save = function(event) {
    //Try to save recipe to user
    recipeId = $(event.target).parent().parent()[0].id
    queryDB(recipeId);
    //If successful change image to solid star

    //Else alert user unsuccsesful save
}

var attachListeners = function() {
    //Attach listeners for ???
    // $("#home a").click(function(event) {
    //     event.preventDefault();
    //     alert("Home click");
    // });
    //
    // $("#ingredients_filter_submit").click(function(event) {
    //     event.preventDefault();
    //     alert("Filter click");
    // });
    //
    // $("#saved").click(function(event) {
    //     event.preventDefault();
    //     alert("Saved click");
    // });
    //
    // $("#top5").click(function(event) {
    //     event.preventDefault();
    //     alert("Top 5 click");
    // });
    //
    // $("#submitted").click(function(event) {
    //     event.preventDefault();
    //     alert("Submitted click");
    // });

    $("img[alt='Saved']").click(function(event) {
        event.preventDefault();

        alert("Star clicked");
    })

    $("img[alt='Unsaved']").click(function(event) {
        event.preventDefault();
        save(event);
        alert("Empty star clicked");
    })
}

$(function() {
    attachListeners();
});


////////////////////////////////////////////////////////////////
//AJAX queries
////////////////////////////////////////////////////////////////
var queryDB = function(recipeId) {
  debugger;
  return true;
}
