class IngredientsController < ApplicationController
  def index
    if params[:recipe_id]
      @recipe = Recipe.find(params[:recipe_id])
      @ingredients = @recipe.ingredients
    else
      @ingredients = Ingredient.all
    end
  end

  def edit
    @recipe = Recipe.find(params[:recipe_id])
    @ingredient = Ingredient.find(params[:id])
    @recipe_ingredient = RecipeIngredient.find_by(recipe_id: @recipe.id, ingredient_id: @ingredient.id)
    if !@recipe_ingredient
      redirect_to recipe_ingredients_path(recipe_id: params[:recipe_id])
    end
  end

  def update
    @recipe_ingredient = RecipeIngredient.find_by(recipe_id: params[:recipe_id], ingredient_id: params[:id])
    if @recipe_ingredient && @recipe_ingredient.update(ingredient_params)
      @recipe_ingredient.save
    end
    redirect_to recipe_ingredients_path(recipe_id: params[:recipe_id])
  end

  def destroy
    @recipe_ingredient = RecipeIngredient.find_by(recipe_id: params[:recipe_id], ingredient_id: params[:id])
    @recipe_ingredient.destroy
  end

  private

  def ingredient_params
    params.require(:recipe_ingredient).permit(:quantity)
  end
end
