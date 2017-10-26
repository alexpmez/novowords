$(document).ready(function() {

  /////////// HEADER BACKGROUND IMAGES ANIMATIONS \\\\\\\\\\\\

  // Set the ammount of images in home main slider
  var homeBackgNumb = 3;

  var homeBackg = [];

  // Adding images to homeBackg arr
  for (var i = 0; i < homeBackgNumb; i++) {
    homeBackg.push("images/" + "slide-" + (i + 1) + ".jpg");
  }

  // Set images transition (fade) speed
  var trans = 2000;

  $('.home .background').css('background-image', 'url(' + homeBackg[homeBackg.length - 1] + ')');
  window.setInterval(
    function() {
      var img = homeBackg.shift();
      homeBackg.push(img);
      //$('.background').eq(1).hide(0).css({'background-image': 'url('+img+')'}).delay(100).fadeToggle(trans);

      $('.home .background').delay(1000).fadeToggle(trans, function() {

        $(this).fadeToggle(trans).css({ 'background-image': 'url(' + img + ')' });

        //$('.background').eq(1).hide(0);
      });
    }, 7000);
});