var attachListeners = function() {
  //Attach listeners for ???
   $("#home a").click(function(event){
     event.preventDefault();
     alert("Home click");
   });

   $("#ingredients_filter_submit").click(function(event){
     event.preventDefault();
     alert("Filter click");
   });

   $("#saved").click(function(event){
     event.preventDefault();
     alert("Saved click");
   });

   $("#top5").click(function(event){
     event.preventDefault();
     alert("Top 5 click");
   });

   $("#submitted").click(function(event){
     event.preventDefault();
     alert("Submitted click");
   });
}

$(function(){
  attachListeners();
});
