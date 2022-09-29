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
//  ------------- 00-3 nav_ad start --------------------------------

$(document).ready(function () {
  //讓一開始在第7張照片
  let adPage = 7;
  let maxPage = 6;
  let pagechange = -100 * adPage;
  let timer = null;

  // function arrowjudge() {
  //   if (adPage == 0) {
  //     $("#ad_arrowleft").hide();
  //   } else {
  //     $("#ad_arrowleft").show();
  //   }

  //   if (adPage == maxPage) {
  //     $("#ad_arrowright").hide();
  //   } else {
  //     $("#ad_arrowright").show();
  //   }
  // }

  function fnPrev() {
    $("#ad_Select div").removeClass("active");
    pagechange += 100;
    adPage--;
    //也可以用 transform 只是動畫是靠css控制的!!! transition!!
    // $("#ad_Content").css("transform", "translateX(" + pagechange + "vw)");
    // $("#ad_Content").css("marginLeft", pagechange + "vw");
    $("#round" + (adPage % 7)).addClass("active");
    $("#ad_Content")
      .stop(true, true)
      .animate({ marginLeft: pagechange + "vw" }, 1000, function () {
        // adPage為1立刻回到ad_desk_7.jpg
        if (adPage < 1) {
          adPage = 7;
          pagechange = -100 * adPage;
          $("#round" + (adPage % 7)).addClass("active");
          $("#ad_Content").css("marginLeft", pagechange + "vw");
        }
      });
  }

  function fnNext() {
    $("#ad_Select div").removeClass("active");
    pagechange -= 100;
    adPage++;
    $("#round" + (adPage % 7)).addClass("active");
    // $("#ad_Content").css("transform", "translateX(" + pagechange + "vw)");
    // $("#ad_Content").css("marginLeft", pagechange + "vw");
    $("#ad_Content")
      .stop(true, true)
      .animate({ marginLeft: pagechange + "vw" }, 1000, function () {
        if (adPage > 7) {
          adPage = 1;
          pagechange = -100 * adPage;
          $("#round" + (adPage % 7)).addClass("active");
          $("#ad_Content").css("marginLeft", pagechange + "vw");
        }
      });
  }

  // 指定
  function ad_designate(e) {
    let num = e.data.num;
    if (num !== adPage) {
      $("#round" + adPage).removeClass("active");
      $("#round" + num).addClass("active");
      $("#ad_Content")
        .stop(true, true)
        .fadeOut(1000, function () {
          // $("#ad_long_" + adPage).fadeOut(500);
          // $("#ad_short_" + adPage).fadeOut(500);
          // 不能消失特定頁，有可能會叫不回來
          adPage = num;
          pagechange = -100 * num;
          $("#ad_Content").css("marginLeft", pagechange + "vw");
          // $("#ad_Content").css("transform", "translateX(" + pagechange + "vw)");
          //為了避免滑動太長不舒服，讓動畫過程變成fadeOut的callback，執行完再fadeIn
        });
      $("#ad_Content").stop(true, true).fadeIn(500);
    }
  }

  $("#ad_Content").empty();
  // 將預覽圖ad1~ad8新增到#ad_Content
  for (let i = 0; i <= 8; i++) {
    $("#ad_Content").append(
      ` <div class="d-none d-lg-block ad-long" id="ad_long_${i}"></div>
        <div class="d-block d-lg-none ad-short"id="ad_short_${i}"></div>`
    );
    $("#ad_long_" + i).css(
      "backgroundImage",
      "url(./image/home/ads/ad_desk_" + i + ".jpg)"
    );
    $("#ad_short_" + i).css(
      "backgroundImage",
      "url(./image/home/ads/ad_phone_" + i + ".jpg)"
    );
  }
  for (let i = 0; i <= maxPage; i++) {
    $("#ad_Select").append(` <div class="round" id="round${i}"></div>`);
    $("#round" + i).on("click", { num: i }, ad_designate);
  }
  //讓一開始在第7張照片
  $("#ad_Content").css("marginLeft", pagechange + "vw");
  // $("#round" + (adPage % 7)).addClass("active");

  timer = setInterval(fnNext, 8000);

  //功能
  $("#ad_arrowleft").on("click", fnPrev);
  $("#ad_arrowright").on("click", fnNext);
  ////隱藏所有按鈕
  //作用位置必須在#nav_ad，因為這樣才有包含按鈕和圓球
  $("#nav_ad").mouseenter(function () {
    $("#ad_Select").show();
    $("#ad_arrowleft").show();
    $("#ad_arrowright").show();
    clearInterval(timer);
  });
  $("#nav_ad").mouseleave(function () {
    $("#ad_Select").hide();
    $("#ad_arrowleft").hide();
    $("#ad_arrowright").hide();
    timer = setInterval(fnNext, 8000);
  });
});

