const GOOGLE_CHROME = "Google Chrome";
const FIREFOX = "Mozilla Firefox";
const INTERNET_EXPLORER = "Microsoft Internet Explorer";
const OPERA = "Opera";
const SAFARI = "Apple Safari";

var browser;
var chromeOverflowAtHtml = false;

$(document).ready(function () {
    detectBrowser();

    let hash = window.location.hash
    console.log(hash)

    if (hash == "#request-resume-link") {
        scrollToResumeLink()
    } else if (hash == "#portfolio-container") {
        scrollToPortfolio()
    }
});

function detectBrowser() {
    var userAgent = navigator.userAgent;
    console.log(navigator.userAgent)

    if (userAgent.indexOf("Chrome") > -1) {
        browser = GOOGLE_CHROME;
    } else if (userAgent.indexOf("Safari") > -1) {
        browser = SAFARI;
    } else if (userAgent.indexOf("Opera") > -1) {
        browser = OPERA;
    } else if (userAgent.indexOf("Firefox") > -1) {
        browser = FIREFOX;
    } else if (userAgent.indexOf("MSIE") > -1) {
        browser = INTERNET_EXPLORER;
    }
}

function overflowIsAtHtml() {
    if (browser === FIREFOX) {
        return true;
    } else if (browser === SAFARI) {
        // Safari started storing overflow at the html level in version 13.
        var safariVersion = parseInt(/Version\/[0-9]+\.[0-9]+(\.[0-9])? Safari/.exec(navigator.userAgent)[1]);
        return safariVersion >= 13;
    } else if (browser === GOOGLE_CHROME) {
        // Chrome started storing overflow at the html level in version 61.
        var chromeVersion = parseInt(/Chrome\/([0-9.]+)/.exec(navigator.userAgent)[1]);
        return chromeVersion >= 61;
    }

    return false
}

$("#home-link").click(function () {
    if ($("body.home").length === 0) {
        return true;
    }

    $(overflowIsAtHtml ? "html" : "body").animate({
        scrollTop: 0
    }, 700);

    return false;
});

$("#resume-link").click(function () {
    if ($("body.home").length === 0) {
        return true;
    }

    scrollToResumeLink()
    return false;
});

function scrollToResumeLink() {
    let navBarAndScrollTopPadding = $(".navbar").height() + 25
    $('html,body').animate({scrollTop: $("#request-resume-link").offset().top - navBarAndScrollTopPadding });
}

$("#portfolio-link").click(function () {
    if ($("body.home").length === 0) {
        return true;
    }

    scrollToPortfolio()
    return false;
});

function scrollToPortfolio() {
    let navBarAndScrollTopPadding = $(".navbar").height()
    $('html,body').animate({scrollTop: $("#portfolio-container").offset().top - navBarAndScrollTopPadding });
}

/**
 * Toggles the expanded/collapsed navbar on mobile/small browser windows
 */
function toggleNavbar() {
    var navClass = $("#header-navbar").attr("class");

    if (navClass === "navbar" || navClass === "navbar index") {
        $("#header-navbar").addClass("animated");
        $("#header-navbar").toggleClass("responsive");
    } else {
        $("#header-navbar").toggleClass("collapsed");
    }

    $("#header-navbar").toggleClass("expanded");
}
