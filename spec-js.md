# Specifications for the Rails with jQuery Assessment

Specs:
- [x] Use jQuery for implementing new requirements
- [x] Include a show resource rendered using jQuery and an Active Model Serialization JSON backend. (Clicking individual recipe, renders recipe without reloading page.)
- [x] Include an index resource rendered using jQuery and an Active Model Serialization JSON backend. (Root page loads in subsequent requests via jquery json)
- [x] Include at least one has_many relationship in information rendered via JSON and appended to the DOM. (Root page renders any changes including the recipes many ingredients)
- [x] Include at least one link that loads or updates a resource without reloading the page. (Save stars on index page update user_recipes)
- [X] Translate JSON responses into js model objects. (All incoming json recipes are built using class Recipe)
- [X] At least one of the js model objects must have at least one method added by your code to the prototype.(All recipe objects created have a renderRecipe prototype method for appending to DOM.)

Confirm
- [X] You have a large number of small Git commits
- [X] Your commit messages are meaningful
- [X] You made the changes in a commit that relate to the commit message
- [X] You don't include changes in a commit that aren't related to the commit message
