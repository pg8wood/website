function toggleNavbar() {
    var navbar = document.getElementById("headerNavbar");
    
    if (navbar.className === "navbar") {
        navbar.className += " responsive";
    } else {
        navbar.className = "navbar";
    }
}

