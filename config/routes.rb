Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # authenication
  post '/login', to: 'sessions#create', as: :login
  post '/logout', to: 'sessions#destroy', as: :logout
  get '/test', to: 'sessions#test'
  post '/test', to: 'sessions#test_post'

  # users
  post '/user', to: 'users#create'
  put  '/user', to: 'users#update'

  # budget
  resources :budget_categories, only: [:index, :create, :show]

  # transactions
  post 'budget_categories/:budget_category_id/transactions', to: 'transactions#create'
end
