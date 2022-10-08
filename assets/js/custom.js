(function($) {
    $(window).click(function() {
        $('.mobile-menu-wrapper, .dtkframebar__menu__icon, .background-overlay').removeClass('show');
        changeMenuText();
    });
    $('.dtkframebar__menu__icon, .dtkframebar__menu__text').click(function(event) {
        $('.mobile-menu-wrapper, .dtkframebar__menu__icon, .background-overlay').toggleClass('show');
        changeMenuText();
        event.preventDefault();
        event.stopPropagation();
    });
    function changeMenuText () {
        if ( $('.mobile-menu-wrapper').hasClass( "show" ) ) {
            $('.dtkframebar__menu__text').text("Tutup");
        } else if ( !$( this ).hasClass( "show" ) ) {
            $('.dtkframebar__menu__text').text("MENU");
        };
    }	
})( jQuery );

