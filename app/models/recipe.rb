class Recipe < ApplicationRecord
  validates :title, uniqueness: true
  validates :title, :directions, presence: true

  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients, dependent: :destroy
  has_many :user_recipes
  has_many :users, through: :user_recipes, dependent: :destroy

  accepts_nested_attributes_for :ingredients, allow_destroy: true

  #most_popular returns all most popular recipes based on saves, number of saves can be accessed via
  #recipe.attributes['user_count']
  scope :most_popular, -> (limit=1) { joins(:user_recipes).group(:recipe_id).order('count(recipe_id) desc').select('recipes.*, count(recipe_id) as user_count') }

  def ingredients_attributes=(ingredient_attributes)
    ingredient_attributes.values.each do |ingredient_attribute|
      if ingredient_attribute[:name] != ""
        ingredient = Ingredient.find_or_create_by(name: ingredient_attribute[:name])
        self.ingredients << ingredient
      end
    end
  end

end
