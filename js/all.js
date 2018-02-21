;(function($, window, document, undefined) {
    "use strict";



    /*--------------------------------------------------------------------------------------*/
    // babkgound img
    /*--------------------------------------------------------------------------------------*/

    function wpc_add_img_bg(img_sel, parent_sel) {

        if (!img_sel) {
            console.info('no img selector');
            return false;
        }
        var $parent, _this;

        $(img_sel).each(function() {
            _this = $(this);
            $parent = _this.closest(parent_sel);
            $parent = $parent.length ? $parent : _this.parent();
            $parent.css('background-image', 'url(' + this.src + ')');
            _this.hide();
        });

    }
    wpc_add_img_bg('.wpc-img-style a img', '.wpc-img-style a');



    /*============================*/
	/* 01 - VARIABLES */
	/*============================*/
	
	var swipers = [], winW, winH, winScr, _isresponsive, smPoint = 768, mdPoint = 992, lgPoint = 1200, addPoint = 1600, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);


	/*========================*/
	/* 02 - PAGE CALCULATIONS */
	/*========================*/
	function pageCalculations(){
		winW = $(window).width();
		winH = $(window).height();
	}
    

	/*=================================*/
	/* 03 - FUNCTION ON DOCUMENT READY */
	/*=================================*/
	pageCalculations();

    $(document).on('ready',function(){

        $('.tabs-header').on('click', 'li:not(.active)', function() {

            var index_el = $(this).index();

            $(this).addClass('active').siblings().removeClass('active');
            $(this).closest('.tabs').find('.tabs-item').removeClass('active').eq(index_el).addClass('active');

        });
        
        function menu_responsive() {

            if( $(window).width() <= 992 ) {

                $('.main-menu').addClass('dl-menu dl-menuopen');
                $('.menu-item-has-children').find('.sub-menu').addClass('dl-submenu');
                $('.sub-menu').find('.back').addClass('dl-back');

                $('#dl-menu').dlmenu({
                    animationClasses: { classin: 'dl-animate-in-5', classout: 'dl-animate-out-5' }
                });

            }

        }

        menu_responsive();

        if(winW<992){
            $('.main-menu li').on('click', function (e) {
                if(!$(this).hasClass('menu-item-has-children')) {
                    if(!$(this).hasClass('dl-back')) {
                        $('.nav-menu-icon a').toggleClass('active');
                        $('.wpc-navigation nav').toggleClass('slide-menu');
                        $('html').removeClass('overflow');
                    }
                }
            })
        }
        
        
        

    });

	$(function () {

        $('.service-block').css('height', 'auto').equalHeights();

        overflow();


        var bgVideoHeight = $('.bg-video-height').height();
        $('.video-iframe').height(bgVideoHeight+23);
        //
        $('.but-icon').on('click', function() {
            var videoSrc = $(this).attr('data-video');
            $('.video-iframe').attr('src', videoSrc).show();
            $('.video-tmb').css('position', 'absolute');
            $('.video-tmb').css('z-index', '-999');
            $('header').css('background', 'black');
            $('header.style-3').css('background', 'white');
            $('.close-btn').show();
        });
        $('.close-btn').on('click', function() {
            $('.video-iframe').attr('src', 'about:blank').hide();
            $('.video-tmb').css('position', 'static');
            $('.video-tmb').css('z-index', '1');
            $('header').css('background', 'transparent');
            $('.close-btn').hide();
        });
	});


    $(".btn-more").on("click", function(){
        $(".hide-item").fadeIn(1000);
        $(this).fadeOut(1000);
        return false;
    });
    

	/*============================*/
	/* 04 - FUNCTION ON PAGE LOAD */
	/*============================*/
	
	$(window).on('load', function(){

        $('.preload-wrap').fadeOut(1000);

});


	/*==============================*/
	/* 05 - FUNCTION ON PAGE RESIZE */
	/*==============================*/
    
	function resizeCall(){
		pageCalculations();
		$('.swiper-container.initialized[data-slides-per-view="responsive"]').each(function(){
			var thisSwiper = swipers['swiper-'+$(this).attr('id')], $t = $(this), slidesPerViewVar = updateSlidesPerView($t), centerVar = thisSwiper.params.centeredSlides;
			thisSwiper.params.slidesPerView = slidesPerViewVar;
			thisSwiper.reInit();
			if(!centerVar){
				var paginationSpan = $t.find('.pagination span');
				var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
				if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
				else $t.removeClass('pagination-hidden');
				paginationSlice.show();
			}
		});	
	}
	if(!_ismobile){
		$(window).resize(function(){
			resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			resizeCall();
		}, false);
	}


    function overflow() {
        $('.nav-menu-icon a').on('click', function () {
            var wdth = $(window).width();
            if(wdth<992) {
                $('html').toggleClass('overflow');
            } else {
                $('html').removeClass('overflow');
            }
        });
    }

    $(window).on('resize', function(){
        overflow();
    });


    $(window).on('resize', function () {
        $('.service-block').css('height', 'auto').equalHeights();


        // video background

        var bgVideoHeight = $('.bg-video-height').height();
        $('.video-iframe').height(bgVideoHeight+23);
        //
        $('.but-icon').on('click', function() {
            var videoSrc = $(this).attr('data-video');
            $('.video-iframe').attr('src', videoSrc).show();
            $('.video-tmb').css('position', 'absolute');
            $('.video-tmb').css('z-index', '-999');
            $('header').css('background', 'black');
            $('header.style-3').css('background', 'white');
            $('.close-btn').show();
        });
        $('.close-btn').on('click', function() {
            $('.video-iframe').attr('src', 'about:blank').hide();
            $('.video-tmb').css('position', 'static');
            $('.video-tmb').css('z-index', '1');
            $('header').css('background', 'transparent');
            $('.close-btn').hide();
        });

    });

    
	/*============================*/
	/* DROPDOWN */
	/*============================*/
	
	$('.nav-menu-icon a').on('click', function() { 
	  if ($('.navigation nav').hasClass('slide-menu')){
		   $('.navigation nav').removeClass('slide-menu'); 
		   $('.wrap').removeClass('hold');
		   $('.center-menu').removeClass('act');
		   $('.left-slide').removeClass('slide-menu'); 
		   $(this).removeClass('active');
	  }else {
		   $('.navigation nav').addClass('slide-menu');
		   $('.center-menu').addClass('act');
		   $('.left-slide').addClass('slide-menu');
		   $('.wrap').addClass('hold');
		   $(this).addClass('active');
	  }
		return false;
	 });
	
	
	$('nav > ul > li > a').on('click', function(){
	  if ($(this).parent().find('.sub-menu').hasClass('act')){
	      $(this).parent().find('.sub-menu').removeClass('act');
          $(this).parent().find('> a > i').css('transform', 'rotate(0deg)');

	  }else{
		  $('.dropmenu').removeClass('act');
	      $(this).parent().find('> .sub-menu').addClass('act');
          $(this).parent().find('> a > i').css('transform', 'rotate(180deg)');
	  }

	});
	
	$('.sub-menu > li > a').on('click', function(){
	  if ($(this).parent().find('.sub-menu').hasClass('act')){
	      $(this).parent().find('.sub-menu').removeClass('act');
          $(this).parent().find('i').css('transform', 'rotate(0deg)');
	  }else{
		  $('.dropmenu .dropmenu').removeClass('act');
	      $(this).parent().find('> .sub-menu').addClass('act');
          $(this).parent().find('i').css('transform', 'rotate(180deg)');
	  }

	});
       

	/***********************************/
	/*WINDOW SCROLL*/
	/**********************************/
	
    $(window).on('scroll', function() {
	   if ($(this).scrollTop() >= 80) {
		   $('header').addClass('scroll');
		}else{
		   $('header').removeClass('scroll');
		} 
	});
	
	
	/***********************************/
	/*VIDEO POPUP*/
	/**********************************/

    $('.video-play-btn').on('click', function(){
        var videoSrc = $(this).attr('data-video');
	   $('.video-popup').addClass('open');
        $('.bg-video-iframe').attr('src', videoSrc).show();;
        $('.video-wrap').css('display', 'block');
		return false;
	});

	$('.video-popup .close').on('click', function(){
        $('.video-popup').removeClass('open');
        $('.bg-video-iframe').attr('src', 'about:blank').hide();
        $('.video-wrap').css('display', 'none');
		return false;
	});


    $('.second-menu li').on('click', function(){
		$('.second-menu li').removeClass('act');
	    $(this).toggleClass('act');
		  return false;
	});

    
    /***********************************/
	/*BACKGROUND*/
	/**********************************/
    
    //sets child image as a background
    $('.s-back-switch').each(function(){
        var $img = $(this).find('.s-img-switch');
        var $imgSrc =  $img.attr('src');
        var $imgDataHidden =  $img.data('s-hidden');
        if($imgSrc) {
            $(this).css('background-image' , 'url(' + $imgSrc + ')');
        }
        if($imgDataHidden){
        	$img.css('visibility', 'hidden');
        }else{
        	$img.hide();
        }
    });
   
  
    
    /***********************************/
    /* LIGHTBOX */
    /**********************************/
     lightbox.option({
      'showImageNumberLabel' : false,
        'disableScrolling' : true
    });
    
    
    /***********************************/
    /* MAGNIFIC POPUP */
    /**********************************/



    /***********************************/
	/* 05 - POPUP */
	/**********************************/

    function eventinePopup(typePopup='image') {
        if(typePopup==='form') {
            $('.popup-with-form').magnificPopup({
                type: 'inline',
                preloader: false,
                mainClass: 'mfp-fade',
                closeBtnInside: false,
                focus: '#name',

                // When elemened is focused, some mobile browsers in some cases zoom in
                // It looks not nice, so we disable it:
                callbacks: {
                    beforeOpen: function() {
                        if($(window).width() < 700) {
                            this.st.focus = false;
                        } else {
                            this.st.focus = '#name';
                        }
                        this.st.mainClass = this.st.el.attr('data-effect');
                    },
                    close: function() {
                      $('html').removeClass('overflow');
                    }
                }
            });
        } else {
            $('.img-popup').magnificPopup({
                type: 'image',
                removalDelay: 100,
                tLoading: 'Loading image #%curr%...',
                mainClass: 'mfp-fade',
                closeBtnInside: false,
                gallery: { enabled:true },
                callbacks: {
                    beforeOpen: function() {
                      // just a hack that adds mfp-anim class to markup 
                       this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                       this.st.mainClass = this.st.el.attr('data-effect');
                    }
                },
            }); 
        }
        
    }
    
    if ($('.img-popup').length){
        eventinePopup();
    }

    if($('#popup-booked-form').length) {
        eventinePopup('form');
    }



    /*=================================*/
    /* Horizontal Accordion */
    /*=================================*/


    var wpcRemoveClass = function( el, _class ){
        if (el.classList)
            el.classList.remove( _class ? _class : 'active' );
        else
            el.className = panel.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    };



})(jQuery, window, document);

