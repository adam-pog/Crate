Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post 'auth', to: 'auth#sign_in'
  get 'wow', to: 'application#wow'

  #users
  post 'users', to: 'users#create'
end
