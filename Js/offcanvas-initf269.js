jQuery(document).ready(oxygen_init_offcanvas);
function oxygen_init_offcanvas($) {
    
    let touchEvent = 'ontouchstart' in window ? 'click' : 'click'; 

    $('.oxy-off-canvas .offcanvas-inner').each(function() {

        var offCanvas = $(this),
            triggerSelector = offCanvas.data('trigger-selector'),
            offCanvasOutside = offCanvas.data('click-outside'),
            offCanvasEsc = offCanvas.data('esc'),
            offCanvasStart = offCanvas.data('start'),
            offCanvasBackdrop = offCanvas.data('backdrop'),
            offCanvasFocusSelector = offCanvas.data('focus-selector'),
            backdrop = offCanvas.prev('.oxy-offcanvas_backdrop'),
            menuHashLink = offCanvas.find('a[href*=\\#]').not(".menu-item-has-children > a"),
            stagger = offCanvas.data('stagger'),
            reset = offCanvas.data('reset'),
            mediaPlayer = offCanvas.find('.oxy-pro-media-player vime-player'),
            otherOffcanvas = offCanvas.data('second-offcanvas'),
            maybeHashClose = offCanvas.data('hashclose'),
            offcanvasPush = offCanvas.data('content-push'),
            offcanvasPushContent = offCanvas.data('content-selector'),
            offcanvasPushDuration = offCanvas.data('content-duration'),
            offcanvasID = offCanvas.parent('.oxy-off-canvas').attr('ID'),
            burgerSync = offCanvas.data('burger-sync');
            
        if (false !== offCanvas.data('stagger-menu')) {
            offCanvas.find('.oxy-slide-menu_list > .menu-item').addClass('aos-animate');
            offCanvas.find('.oxy-slide-menu_list > .menu-item').attr( { "data-aos": offCanvas.data('stagger-menu') } );
        }
                
        $(window).on('load', function(){
            // Make sure AOS animations are reset for elements inside after everything has loaded
            setTimeout(function(){
                offCanvas.find(".aos-animate").addClass("aos-animate-disabled").removeClass("aos-animate");
            }, 40); // wait
            
            if (stagger != null) {
            
                var delay = offCanvas.data('first-delay');
                offCanvas.find('.aos-animate').not('.not-staggered').each(function() {
                    delay = delay + stagger;
                    $(this).attr('data-aos-delay', delay);
                });

            }
            
        });  
        
        function doOffCanvas(triggerSelector) { 
            
            if ($(triggerSelector).hasClass('oxy-close-modal')) {
                oxyCloseModal();
            } 
            
            if (!offCanvas.parent().hasClass('oxy-off-canvas-toggled')) {
                openOffCanvas();
            } else {
                closeOffCanvas();
            }
        }
        
        if ( $(triggerSelector).hasClass('oxy-burger-trigger') ) {
            
            let triggerSelectorTouch = $( triggerSelector ).children('.hamburger').data('touch');
            let touchEvent = 'ontouchstart' in window ? triggerSelectorTouch : 'click'; 
            
            $(triggerSelector).on(touchEvent, function(e) {
                e.stopPropagation();
                e.preventDefault();
                
                if (true === burgerSync) {
                    $(triggerSelector).not('#' + $(this).attr('ID')).children('.hamburger').toggleClass('is-active');
                }   
                
                doOffCanvas(triggerSelector);
                
            });
        } else {
            
            let triggerSelectorTouch = touchEvent;
            $(triggerSelector).on(triggerSelectorTouch, function(e) {
                e.stopPropagation();
                e.preventDefault();
                doOffCanvas(triggerSelector);
            });
        }


        // Backdrop Clicked
        offCanvas.siblings('.oxy-offcanvas_backdrop').on(touchEvent, function(e) {
            e.stopPropagation();
            if (offCanvasOutside === true) {
                closeBurger();
                closeLottie();
                closeOffCanvas();
            }

        });

        // Pressing ESC from inside the offcanvas will close it
        offCanvas.keyup(function(e) {
            if (offCanvasEsc === true) {
                if (e.keyCode === 27) {
                    closeBurger();
                    closeLottie();
                    closeOffCanvas();
                }
            }
        });
        
        if (maybeHashClose === true) {

            $(document).on("click", '#' + offcanvasID + ' a[href*=\\#]', function (e) {
                
                e.stopPropagation();
                
                if ( ( !$(this).not(".menu-item-has-children > a") ) || $(this).is('[href="#"]' ) ) {
                    return;
                }

                if ( $(this).is(".oxy-table-of-contents_list-item > a") ) {
                    return;
                }
                
                if (this.pathname === window.location.pathname) {
                    closeBurger();
                    closeLottie();
                    closeOffCanvas();
                }
            });
            
        }   
        
        if (offcanvasPush) {
            $(offcanvasPushContent).attr('data-offcanvas-push', '#' + offcanvasID);
            $(offcanvasPushContent).css({
                                        "--offcanvas-push" : offcanvasPush + "px",
                                        "--offcanvas-push-duration" : offcanvasPushDuration + 's',
                                    });
            
        }

        function openOffCanvas() {
            offCanvas.parent().addClass('oxy-off-canvas-toggled');
            $(offcanvasPushContent).addClass('oxy-off-canvas-toggled');
            $('body,html').addClass('off-canvas-toggled');
            offCanvas.find(".aos-animate-disabled").removeClass("aos-animate-disabled").addClass("aos-animate");
            $(offCanvas).parent('.oxy-off-canvas').trigger('extras_offcanvas:open');
            
            if (offCanvasFocusSelector) {
                offCanvas.parent().find(offCanvasFocusSelector).eq(0).focus();
            }
        }

        function closeOffCanvas() {

            $('body,html').removeClass('off-canvas-toggled');
            offCanvas.parent().removeClass('oxy-off-canvas-toggled');
            $(offcanvasPushContent).removeClass('oxy-off-canvas-toggled');
            setTimeout(function(){
                offCanvas.find(".aos-animate").removeClass("aos-animate").addClass("aos-animate-disabled");
            }, reset); // wait before removing the animate class 
            
            $(offCanvas).parent('.oxy-off-canvas').trigger('extras_offcanvas:close');
            if (otherOffcanvas) {
                $(otherOffcanvas).removeClass('oxy-off-canvas-toggled');
            }
            
            mediaPlayer.each(function() {
                $(this)[0].pause(); // turn off any pro media players
            });
            
            
        }
        
        function closeBurger() {
            
            if ( ( $(triggerSelector).children('.hamburger').length > 0) && ($(this).children('.hamburger').data('animation') !== 'disable')) {
                $(triggerSelector).children('.hamburger').removeClass('is-active');
            }
        }

        function closeLottie() {
            
            if ( ( $(triggerSelector).children('lottie-player').length > 0) ) {
                $(triggerSelector).children('lottie-player').trigger('click');
            }
        }

        /* For programmatically opening */
        function extrasOpenOffcanvas($extras_offcanvas) {
            
            var thisOffcanvas = $($extras_offcanvas);
            var thisoffcanvasPushContent = thisOffcanvas.children('.offcanvas-inner').data('content-selector');
            var thisoffCanvasFocusSelector = thisOffcanvas.children('.offcanvas-inner').data('focus-selector');

            thisOffcanvas.addClass('oxy-off-canvas-toggled');
            $(offcanvasPushContent).addClass('oxy-off-canvas-toggled');
            $('body,html').addClass('off-canvas-toggled');
            thisOffcanvas.find(".aos-animate-disabled").removeClass("aos-animate-disabled").addClass("aos-animate");
            thisOffcanvas.trigger('extras_offcanvas:open');
            
            if (thisoffCanvasFocusSelector) {
                thisOffcanvas.find(thisoffCanvasFocusSelector).eq(0).focus();
            }
            
        }

        // Expose function
        window.extrasOpenOffcanvas = extrasOpenOffcanvas;

    });
}