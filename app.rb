require 'sinatra/base'

class Greeting < Sinatra::Base
  set :public, File.dirname(__FILE__) + '/static'

  get '/' do
    haml :index
  end

  get '/application.css' do
    scss :application
  end

  get '/facebox.css' do
    scss :facebox
  end

  get '/application.js' do
    coffee :application
  end

end
