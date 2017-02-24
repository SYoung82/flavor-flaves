class Recipe < ApplicationRecord
  validates :title, uniqueness: true

  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients
end
