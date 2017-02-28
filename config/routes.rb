Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users, :controllers => { :omniauth_callbacks => "callbacks" }

  resources :recipes do
    resources :ingredients
  end

  resources :users do
    resources :recipes
  end

  resources :ingredients

  root "recipes#index"

  get "/auth/:provider/callback" => "recipes#index"
end
