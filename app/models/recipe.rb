class Recipe < ApplicationRecord
  validates :title, uniqueness: true
  validates :title, :directions, presence: true

  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients
  has_many :user_recipes
  has_many :users, through: :user_recipes

  accepts_nested_attributes_for :ingredients, allow_destroy: true

  def ingredients_attributes=(ingredient_attributes)
    ingredient_attributes.values.each do |ingredient_attribute|
      if ingredient_attribute[:name] != ""
        ingredient = Ingredient.find_or_create_by(ingredient_attribute)
        self.ingredients << ingredient
      end
    end
  end
end
