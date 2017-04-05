class UserSerializer < ActiveModel::Serializer
  attributes :id
  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients
  has_many :users, through: :user_recipes
end
