Rails.application.routes.draw do
  root 'welcome#show'

  namespace :api do
    resources :cars, only: [:index, :create, :update] do
      member do
        put :switch_state
      end
    end
    resource :eta, only: [:show]
  end
end
