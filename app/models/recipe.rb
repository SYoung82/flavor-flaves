class Recipe < ApplicationRecord
  validates :title, uniqueness: true
  validates :title, :directions, presence: true

  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients, dependent: :destroy
  has_many :user_recipes
  has_many :users, through: :user_recipes, dependent: :destroy

  accepts_nested_attributes_for :ingredients, allow_destroy: true

  scope :most_popular, -> { joins(:user_recipes).group(:recipe_id).count }

  def ingredients_attributes=(ingredient_attributes)
    ingredient_attributes.values.each do |ingredient_attribute|
      if ingredient_attribute[:name] != ""
        ingredient = Ingredient.find_or_create_by(name: ingredient_attribute[:name])
        self.ingredients << ingredient
      end
    end
  end

end
