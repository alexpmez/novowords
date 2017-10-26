//go to page section
var navigationFn = {
  goToSection: function(id) {
    $('html, body').animate({
      scrollTop: $(id).offset().top
    }, 0);
  }
}


///////// LOADER and SECTIONS SHOW AND HIDE
//show main section
$(this).addClass('displaySect');

//hide loader section
$('.loader-js').addClass('hideSect');