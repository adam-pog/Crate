class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ::ActionController::Cookies

  protect_from_forgery with: :exception, except: [:login, :create_user]
  before_action :authenicate_user, except: [:login, :create_user]
  after_action :set_csrf_cookie

  private

  def authenicate_user
    # jwt = parse_token
    #
    # if jwt
    #   @current_user = ::User.find_by(email: jwt.first['email'])
    # else
    #   render json: {}, status: :unauthorized
    # end
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  # def parse_token
  #   authenticate_with_http_token do |token, _|
  #     JWT.decode(
  #       token,
  #       Rails.application.credentials.alg_secret,
  #       true,
  #       { algorithm: Rails.application.credentials.signing_alg }
  #     )
  #   end
  # rescue => e
  #   Rails.logger.info("AUTH FAILURE: #{e}")
  #
  #   render json: {}, status: :unauthorized
  # end

  def set_csrf_cookie
    if session[:user_id]
      cookies['CSRF-Token'] = form_authenticity_token
    end
  end
end
