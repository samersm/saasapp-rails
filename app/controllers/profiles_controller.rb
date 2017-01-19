class ProfilesController < ApplicationController
   # GET request for /users/:user_id/profile/new
   def new
    #   Render blank profile details form
    @profile = Profile.new
   end
end