// ------------------------- Page02start ----------------------------------//
function counting() {
  $(".count").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 2000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now));
          },
        }
      );
  });
}

$(document).ready(function () {
  $(window).resize(function () {
    var Width = $(this).width();
    console.log(Width);
    if (Width <= 768) {
      $("#page02aside").css("visibility", "hidden");
    } else {
      $("#page02aside").css("visibility", "visible");
    }
  });
  $(window).scroll(function () {
    let position = $("#page02aside").offset().top;
    var Scltop = $(window).scrollTop();
    // console.log(position);
    // console.log(Scltop);
    // if (Scltop > position - 500) {
    //   $(".count").fadeIn();
    //   counting();
    // }
    if (Scltop > position + 700 || Scltop < position - 700) {
      $(".count").fadeOut();
    } else {
      $(".count").fadeIn();
      counting();
    }
  });
});

// 標籤頁 section03
$(document).ready(function () {
  $("#nav-list").click(function (e) {
    console.log("e: ", e);
    console.log("$(this) : ", $(this));
    var click_tag = e.target.getAttribute("id");
    console.log(click_tag);
    if (click_tag == 1) {
      $("#article1_left").removeClass("order-2");
      $("#article1_right").removeClass("order-1");
      $("#article1_left").addClass("order-1");
      $("#article1_right").addClass("order-2");
    } else {
      $("#article1_left").removeClass("order-1");
      $("#article1_right").removeClass("order-2");
      $("#article1_left").addClass("order-2");
      $("#article1_right").addClass("order-1");
    }

    switch (click_tag) {
      case "1":
        $("#main-area").html(
          ` <ul class="list_content">
                    <div class="row">
                      <div class="col-6 p-0">
                        <div class="d-flex align-item-center">
                          <img class="img_left" src="./image/home/con_icon_4.png" alt="試用服務">
                          <li class="img_right">
                            <b>免費14天試用服務!</b>
                            <p>使用滿意再付款！</p>
                          </li>
                        </div>
                      </div>
                      <div class="col-6 p-0">
                        <div class="d-flex align-item-center">
                          <img class="img_left" src="./image/home/con_icon_5.png" alt="價格保證">
                          <li class="img_right">
                            <b>價格保證承諾</b>
                            <p>買貴退2倍價差！</p>
                          </li>
                        </div>
                      </div>

                      <div class="col-6 p-0">
                        <div class="d-flex align-item-center">
                          <img class="img_left" src="./image/home/con_icon_6.png" alt="主機換家">
                          <li class="img_right">
                            <b>主機換家至戰國策</b>
                            <p>享買一年送一年優惠</p>
                          </li>
                        </div>
                      </div>

                      <div class="col-6 p-0">
                        <div class="d-flex align-item-center">
                          <img class="img_left" src="./image/home/con_icon_7.png" alt="60天保證退款">
                          <li class="img_right">
                            <b>60天不滿意保證退款</b>
                            <p>購物安心保證！</p>
                          </li>
                        </div>
                      </div>

                      <div class="col-6 p-0">
                        <div class="d-flex align-item-center">
                          <img class="img_left" src="./image/home/con_icon_8.png" alt="會員優惠">
                          <li class="img_right">
                            <b>企業客戶加入戰國策會員</b>
                            <p>送1000元儲值金</p>
                          </li>
                        </div>
                      </div>

                      <div class="col-6 p-0">
                        <div class="d-flex align-item-center">
                          <img class="img_left" src="./image/home/con_icon_9.png" alt="24小時全年無休">
                          <li class="img_right">
                            <b>365天24小時全年無休</b>
                            <p>顧客服務保證！</p>
                          </li>
                        </div>
                      </div>
                    </div>
                  </ul>`
        );
        $("#article1_left_area").html(
          `<h2><b>為什麼需要選擇我們?</b></h2>
          <p>主機業者非常多且良莠不齊，很多客戶在選擇廠商時不知該如何正確的選擇適合的廠商，根據戰國策多年的經驗以下是必須考量的注意事項，同時戰國策不只是賣主機，更提供更多項加值服務幫你搶網路商機</p>`
        );
        break;
      case "2":
        $("#main-area").html(
          `<div class="main-area_2">
                  <iframe src="https://www.youtube.com/embed/fTQKu6D5x2c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
          </div>`
        );
        $("#article1_left_area").html(
          `<div class="list_content_2">
           <p>戰國策在全球提供香港、新加坡、菲律賓、泰國、印尼、印度、馬來西亞、越南、日本、韓國、美國、台灣、加拿大、倫敦、巴黎、阿姆斯特丹第一流的國際級電信機房，給予您的網站最堅實的競爭優勢！</p>
                            <ul class="list_content_right_2">
                                <li>安全控管服務：提供防火牆、資料備份等安全控管服務。</li><br>
                                <li>頻寬品質佳：戰國策目前將主機置於中華電信機房內(100%Hinet 線路)，提供全國最快頻寬最大及穩定網路維運的系統設備，提供企業用戶快速存取及分散風險。</li><br>
                                <li>成本低廉：企業不需租用軟硬體設備、不需聘請網管人員自行維護網站軟硬體設備，可節省人事成本，企業用戶大幅降低網站建置成本。</li>
                            </ul>
                        </div>`
        );
        break;
      case "3":
        $("#main-area").html(
          `<p>後疫情時代網路市場商機搶搶滾，面對消費者消費習慣之轉變，企業必須即時掌握產業動態及消費趨勢才能超前部署、贏得龐大的網路商機！戰國策不只是賣主機，更獨家提供六大超值電商服務協助主機的客戶搶攻網路商機!</p>
          <img class="main-area3_img col-md-6" src="./image/Server-982x10242-300x320.png">`
        );
        $("#article1_left_area").html(
          `<ol class="list_content_3">
          <li>
            <h4>免費贈送網路金流<span><br>(免年費)</span></h4>
            <p>從事網路電商生意最重要的就是解決收款問題，戰國策提供金流服務歡迎申請，各項申辦條件都優於自行向藍新金流申請!<br>
            網路金流請上<a href="https://n9s.com/b3">https://n9s.com/b3</a>
        </p>
      </li>
      <li>
        <h4>免費刊登台灣我的商家情報網<span><br>(增加SEO外連及網站曝光度_</span></h4>
        <p>只要您是戰國策企業用戶，都可以直接將您店家基本資料、商品、最新消息刊登於台灣我的商家情報網，無須任何額外費用，讓網站曝光度直直上升。<br>
            台灣我的商家情報網<a href=" https://smb.nss.com.tw/">https://smb.nss.com.tw/</a>
        </p>
      </li>
      <li>
        <h4>免費安裝線上客服系統<span><br>(主機買三年免費安裝)</span></h4>
        <p>網站客服系統它能在網站右下角顯示出小圖示，點擊以後就能讓網站多一個快速方便聯絡的功能，支援
            Fb、LINE、WhatsAPP、電話等12種的聯絡方式！讓客戶直接利用客服系統進行問題諮詢與解惑，並可提昇成交率達20%~40%及提高客戶滿意度。<br>
            線上客服系統請上<a href="https://n9s.com/b4">https://n9s.com/b4</a>
        </p>
      </li>
      <li>
        <h4>免費贈送網路金流<span><br>(免年費)</span></h4>
        <p>從事網路電商生意最重要的就是解決收款問題，戰國策提供金流服務歡迎申請，各項申辦條件都優於自行向藍新金流申請!<br>
            網路金流請上<a href="https://n9s.com/b3">https://n9s.com/b3</a>
        </p>
      </li>
      <li>
        <h4>免費提供網站行銷教戰線上手冊</h4>
        <p>想要在網路上做生意，第一步是要擁有一個可以曝光資源的地方，對於網路行銷來說擁有「官方網站」是非常重要的事，而網路行銷也是，才可以開啟網路行銷的生意，因此，戰國策提供完整豐富的網商教戰手冊(21頁)教導網路行銷的技巧。
            網站行銷教戰線上手冊請向本公司(Line id: ＠119m)索取網址<br>
        </p>
      </li>


      <li>
        <h4>網路行銷顧問<span><br>(限企業客戶，免費提供3小時線上諮詢)</span></h4>
        <p>想增加網站曝光度與業績? 想發展電商市場卻沒有相關經驗? 戰國策有20年網路與電子商務的實戰經驗，累積三萬家客戶實戰經驗，為貴公司提供諮詢與執行計畫以提升網路行銷的成效。<br>
            網路行銷顧問請上<a href="https://n9s.com/b5">https://n9s.com/b5</a>
        </p>
      </li>

      <li>
        <h4>免費贈送中文化Rank Math SEO PRO外掛及基本設定<span><br>(價值11500元，買戰國策WordPress商務型主機+加購SSL免費贈送)</span></h4>
        <p>有效提升網站在搜尋引擎排名，由於SEO外掛對於非專業人士來說並不好設定，戰國策特別貼心的提供戰國策WordPress專家提供Rank Math SEO PRO外掛基本設定服務 (價值1萬元，SEO設定的範圍請參考
            https://n9s.com/9v )
           訂購WordPress主機請上 <a href="https://n9s.com/b6"> https://n9s.com/b6</a>
        </p>
      </li>
    </ol>`
        );
        $(".list_content_3 li p").hide();
        $(".list_content_3 li h4").click(function () {
          if (!$(this).next("p").is(":visible")) {
            $(".list_content_3 p").hide();
            $(this).next("p").show();
          }
        });
        break;
      case "4":
        $("#main-area").html(
          `<p>戰國策向您保證我們提供的服務及價格是領先台灣的同業，我們希望讓您享受到最好的服務及價格，如果您在本公司網站上付費後，發現在台灣同業的網站與戰國策保證條件相符，提供更低費用(稅後)，我們將加倍奉還給您兩倍差價。`
        );
        $("#article1_left_area").html(
          `<div class="list_content_4">
          <p>戰國策價格保證承諾政策條件：</p>
          <ul class="list_content_4">
				  <li>同業必須提供365天24小時全年無休的電話服務</li>
				  <li>同業必須為公開的網路價格，提供與本公司在相同日期及相同規格的服務</li>
                  <li>同業必須為台灣經濟部登記合法立案，公司成立5年以上及資本額在1000萬以上，合法開立發票</li>
                  <li>適用價格保證承諾之商品為：網址註冊、虛擬主機、雲主機、專屬主機、主機代管、ssL憑證、線上備份(虛擬主機必須使用PLESK主機管理系統）</li>
                  <li>同業必須提供60天不滿意保證退款服務</li>
                  <li>保護不適用於：同業透過優惠折價券、比賽、抽獎贏得或轉讓取得的價格</li>
                  <li>戰國策保留隨時更改或取消保證、且不須事先通知的權利。任何更改，在戰國策網站上刊登更改後的保證的條款和條件之時，將立即生效。</li>
				  </ul>
          </div>`
        );
    }
  });
});

