class AuthController < ApplicationController
  ALG = 'HS256'
  HMAC_SCRET = 'secret'

  def login
    binding.pry
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      payload = {sub: user.id, email: user.email}
      token = JWT.encode(payload, HMAC_SCRET, ALG, { typ: 'JWT' })
      cookies[:tokytoky] = token
      render json: {}, status: :ok
    else
      render json: {}, status: :bad_request
    end
  end
end
