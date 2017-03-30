class Ingredient < ApplicationRecord
  validates :name, uniqueness: true

  has_many :recipe_ingredients
  has_many :recipes, through: :recipe_ingredients, dependent: :destroy
  accepts_nested_attributes_for :recipe_ingredients, allow_destroy: true

  def quantity(recipe)
    RecipeIngredient.find_by(recipe_id: recipe.id, ingredient_id: self.id).quantity
  end

  def set_quantity(recipe, qty)
    ri = RecipeIngredient.find_or_create_by(recipe_id: recipe.id, ingredient_id: self.id)
    ri.quantity = qty
    binding.pry
    if ri.save
      puts "Successful Save"
    else
      puts "Error saving"
    end
  end
end
