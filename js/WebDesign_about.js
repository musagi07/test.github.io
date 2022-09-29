// ------------------------- Page04start ----------------------------------//

// let 只會在function內存活，callback必須想辦法拖到時間到
// z-index 沒辦法跑動畫
// JS 動畫都是採非同步且Queue的方式進行，寫在一起也是一個一個來!!!!!!!!!

// -------------------------navStart-------------------------------//
$(document).ready(function () {
  $("#homestart").show();
  $("#navicon01").click(function () {
    NavlistShow();
  });

  $("#navicon02").click(function () {
    NavlistShow();
  });

  $("#navlistCancel").click(function () {
    $("#navlist").stop(true, true).fadeOut(500);
    $("#homestart").stop(true, true).fadeIn(500);
    $("#nav-list-content").animate({ marginTop: "1000px" }, 1000);
    $("#navlist-top ul").animate({ marginTop: "-100px" }, 1000);
  });

  let scrollposition = 0;
  let relativeposition = 0;
  $(window).scroll(function () {
    scrollposition = $(window).scrollTop();
    if (scrollposition > relativeposition) {
      $("#menu").stop(true, true).slideUp(1000);
    } else {
      $("#menu").stop(true, true).slideDown(1000);
    }
    relativeposition = scrollposition; //重新定義位址
  });

  function NavlistShow() {
    $("#navlist").stop(true, true).fadeIn(500);
    $("#homestart").hide();
    $("#nav-list-content").animate({ marginTop: "0px" }, 1000);
    $("#navlist-top ul").animate({ marginTop: "0px" }, 1000);
  }
});
//  ------------- 00-2 nav_messagebox start --------------------------------

