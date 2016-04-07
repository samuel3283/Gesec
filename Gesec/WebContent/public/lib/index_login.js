var working = false;
$('.login').on('submit222', function(e) {
  e.preventDefault();
  
  //alert("==>USER:"+document.getElementById("Username").value);
  //alert("==>PASS:"+document.getElementById("Password").value);
  
  alert("...1..");
  //var newURL = window.location.protocol + "://" + window.location.host + "/" + window.location.pathname;
  window.location.href = "login/validar.html";
  
  //window.location.href = "redirect.jsp";
  
  /*
  if (working) return;
  working = true;
  var $this = $(this),
    $state = $this.find('button > .state');
  $this.addClass('loading');
  $state.html('Authenticating');
  setTimeout(function() {
    $this.addClass('ok');
    $state.html('Welcome back!');
    
	setTimeout(function() {
      $state.html('Log in');
      $this.removeClass('ok loading');
      working = false;
    }, 4000);
	
	
  }, 3000);*/
  
});