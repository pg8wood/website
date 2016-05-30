/**
 * Created by PatrickGatewood on 5/29/16.
 */
$(document).ready(function() {
    $(function() {
        $('.menu-item').click(function() {
            var children = $(this).children();
            children.toggleClass("clicked");
        });
    });
});