$(document).ready(function () {
  // nav_icon 收合//注意要同時隱藏messagebox
  $("#nav_close").on("click", function () {
    $(".messagebox").hide(400);
    if ($("#nav_righticon01").is(":visible")) {
      $("#nav_close").css({
        backgroundImage: "url(./image/home/call_icon_con.svg)",
        transform: "rotate(-360deg)",
      });
      $("#nav_righticon01").css("bottom", "30px").hide(400);
      $("#nav_righticon02").css("bottom", "30px").hide(400);
      $("#nav_righticon03").css("bottom", "30px").hide(400);
    } else {
      $("#nav_close")
        .css("backgroundImage", "url(./image/home/call_icon_close.svg)")
        .css("transform", "rotate(360deg)");
      $("#nav_righticon01").show(50).css("bottom", "240px");
      // .animate({ bottom: "150px" }, { duration: 100 }, "swing");
      $("#nav_righticon02").show(50).css("bottom", "170px");
      $("#nav_righticon03").show(50).css("bottom", "100px");
      // .animate({ bottom: "90px" }, { duration: 100 }, "swing");
    }
  });
  // messagebox 收合
  $("#nav_righticon01").on("click", function () {
    $(".messagebox").hide(400);
    if (!$("#linebox").is(":visible")) {
      $("#linebox").show(400);
    }
  });
  $("#nav_righticon02").on("click", function () {
    $(".messagebox").hide(400);
    if (!$("#phonebox").is(":visible")) {
      $("#phonebox").show(400);
    }
  });
  $("#nav_righticon03").on("click", function () {
    $(".messagebox").hide(600);
    if (!$("#chatbox").is(":visible")) {
      $("#chatbox").show(400);
    }
  });
  $("#linecross").on("click", function () {
    $(".messagebox").hide(400);
  });
  $("#phonecross").on("click", function () {
    $(".messagebox").hide(400);
  });
  $("#chatcross").on("click", function () {
    $(".messagebox").hide(400);
  });
  // chatbox 傳送訊息
  // 最困難的部分!! 要讓聊天是滾動調置底--> 有兩個注意事項!!!!!!
  // 1.要讓電腦在訊息送出時一定要偵測scrollTop的狀況!!! 不然不會work!!!! 故寫在messagesend()
  // 2 messagesend()中必須放在最後面
  // 3. "動態更新"!!!! 讓該容器scrollTop值 = 該容器的scrollHeight
  //ps1:scrollTop在js 是數值 jquery是函式故jquery要加()，scrollTop(offset)表示讓滾輪停留在offset位置!!
  //ps2:scrollHeight代表此元素的容器高度(不含邊界、margin、含padding和卷軸外部分)，clientHeight(不含邊界、margin、含padding和"不含"卷軸外部分)
  //ps3: offsetHeight則是代表此元素的容器高度(含邊界、margin含padding但'不含'卷軸外部分)
  //ps4: $('#box').prop('scrollHeight')或$('#box')[0].scrollHeight都可以

  function messagesend() {
    let guest_message = document.getElementById("message_guest").value;
    $("#chatroom").append(
      `<div class="guest">
            <div class="chatroom_pic guest_pic"></div>
            <div class="chatroom_msg guest_msg">
              <p>${guest_message}
              </p>
            </div>
          </div>
        </div>`
    );
    $("#chatroom").scrollTop($("#chatroom")[0].scrollHeight);
    // console.log($("#chatroom")[0]); --> 這個代表$("#chatroom")[0] = $("#chatroom") 這個div--> 這才是DOM
    // console.log($("#chatroom")); --> 這個代表$("#chatroom") = $("#chatroom")這個物件-->無法被直接使用
    // 有五個 .box 被選取
    // $(".box"); 回傳 jQuery 物件，jQuery.fn.init(5)
    // 使用陣列中括號來取得 DOM
    // $(".box")[0];
    // 使用 jQuery 提供的　get() 方法取得 DOM
    // $(".box").get(0);
    $("#message_guest").val(""); //將訊息欄清空
    ServiceReply(guest_message);
  }

  function ServiceReply(guest_message) {
    // 用Reg的時候記住!!! 字串不要用""或''，直接寫即可
    // 增加延遲感，提升對話感
    setTimeout(function () {
      if (guest_message.search(/優惠|經銷|價格/) >= 0) {
        $("#chatroom").append(
          ` <div class="server">
            <div class="chatroom_pic server_pic"></div>
            <div class="chatroom_msg server_msg">
              <p>您好，戰國策最新優惠方案如下，活動只到10/30，千萬別錯過喔
              </p>
              <a href="https://www.nss.com.tw/poevent/">點我看更多</a>
            </div>
          </div>`
        );
      } else if (guest_message.search(/主機|雲端|服務/) >= 0) {
        $("#chatroom").append(
          ` <div class="server">
            <div class="chatroom_pic server_pic"></div>
            <div class="chatroom_msg server_msg">
              <p>您不知道該如何選擇適合的主機嗎？請使用我們的【主機推薦小幫手】幫您選擇適合的方案
              </p>
              <a href="https://hb.nss.com.tw/index.php?/tickets/new/">主機推薦小幫手</a>
            </div>
          </div>`
        );
      } else {
        $("#chatroom").append(
          ` <div class="server">
            <div class="chatroom_pic server_pic"></div>
            <div class="chatroom_msg server_msg">
              <p>如果需要更進一步協助，請撥打聯絡專線或加入我們line官方帳號，如果您是我們的尊貴會員，可以透過客服中心，會有專人幫您解決
              </p>
              <a href="#">登入會員</a>
            </div>
          </div>`
        );
      }
      $("#chatroom").scrollTop($("#chatroom")[0].scrollHeight); // 只要增加內容就要重新判定一次!!!!
    }, 2000);
  }

  //送出訊息小細節!!
  //1.keypress 跟focus/blur keydown/keyup功能衝突，同時使用會不反應!!!!
  //2. 要注意on()-->功能填寫順序 keydown/keyup順序不要搞錯
  //3. 送出訊息立刻回覆沒有對話感!!! 要set-time-out
  $("#send_msg").on("click", function () {
    setTimeout(messagesend(ServiceReply), 200);
  });
  $("#message_guest").on({
    keypress: function (e) {
      if (e.which == 13) {
        setTimeout(messagesend(ServiceReply), 200);
      }
    },
  });

  //nav_close +title ---> title attr 為html內設，可靠css改變但沒辦法改邊框，必須自己用css設立樣式再用js，修改觸發條件!!!!
  // title 屬性有助於SEO搜尋
  // let newtitle = $("#nav_close").attr("title"); //取得原本html設定的title內容
  $("#nav_close").removeAttr("title"); //清空原本html設定的title attribute
  $("#nav_close").hover(
    function () {
      $("#nav_close_title").show();
    },
    function () {
      $("#nav_close_title").hide();
    }
  );
});

