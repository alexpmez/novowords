$(document).ready(function() {

  //*-- Add new pages to array for menu active stage css color and header main content --*//
  var pagesArr = ['home', 'services', 'careers', 'about', 'contact'];

  //google script tag
  var mapSrcJS = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBn77f9Z4Wv_7jOtehuTfEO_ghiZsgnRww&callback=initMap';

  //forms script tag
  var mailerApp = 'js/forms.js';

  //drop down menu
  $('.ui.dropdown').dropdown();

  //rollover for top two copy with icons
  $('.first-menu-items-js').mouseenter(function(event) {
    iconsAndCopyRollOver('.' + this.className.split(' ')[1] + '.first-menu-items-js', 'first-menu-roll-over');
  });

  loadAllSec('home');


  var staffObj = {
    staff1 : {
      name: 'Kirsten Thomson',
      image: 'kirsten-thomson',
      title: 'Registered Manager',
      profession: 'Registered General Nurse',
      info: '<p>Meet Kirsten, a Registered General Nurse. Having worked both in the NHS and as a community nurse, she has the experience necessary to make sure your care experience is of the highest quality at all times.</p><p>As a co-owner and the Registered Manager of Forget-me-not, my personal objective is to ensure that the highest quality of care is delivered in a safe way at all times. My passion is to develop a real alternative to the care home market, driven by the belief that most elderly people would rather stay accommodated within their own homes for as long as possible, retaining their independence and local friendships.</p>'
    },
    staff2 : {
      name: 'Sophie Powley',
      image: 'sophie-powley',
      title: 'Care Manager',
      profession: 'Experienced Care Professional',
      info: '<p>Meet Sophie, an experienced care professional. Having worked locally as a carer for a number of years, Sophie knows the ins and outs of care management and is here to ensure your care package is perfectly suited to your needs.</p><p>As a co-owner and the Care Manager of Forget-me-not, my personal objective is to ensure that we provide you with best care professionals available to build care packages that are 100% tailored to your needs. Sadly, I experienced significant difficulties getting quality and reliable care for my grandfather, who unfortunately passed away in 2015. This personal experience has given me tremendous empathy and sparked my desire to open a top quality care agency that is both reliable and affordable.</p>'
    },
    staff3 : {
      name: 'Michael Ruzic-Gauthier',
      image: 'michael-ruzic-gauthier',
      title: 'Director',
      profession: 'Healthcare Investment Professional',
      info: '<p>Meet Michael, a healthcare investment professional. He has dedicated his career to supporting and building companies in the healthcare space and looks forward to bringing this knowledge to Forget-Me-Not Care Services.</p><p>As a Company Director and Chairman of Forget-me-not, my personal objective is to guide the company ensuring all clients and staff are treated honestly, fairly and in the most professional manner possible. I have been lucky enough to be involved with the development and financing of numerous healthcare companies as well as previously acting as the Chairman of the North and East London Scouts. I hope my experience can help build Forget-Me-Not into a leading national care provider.</p>'
    }
  }

  ////// FUNCTIONS \\\\\\

  //Load All Sections and roll overs
  function loadAllSec(currentPageName) {
    removeAllPagesMainClass(pagesArr);
    $('body').addClass(currentPageName);

    if($('body').hasClass(currentPageName)) {
      loadMenuSec(currentPage(pagesArr), pagesArr);
      $('.main-sections-js').load(currentPageName + '.html', function() {
        activeMenuColor(currentPage(pagesArr), pagesArr);
        homeIconsRollOver();

        //add current year to footer
        $(".copyright span").text( (new Date).getFullYear() + " ");

        //rollover for copy with icons
        $('.icons-and-copy-js').mouseenter(function(event) {
          iconsAndCopyRollOver('.' + this.className.split(' ')[2] + '.icons-and-copy-js', 'icons-and-copy-roll-over');
        });

        var services = {
          homecare: 'service-1',
          daytrips: 'service-2',
          companionship: 'service-3',
          shorttermcare: 'service-4'
        }

        //on click get class name
        $('a').add($('.btns-js')).on('click', function() {
          getClassWithPageName(this.className);

          if($(this).is(':contains("Home Care")')) {
            gotoPagePosition(services.homecare);
          } else if($(this).is(':contains("Day Trips")')) {
            gotoPagePosition(services.daytrips);
          } else if($(this).is(':contains("Companionship")')) {
            gotoPagePosition(services.companionship);
          } else if($(this).is(':contains("Short Term Care")')) {
            gotoPagePosition(services.shorttermcare);
          } else {
            gotoPagePosition('none');
          }

        });

        if (currentPage(pagesArr) === 'careers') {

          $('.section-5-js').load('units/forms/careers-form.html', function(){
           
            removeScriptTag(mailerApp);
          
            addScriptTag(mailerApp);
          });
        }

        if (currentPage(pagesArr) === 'about') {

          //Staff Modal show
          $('.btn-modal-js').on('click', function() {

              var buttonText = $.trim($(this).text());

              //Generate modal info
              generateModalInfo( buttonText );

              //show modal
              $('.modal-js').modal('show');           
          });
        }


        if (currentPage(pagesArr) === 'contact') {

          //var scriptTags = [];
          removeScriptTag(mapSrcJS);
          
          addScriptTag(mapSrcJS);


          $('.section-5-js').load('units/forms/contact-form.html', function(){
           
            removeScriptTag(mailerApp);
          
            addScriptTag(mailerApp);
          });
        }
      });
    }
  }


  function generateModalInfo(buttonText){
    for( var i = 0; i < Object.keys(staffObj).length; i++ ) {

      //check if the staff name is the same as the clicked button text
      if( staffObj[ Object.keys(staffObj)[i] ].name.split(' ')[0] === buttonText.split(" ").pop() ) {

        //Add staff img, name, title and info to modal
        $('.modal-js img').attr('src','images/' + staffObj[ Object.keys(staffObj)[i] ].image + '.jpg');
        $('.modal-js .name-js').html(staffObj[ Object.keys(staffObj)[i] ].name);
        $('.modal-js .title-js').html(staffObj[ Object.keys(staffObj)[i] ].title);
        $('.modal-js .info-js').html(staffObj[ Object.keys(staffObj)[i] ].info);
      }
    }
  }

  function getClassWithPageName(clickedClass) {
    var newClass = clickedClass.split(' ')[1];

    loadAllSec(returnBtnClassPageName(newClass));
  }

  //Return current page name
  function currentPage(pagesArr) {
    for (var i = 0; i < pagesArr.length; i++) {
      if ($('body').hasClass(pagesArr[i])) {
          return pagesArr[i];
      }
    }
  }

  function removeAllPagesMainClass(pagesArr) {
    for (var i = 0; i < pagesArr.length; i++) {
      if ($('body').hasClass(pagesArr[i])) {
        $('body').removeClass(pagesArr[i]);
      }
    }
    $('a').add($('.btns-js')).prop('onclick',null).off('click');
  }


  function removeScriptTag(scriptSrc){
    jQuery(document).ready(function($, scriptSrc){
      $('script').each(function(scriptSrc) {
        if (this.src === scriptSrc) {
          this.parentNode.removeChild( this );
        }
      });
    });
  }

  function addScriptTag(scriptSrc){
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", scriptSrc);
    document.body.appendChild(script);
  }

  function activeMenuColor(currentPage, pagesArr) {
    //remove active menu color from all menus
    for (var i = 0; i < pagesArr.length; i++) {
      if ($('.' + pagesArr[i] + '-js').hasClass('active-menu')) {
        $('.' + pagesArr[i] + '-js').removeClass('active-menu');
      }
    }

    //add active color to current menu
    $('.' + currentPage + '-js').addClass('active-menu');
  }

  function loadMenuSec(currentPage, pagesArr) {
    //change header's main copy
    $('head').append('<link rel="stylesheet" type="text/css" href="css/pages/' + currentPage + '/main.css">');
    $('.' + currentPage + ' .section-header-js').load('units/header-sections/header-' + currentPage + '-main-content.html', function() {
        //clickFunc();
    });
  }

  function gotoPagePosition(pagePosition) {
    if(pagePosition === 'none') {
      setTimeout(function() {
        $('html, body').animate({ scrollTop: $('.' + currentPage(pagesArr)).offset().top}, 1000);
      }, 1000);
    } else {
      setTimeout(function() {
        $('html, body').animate({ scrollTop: $('#' + pagePosition).offset().top}, 1000);
      }, 1000);
    }
  }

  function returnBtnClassPageName(btnClassPageName) {
    var currentButtonName = btnClassPageName;
    var currentNameStart = currentButtonName.indexOf('-') + 1;
    var currentNameEnd = currentButtonName.indexOf('-', currentNameStart);
    var currentPageName = currentButtonName.substring(currentNameStart, currentNameEnd);

    return (currentPageName);
  }

  //Home icons Section roll over
  function homeIconsRollOver() {
    $('.icons-home-sec-js').mouseenter(function(event) {
      $(this).addClass('icons-section-backgs-roll-over');
      $(this).find('.icon-js').addClass('icons-section-icon-roll-over');
      $(this).find('.icon-button-js').addClass('icons-section-buttons-roll-over');
    }).mouseleave(function() {
      $('.icons-home-sec-js').removeClass('icons-section-backgs-roll-over');
      $('.icon-js').removeClass('icons-section-icon-roll-over');
      $('.icon-button-js').removeClass('icons-section-buttons-roll-over');
    });
  }

  //rollover for icons and copy together
  function iconsAndCopyRollOver(rolloverClass, colorClass) {
    $(rolloverClass).mouseenter(function(event) {
      $(rolloverClass).children().addClass(colorClass);
    }).mouseleave(function() {
      $(rolloverClass).children().removeClass(colorClass);
    });
  }

});