Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # authentication
  post '/login', to: 'sessions#create', as: :login
  post '/logout', to: 'sessions#destroy', as: :logout
  get '/temporary_session', to: 'sessions#temporary_session'

  # users
  post '/user', to: 'users#create'
end
