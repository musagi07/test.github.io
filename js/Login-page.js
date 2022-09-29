$(document).ready(function () {
  $("#OpeningPage").show();
  //------------------------login-----------------------
  $("#OpeningLogo").on("click", function () {
    $("#OpeningPage").fadeOut(700);
    $("#LoginPage").fadeIn(700);
  });
});
//動畫特效
$(document).ready(function () {
  $("#OpeningLogo").on("click", function () {
    ScrollReveal().reveal(".LoginLogo", {
      reset: false,
      delay: 500,
      origin: "left",
      duration: 1000,
      distance: "100px",
      easing: "ease-in-out",
    });
    ScrollReveal().reveal(".DiscountContent", {
      reset: true,
      duration: 800,
      interval: 400,
      delay: 1200,
      origin: "bottom",
      distance: "50px",
      easing: "ease-in-out",
    });

    ScrollReveal().reveal(".LoginPageright", {
      reset: true,
      duration: 800,
      delay: 1000,
      origin: "right",
      distance: "200px",
      easing: "ease-in-out",
    });

    ScrollReveal().reveal(".Contactus p", {
      reset: true,
      duration: 800,
      delay: 1500,
      interval: 400,
      origin: "left",
      distance: "100px",
      easing: "ease-in-out",
    });
    ScrollReveal().reveal(".footer", {
      reset: true,
      duration: 500,
      delay: 3000,
      origin: "bottom",
      distance: "20px",
      easing: "ease-in-out",
    });
  });
});
