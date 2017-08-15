$(window).scroll(function () {
    // Give header opaque background after scrolling approx. one viewport's height 
    $("#nav-gradient-container").css("background",
            $(window).scrollTop() >= $("#about-wrapper").offset().top - $(".navbar").height() ? "#414770" : "");

    // Scroll header gradient along with #intro gradient 
    $("#nav-gradient-container").css("background-position", "0px -" + $(window).scrollTop() + "px");
});

$("#home-link").click(function () {
    $("body").animate({
        scrollTop: 0
    }, 700);

    return false;
});

$("#resume-link").click(function () {
    $("body").animate({
        scrollTop: $("#download-resume-link").offset().top - $(".navbar").height()
    }, 700);

    return false;
});

// When viewing on mobile or in a small window, expands/collapses the navbar menu
function toggleNavbar() {
    $('#headerNavbar').attr("class", $("#headerNavbar").className === "navbar" ?
            "navbar responsive" :
            "navbar");

    window.alert($("#headerNavbar").attr("class"));
}