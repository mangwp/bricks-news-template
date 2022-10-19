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
    const heroMainId = 'znhwul';
    const heroThumbId = 'lmoimu';


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
      if( 
				bricksData.splideInstances[heroMainId] && 
				bricksData.splideInstances[heroThumbId]
			) {
			
			
				// I want splide to active splider when click on thumbnail carousel item
                bricksData.splideInstances[heroMainId].destroy(); 
				bricksData.splideInstances[heroThumbId].destroy();
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
                      main.on( 'active', Slide => {
                        const element = Slide.slide.querySelector('.hero-heading');
                        element.classList.add('brx-animate-fadeInUp');
                        const elementbtnleft = Slide.slide.querySelector('.hero-btn-left');
                        elementbtnleft.classList.add('brx-animate-fadeInLeft');
                        const elementbtnright = Slide.slide.querySelector('.hero-btn-right');
                        elementbtnright.classList.add('brx-animate-fadeInRight');
                      } );
                      main.on( 'inactive', Slide => {
                        const element = Slide.slide.querySelector('.hero-heading');
                        element.classList.remove('brx-animate-fadeInUp');
                        element.setAttribute('data-animation', 'fadeInUp');
                        const elementbtnleft = Slide.slide.querySelector('.hero-btn-left');
                        elementbtnleft.classList.remove('brx-animate-fadeInLeft');
                        elementbtnleft.setAttribute('data-animation', 'fadeInLeft');
                        const elementbtnright = Slide.slide.querySelector('.hero-btn-right');
                        elementbtnright.classList.remove('brx-animate-fadeInRight');
                        elementbtnright.setAttribute('data-animation', 'fadeInRight');
                      } );
                      main.sync( thumbs ).mount();
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
