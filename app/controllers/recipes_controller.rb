class RecipesController < ApplicationController
    include RecipesHelper

    before_action :authenticate_user!, except: [:index]

    def index
        if params[:user_id] && params[:user_id] == current_user.id.to_s
            @recipes = current_user.recipes
        elsif params[:ingredient] && params[:ingredient][:name] != ''
            @recipes = Ingredient.find_by(name: params[:ingredient][:name]).recipes.all
        else
            @recipes = Recipe.all
        end
        respond_to do |f|
            f.html { render :index }
            f.json { render json: @recipes }
        end
    end

    def show
        @recipe = Recipe.find(params[:id])
        respond_to do |f|
            f.html { render :show }
            f.json { render json: @recipe }
        end
    end

    def new
        @recipe = Recipe.new
    end

    def create
        @recipe = current_user.recipes.build(recipe_params)
        @recipe.user_id = current_user[:id]
        binding.pry
        if @recipe.save
            build_recipe_ingredients(recipe_params)
            build_default_quantities(@recipe)
            respond_to do |f|
              f.html { redirect_to recipe_ingredients_path(@recipe) }
              f.json { render json: @recipe }
            end
        else
            render :new
        end
    end

    def edit
        if params[:user_id] && params[:id]
            create_or_destroy_user_recipe(params)
        else
            @recipe = Recipe.find(params[:id])
            if @recipe.user_id != current_user[:id]
                flash[:notice] = 'You cannot edit this recipe. You did not create it.'
                redirect_to recipe_path(@recipe)
            end
        end
    end

    def update
        @recipe = Recipe.find(params[:id])
        if @recipe.user_id == current_user[:id] && @recipe.update(recipe_params)
            build_recipe_ingredients(recipe_params)
            build_default_quantities(@recipe)
            redirect_to recipe_path(@recipe)
        else
            render :edit
        end
    end

    def most_popular
        @recipes = Recipe.most_popular(5)
        respond_to do |f|
            f.html { render @recipes }
            f.json { render json: @recipes }
        end
    end

    def submitted_recipes
        @recipes = Recipe.where(user_id: current_user[:id])
        if @recipes.count == 0
            flash[:notice] = "You've not submitted any recipes. Click New Recipe link to get started."
            redirect_to :root
        end
        respond_to do |f|
            f.html { render @recipes }
            f.json { render json: @recipes }
        end
    end

    private

    def recipe_params
        params.require(:recipe).permit(:id,
                                       :title,
                                       :directions,
                                       :user_id,
                                       ingredient_ids: [],
                                       ingredients_attributes: [:name, recipe_ingredients_attributes: [:quantity]])
    end
end
