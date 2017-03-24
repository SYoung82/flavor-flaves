var attachListeners = function() {
    //Attach listeners for ???
    // $("#home a").click(function(event) {
    //     event.preventDefault();
    //     alert("Home click");
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

var filter = function(event) {
  filterIngredient = $("select#ingredient_name").val();
  if(filterIngredient != "") {

  }
}

var save = function(event) {
    //Try to save recipe to user
    recipeEditURL = $(event.target).parent()[0].pathname;
    queryDB(recipeEditURL)

    //Switch image
    if($(event.target)[0].alt == "Unsaved"){
      $(event.target)[0].alt = "Saved";
      $(event.target)[0].src = "/assets/saved.png";
    }else {
      $(event.target)[0].alt = "Unsaved";
      $(event.target)[0].src = "/assets/unsaved.png";
    }

    //Else alert user unsuccsesful save
}

////////////////////////////////////////////////////////////////
//AJAX queries
////////////////////////////////////////////////////////////////
var ajaxGet = function(url) {
  object = $.ajax({
    url: url,
    method: "GET",
    dataType: "json"
  });
  return object.responseText;
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
  if(query == "save"){
    return ajaxSave(url);
  }
  return false;
}
