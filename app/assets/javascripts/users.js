/* global $, Stripe */

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
    submitBtn.val("Processing").prop('disabled', true);
    
    //Get the card inputs
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
    
    var error = false;
    
    if(!Stripe.card.validateCardNumber(ccNum)) {
      error = true;
      alert('The credit card number appears to be invalid.');
    }
    
    if(!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert('The CVC number appears to be invalid.');
    }
    
    if(!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      alert('The expiration date appears to be invalid.');
    }
    
    if (error) {
      //don't proceed
      submitBtn.prop('disabled', false).val("Sign Up");
    } else {
      //Submit the card info to Stripe
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);      
    }        
    return false;
  });  
  

  //A function to handle the Stripe response
  function stripeResponseHandler(status, response) {
    //Get the token from the response
    var token = response.id;
    
    //Inject the card token in a hidden field
    theForm.append('<input type="hidden" name="user[stripe_card_token" value"' + token + '" >');
    
    //Submit the form
    theForm.get(0).submit();
  }  
});