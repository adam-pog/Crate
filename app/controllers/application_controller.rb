class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ::ActionController::Cookies

  before_action :authenicate_user, except: [:login, :create_user]

  private

  def authenicate_user
    jwt = parse_token

    if jwt
      @current_user = ::User.find_by(email: jwt.first['email'])
    else
      render json: {}, status: :unauthorized
    end
  end

  def parse_token
    authenticate_with_http_token do |token, _|
      JWT.decode(
        token,
        Rails.application.credentials.alg_secret,
        true,
        { algorithm: Rails.application.credentials.signing_alg }
      )
    end
  rescue => e
    Rails.logger.info("AUTH FAILURE: #{e}")

    render json: {}, status: :unauthorized
  end
end
