var browser;

$(document).ready(function () {
    detectBrowser();

    if (window.location.hash === "#download-resume-link") {
        scrollToResume();
    }
});

function detectBrowser() {
    var userAgent = navigator.userAgent;

    if (userAgent.indexOf("Chrome") > -1) {
        browser = "Google Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {
        browser = "Apple Safari";
    } else if (userAgent.indexOf("Opera") > -1) {
        browser = "Opera";
    } else if (userAgent.indexOf("Firefox") > -1) {
        browser = "Mozilla Firefox";
    } else if (userAgent.indexOf("MSIE") > -1) {
        browser = "Microsoft Internet Explorer";
    }
}

$(window).scroll(function () {
    if ($("body.home").length === 0) {
        return;
    }

    // Give header opaque background after scrolling approx. one viewport's height
    $("#nav-gradient-container").css("background",
        $(window).scrollTop() >= $("#about-wrapper").offset().top - $(".navbar").height() ? "#414770" : "");

    // Scroll header gradient along with #intro gradient 
    $("#nav-gradient-container").css("background-position", "0px -" + $(window).scrollTop() + "px");
});

$("#home-link").click(function () {
    if ($("body.home").length === 0) {
        return true;
    }

    $(browser === "Mozilla Firefox" ? "html" : "body").animate({
        scrollTop: 0
    }, 700);

    return false;
});

$("#resume-link").click(function () {
    if ($("body.home").length === 0) {
        return true;
    }

    scrollToResume();
    return false;
});

function scrollToResume() {
    $(browser === "Mozilla Firefox" ? "html" : "body").animate({
        scrollTop: $("#download-resume-link").offset().top - $(".navbar").height()
    }, 700);
}

// When viewing on mobile or in a small window, expands/collapses the navbar menu
function toggleNavbar() {
    $('#headerNavbar').attr("class", $("#headerNavbar").className === "navbar" ?
        "navbar responsive" :
        "navbar");

    window.alert($("#headerNavbar").attr("class"));
}