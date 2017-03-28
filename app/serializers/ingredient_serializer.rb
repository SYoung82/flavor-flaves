class IngredientSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients
end
