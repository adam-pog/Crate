class AuthController < ApplicationController
  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      payload = {
        sub: user.id,
        email: user.email,
        exp: (60).minutes.from_now.to_i
      }
      token = JWT.encode(
        payload,
        Rails.application.credentials.alg_secret,
        Rails.application.credentials.signing_alg
      )

      render json: {token: token}, status: :ok
    else
      render json: {}, status: :unauthorized
    end
  end

  def test
    render json: {you: 'did it!'}, status: :ok
  end
end
