Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users, :controllers => { :omniauth_callbacks => "callbacks" }

  resources :recipes do
    resources :ingredients
  end

  resources :users do
    resources :recipes
  end

  get "/most_popular" => "recipes#most_popular", as: 'most_popular'

  get "/submitted_recipes" => "recipes#submitted_recipes", as: 'submitted_recipes'

  root "recipes#index"

  get "/auth/:provider/callback" => "recipes#index"

  post "recipes/:recipe_id/ingredients/:id/edit" => "ingredients#update"

  get '*path' => redirect('/')
end
