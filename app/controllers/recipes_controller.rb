class RecipesController < ApplicationController
  include RecipesHelper

  before_action :authenticate_user!, :except => [:index]

  def index
    if params[:user_id]
      @recipes = User.find_by(params[:id]).recipes
    elsif params[:ingredient] && params[:ingredient][:name] != ""
      @recipes = Ingredient.find_by(name: params[:ingredient][:name]).recipes.all
    else
      @recipes = Recipe.all
    end
  end

  def show
    @recipe = Recipe.find(params[:id])
  end

  def new
    @recipe = Recipe.new
  end

  def create
    @recipe = current_user.recipes.build(recipe_params)
    if @recipe.save
      build_recipe_ingredients(recipe_params)
      redirect_to root_path
    else
      render :new
    end
  end

  def edit
    if params[:user_id] && params[:id]
      create_or_destroy_user_recipe(params)
    else
      @recipe = Recipe.find(params[:id])
    end
  end

  def update
    @recipe = Recipe.find(params[:id])
    if @recipe.update(recipe_params)
      redirect_to recipe_path(@recipe)
    else
      render :edit
    end
  end

  private

  def recipe_params
    params.require(:recipe).permit(:title,
                                  :directions,
                                  ingredient_ids:[],
                                  ingredients_attributes: [:name, recipe_ingredients_attributes: [:quantity]])
  end
end
