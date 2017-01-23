//When user clicks form submit btn
//prevent default submission behavior.
//Use Stripe JS library to check for errors.
//Collect the credit card fields.
//Send card info to Stripe
//Handle Stripe's response (which includes token)


$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  submitBtn.click(function(event){
    //When user clicks form submit btn
    //prevent default submission behavior.
    event.preventDefault();
    
    //Get the card inputs
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
  });  
});