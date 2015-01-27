Rails.application.routes.draw do
  root 'welcome#show'

  namespace :api do
    resources :cars, only: [:index, :create, :update]
    resource :eta, only: [:show]
  end
end
