Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "application#index"

  get 'budgets/years', to: 'budget#years'
  get 'budgets/year/:year/', to: 'budget#index'
  post 'budgets/year/:year/', to: 'budget#auto_create'
  get 'budgets/:id/', to: 'budget#show'
  patch 'budgets/:id/', to: 'budget#update'
  post 'budgets/', to: 'budget#create'
  delete 'budgets/:id/', to: 'budget#delete'

  post 'budgets/year/:year/upload_statement', to: 'budget#upload_statement' 
  post 'budgets/year/:year/bulk_upload', to: 'budget#bulk_upload' 

  get 'budgets/:budget_id/categories', to: 'budget_category#index' 
  get 'budgets/:budget_id/categories/:category_id', to: 'budget_category#show' 
  post 'budgets/:budget_id/categories/', to: 'budget_category#create'
  patch 'budgets/:budget_id/categories/:category_id', to: 'budget_category#update' 

  delete 'budgets/:budget_id/categories/:category_id', to: 'budget_category#delete' 

  get 'budgets/:budget_id/categories/:category_id/transactions', to: 'transaction#index' 
  get 'budgets/:budget_id/categories/:category_id/transactions/:transaction_id', to: 'transaction#show' 
  post 'budgets/:budget_id/categories/:category_id/transactions', to: 'transaction#create' 
  patch 'budgets/:budget_id/categories/:category_id/transactions/:transaction_id', to: 'transaction#update' 
  delete 'budgets/:budget_id/categories/:category_id/transactions/:transaction_id', to: 'transaction#delete' 
end
