class AuthController < ApplicationController
  ALG = 'HS256'
  HMAC_SCRET = 'secret'

  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      payload = {sub: user.id, email: user.email}
      token = JWT.encode(payload, HMAC_SCRET, ALG, { typ: 'JWT' })
      cookies[:tokytoky] = { value: token, httponly: true, secure: true}
      render json: {}, status: :ok
    else
      render json: {}, status: :bad_request
    end
  end
end
