class AuthController < ApplicationController
  include ActionController::RequestForgeryProtection

  ALG = 'HS256'

  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      payload = {sub: user.id, email: user.email}
      token = JWT.encode(
        payload,
        Rails.application.credentials.hmac_secret,
        ALG,
        { typ: 'JWT' }
      )
      cookies[:token] = { value: token, httponly: true, secure: true}

      render json: {csrf_token: form_authenticity_token}, status: :ok
    else
      render json: {}, status: :unauthorized
    end
  end
end
