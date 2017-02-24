class AddMeasurementToIngredient < ActiveRecord::Migration[5.0]
  def change
    add_column :ingredients, :measurement, :string
  end
end
