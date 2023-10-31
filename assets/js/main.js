
!(function($) {
  "use strict";

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  var scrolltoOffset = $('#header').outerHeight() - 21;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first, .mobile-menu ul:first li:first").addClass('active');
      }
    });
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the venobox plugin
  $(window).on('load', function() {
    $('.venobox').venobox();
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Initiate venobox lightbox
  $(document).ready(function() {
    $('.venobox').venobox();
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

})(jQuery);

function searchProduct() {
    var searchTerm = document.getElementById("new-search-input").value;
    if (searchTerm) {

        alert("Searching for: " + searchTerm);
    } else {
        alert("Please enter a product to search for.");
    }
}

function toggleSearchBar() {
  var searchBar = document.querySelector('.new-search-bar');
  var searchButton = searchBar.querySelector('button');
  
  // Apply styles to the button
  searchButton.style.backgroundColor = "#FFB200"; // Example background color
  searchButton.style.color = "#ffffff"; // Example text color
  // Add other styles as necessary
  
  if (searchBar.style.display === 'none' || searchBar.style.display === '') {
      searchBar.style.display = 'block';
  } else {
      searchBar.style.display = 'none';
  }
}

function addToCart(productName) {

    alert(productName + " has been added to your cart!");

    // Update the mock cart count
    var cartCountElem = document.getElementById("count");
    var currentCount = parseInt(cartCountElem.innerText);
    cartCountElem.innerText = currentCount + 1;
}

function addToCart(productName) {
    // Create a new list item for the cart
    var listItem = document.createElement("li");
    listItem.innerText = productName;
    
    // Add a delete button to the list item
    var deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-buy-now btn-delete";
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = function() {
        removeFromCart(listItem);
    };
    listItem.appendChild(deleteBtn);

    // Append the list item to the cart list
    var cartList = document.getElementById("cart-list");
    cartList.appendChild(listItem);
    cartList.style.display = "block";  // Show the cart list

    // Update the mock cart count
    updateCartCount(1);
}

function removeFromCart(listItem) {
    // Remove the list item from the cart
    var cartList = document.getElementById("cart-list");
    cartList.removeChild(listItem);

    // Hide the cart list if it's empty
    if (!cartList.hasChildNodes()) {
        cartList.style.display = "none";
    }

    // Update the mock cart count
    updateCartCount(-1);
}

function updateCartCount(change) {
    var cartCountElem = document.getElementById("count");
    var currentCount = parseInt(cartCountElem.innerText);
    cartCountElem.innerText = currentCount + change;
}

function checkout() {
    var cartCount = parseInt(document.getElementById("count").innerText);
    if (cartCount > 0) {
        alert("Thank you for shopping!");
    } else {
        alert("Cart empty");
    }
}

function navigateToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}

function validateEmail(){

  var email = document.getElementById('subEmail');
  // Check if email is valid
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email.value)) {
      alert('Please enter a valid email!');
      return false;
  }
  // alert('Thank you for subscribing!');
  return true;
  // showPopup();
}

function validateForm() {
  // Get form elements
  var name = document.getElementById('name');
  var email = document.getElementById('email');
  var subject = document.getElementById('subject');
  var message = document.getElementsByName('message')[0];

  // Check if form elements are empty
  if(name.value.trim() === '' || email.value.trim() === '' || subject.value.trim() === '' || message.value.trim() === '') {
      alert('Please fill out all the fields!');
      return false;
  }

  // Check if email is valid
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email.value)) {
      alert('Please enter a valid email!');
      return false;
  }

  // If all validations pass, show the success alert
  alert('Message sent submitted successfully!');
  // showPopup();
  return true;
}

function showPopup() {
  // Create a div element for the pop-up
  var popup = document.createElement('div');
  popup.className = 'popup';
  
  // Set the content of the pop-up
  popup.innerHTML = '<p>Thank you for subscribing</p>';
  
  // Append the pop-up to the body
  document.body.appendChild(popup);
  
  // Display the pop-up
  popup.style.display = 'block';
  
  // Remove the pop-up when clicked
  popup.addEventListener('click', function() {
    document.body.removeChild(popup);
  });
}
// Modify the existing addToCart function to show a browser alert
var originalAddToCart = addToCart;
addToCart = function(productName) {
    // Call the original addToCart function
    originalAddToCart(productName);
    
    // Show a browser alert saying "Item added to cart"
    alert('Item added to cart');
}
