require 'sinatra/base'

class Greeting < Sinatra::Base
  get '/' do
    'hoge!'
  end
end
