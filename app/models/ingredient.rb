class Ingredient < ApplicationRecord
  validates :name, uniqueness: true

  has_many :recipe_ingredients
  has_many :recipes, through: :recipe_ingredients, dependent: :destroy
  accepts_nested_attributes_for :recipe_ingredients, allow_destroy: true
end