//map

if( $('.wpc-map').length ) {
    $('.wpc-map').each(function() {
        initialize(this);
    });
}

function initialize(_this) {

    var stylesArray = {
        //style 1
        'style-1' : [{
            "featureType":"water",
            "elementType":"geometry",
            "stylers":[
                {"color":"#e9e9e9"},
                {"lightness":17}
                ]},

            {"featureType":"landscape",
            "elementType":"geometry",
            "stylers":[
                {"color":"#f5f5f5"},
                {"lightness":20}
                ]},
            {"featureType":"road.highway",
            "elementType":"geometry.fill",
            "stylers":[
                {"color":"#ffffff"},
                {"lightness":17}
                ]},
            {"featureType":"road.highway",
            "elementType":"geometry.stroke",
            "stylers":[
                {"color":"#ffffff"},
                {"lightness":29},
                {"weight":0.2}
                ]},
            {"featureType":"road.arterial",
            "elementType":"geometry",
            "stylers":[
                {"color":"#ffffff"},
                {"lightness":18}
                ]},
            {"featureType":"road.local",
            "elementType":"geometry",
            "stylers":[
                {"color":"#ffffff"},
                {"lightness":16}
                ]},
            {"featureType":"poi",
            "elementType":"geometry",
            "stylers":[
                {"color":"#f5f5f5"},
                {"lightness":21}
                ]},
            {"featureType":"poi.park",
            "elementType":"geometry",
            "stylers":[
                {"color":"#dedede"},
                {"lightness":21}
                ]},
            {"elementType":"labels.text.stroke",
            "stylers":[
                {"visibility":"on"},
                {"color":"#ffffff"},
                {"lightness":16}
                ]},
            {"elementType":"labels.text.fill",
            "stylers":[
                {"saturation":36},
                {"color":"#333333"},
                {"lightness":40}
                ]},
            {"elementType":"labels.icon",
            "stylers":[{"visibility":"off"}
                ]},
            {"featureType":"transit",
            "elementType":"geometry",
            "stylers":[
                {"color":"#f2f2f2"},
                {"lightness":19}
                ]},
            {"featureType":"administrative",
            "elementType":"geometry.fill",
            "stylers":[
                {"color":"#fefefe"},
                {"lightness":20}
                ]},
            {"featureType":"administrative",
            "elementType":"geometry.stroke",
            "stylers":[
                {"color":"#fefefe"},
                {"lightness":17},
                {"weight":1.2}
                ]}
        ]
    };

    var styles ,map, marker, infowindow,
        lat = $(_this).attr("data-lat"),
        lng = $(_this).attr("data-lng"),
        contentString = $(_this).attr("data-string"),
        image = $(_this).attr("data-marker"),
        styles_attr = $(_this).attr("data-style"),
        zoomLevel = parseInt($(_this).attr("data-zoom"),10),
        myLatlng = new google.maps.LatLng(lat,lng);


    // style_1
    if (styles_attr === 'style-1') {
        styles = stylesArray[styles_attr];
    }
    // custom
    if (typeof hawa_style_map != 'undefined' && styles_attr === 'custom') {
        styles = hawa_style_map;
    }
    // or default style

    var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});

    var mapOptions = {
        zoom: zoomLevel,
        disableDefaultUI: true,
        center: myLatlng,
        scrollwheel: false,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
    };

    map = new google.maps.Map(_this, mapOptions);

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    infowindow = new google.maps.InfoWindow({
        content: contentString
    });


    marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: image
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });

}

