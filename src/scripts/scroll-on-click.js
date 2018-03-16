$(function() {
  $(".js-scroll-to, .c-down-link").click(function() {
    var id = $(this).attr("href");

    $("html,body").animate(
      {
        scrollTop: $(id).offset().top - 60
      },
      "normal "
    );
    // return false;
  });
});

var lastScrollTop = 0;
$(window).scroll(function(event) {
  var st = $(this).scrollTop();
  if (st > lastScrollTop) {
    $(".c-logo img").addClass("--small");
  } else {
    $(".c-logo img").removeClass("--small");
  }
  lastScrollTop = st;
});
