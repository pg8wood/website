$(window).scroll(function () {
    // Give header opaque background after scrolling approx. one viewport's height 
    $("#headerNavbar").css("background",
            $(window).scrollTop() >= $(window).height() * 0.93 ? "#414770" : "");

    // Scroll header gradient along with #intro gradient 
    $('#navGradientContainer').css('background-position', '0px -' + $(window).scrollTop() + 'px');
});

function toggleNavbar() {
    $('#headerNavbar').attr("class", $("#headerNavbar").className === "navbar" ?
            "navbar responsive" :
            "navbar");

    window.alert($('#headerNavbar').attr("class"));
}