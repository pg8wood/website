/**
 * JQuery handling tapping of menu items to work on desktop and mobile
 */
$(document).ready(function() {
    $(function() {
        $('.menu-item').click(function() {
            var children = $(this).children();
            var icon = children.find("i");
            icon.toggleClass("fa fa-chevron-up");
            icon.toggleClass("fa fa-chevron-down");
            children.toggleClass("clicked");
        });
    });
});
