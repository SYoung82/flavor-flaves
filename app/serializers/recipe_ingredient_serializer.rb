class RecipeIngredientSerializer < ActiveModel::Serializer
  attributes :ingredient_id, :quantity
  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients
end
