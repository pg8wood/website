$(window).scroll(function () {
    // Give header opaque background after scrolling approx. one viewport's height 
    $("#navGradientContainer").css("background",
            $(window).scrollTop() >= $(window).height() * 0.93 ? "#414770" : "");

    // Scroll header gradient along with #intro gradient 
    $("#navGradientContainer").css("background-position", "0px -" + $(window).scrollTop() + "px");
});

$("#home-link").click(function() {
    $("body").animate({
        scrollTop: 0
    }, 700);
    
    return false;
});

$("#resume-link").click(function() {
    $("body").animate({
        scrollTop: $("#resume-container").offset().top - $(".navbar").height()
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