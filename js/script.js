/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

(function ($) {
  'use strict';

  /* ========================================================================= */
  /*	Page Preloader
  /* ========================================================================= */
  $(window).on('load', function () {
    $('#preloader').fadeOut('slow', function () {
      $(this).remove();
    });
  });


  // navbarDropdown
	if ($(window).width() < 992) {
		$('#navigation .dropdown-toggle').on('click', function () {
			$(this).siblings('.dropdown-menu').animate({
				height: 'toggle'
			}, 300);
		});
  }
  
  //Hero Slider
  $('.hero-slider').slick({
    autoplay: true,
    infinite: true,
    arrows: true,
    prevArrow: '<button type=\'button\' class=\'prevArrow\'></button>',
    nextArrow: '<button type=\'button\' class=\'nextArrow\'></button>',
    dots: false,
    autoplaySpeed: 7000,
    pauseOnFocus: false,
    pauseOnHover: false
  });
  $('.hero-slider').slickAnimation();

  /* ========================================================================= */
  /*	Portfolio Filtering Hook
  /* =========================================================================  */
  // filter
  setTimeout(function(){
    var containerEl = document.querySelector('.filtr-container');
    var filterizd;
    if (containerEl) {
      filterizd = $('.filtr-container').filterizr({});
    }
  }, 500);

  /* ========================================================================= */
  /*	Testimonial Carousel
  /* =========================================================================  */
  //Init the slider
  $('.testimonial-slider').slick({
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000
  });


  /* ========================================================================= */
  /*	Clients Slider Carousel
  /* =========================================================================  */
  //Init the slider
  $('.clients-logo-slider').slick({
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false
      }
    }
    ]
  });

  /* ========================================================================= */
  /*	Company Slider Carousel
  /* =========================================================================  */
  $('.company-gallery').slick({
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 667,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false
      }
    }
    ]
  });

  /* ========================================================================= */
  /*	On scroll fade/bounce effect
  /* ========================================================================= */
  var scroll = new SmoothScroll('a[href*="#"]');

  // -----------------------------
  //  Count Up
  // -----------------------------
  function counter() {
    var oTop;
    if ($('.counter').length !== 0) {
      oTop = $('.counter').offset().top - window.innerHeight;
    }
    if ($(window).scrollTop() > oTop) {
      $('.counter').each(function () {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text()
        }).animate({
          countNum: countTo
        }, {
          duration: 1000,
          easing: 'swing',
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          }
        });
      });
    }
  }
  // -----------------------------
  //  On Scroll
  // -----------------------------
  $(window).scroll(function () {
    counter();

    var scroll = $(window).scrollTop();
    if (scroll > 1) {
      $('.navigation').addClass('sticky-header');
    } else {
      $('.navigation').removeClass('sticky-header');
    }
  });

  /* ========================================================================= */
  /*	Contact form
  /* ========================================================================= */

  const API_ENDPOINT = 'https://jkreativ-form-engine-akid.onrender.com/api/contact';

  $('#contact-form').on('submit', function(e) {
    e.preventDefault();

    const $submitBtn = $('#contact-submit');
    const $messageDiv = $('#form-message'); // Add this div to your HTML

    // Prepare form data
    const formData = {
        name: $('#name').val().trim(),
        email: $('#email').val().trim(),
        subject: $('#subject').val().trim(),
        message: $('#message').val().trim()
    };

    // Show loading
    $submitBtn.prop('disabled', true).val('Envoi en cours...');

    // AJAX request
    $.ajax({
        url: API_ENDPOINT,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            if (response.success) {
                $messageDiv.html('<div style="color: green;">✓ ' + response.message + '</div>').show();
                $('#contact-form')[0].reset();
            } else {
                $messageDiv.html('<div style="color: red;">✗ ' + response.message + '</div>').show();
            }
        },
        error: function(xhr) {
            let errorMsg = "Impossible d'envoyer le message. Veuillez réessayer ou nous contacter directement par email";
            if (xhr.responseJSON && xhr.responseJSON.message) {
                errorMsg = xhr.responseJSON.message;
            }
            $messageDiv.html('<div style="color: red;">✗ ' + errorMsg + '</div>').show();
        },
        complete: function() {
            $submitBtn.prop('disabled', false).val('Submit');
        }
    });
  });

  function setFrenchValidationMessages() {
    const fields = {
      'name': 'Veuillez saisir votre nom',
      'email': 'Veuillez saisir une adresse email valide',
      'subject': 'Veuillez indiquer un sujet',
      'message': 'Veuillez saisir votre message'
    };
    
    Object.keys(fields).forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) {
        field.addEventListener('invalid', function(e) {
          e.target.setCustomValidity(fields[fieldId]);
        });
        
        field.addEventListener('input', function(e) {
          e.target.setCustomValidity('');
        });
      }
    });
  }

  // Appeler la fonction au chargement de la page
  document.addEventListener('DOMContentLoaded', setFrenchValidationMessages);

})(jQuery);
