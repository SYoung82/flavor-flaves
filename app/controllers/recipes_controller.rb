class RecipesController < ApplicationController
  include RecipesHelper

  before_action :authenticate_user!, :except => [:index]

  def index
    if params[:user_id] && params[:user_id] == current_user.id.to_s
      @recipes = current_user.recipes
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
      build_default_quantities(@recipe)
      redirect_to recipe_ingredients_path(@recipe)
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
      build_recipe_ingredients(recipe_params)
      build_default_quantities(@recipe)
      redirect_to recipe_path(@recipe)
    else
      render :edit
    end
  end

  def most_popular
    @recipes = Recipe.most_popular(5)
  end

  private

  def recipe_params
    params.require(:recipe).permit(:title,
                                  :directions,
                                  ingredient_ids:[],
                                  ingredients_attributes: [:name, recipe_ingredients_attributes: [:quantity]])
  end
end
