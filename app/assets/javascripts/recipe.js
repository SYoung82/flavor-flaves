function Recipe(attributes){
    this.title = attributes.title;
    this.directions = attributes.directions;
    this.user_id = attributes.user_id;
}

$(function(){
    $("form#new_recipe").on("submit", function(event){
        event.preventDefault();

        var $form = $(this);
        var action = $form.attr("action");
        var params = $form.serialize();

        $.post(action, params, "json")
          .done(function(response){
//TODO TODO TODO deal with JSON response            
            alert(JSON.stringify(response));
          })
    })

})
