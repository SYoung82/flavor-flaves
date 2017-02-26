class RecipesController < ApplicationController
  before_action :authenticate_user!, :except => [:index]

  def index
    @recipes = Recipe.all
  end

  def new
    @recipe = Recipe.new
  end
end
