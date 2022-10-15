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

(()=>{
	document.addEventListener( 'DOMContentLoaded', ()=>{
		
		// Define our carousel Id, please replace with your carousel element Id. NOT your CSS ID
		const mainCarouselId = 'tgxvpe';
		const thumbnailCarouselId = 'epeoic';

		// Define our syncCarousels function
		const syncCarousels = () => {
		
			// Check splide instance exists
			if( 
				bricksData.splideInstances[mainCarouselId] && 
				bricksData.splideInstances[thumbnailCarouselId]
			) {
			
			
				// I want splide to active splider when click on thumbnail carousel item
                bricksData.splideInstances[mainCarouselId].destroy(); 
				bricksData.splideInstances[thumbnailCarouselId].destroy();
                document.querySelectorAll( '[data-sync]' ).forEach( elm => {
                    if ( elm.dataset.sync ) {
                      const thumbs = new Splide( elm, {
                        isNavigation: true,
                        focus  : 'center',
                        drag: true,
                        arrow: true,
                        flickPower: 300,
                        flickMaxPages: 1,
                        updateOnMove: true,
                      } );
                      const main   = new Splide( `#${ elm.dataset.sync }` , {
                        flickPower: 300,
                        flickMaxPages: 2,
                        updateOnMove: true,
                      });
                      main.sync( thumbs ).mount({SlideNumber});
                      thumbs.mount();
                    }
                  } ); 
				

			}
		}
		
		// Once DOMContentLoaded, delay 50ms as we need to wait bricks init the carousels
		setTimeout( syncCarousels, 50 );
		
		// Once window resized, bricks will reinit the carousels, so we still need to execute our logic one more time, must be higher than 250ms


	//end DOMContentLoaded
	})
    function SlideNumber( Splide, Components ) {
        const { track } = Components.Elements;
        let elm;

        function mount() {
            elm = document.createElement( 'div' );
            elm.classList.add("slide-number")
            track.parentElement.insertBefore( elm, track.nextSibling );

          update();
          Splide.on( 'move', update );
        }
        function update() {
            elm.textContent = `${ Splide.index + 1 }/${ Splide.length }`;
        }
        return {
          mount,
        };
      }

})()
