class RemoveMeasurementFromIngredients < ActiveRecord::Migration[5.0]
  def change
    remove_column :ingredients, :measurement, :string
  end
end
