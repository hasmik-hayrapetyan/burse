function getYearFunction() {
  var d = new Date();
  var n = d.getFullYear();
  var year = document.getElementsByClassName("year");
  for (var i = 0; i < year.length; i++) {
      year[i].innerHTML = n
  }
}getYearFunction();

function getMonthFunction() {
  var d = new Date();
  var n = d.getMonth() + 1;
  n = (n < 10) ? '0' + n : n;

  var month = document.getElementsByClassName("month");
  for (var i = 0; i < month.length; i++) {
      month[i].innerHTML = n
  }
}getMonthFunction();

function getDayFunction() {
  var d = new Date();
  var n = d.getDate();
  n = (n < 10) ? '0' + n : n;

  var day = document.getElementsByClassName("day");
  for (var i = 0; i < day.length; i++) {
      day[i].innerHTML = n
  }
}getDayFunction();

var myVar = setInterval(getNewTime, 1000);

function getNewTime() {
  var d = new Date();
  var t = d.toLocaleTimeString();
  var time = document.getElementsByClassName("time");
  for (var i = 0; i < time.length; i++) {
      time[i].innerHTML = t
  }
}

function registerCaptcha(key) {
    var recaptcha1;
    var recaptcha2;
    var myCallBack = function () {
        recaptcha1 = grecaptcha.render('recaptcha1', {
            'sitekey': key

        });

        recaptcha2 = grecaptcha.render('recaptcha2', {
            'sitekey': key
        });
    };
}
function setTime(rest_time, id) {
    setInterval(function () {
        rest_time = rest_time - 1;
        if(rest_time === 0) {
          $('.timer').hide();
            $.ajax({type     : "POST",
                url      : 'finish?id='+id,
                success  : function(data) {
                  var result = JSON.parse(data);

                  if(result[0] && result[1]=== result[2]) {
                    $('#congratulateModal').modal('show');
                    $('#congratulateModal').on('hidden.bs.modal', function () {
                      location.reload();
                    })
                  } else {
                    location.reload();
                  }

                }
            })
        }
        var h = Math.floor(rest_time / 3600);
        var m = Math.floor(rest_time % 3600 / 60);
        var s = Math.floor(rest_time % 3600 % 60);
        $('.rest_time').text(h + ':' + m + ':' + s);
    }, 1000);
}

function setLoginType(physical, juridical) {
    $('.physical_type a').click(function () {
        $('.toggleHidden').attr('value', physical);
    });
    $('.juridical_type a').click(function () {
        $('.toggleHidden').attr('value', juridical);
    })
}

function startCarousel(owlId, owlItem, count, count5, count4, count3, count2, count1, owlCarouselTimeout, autoplay) {

    owl = owlId;
    owl.owlCarousel({
        margin: 20,
        items: count,
        nav: true,
        dots: false,
        loop: (owlItem.length > count ? true : false),
        smartSpeed: 900,
        autoplay: autoplay,
        autoplayTimeout: owlCarouselTimeout,
        autoplayHoverPause: true,
        navText: ["<i class='fa fa-angle-left' aria-hidden='true'></i>", "<i class='fa fa-angle-right' aria-hidden='true'></i>"],
        responsive: {
            0: {
                items: 1,
                loop: (owlItem.length > count1 ? true : false)
            },
            320: {
                items: count1,
                loop: (owlItem.length > count1 ? true : false)

            },
            600: {
                items: count2,
                loop: (owlItem.length > count2 ? true : false)
            },
            700: {
                items: count2,
                loop: (owlItem.length > count2 ? true : false)
            },
            800: {
                items: count3,
                loop: (owlItem.length > count3 ? true : false)
            },
            1000: {
                items: count4,
                loop: (owlItem.length > count4 ? true : false)
            },
            1190: {
                items: count5,
                loop: (owlItem.length > count5 ? true : false)
            },
            1200: {
                items: count,
                loop: (owlItem.length > count ? true : false)
            }
        }
    });
    owl.on('mouseleave', function () {
        owl.trigger('stop.owl.autoplay');
        owl.trigger('play.owl.autoplay', [owlCarouselTimeout]);
    });
}

