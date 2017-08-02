function toggleNavbar() {
    $('#headerNavbar').attr("class", $("#headerNavbar").className === "navbar" ?
            "navbar responsive" :
            "navbar");
    
    window.alert($('#headerNavbar').attr("class"));
}