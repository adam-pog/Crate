class SessionsController < ApplicationController
  protect_from_forgery with: :exception, except: [:create]
  skip_before_action :require_login, only: [:create]

  def create
    user = login(params[:email], params[:password])

    if user
      render json: {}, status: :ok
    else
      render json: {}, status: :unauthorized
    end
  end

  def test
    render json: {name: @current_user.name}, status: :ok
  end

  def test_post
    binding.pry
    render json: {name: @current_user.name}, status: :ok
  end

  def not_authenticated
    render json: {}, status: :unauthorized
  end
end
