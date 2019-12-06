require 'objspace'

class AuthController < ApplicationController
  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      # payload = {
      #   sub: user.id,
      #   email: user.email,
      #   exp: (60).minutes.from_now.to_i
      # }
      # token = JWT.encode(
      #   payload,
      #   Rails.application.credentials.alg_secret,
      #   Rails.application.credentials.signing_alg
      # )
      session[:user_id] = user.id

      render json: {}, status: :ok
    else
      render json: {}, status: :unauthorized
    end
  end

  def test
    render json: {name: @current_user.name}, status: :ok
  end

  def test_post
    if session[:wow]
      session[:wow] << 1
    else
      session[:wow] = [1]
    end
    puts '===================================='
    binding.pry
    puts session[:wow]
    puts ObjectSpace.memsize_of(session)
    puts '===================================='
    render json: {name: @current_user.name}, status: :ok
  end
end
