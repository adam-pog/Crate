class SessionsController < ApplicationController
  protect_from_forgery with: :exception, except: [:create]
  skip_before_action :require_login, only: [:create]

  def create
    user = login(params[:email], params[:password])

    if user
      render json: { name: user.name }, status: :ok
    else
      render json: {}, status: :unauthorized
    end
  end

  def destroy
    reset_session

    render json: {}, status: :ok
  end

  def test
    render json: {}, status: :ok
  end

  def test_post
    render json: {}, status: :ok
  end
end