$(function () {
    var priceLengthLimit = $('.price-length-limit').text();
    if ( priceLengthLimit.length > 8 ){
        $('.price-length-limit').text(priceLengthLimit.substring(0, 8)).append('<span>...</span>').prop('title', priceLengthLimit);
    }
    // if (window.navigator.appVersion.indexOf('Windows NT 6.1') != - 1 || window.navigator.appVersion.indexOf('Macintosh') != - 1) {
    //     $('.win7_symbol').text('Դ');
    // }
    $(".burger_menu_two_show ul").find('a').each(function () {
        var menuThisLinkAttrHref = $(this).attr('id');
        var urlPath = window.location.pathname;
        if(urlPath.indexOf(menuThisLinkAttrHref) > -1) {
            $(this).addClass('text-info');
        }
    });

    $('#owl_slider').owlCarousel({
        loop: true,
        items: 1,
        nav: true,
        autoplay: true,
        navText: ["<i class='fa fa-angle-left icon-white'></i>", "<i class='fa fa-angle-right icon-white'></i>"],
        autoplayHoverPause: true
    });

    $('#registration li').on('click', function () {
        $('#loginform-type').attr('value', this.getAttribute('data-val'));
    })

});


$('.toggle_click').click(function() {
  var placeholderTranslete = $('.manually_placeholder').text();
  var minTranslete = $('.manually_min').text();
  var manually_block = '<div id="manually_input_div" class="input-group  mt-4">\n' +
    '                            <input  type="number" id="manual_bid" min="'+minTranslete+'" value="0" name="manual_price" class="form-control manual_bid border-r-16 bg-white text-darkgrey arial-b " placeholder="'+placeholderTranslete+'">\n' +
    '                        </div>';

  $('#manually_input_div').toggleClass("d-flex");
  if ($('#manually_input_div').hasClass('d-flex')) {
    $('#manually_input_div2').html('');
  }else {
    $('#manually_input_div2').html(manually_block);
  }
  $(this).find(">:first-child").toggleClass("active_toggle");
  $(this).find(">:last-child").toggleClass("disable_toggle");
});

$(function () {
    $('.search-tooltip').tooltip();
});

$('.showModal').click(function() {
  var auctinoId = $(this).attr('data-id');

  $.ajax({
    url: '/auction/item/modal?id='+ auctinoId,
    success: function (result) {
      $("#trustModalContent").html(result);
      $("#trustModal").modal("show");
    }
  });
});
$('.modal').on('hidden.bs.modal', function(e)
{
  $(this).removeData('bs.modal');
}) ;
function readMore(text_max_length,ShowMore1,ShowLess1) {
    var ShowMore = ShowMore1,
        ShowLess = ShowLess1;



    // $('.more').html().replace('&lt;/', ' ');
    $('.more').each(function () {
        var ckAllInfo = $(this).html();
        ckAllInfo = ckAllInfo.replace("&nbsp;", " ").trim();
        var ckAllInfoLength = ckAllInfo.length;

        if (ckAllInfoLength > text_max_length) {
            var arrowLeft = ckAllInfo.substring(0, text_max_length).lastIndexOf("<");
            var arrowRight = ckAllInfo.substring(0, text_max_length).lastIndexOf(">");
            var countArrows = arrowLeft - arrowRight;

            if( arrowLeft < arrowRight ) {
                $(this).html(ckAllInfo.substring(0, text_max_length - countArrows-1)).append('<a class="more_btn">' + ShowMore + '</a>');
            }else if (arrowLeft > arrowRight){
                $(this).html(ckAllInfo.substring(0, text_max_length + countArrows)).append('<a class="more_btn">' + ShowMore + '</a>');
            }else {
                $(this).html(ckAllInfo.substring(0, text_max_length)).append('<a class="more_btn">' + ShowMore + '</a>');
            }

        } else {
            $(this).html(ckAllInfo.substring(0, ckAllInfoLength));
        }

        $(this).on('click', '.more_btn', function () {
            $(this).closest('.scroll_top').closest('.events').removeClass('scroll');
            $(this).closest('.more').html(ckAllInfo.substring(0, ckAllInfoLength)).append('<a class="less_btn">' + ' ' + ShowLess + '</a>');
        });

        $(this).on('click', '.less_btn', function () {
            $(this).closest('.scroll_top').closest('.events').addClass('scroll');

            if ($(this).closest('.scroll_top').closest('.events').hasClass('scroll')) {
                $(document).scrollTop(0);
            }
            var arrowLeft = ckAllInfo.substring(0, text_max_length).lastIndexOf("<");
            var arrowRight = ckAllInfo.substring(0, text_max_length).lastIndexOf(">");
            var countArrows = arrowLeft - arrowRight;
            if( arrowLeft < arrowRight ) {
                $(this).closest('.more').html(ckAllInfo.substring(0, text_max_length - countArrows-1)).append('<a class="more_btn">' + ShowMore + '</a>');
            }else if (arrowLeft > arrowRight){
                $(this).closest('.more').html(ckAllInfo.substring(0, text_max_length + countArrows)).append('<a class="more_btn">' + ShowMore + '</a>');
            } else {
                $(this).closest('.more').html(ckAllInfo.substring(0, text_max_length)).append('<a class="more_btn">' + ShowMore + '</a>');
            }
        });
    });
}

