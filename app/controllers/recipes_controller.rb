class RecipesController < ApplicationController
  before_action :authenticate_user!, :except => [:index]

  def index
    @recipes = Recipe.all
  end

  def new
    @recipe = Recipe.new
    5.times { @recipe.ingredients.build }
  end

  def create
    raise params.inspect
    @recipe = Recipe.new(recipe_params)
    if @recipe.save
      redirect_to root_path
    else
      render :new
    end
  end

  private

  def recipe_params
    params.require(:recipe).permit(:title, :directions, :ingredient_ids, :ingredients)
  end
end
