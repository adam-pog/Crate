class SessionsController < ApplicationController
  skip_before_action :require_login, only: [:create, :temporary_session]

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

  def temporary_session
    render json: {}, status: :ok
  end
end
