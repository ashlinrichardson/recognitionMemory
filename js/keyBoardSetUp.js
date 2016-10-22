  /* 
    Disable scroll down when spacebar is pressed
  */
  window.onkeydown = function(e) { 
    return !(e.keyCode == 32);
  };

  var shiftKey = false; 

  /* set up the keyboard event handling scheme above.. */
  var keyboard = keyboard_module(testing);

