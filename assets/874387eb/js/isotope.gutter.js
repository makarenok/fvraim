/*** Isotope Gutter ***/
$.Isotope.prototype._getMasonryGutterColumns = function() {
 	var gutter = this.options.masonry && this.options.masonry.gutterWidth || 0;
	var containerWidth = this.element.width();
	this.masonry.columnWidth = this.options.masonry && this.options.masonry.columnWidth ||
		this.$filteredAtoms.outerWidth(true) ||
		containerWidth;
	this.masonry.columnWidth += gutter;
	this.masonry.cols = Math.floor( ( containerWidth + gutter ) / this.masonry.columnWidth );
	this.masonry.cols = Math.max( this.masonry.cols, 1 );
};
$.Isotope.prototype._masonryReset = function() {
	this.masonry = {};
	this._getMasonryGutterColumns();
	var i = this.masonry.cols;
	this.masonry.colYs = [];
	while (i--) {
		this.masonry.colYs.push( 0 );
	}
};
$.Isotope.prototype._masonryResizeChanged = function() {
	var prevSegments = this.masonry.cols;
	this._getMasonryGutterColumns();
	return ( this.masonry.cols !== prevSegments );
};
/*** Isotope layout ***/
$(document).ready(function(){
	var layoutI = 0;
	var $container = $("#stream");
	var $window = $(window);
	/*var $imgs = $("img");
	var $menu = $("#menu-archives li.staysexy a");
	$imgs.lazyload({ 
		effect : "fadeIn",
		failure_limit : Math.max($imgs.length-1, 0),
		threshold : 1000
	});*/
	function windowSizeMe(){
		var windowSize = $window.width();
		if (windowSize > 1199) {
		    $("#switch").attr("data-content", "bigger");
		} else if (windowSize < 1200 && windowSize > 979) {
		    $("#switch").attr("data-content", "big");
		} else if (windowSize < 768) {
		    $("#switch").attr("data-content", "small");
		} else {
		    $("#switch").attr("data-content", "medium");
		};
	}; 
	function reLayout(){
		windowSizeMe(); 
		var mediaQueryId = $("#switch").attr("data-content");
		console.log(mediaQueryId);
		// fix for firefox, remove double quotes
		var mediaQueryId = mediaQueryId.replace( /"/g, '' );
		var masonryOpts;
		switch ( mediaQueryId ) {
			case 'bigger' :
				masonryOpts = {
					columnWidth: 270,
					gutterWidth: 30
				};
			break;
			case 'big' :
				masonryOpts = {
					columnWidth: 220,
					gutterWidth: 20
				};
			break;
			case 'medium' :
				masonryOpts = {
					columnWidth: 166,
					gutterWidth: 20
				};
			break;
			case 'small' :
				masonryOpts = {
					columnWidth: $container.width() / 2,
					gutterWidth: 0
				};	
			break;
		};
		$container.isotope({
			resizable: false, // disable resizing by default, we'll trigger it manually
			itemSelector : "article.photos",
			animationEngine: "best-available",
			masonry: masonryOpts,
			onLayout: function() {
				//  console.log('layout!' + (layoutI++) )
				forceLoad();
				setTimeout(function(){
					html_height = $container.height();
					$("#sidebar").height(html_height - masonryOpts.gutterWidth);
				}, 500);
			}
		});
	};
	// start up isotope with default settings
	$container.imagesLoaded( function(){
		reLayout();
		$window.smartresize( reLayout );
	});
	function relayoutAgain(){
		$container.imagesLoaded( function(){
			$container.isotope("reLayout");
		});
	};
/*$menu.on("click",function() {
    	event.preventDefault();
		var	link = $(this).attr("href"),
			toRemove = ajax_object.url,
			rewritepath = link.replace(toRemove,"");
		$.address.state(ajax_object.path).crawlable(true).value(rewritepath);
		var cat = $(this).text().toLowerCase();
		$menu.removeClass("active");
		$("#menu-all a").removeClass("active");
		$(this).addClass("active");
		$("article.photo").addClass("forcesmall");
		$container.isotope({ filter: "."+cat });
		setTimeout(function(){
	        relayoutAgain();	
	    },500);
    });
    $("#menu-all a").on("click",function() {
    	event.preventDefault();
		var	link = $(this).attr("href"),
			toRemove = ajax_object.url,
			rewritepath = link.replace(toRemove,"");
		$.address.state(ajax_object.path).crawlable(true).value(rewritepath);
		$menu.removeClass("active");
		$(this).addClass("active");
		$("article.photo").removeClass("forcesmall");
		$container.isotope({ filter: ".photos" });
		setTimeout(function(){
	        relayoutAgain();	
	    },500);
    });*/