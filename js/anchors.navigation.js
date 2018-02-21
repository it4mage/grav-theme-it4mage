jQuery(function($){

	var scrollSelector = '.menu-item a',
		active_class = 'active',
		time = 1000,
		contentTop = {},
		contentOffset = 0,
		currentAnchor = window.location.hash,
		scrollFlag = 0;

	// Fill object with scroll blocks data (offset and height)
	window.setContentTopObject = function(){
		contentTop = {};
		$(scrollSelector).each(function(){
			if (this.hash && $(this.hash).length) {
				$(this).attr('data-hash', this.hash);
				$this = $( this.hash );
				var offset_top = $this.offset().top;
				contentTop[this.hash] = {'top': Math.round(offset_top - contentOffset), 'bottom': Math.round(offset_top  - contentOffset + $this.outerHeight() )};
			}
		});
	}
	
	$(window).on('load', function(){
		setContentTopObject();
	});

	$(window).on('resize', function(){
		setContentTopObject();
	});

	// Animate scroll after clicking menu link
	$(scrollSelector).on('click', function(e){

		//check dom element
		if ( !this.hash && !$(this.hash).length ) { 
			return true; 
		}
		$(scrollSelector).parent().removeClass(active_class);
		$(scrollSelector+'[data-hash="' + currentAnchor + '"]').parent().addClass(active_class);
		setImmediateAnchor(this, time);
		e.preventDefault();
	});

	function setImmediateAnchor(anchor, time){
		if( anchor && $(anchor.hash).length){
			scrollFlag = 1;
			var link_hash = anchor.hash;

			$('html, body').stop().animate({ 'scrollTop' : contentTop[link_hash].top }, time, function(){

				if(history.pushState) {
				    history.pushState(null, null, link_hash);
				}
				else {
				    location.hash = link_hash;
				}

				currentAnchor = link_hash;
				scrollFlag = 0;
				$(scrollSelector).parent().removeClass(active_class);
				$(scrollSelector+'[data-hash="' + currentAnchor + '"]').parent().addClass(active_class);
			});			

		} 
	}

	$(window).on('load', function(){
		if ( $(window).scrollTop() > 0 && location.hash ) {
			setImmediateAnchor(location,1000);
		};
	});

	//setImmediateAnchor($(scrollSelector+'[href="'+location.href.split('#')[0]+currentAnchor+'"]')[0], 1);
	
	function setScrollAnchor(){
		if(!scrollFlag){
			var scrollPositionTop = $(window).scrollTop();
			for(var p in contentTop){
				if(contentTop[p].top <= scrollPositionTop && contentTop[p].bottom > scrollPositionTop && currentAnchor != p){

					$(scrollSelector).parent().removeClass(active_class);
					if(history.pushState) {
					    history.pushState(null, null, p);
					}
					else {
					    location.hash = p;
					}
					$(scrollSelector).parent().removeClass(active_class);
					$(scrollSelector+'[data-hash="' + p + '"]').parent().addClass(active_class);
					currentAnchor = p;
					break;
				}
			}
		}
	}

	$('html, body').on('scroll mousedown DOMMouseScroll mousewheel keyup', function(e){
			if ( (e.which > 0 || e.type == 'mousedown' || e.type == 'mousewheel') && scrollFlag ){
				//console.log(e);
				$('html,body').stop();
				scrollFlag = 0;
				setScrollAnchor();
			} else {
				if (!scrollFlag) {
					scrollFlag = 0;
					setScrollAnchor();
				};
			}
	});


});