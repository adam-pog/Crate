Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # authenication
  post 'login', to: 'auth#login', as: :login
  get 'test', to: 'auth#test'

  # users
  post 'user', to: 'users#create', as: :create_user
end