//輪轉區
$(document).ready(function () {
  var cards = $("#article4_card-slider .slider-item").toArray();

  startAnim(cards);

  function startAnim(array) {
    $(window).resize(function () {
      $(window).width();
    });

    if ($(window).width() >= 1250) {
      TweenMax.to(array[0], 1, {
        bezier: [
          { x: 400, y: 0 },
          { x: -400, y: 0 },
          { x: 0, y: 100 },
        ],
        zIndex: 2,
        opacity: 1,
        ease: Cubic.easeInOut,
      });
      TweenMax.fromTo(
        array[1],
        1,
        { x: 0, y: 100, opacity: 1 },
        {
          x: 400,
          y: 0,
          opacity: 0,
          zIndex: 0,
          delay: 0.03,
          ease: Cubic.easeInOut,
          onComplete: sortArray(array),
        }
      );

      TweenMax.fromTo(
        array[2],
        1,
        { x: -400, y: 0, opacity: 1, zIndex: 0 },
        { x: -400, y: 0, opacity: 0.5, zIndex: 0, ease: Cubic.easeInOut }
      );

      TweenMax.fromTo(
        array[3],
        1,
        { x: 400, y: 0, opacity: 0.5, zIndex: 1 },
        { x: 400, y: 0, opacity: 0.5, zIndex: 1, ease: Cubic.easeInOut }
      );
    } else if ($(window).width() < 1250 && $(window).width() > 780) {
      TweenMax.to(array[0], 1, {
        bezier: [
          { x: 200, y: 0 },
          { x: -200, y: 0 },
          { x: 0, y: 100 },
        ],
        zIndex: 2,
        opacity: 1,
        ease: Cubic.easeInOut,
      });
      TweenMax.fromTo(
        array[1],
        1,
        { x: 0, y: 100, opacity: 1 },
        {
          x: 200,
          y: 0,
          opacity: 0,
          zIndex: 0,
          delay: 0.03,
          ease: Cubic.easeInOut,
          onComplete: sortArray(array),
        }
      );
      TweenMax.fromTo(
        array[2],
        1,
        { x: -200, y: 0, opacity: 1, zIndex: 0 },
        { x: -200, y: 0, opacity: 0.5, zIndex: 0, ease: Cubic.easeInOut }
      );
      TweenMax.fromTo(
        array[3],
        1,
        { x: 200, y: 0, opacity: 0.5, zIndex: 1 },
        { x: 200, y: 0, opacity: 0.5, zIndex: 1, ease: Cubic.easeInOut }
      );
    } else {
      TweenMax.to(array[0], 1, {
        bezier: [
          { x: 120, y: 0 },
          { x: -120, y: 0 },
          { x: 0, y: 50 },
        ],
        zIndex: 2,
        opacity: 1,
        ease: Cubic.easeInOut,
      });
      TweenMax.fromTo(
        array[1],
        1,
        { x: 0, y: 50, opacity: 1 },
        {
          x: 120,
          y: 0,
          opacity: 0,
          zIndex: 0,
          delay: 0.03,
          ease: Cubic.easeInOut,
          onComplete: sortArray(array),
        }
      );
      TweenMax.fromTo(
        array[2],
        1,
        { x: -120, y: 0, opacity: 1, zIndex: 0 },
        { x: -120, y: 0, opacity: 0.5, zIndex: 0, ease: Cubic.easeInOut }
      );
      TweenMax.fromTo(
        array[3],
        1,
        { x: 120, y: 0, opacity: 0.5, zIndex: 1 },
        { x: 120, y: 0, opacity: 0.5, zIndex: 1, ease: Cubic.easeInOut }
      );
    }
  }

  function sortArray(array) {
    clearTimeout(delay);
    var delay = setTimeout(function () {
      var firstElem = array.shift();
      array.push(firstElem);
      return startAnim(array);
    }, 3000);
  }
});

//動畫特效
$(document).ready(function () {
  ScrollReveal().reveal(".nav_left", {
    reset: false,
    delay: 500,
    origin: "left",
    distance: "100px",
    easing: "ease-in-out",
  });
  ScrollReveal().reveal(".page01content img", {
    reset: true,
    duration: 500,
    delay: 300,
    origin: "top",
    distance: "100px",
    easing: "ease-in-out",
  });

  ScrollReveal().reveal(".page01content p", {
    reset: true,
    duration: 800,
    delay: 500,
    origin: "left",
    distance: "100px",
    easing: "ease-in-out",
  });
  ScrollReveal().reveal(".cont", {
    reset: true,
    duration: 800,
    delay: 500,
    origin: "right",
    distance: "100px",
    easing: "ease-in-out",
  });

  ScrollReveal().reveal(".shake_hand", {
    reset: true,
    duration: 800,
    delay: 500,
    origin: "left",
    distance: "100px",
    easing: "ease-in-out",
  });
  ScrollReveal().reveal(".page03article", {
    reset: true,
    duration: 800,
    delay: 500,
    origin: "bottom",
    distance: "100px",
    easing: "ease-in-out",
  });
  ScrollReveal().reveal(".page04section01", {
    reset: true,
    duration: 800,
    delay: 500,
    origin: "bottom",
    distance: "100px",
    easing: "ease-in-out",
  });
  ScrollReveal().reveal(".page04section03", {
    reset: true,
    duration: 800,
    origin: "bottom",
    distance: "100px",
    easing: "ease-in-out",
  });
  ScrollReveal().reveal(".cardscontent_B", {
    reset: true,
    duration: 800,
    delay: 500,
    interval: 500,
    origin: "left",
    distance: "50px",
    easing: "ease-in-out",
  });
  ScrollReveal().reveal(".page06article h1", {
    reset: true,
    duration: 800,
    origin: "left",
    distance: "100px",
    easing: "ease-in-out",
  });
  ScrollReveal().reveal(".page06article p", {
    reset: true,
    duration: 800,
    delay: 500,
    interval: 200,
    origin: "left",
    distance: "100px",
    easing: "ease-in-out",
  });

  ScrollReveal().reveal(".trophy", {
    reset: true,
    duration: 800,
    delay: 500,
    scale: 0.5,
    opacity: 0,
    easing: "ease-in-out",
  });
  ScrollReveal().reveal(".contactphone p", {
    reset: true,
    delay: 300,
    duration: 1000,
    interval: 200,
    origin: "left",
    distance: "100px",
    easing: "ease-in-out",
  });
});