//輪播
$(document).ready(function () {
  $(".responsive").slick({
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 8000,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

//評論區
$(document).ready(function () {
  //$("#article4_card-slider .slider-item").slick({pauseOnHover:true});

 var cards = $("#article4_card-slider .slider-item").toArray();

 startAnim(cards);

 function startAnim(array) {
   if (array.length >= 5) {
     TweenMax.to(array[0], 0.5, {
       bezier: [
         { x: 0, y: 50 },
         { x: 60, y: 200 },
         { x: 80, y: 120 },
       ],
       boxShadow: "-5px 10px 10px 0 rgba(0,0,0,0.05)",
       zIndex: 1,
       opacity: 1,
       pauseOnHover: true,
       ease: Cubic.easeInOut,
     });

     TweenMax.fromTo(
       array[1],
       0.5,
       { x: 0, y: 0, opacity: 0.5 },
       {
         x: 0,
         y: -120,
         opacity: 0,
         zIndex: 0,
         delay: 0.05,
         ease: Cubic.easeInOut,
         onComplete: sortArray(array),
       }
     );

     TweenMax.fromTo(
       array[2],
       0.5,
       { x: 80, y: 120, opacity: 1, zIndex: 1 },
       {
         x: 0,
         y: 0,
         opacity: 0,
         zIndex: 0,
         boxShadow: "-5px 10px 10px 0 rgba(0,0,0,0.05)",
         ease: Cubic.easeInOut,
       }
     );

     TweenMax.fromTo(
       array[3],
       0.5,
       { x: 0, y: 350, opacity: 0, zIndex: 0 },
       { x: 0, y: 300, opacity: 0.5, zIndex: 0, ease: Cubic.easeInOut }
     );

     TweenMax.fromTo(
       array[4],
       0.5,
       { x: 80, y: 120, opacity: 0, zIndex: 1 },
       {
         x: 0,
         y: 0,
         opacity: 0.5,
         zIndex: 0,
         boxShadow: "-5px 10px 10px 0 rgba(0,0,0,0.05)",
         ease: Cubic.easeInOut,
       }
     );
   } else {
     $("#card-slider").append(
       "<p>Sorry, carousel should contain more than 3 slides</p>"
     );
   }
 }
 // let 和 var scope 差別!!!  當使用var 的時候 sortArray(array)會直接作用 lｅt　則不會！！！
 function sortArray(array) {
   clearTimeout(delay);
   var delay = setTimeout(function () {
     var firstElem = array.shift();
     array.push(firstElem);
     return startAnim(array);
   }, 4000);
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
  ScrollReveal().reveal("#page01logo img", {
    reset: true,
    duration: 800,
    delay: 300,
    origin: "left",
    distance: "100px",
    easing: "ease-in-out",
  });

  ScrollReveal().reveal(".page02img", {
    reset: true,
    duration: 800,
    origin: "left",
    distance: "50px",
    easing: "ease-in-out",
    opacity: 0,
  });
  ScrollReveal().reveal(".page02article h1", {
    reset: true,
    duration: 2000,
    opacity: 0.2,
    scale: 0.5,
  });
  ScrollReveal().reveal(".list_content_1", {
    reset: true,
    duration: 1200,
    origin: "left",
    distance: "100px",
    easing: "ease",
  });
  ScrollReveal().reveal(".img_left", {
    reset: true,
    duration: 1200,
    origin: "bottom",
    interval: 200,
    distance: "100px",
    scale: 0.5,
    easing: "ease-in-out",
  });
  ScrollReveal().reveal(".list_content_2", {
    reset: true,
    duration: 1200,
    origin: "right",
    distance: "100px",
    easing: "ease-in-out",
  });
  ScrollReveal().reveal(".list_content_3", {
    reset: true,
    duration: 1200,
    origin: "right",
    distance: "100px",
    easing: "ease-in-out",
  });
  ScrollReveal().reveal(".list_content_4", {
    reset: true,
    duration: 1200,
    origin: "right",
    distance: "100px",
    easing: "ease-in-out",
  });
  ScrollReveal().reveal(".section05content", {
    reset: true,
    duration: 1200,
    origin: "left",
    distance: "100px",
    easing: "ease-in-out",
  });
  ScrollReveal().reveal(".section05img1", {
    reset: true,
    duration: 1200,
    origin: "left",
    distance: "100px",
    easing: "ease-in-out",
  });
  ScrollReveal().reveal(".section05img2", {
    reset: true,
    duration: 1200,
    origin: "bottom",
    distance: "100px",
    easing: "ease-in-out",
  });
  ScrollReveal().reveal(".section06img img", {
    reset: true,
    duration: 1200,
    origin: "left",
    distance: "200px",
    easing: "ease-in-out",
  });
  ScrollReveal().reveal(".section06card", {
    reset: true,
    duration: 1200,
    origin: "bottom",
    interval: 200,
    distance: "200px",
    easing: "ease-in-out",
  });
  ScrollReveal().reveal(".section07content", {
    reset: true,
    duration: 1200,
    origin: "right",
    distance: "100px",
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
