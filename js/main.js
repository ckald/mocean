/* eslint-env browser, jquery */

function dragStop(event) {
    "use strict";

    event.preventDefault();
    $(document).off("mousemove", moveAround);
    $(document).off("mouseup", dragStop);

    window.dragStartPoint = null;
    $.vegas("resume");
}

function moveAround(event) {
    "use strict";

    if (!window.dragStartPoint) {
        dragStop(event);
        return false;
    }

    var css = {};
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();

    var $back = $(".vegas-background");

    var heightDiff = $back.height() - windowHeight;
    if (heightDiff) {
        var top = (
            parseInt($back.css("top"), 10)
            + heightDiff / windowHeight / 2 * (event.pageY - window.dragStartPoint.Y)
        );

        top = Math.max(top, -heightDiff);
        top = Math.min(top, 0);
        css.top = top;
    }

    var widthDiff = $back.width() - windowWidth;
    if (widthDiff) {
        var left = (
            parseInt($back.css("left"), 10)
            + widthDiff / windowWidth / 2 * (event.pageX - window.dragStartPoint.X)
        );

        left = Math.max(left, -widthDiff);
        left = Math.min(left, 0);
        css.left = left;
    }

    if (css.top || css.left) {
        $back.css(css);
    }
}

$(function($){
    "use strict";

    $("img").unveil(200);

    var backgrounds = [];
    $("#thumbcarousel .thumb").each(function(i, el) {
        backgrounds.push({src: $(el).data("source"), srcset: $(el).data("srcset"), fade: 1000});
    });

    $.vegas("slideshow", {
      backgrounds: backgrounds,
      delay: 10e3
    })("overlay", {
      src: "/vegas/overlays/06.png"
    });

    $("body").bind("vegaswalk",
      function(e, bg, step) {
        $("#thumbcarousel .thumb").removeClass("active");
        var $active = $("#thumbcarousel .thumb[data-slide-to=" + step + "]").addClass("active");
        var parentWidth = $("#thumbcarousel").width();
        var wrapperWidth = $("#thumbcarousel .wrapper").width();
        var percentage = ($active.offset().left) / parentWidth;
        $("#thumbcarousel").animate({scrollLeft: percentage * (wrapperWidth - parentWidth)});
      }
    );
    $(".carousel-control.left").on("click", function(e) {
        $.vegas("previous"); e.preventDefault();
    });
    $(".carousel-control.right").on("click", function(e) {
        $.vegas("next"); e.preventDefault();
    });
    $("#thumbcarousel").on("click", ".thumb", function(e) {
        $.vegas("jump", $(e.target).data("slide-to")); e.preventDefault();
    });

    $(document).on("mouseenter", "#thumbcarousel", function() { $.vegas("pause"); });
    $(document).on("mouseleave", "#thumbcarousel", function() { $.vegas("resume"); });

    window.dragStartPoint = null;

    $(document).on("mousedown", ".vegas-overlay", function(event) {

        $.vegas("pause");

        window.dragStartPoint = {X: event.pageX, Y: event.pageY};
        $(document).on("mousemove", moveAround);
        event.preventDefault();

      $(document).on("mouseup", dragStop);

    });

    $(document).on("dragstart", ".vegas-overlay", function() { return false; });
});
