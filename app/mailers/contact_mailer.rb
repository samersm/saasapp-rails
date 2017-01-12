class ContactMailer < ActionMailer::Base
    default to: 'mrsamer.contact@9me.site'
    
    def contact_mail(name,email,body)
        @name = name
        @email = email
        @body = body
        
        mail(from: email, subject: 'Contact Form Message')
    end
end
