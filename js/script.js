$(document).ready(function () {
  // Play/Pause music and handle initial screen load
  $('#playMusic').on('click', function () {
    // Scroll to the top
    $('html, body').animate({ scrollTop: 0 }, 'slow');

    $('.hero-slider').slick({
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1500,
      dots: true,
      fade: true,
      cssEase: 'linear',
    });

    // Hide initial screen and unlock body scroll
    $('.intial-screen-load').slideUp(1000);
    $('body').removeClass('is-lock');

    // Toggle music playback
    const audio = $('#audio')[0]; // Select the audio element
    if (audio.paused) {
      audio.play(); // Play the music
    } else {
      audio.pause(); // Pause the music
    }
  });

  // Header toggle functionality
  $(".btn-toggle").click(function () {
    $("header").toggleClass("open");
    $('body').toggleClass("is-lock"); // Toggle lock for body scroll
  });

  // Wedding countdown timer
  const weddingDate = new Date("2025-01-19T14:30:00").getTime();
  setInterval(function () {
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;

    if (timeLeft > 0) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      // Update countdown display
      $("#days").text(days);
      $("#hours").text(hours);
      $("#minutes").text(minutes);
      $("#seconds").text(seconds);
    }
  }, 1000);

  // Navigation links click behavior
  $('.navigation ul li').on('click', function () {
    // Remove 'is-click' from all links
    $('.navigation ul li').removeClass('is-click');
    // Add 'is-click' to the clicked link
    $(this).addClass('is-click');
  });

  // Initialize synchronized Main and Thumbnail sliders
  function initializeSliders() {
    $('.main-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.thumb-slider',
    });

    $('.thumb-slider').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.main-slider',
      dots: true,
      centerMode: true,
      focusOnSelect: true,
    });
  }

  // Destroy sliders
  function destroySliders() {
    if ($('.main-slider').hasClass('slick-initialized')) {
      $('.main-slider').slick('unslick');
    }
    if ($('.thumb-slider').hasClass('slick-initialized')) {
      $('.thumb-slider').slick('unslick');
    }
  }

  // Responsive behavior for sliders
  function handleResponsiveSliders() {
    if ($(window).width() <= 768) {
      destroySliders(); // Disable sliders on mobile view
    } else {
      initializeSliders(); // Enable sliders on larger screens
    }
  }

  // Run responsive sliders logic on page load and window resize
  handleResponsiveSliders();
  $(window).on('resize', handleResponsiveSliders);
});
