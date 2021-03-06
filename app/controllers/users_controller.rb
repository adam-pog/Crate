class UsersController < ApplicationController
  skip_before_action :require_login, only: [:create]

  def create
    user = User.new(user_params)
    user.email.downcase!

    status = user.save ? :ok : :bad_request

    render json: {}, status: status
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
