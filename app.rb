require 'sinatra/base'

class Greeting < Sinatra::Base
  set :public, File.dirname(__FILE__) + '/static'

  get '/' do
    slim :index
  end

  get '/channel' do
    '<script src="//connect.facebook.net/ja_JP/all.js"></script>'
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
