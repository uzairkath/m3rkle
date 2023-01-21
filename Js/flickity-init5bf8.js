jQuery(document).ready(oxygen_init_repeater_carousel);
function oxygen_init_repeater_carousel($) {

    Flickity.createMethods.push('_createPrevNextCells');

    Flickity.prototype._createPrevNextCells = function() {
        this.on('select', this.setPrevNextCells);
    };

    Flickity.prototype.setPrevNextCells = function() {
        // remove classes
        changeSlideClasses(this.previousSlide, 'remove', 'is-previous');
        changeSlideClasses(this.nextSlide, 'remove', 'is-next');
        // set slides
        var previousI = fizzyUIUtils.modulo(this.selectedIndex - 1, this.slides.length);
        var nextI = fizzyUIUtils.modulo(this.selectedIndex + 1, this.slides.length);
        this.previousSlide = this.slides[previousI];
        this.nextSlide = this.slides[nextI];
        // add classes
        changeSlideClasses(this.previousSlide, 'add', 'is-previous');
        changeSlideClasses(this.nextSlide, 'add', 'is-next');
    };

    function changeSlideClasses(slide, method, className) {
        if (!slide) {
            return;
        }
        slide.getCellElements().forEach(function(cellElem) {
            cellElem.classList[method](className);
        });
    }
    
    Flickity.prototype._createResizeClass = function() {
      this.element.classList.add('flickity-resize');
    };

    Flickity.createMethods.push('_createResizeClass');

    var resize = Flickity.prototype.resize;
    Flickity.prototype.resize = function() {
      this.element.classList.remove('flickity-resize');
      resize.call( this );
      this.element.classList.add('flickity-resize');
    };


    var extrasCarousel = function ( container ) {
        
        $(container).find('.oxy-carousel-builder').each(function(i, carousel){    

        var $carousel = $( carousel ),
            $inner = $carousel.find('.oxy-carousel-builder_inner'),
            $carouselslider = '#' + $carousel.attr('id') + ' ' + $inner.data('carousel');
            if ('.oxy-dynamic-list' === $inner.data('carousel')) {
                var $carouselcell = '#' + $($carouselslider).children('.ct-div-block').attr('id');
            } else {
                var $carouselcell = $inner.data('cell');
            }
        var $prev = $inner.data('prev'),
            $next = $inner.data('next'),
            $contain = $inner.data('contain'),
            $free_scroll = $inner.data('freescroll'),
            $draggable = $inner.data('draggable'),
            $wrap_around = $inner.data('wraparound'),
            $group_cells = $inner.data('groupcells'),
            $autoplay = $inner.data('autoplay'),
            $initial_index = $inner.data('initial') - 1,
            $accessibility = $inner.data('accessibility'),
            $cell_align = $inner.data('cellalign'),
            $right_to_left = $inner.data('righttoleft'),
            $page_dots = $inner.data('pagedots'),
            $percent = $inner.data('percent'),
            $asnavfor = $($inner.data('asnavfor') + ' ' + $($inner.data('asnavfor')).find('.oxy-carousel-builder_inner').data('carousel'))[0],
            $sync = $inner.data('sync') + ' ' + $($inner.data('sync')).find('.oxy-carousel-builder_inner').data('carousel'),
            $dragthreshold = $inner.data('dragthreshold'),
            $selectedattraction = $inner.data('selectedattraction'),
            $friction = $inner.data('friction'),
            $freescrollfriction = $inner.data('freescrollfriction'),
            $bgspeed = $inner.data('bgspeed'),
            $adaptheight = $inner.data('adaptheight'),
            $fullscreen = $inner.data('fullscreen'),
            $lazy = $inner.data('lazy'),
            $bglazy = $inner.data('bg-lazy'),
            $maybe_fade = $inner.data('fade'),
            $pause_autoplay = $inner.data('pauseautoplay'),
            $triggeraos = $inner.data('trigger-aos'),
            $triggeraosDelay = $inner.data('trigger-aos-delay'),
            $resumeAutoplay = $inner.data('resume-autoplay'),
            $hash = $inner.data('hash');


        $($carouselslider).on('ready.flickity', function(event, index) {

            setTimeout(function() {
                disable_nav(); // disable navigation on ready, depending on which cell we're on.
            }, 0);

        }); 
        
        
        if (true === $triggeraos) {
        
            $($carouselslider).find('.aos-init').css("visibility", "hidden");
            $($carouselslider).find('.aos-init').removeClass('aos-animate');

            $($carouselslider).on( 'ready.flickity', function() {

                $($carouselslider).find('.aos-init').css("visibility", "visible");
                $($carouselslider).find('.aos-init').removeClass('aos-animate');
                AOS.refresh(true);    

                setTimeout(function(){ 
                    $($carouselslider).find('.is-selected').siblings().find('.aos-init').removeClass('aos-animate');
                }, $triggeraosDelay);
            });
            
        }
        
        $inner.removeClass('oxy-carousel-builder_hidden');
        // trigger redraw for transition
        if (null != $($carouselslider)[0]) {
            $($carouselslider)[0].offsetHeight;
        }

        var options = {
            groupCells: $group_cells,
            contain: $contain,
            freeScroll: $free_scroll,
            draggable: $draggable,
            wrapAround: $wrap_around,
            cellSelector: $carouselcell,
            autoPlay: $autoplay,
            accessibility: $accessibility,
            cellAlign: $cell_align,
            rightToLeft: $right_to_left,
            pageDots: $page_dots,
            percentPosition: $percent,
            asNavFor: $asnavfor,
            adaptiveHeight: $adaptheight,
            dragThreshold: $dragthreshold,
            selectedAttraction: $selectedattraction,
            friction: $friction,
            freeScrollFriction: $freescrollfriction,
            imagesLoaded: true,
            lazyLoad: $lazy,
            bgLazyLoad: $bglazy,
            prevNextButtons: false,
            watchCSS: true,
            fullscreen: $fullscreen,
            fade: $maybe_fade,
            pauseAutoPlayOnHover: $pause_autoplay,
            sync: $sync,
            hash: $hash
        };

        if (true !== $hash) {
            Object.assign(options, {initialIndex: $initial_index});
        }
        
        var $flickityCarousel = $($carouselslider).flickity(options);
        
        var currentCarousel;

        $($next).off('click');
        $($next).on('click', function(e) {
            e.preventDefault();
            
            if ($(this).parent('.oxy-carousel-builder').length) {
                currentCarousel = $(this).parent('.oxy-carousel-builder').find($inner.data('carousel'));
            } else {
                currentCarousel = $($carouselslider);
            }

            currentCarousel.flickity('next');
            
            if (0 !== $autoplay) {
                currentCarousel.flickity('pausePlayer');
                //setTimeout(() => currentCarousel.flickity('unpausePlayer'), $autoplay);
                setTimeout(function(){ currentCarousel.flickity('unpausePlayer') }, $autoplay); 
            }
        });

        $($prev).off('click');
        $($prev).on('click', function(e) {
            e.preventDefault();
            
            if ($(this).parent('.oxy-carousel-builder').length) {
                currentCarousel = $(this).parent('.oxy-carousel-builder').find($inner.data('carousel'));
            } else {
                currentCarousel = $($carouselslider);
            }
            
            currentCarousel.flickity('previous');
            
            if (0 !== $autoplay) {
                currentCarousel.flickity('pausePlayer');
                //setTimeout(() => currentCarousel.flickity('unpausePlayer'), $autoplay);
                setTimeout(function(){ currentCarousel.flickity('unpausePlayer') }, $autoplay); 
            }
            
        });


        // Cells are clickable to select
        if (true === $inner.data('clickselect')) {

            $flickityCarousel.on('staticClick.flickity', function(event, pointer, cellElement, cellIndex) {
                if (typeof cellIndex == 'number') {
                    $(this).flickity('selectCell', cellIndex);
                }
            });

        }
        
        // Prevent click triggering.
        $flickityCarousel.on('dragStart.flickity', function(){ $($carouselslider).find('.flickity-slider > *').css('pointer-events', 'none')});
        $flickityCarousel.on('dragEnd.flickity', function(){ $($carouselslider).find('.flickity-slider > *').css('pointer-events', 'all')});

        // Parallax Elems    
        if (true === $inner.data('parallaxbg')) {

            if ('.oxy-dynamic-list' === $inner.data('carousel')) {
                var $parallaxCells = $flickityCarousel.find('.flickity-slider').children('.ct-div-block');
            } else {
                var $parallaxCells = $flickityCarousel.find($carouselcell);
            }
            

            var docStyle = document.documentElement.style;
            var transformProp = typeof docStyle.transform == 'string' ?
                'transform' : 'WebkitTransform';

            var flkty = $flickityCarousel.data('flickity');


            function parallaxbg() {
                flkty.slides.forEach(function(slide, i) {

                    var $parallaxCell = $parallaxCells[i];
                    var $parallaxElem = $($parallaxCell).find('[data-speed]');

                    var x = (slide.target + flkty.x); // Cell transform

                    $parallaxElem.each(function() {

                        var $parallaxSpeed = $(this).attr('data-speed');
                        var $parallaxElemDom = $(this)[0];
                        var trans = x * (-1 / $parallaxSpeed); // Cell transform * paralax speed

                        $parallaxElemDom.style[transformProp] = 'translateX(' + trans + 'px)';

                    });

                });
            }

            parallaxbg();

            $flickityCarousel.on('scroll.flickity', function(event, progress) {

                parallaxbg();

            });


        }
        
        // if aos
        if (true === $triggeraos) {
        
            $flickityCarousel.on( 'change.flickity', function( event, index ) {

                $($carouselslider).find('.aos-init').css("visibility", "hidden");
                $($carouselslider).find('.aos-init').removeClass('aos-animate');

                setTimeout(function(){ 
                    $($carouselslider).find('.is-selected .aos-init').css("visibility", "visible");
                     setTimeout(function(){ 
                        $($carouselslider).find('.is-selected .aos-init').addClass('aos-animate');
                        $($carouselslider).find('.is-selected').siblings().find('.aos-init').removeClass('aos-animate');
                        
                    }, 20);
                }, $triggeraosDelay);


            });
            
        }

        // If ticker mode is selected & wraparound enabled
        if ((true === $inner.data('tick')) && (true === $inner.data('wraparound'))) {

            var tickerSpeed = $inner.data('ticker');

            var flickity = null;
            var isPaused = false;
            const slideshowEl = document.querySelector($carouselslider);

            const update = function() {
                if (isPaused) return;
                if (flickity.slides) {
                    flickity.x = (flickity.x - tickerSpeed) % flickity.slideableWidth;
                    flickity.selectedIndex = flickity.dragEndRestingSelect();
                    flickity.updateSelectedSlide();
                    flickity.settle(flickity.x);
                }
                window.requestAnimationFrame(update);
            };

            const pause = function() {
                isPaused = true;
            };

            const play = function() {
                if (isPaused) {
                    isPaused = false;
                    window.requestAnimationFrame(update);
                }
            };

            flickity = $($carouselslider).data('flickity');
            flickity.x = 0;
            
            if (true === $inner.data('tickerpause')) {

                slideshowEl.addEventListener('mouseenter', pause, false);
                slideshowEl.addEventListener('focusin', pause, false);
                slideshowEl.addEventListener('mouseleave', play, false);
                slideshowEl.addEventListener('focusout', play, false);
            
            }

            flickity.on('dragStart', function() {
                isPaused = true;
            });


            update();

        }

        $flickityCarousel.on('select.flickity', function(event, index) {
            disable_nav();
        });
        
        
        
        $flickityCarousel.on( 'fullscreenChange.flickity', function( event, isFullscreen ) {
            
            if (true === isFullscreen) {
                $($prev).addClass('oxy-carousel-builder_icon-fullscreen');
                $($next).addClass('oxy-carousel-builder_icon-fullscreen');
            } else {
                $($prev).removeClass('oxy-carousel-builder_icon-fullscreen');
                $($next).removeClass('oxy-carousel-builder_icon-fullscreen');
            }
            
            setTimeout(function(){
                $flickityCarousel.flickity('resize');
            }, 300); // wait
        });
        
        

        function disable_nav() {

            // Only if wraparound disabled, othwerwise no end
            if (false === $inner.data('wraparound')) {

                var flickity = $($carouselslider).data('flickity');

                var target = flickity.selectedCell.target;
                
                if (target == flickity.cells[0].target) {
                    $($prev).addClass('oxy-carousel-builder_icon_disabled');
                    $($next).removeClass('oxy-carousel-builder_icon_disabled');
                } else if (target == flickity.getLastCell().target) {
                    $($next).addClass('oxy-carousel-builder_icon_disabled');
                    $($prev).removeClass('oxy-carousel-builder_icon_disabled');
                } else {
                    $($prev).removeClass('oxy-carousel-builder_icon_disabled');
                    $($next).removeClass('oxy-carousel-builder_icon_disabled');
                }

            }
        }
        
        if ((0 !== $autoplay) && (null != $resumeAutoplay)) {
            
            $flickityCarousel.on( 'dragEnd.flickity', function() {
                setTimeout(function(){ $($carouselslider).flickity('playPlayer')}, $resumeAutoplay);
            });

            $flickityCarousel.on( 'staticClick.flickity', function() {
                setTimeout(function(){ $($carouselslider).flickity('playPlayer')}, $resumeAutoplay);
            });

            $flickityCarousel.on( 'pointerMove.flickity', function() {
                console.log('pointerMove');
                setTimeout(function(){ $($carouselslider).flickity('playPlayer')}, $resumeAutoplay);
            });
            
        }
        
        $carousel.find('.oxy-carousel-next').parent('.oxy-carousel-navigation').addClass('oxy-carousel-navigation_next');
        $carousel.find('.oxy-carousel-previous').parent('.oxy-carousel-navigation').addClass('oxy-carousel-navigation_prev');
        
        $(window).on('load', function(){
            $flickityCarousel.flickity('resize');
        });

        if ($($carouselslider).has('.oxy-read-more-less')) {
            $($carouselslider).find('.oxy-read-more-less').on('extras_readmore:expand extras_readmore:collapse', function() {
		
                setTimeout(function(){
                    $flickityCarousel.flickity('resize');
                }, 5);
            
            });
        }

    }); 
    
    // If inside tabs, make sure carousel resizes as tabs are opened
        if ($('.oxy-tab-content').length) {

            // do not run the code in Oxygen
	        if(window.angular) return;

            if ($('.oxy-tab-content').has('.oxy-carousel-builder')) {

                $('.oxy-tabs').on('click', function() {

                    let tabContent = '#' + $(this).attr('data-oxy-tabs-contents-wrapper');
                    let tabCarousels = $(tabContent).find('.oxy-carousel-builder');
        
                    tabCarousels.each(function() {
            
                        let tabflkty = Flickity.data($(this).find('.flickity-enabled')[0]);
            
                        setTimeout(function() {
                            tabflkty.resize();
                        }, 20);
            
                    });

                });

            }
        }

    };

    extrasCarousel('body');

    // Expose function
    window.doExtrasCarousel = extrasCarousel;

};