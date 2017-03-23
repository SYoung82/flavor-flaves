var save = function(event) {
    //Try to save recipe to user
    recipeEditURL = $(event.target).parent()[0].pathname;
    queryDB(recipeEditURL);
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

var ajaxSave = function(recipeId) {
    $.ajax({
      url: "recipes/" + recipeId,
      method: "PATCH",
      dataType: "json",
      data: {
        recipe:
      }
    })
}

var queryDB = function(url) {
  //Determine the type of query based on caller function
  query = arguments.callee.caller.name;
  if(query == "save"){
    ajaxSave(url);
  }
  //debugger;
  return true;
}
