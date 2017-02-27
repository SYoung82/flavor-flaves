Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :recipes do
    resources :ingredients
  end

  resources :ingredients

  root "recipes#index"

  devise_for :users, :controllers => { :omniauth_callbacks => "callbacks" }

  get "/auth/:provider/callback" => "recipes#index"
end
