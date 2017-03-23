var save = function(event) {
    console.log("In save()");
    //Try to save recipe to user
    recipeEditURL = $(event.target).parent()[0].pathname;
    queryDB(recipeEditURL);
    //If successful change image to solid star
//TODO TODO TODO
    debugger;
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

    // $("img[alt='Saved']").click(function(event) {
    //     event.preventDefault();
    //     save(event);
    //     alert("Delete Successful");
    // })

    $("img[alt='Unsaved']").click(function(event) {
        event.preventDefault();
        save(event);
    })
}

$(function() {
    attachListeners();
});


////////////////////////////////////////////////////////////////
//AJAX queries
////////////////////////////////////////////////////////////////
var ajaxGet = function(url) {
  object = $.ajax({
    url: url,
    method: "GET",
    dataType: "json"
  });
  console.log(object.responseText);
  return object.responseText;
}

var ajaxSave = function(url) {
  console.log("Inside ajaxSave()");
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
  console.log("Inside queryDB");
  //Determine the type of query based on caller function
  query = arguments.callee.caller.name;
  if(query == "save"){
    return ajaxSave(url);
  }
  return false;
}
