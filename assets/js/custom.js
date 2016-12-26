/**
 * JQuery handling tapping of menu items to work on desktop and mobile
 */
$(document).ready(function() {
    $(function() {
        $('.menu-item').click(function() {
            var children = $(this).children();
            children.toggleClass("clicked");
        });
    });
});
