Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  namespace :api do
    resources :apparatuses, only: [ :index, :show ]
    resources :trick_types, only: [ :index, :show ]
    resources :tricks, only: [ :index, :show ]
    get "generate_sequence", to: "sequences#generate"
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  root "pages#home"
end
