
(function($){

    var Gridifier = {};

    Gridifier.extend = function(){
        return $.extend(true, {}, this);
    };

    /**
     *
     */

    Gridifier.templates = {
        portfolioContent : $("#ajax-portfolio-template").html(),
        portfolioPreloader : $("#portfolio-preloader-template").html(),
        loadmore : $( '<div class="loadmore"><a href="#">' + "Load more " + '</a></div>' )
    };

    Gridifier.colClasses = [];

    Gridifier.colClasses[12] = "col-lg-1 col-md-2 col-sm-12 col-xs-12";
    Gridifier.colClasses[6] = "col-lg-2 col-md-3 col-sm-12 col-xs-12";
    Gridifier.colClasses[4] = "col-lg-3 col-md-3 col-sm-12 col-xs-12";
    Gridifier.colClasses[3] = "col-lg-4 col-md-4 col-sm-12 col-xs-12";
    Gridifier.colClasses[2] = "col-lg-6 col-md-6 col-sm-12 col-xs-12";
    Gridifier.colClasses[1] = "col-lg-12 col-md-12 col-sm-12 col-xs-12";

    /**
     * AJAX WP handler
     * @param action
     * @param data
     * @param callback
     */

    Gridifier.says = function(action, data, callback){
        var adminAjax = 'site/index/?filter=new';
        var ajaxData = $.extend(true, data, { action: action });
        var _this = this;

        $.ajax({
            type: "POST",
            url: adminAjax,
            data: ajaxData,
            dataType : 'json',
            success: function(response){
                _this[callback](response);
            },
            error: function(response){
                _this[callback](response);
            }
        });
    };

    /**
     * creates filter for portfolio
     * @returns {*|HTMLElement}
     */

    Gridifier.getFormFilter = function(){

        var allClasses = [],
            $items = this.$container.find('.ajax-portfolio-item'),
            _this = this
            ;

        $items.each(function(index, value){

            var categories = $(this).data("categories");

            if( categories && categories.length > 0 ){
                for( var i in categories ){
                    allClasses.push( categories[i].name );
                }
            }
        });

        var uniqueClasses = allClasses.filter(function(itm,i,allClasses){
            return i == allClasses.indexOf(itm);
        });

        var filterList = $('<ul class="portfolio-filter" />');

        for( var j in uniqueClasses ){
            var lower = uniqueClasses[j];
            lower = lower.split(' ').join('-');
            filterList.append('<li><a href="#" data-filter="' + lower.toLowerCase() + '">' + uniqueClasses[j] + '</a></li>');
        }

        filterList.prepend('<li><a href="#" class="selected" data-filter="all">All</a></li>');

        filterList.find('a').each(function(){
            $(this).click(function(event){
                event.preventDefault();

                //_this.$container.find('.ajax-portfolio-item').removeClass("animated").removeClass("slideInUp");

                //_this.$container.find('.ajax-portfolio-item:not(.' + $(this).attr("data-filter") + ')').css({opacity: 0, display: "none"});

                filterList.find('a').removeClass('selected');
                $(this).addClass('selected');

                if($(this).attr("data-filter") != "all"){

                    var active = _this.$container.find('.ajax-portfolio-item.' + $(this).attr("data-filter")).removeClass('filter-off');
                    var off = _this.$container.find('.ajax-portfolio-item:not(.' + $(this).attr("data-filter") + ')');

                        $.each(off, function(){
                            var $that = $(this);
                                $that.addClass("filter-off");
                        });

                        //_this.animateFilterOff(off);

                        //_this.animate(active);
                }

                else{
                    _this.$container.find('.ajax-portfolio-item').removeClass('filter-off');
                    //_this.animateFilter(); //.css({opacity: 1}).show();
                }

                if(_this.options.type == "masonry"){
                    setTimeout(function(){
                        _this.smartMasonryLayout();
                    }, 200);
                }


            });
        });

        return filterList;
    };

    /**
     *
     */

    Gridifier.hideActivePopup = function(){

        var $body = $('body');

        $body.find('.gridifier-popup').fadeOut(500);
        $body.find('.gridifier-background-wrap').fadeOut(200);
        this.$container.find('.ajax-portfolio-item').removeClass("ajax-content");
    };

    /**
     *
     * @param $form
     * @param data
     * @returns {boolean}
     */

     Gridifier.fillPortfolioContent = function($form, data){

     $form.find('.title').html(data.title);
     $form.find('.description').html(data.description);
     $form.find('.client').html(data.client);
     $form.find('.date').html(data.date);

     var i, $item, _this = this;

         /**
          * Gallery
          * @type {*}
          */

     var $gallery = $form.find('.gallery');

     if(data.projectType == "video"){
         $gallery.append( $item );
         $item = $(' <div class="gallery-item" />' );
         $item.append( data.video );
         $gallery.append( $item );
     }

     for( i in data.gallery ){
         if(data.gallery[i]){
             $item = $('<a href="' + data.gallery[i] + '" data-lightbox="content"></a>');
             $item.append( $( '<div class="gallery-item" />' ).css( 'background-image', 'url(' + data.gallery[i] + ')') );
                 $gallery.append( $item );
         }
     }

     var gallerySize = $gallery.find('.gallery-item').length;

     if(gallerySize > 1){

         $gallery.owlCarousel({
             items:1,
             navigation: true,
             navigationText: ["prev","next"]
         });
     }

     var $close = $('<div class="close-content"><span></span></div>');

         /**
          * Set close handlers;
          */

     switch(this.options.showType){

         case "inline-content":
             $close.click(function(){
                _this.hideActiveContent();
             });
             break;

         case "popup-content":
             $close.click(function(){
                 _this.hideActivePopup();
             });
             break;

         default:
             break;
     }

     $gallery.prepend($close);

         /**
          * Tags
          * @type {*}
          */

     var $tags = $form.find('.tags');

     for(i in data.tags ){
         $item = $( '<div class="tag-item" />' ).append( '<a href="' + data.tags[i].url + '">' + data.tags[i].name + '</a>' );
         $tags.append( $item );
     }

         /**
          * categories
          * @type {*}
          */

     var $categories = $form.find('.categories');

     for(i in data.categories ){
         $item = $( '<div class="category-item" />' ).append( '<a href="' + data.categories[i].url + '">' + data.categories[i].name + '</a>' );
         $categories.append( $item );
     }

     $form.find('.button').html( '<a href="' + data.button.link + '">' + data.button.text + '</a>' );

     return true;
     };

    /**
     *
     * @param data
     * @returns {*|HTMLElement}
     */

     Gridifier.getContentForm = function(data){
         var $form;

         if(this.options.contentType == "portfolio"){
             $form = $( this.templates.portfolioContent );
             this.fillPortfolioContent($form, data);
         }

         return $form;
     };

    /**
     * Get data from WP
     * @param id
     */

    Gridifier.getItemData = function(id){

        var action;

        switch(this.options.contentType){

            case "portfolio":
                action = "get_portfolio_content";
                break;

            case "blog":
                action = "get_blog_content";
                break;
        }

        this.says(
            action,
            { id : id },
            "loadItemData"
        );
        this.ajaxState = "waiting";

    };

    /**
     *
     */

    Gridifier.loadItemData = function(data){

        var $sender = this.$container.find('.ajax-content'),
            $items = this.$container.find('.ajax-portfolio-item');

        this.ajaxState = "idle";

        switch( this.options.showType ){

            case "inline-content":
                var senderRow = Math.ceil( $items.index( $sender ) / this.options.cols ); // get the row of this item

                senderRow = senderRow > 0 ? senderRow : 1;

                if($items.length > senderRow * this.options.cols - 1 ){
                    $items.eq( senderRow * this.options.cols - 1 ).after( this.getContentForm(data) );
                }
                else{
                    $items.last().after( this.getContentForm(data) );
                }
                // scroll to loaded content
                var $anchor = this.$container.find('#portfolio-content');
                $.scrollTo($anchor, {duration:1000});
                break;

            case "popup-content":
                var $popup = $('<div class="gridifier-popup" />');
                var $body = $("body");
                $popup.append( this.getContentForm(data) );
                $body.append('<div class="gridifier-background-wrap" />');
                $body.append( $popup );
                break;

            default:
                break;
        }

        // show it
        $sender.find('.cover').fadeOut(500);
        $('.portfolio-content-wrapper').addClass("animated fadeInLeftBig").show();

        setTimeout(function(){
            $('.portfolio-content-wrapper .owl-wrapper-outer').addClass("animated fadeIn").show();
            $('.portfolio-content-wrapper .owl-controls').addClass("animated fadeIn").show();
        }, 1000);
    };

    /**
     * Width / height calculation for big boxes
     * @param $item
     * @param base
     */

    Gridifier.setSize = function($item){
        this.base = this.base || this.$container.width() / this.options.cols;
        if(!this.mobile){
            $item.width( this.base * $item.data("widthX") ).height( this.base * $item.data("heightX") );
        }
        else{
            $item.width( this.base ).height( this.base );
        }
    };

    /**
     * Checks, if box can fit at given position
     */

    Gridifier.canFit = function(width, x, offsets, originalOffsets){
        return (width <= ( offsets.length - x ))
            && (offsets[x + (width - 1)] == offsets[x])
            && (this.offsets[x] == offsets[x])
            && (offsets[x + (width - 1)] == this.offsets[x + (width - 1)]);
    };

    /**
     *
     * @param $item
     * @param offsets
     */

    Gridifier.fitBox = function($item, offsets){

        var width = $item.data("widthX"),
            tmpOffsets = offsets.slice(0);

        var minOffset = Math.min.apply(Math, tmpOffsets),
            minIndex = tmpOffsets.indexOf(minOffset);

        if( this.canFit(width, minIndex, tmpOffsets) ){
            return minIndex;
        }
        else{
            ++tmpOffsets[minIndex];
            return this.fitBox($item, tmpOffsets);
        }
    };

    /**
     * Masonry layout with metro style support
     */

    Gridifier.smartMasonryLayout = function(){
        var $items = this.$container.find('.ajax-portfolio-item:not(.filter-off)'),
            _this = this;

        this.offsets = [];

        for( var k = 0; k < this.options.cols; k++ ){ this.offsets.push(0); }

        $.each($items, function(index, value){

            var $thisItem = $(this);
            _this.setSize( $thisItem );

            var $video = $(this).find('.grid-video');

            if($video.length){
                var $videoEl = $video.find("video").get()[0];

                $video.height($thisItem.height());
                $video.width($thisItem.width());

                var video = $video.find("video").get()[0];

                if($thisItem.width() == $thisItem.height()){
                    video.width = Math.ceil( $thisItem.width() * 16 / 9 );
                    video.setAttribute("style",
                        "margin-left: -" + Math.ceil(( (video.width - $thisItem.width() ) / 2) ).toString() + "px");
                }
                else if($thisItem.width() > $thisItem.height()){
                    video.width = $thisItem.width();
                }

                else if($thisItem.width() < $thisItem.height()){
                    video.width = $thisItem.height() * 16 / 9 ;
                    video.setAttribute("style",
                        "margin-left: -" + Math.ceil(( (video.width - $thisItem.width() ) / 2) ).toString() + "px");
                }
            }

            if(!_this.mobile){
                var newX = _this.fitBox($thisItem, _this.offsets),
                    newY = _this.offsets[newX];

                $thisItem.css({left: newX * _this.base + "px", top: newY * _this.base + "px"});

                for( var i = newX; i < newX + $thisItem.data("widthX"); i++ ){
                    _this.offsets[i] += $thisItem.data("heightX");
                }
            }
            else{
                $thisItem.css({left: 0, top: index * _this.base + "px"});
            }

            if($thisItem.css("display") == "none"){
                var $preloader = $thisItem.find(".grid-preloader");
                if(!($("html").hasClass("ie"))){
					if($preloader.length){
						$("<img/>")
							.load(function() {
								$preloader.addClass("animated fadeOut");
								$preloader.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
									$preloader.remove();
								});
								$(this).remove();

								/*$thisItem.addClass("animated fadeIn");
								$thisItem.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
									$thisItem.css({opacity: 1});
									$thisItem.removeClass("animated fadeIn");
								});*/
							})
							.error(function() {  })
							.attr("src", $preloader.attr("data-wait-for"))
						;
						$thisItem.show();
					}
					else{
						$thisItem.addClass("animated fadeIn");
						$thisItem.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
							$thisItem.css({opacity: 1});
							$thisItem.removeClass("animated fadeIn");
						});
						$thisItem.show();
					}
				}
				else{
					$preloader.remove();
					$thisItem.addClass("animated fadeIn");
					$thisItem.css({opacity: 1});}
            }
        });

        $.each($items, function(index, value){
            var $thisItem = $(this);
        });

        $('body #loading-content').remove();

        var height = Math.max.apply(Math, _this.offsets) * _this.base;

        if(_this.mobile){
            height = $items.length * _this.base;
        }
        this.$container.height(height);
    };


    /**
     *
     */

    Gridifier.loadContent = function(){
        var _this = this,
            action;

        switch(this.options.contentType){

            case "portfolio":
                action = "load_portfolio_items";
                break;

            case "blog":
                action = "load_blog_items";
                break;

            case "gallery":
                action = "load_gallery_items";
                break;
        }

        this.says(
            action,
            {
                type: "multiple",
                number: this.options.initRows * this.options.cols,
                offset: 0,
                gallery_id: _this.options.postId,
                category: _this.options.category
            },
            "initGrid"
        );
        this.ajaxState = "waiting";
    };

    /**
     * @TODO: - add blog hide content
     *
     */

    Gridifier.hideActiveContent = function(){
        var content = this.$container.find('.portfolio-content-wrapper');
        content.removeClass("animated fadeInLeftBig").addClass('animated fadeOutLeftBig');
        setTimeout(function(){content.slideUp(600);},600);
        setTimeout(function(){content.remove();}, 1200);
        this.$container.find('.ajax-portfolio-item').removeClass("ajax-content");
    };

    /**
     *
     * @param $content
     */

    Gridifier.bindGridEvents = function($content){

        var _this = this;

        /**
         *  Bind single portfolio
         *  content loader
         */

        if(this.options.showType == "inline-content"){
            $content.find('.ajax-portfolio-item').each(function(){
                $(this).click(function(event){
                    if(!_this.mobileDevice){

                        event.preventDefault();
                        $(this).prepend( '<div class="cover"><div class="loader"></div></div>').find('.cover').fadeIn();
                        _this.hideActiveContent();
                        $(this).addClass('ajax-content');
                        _this.getItemData( $(this).attr("data-post-id") );

                    }
                })
            });
        }

        else if(this.options.showType == "popup-content"){
            $content.find('.ajax-portfolio-item').each(function(){
                $(this).click(function(event){

                    if(!_this.mobileDevice){

                        event.preventDefault();
                        $(this).prepend( '<div class="cover"><div class="loader"></div></div>').find('.cover').fadeIn();
                        $(this).addClass('ajax-content');
                        _this.getItemData( $(this).attr("data-post-id") );
                    }
                })
            });
        }

        $content.find('.grid-video').each(function(){
                var $video = $(this).find('video'),
                    $cover = $(this).parent().find(".portfolio-image"),
                    $item = $(this).parents(".ajax-portfolio-item");

                $item.hover(function(){
                    $cover.removeClass("animated fadeIn");
                    $cover.addClass("animated fadeOut");
                    $video.get(0).play();
                    },
                function(){
                    $video.get(0).pause();
                    $cover.removeClass("animated fadeOut");
                    $cover.addClass("animated fadeIn");
                    //$cover.fadeIn(500);
                });
            }
        );
    };

    /**
     *
     */

    Gridifier.animate = function(items){
        var $items = items || this.$container.find('.ajax-portfolio-item'),
            _this = this;

        //$items.removeClass("animated").removeClass("slideInUp").css("-webkit-animation-delay", "0s");

        if(_this.options.type == "justified"){
            $items.each(function(index, value){
                var it = $(this);
                setTimeout(function(){
                        it.addClass('animated fadeIn');
                        it.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                            it.css({opacity: 1});
                            setTimeout(function(){
                                it.removeClass('animated fadeIn');
                            }, 150);
                        });
                        it.show();
                    }, 150 + 50 * index);
            });
        }

        /*setTimeout(function(){
            _this.options.initLoaded = true;
            $items.find('.bx-ajax-gallery').each(function(){
                if($(this).parent().hasClass('bx-viewport')) return true;
                $(this).bxSlider({auto: true, adaptiveHeight: true, mode: 'fade', controls: true, pager: false});
            });
        }, 200);*/
    };

    /**
     *
     */

    Gridifier.animateFilter = function(items){
        var $items = items || this.$container.find('.ajax-portfolio-item'),
            _this = this;

        if(_this.options.type == "justified"){
            $items.each(function(index, value){
                var it = $(this);

                setTimeout(function(){
                        it.addClass('animated fadeIn');
                        it.show();
                        it.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                            it.css({opacity: 1});
                            it.removeClass("animated fadeIn");
                        })
                }, index * 50);
            });
        }

        this.$container.css("min-height", 0);
    };

    Gridifier.animateFilterOff = function(items){
        var $items = items || this.$container.find('.ajax-portfolio-item'),
            _this = this;

        this.$container.css("min-height", this.$container.height() + "px");

  //      $items.removeClass("animated").removeClass("fadeOutDown")
    //        .css("-webkit-animation-delay", "0s")
//            .css("-moz-animation-delay", "0s");

        $items.each(function(){
            //$(this).removeClass('animated');
            $(this).addClass('animated bounceOut');
            $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                //$(this).css({opacity: 0});
                //$(this).hide();
                $(this).removeClass("animated bounceOut");
            })
        })


    };

    /**
     * @TODO: Add blog loadmore
     */

    Gridifier.loadMore = function(){

        var _this = this,
            $items = this.$container.find('.ajax-portfolio-item'),
            itemsLength = $items.length,
            action;

        switch( this.options.contentType ){

            case "portfolio":
                action = "load_portfolio_items";
                break;

            case "blog":
                action = "load_blog_items";
                break;

            case "gallery":
                action = "load_gallery_items";
                break;
        }

            this.says(action,
                    {
                        type: "multiple",
                        number: this.options.cols * this.options.loadmoreRows,
                        offset: itemsLength
                    },
                    "initGrid"
                );
        this.ajaxState = "waiting";
        };

    /**
     *
     * @param items
     * @param $content
     * @returns {}
     */

    Gridifier.getFormPortfolioItems = function(items, $content){

        var _this = this;

        for( var i in items ){
            var $item = $( items[i].html );

            if(this.options.type == "justified"){
                $item.addClass("justified " + this.colClasses[ this.options.cols ] );
            }

            else if(this.options.type == "masonry"){
                $item.addClass("masonry")
                    .addClass( "box-" + items[i].boxSize )
                    .data("boxSize", items[i].boxSize)
                    .data("widthX", Math.floor( Number( items[i].boxSize ) / 10 ) )
                    .data("heightX", Number(items[i].boxSize) % 10 );
            }

            var categories = items[i].categories;

            for( var j in categories ){
                var cat = categories[j].name;
                $item.addClass(cat.toLowerCase().split(' ').join('-'));
            }

            $item.data("categories", categories);

            if( this.options.showType == "lightbox" && items[i].featured){
                $item.find('.portfolio-image').wrap('<a href="' + items[i].featured + '" data-lightbox="portfolio"></a>');
            }
            $content.append( $item );
        }
        return $content;
    };

    /**
     *
     * @param items
     * @param $content
     * @returns {*}
     */

    Gridifier.getFormBlogItems = function(items, $content){

        for( var i in items ){
            var $item = $( this.itemTemplate );

            if(this.options.type == "justified"){
                $item.addClass("justified " + this.colClasses[ this.options.cols ] )
                    .attr("data-post-id", items[i].id);

            }
            else if(this.options.type == "masonry"){
                $item.addClass("masonry")
                    .addClass( "box-" + items[i].boxSize )
                    .data("boxSize", items[i].boxSize)
                    .data("widthX", Math.floor( Number( items[i].boxSize ) / 10 ) )
                    .data("heightX", Number(items[i].boxSize) % 10 )
                    .attr("data-post-id", items[i].id);
            }

            var categories = items[i].categories;

            for( var j in categories ){
                var cat = categories[j].name;
                $item.addClass(cat.toLowerCase().split(' ').join('-'));
            }

            $item.append(items[i].html);

            if(items[i].post_format == "video"){
                $item.fitVids();
            }

            $item.data("categories", categories);
            $content.append( $item );
        }

        return $content;
    };

    /**
     *
     * @param items
     * @param $content
     * @returns {}
     */

    Gridifier.getFormGalleryItems = function(items, $content){

        var _this = this;

        for( var i in items ){
            var $item = $( items[i].html );

            if(this.options.type == "justified"){
                $item.addClass("justified " + this.colClasses[ this.options.cols ] );
            }

            else if(this.options.type == "masonry"){
                $item.addClass("masonry")
                    .addClass( "box-" + items[i].boxSize )
                    .data("boxSize", items[i].boxSize)
                    .data("widthX", Math.floor( Number( items[i].boxSize ) / 10 ) )
                    .data("heightX", Number(items[i].boxSize) % 10 );
            }
            $content.append( $item );
        }
        return $content;
    };

    /**
     *
     * @param items
     * @returns {*}
     */

    Gridifier.getFormItems = function(items){

        var _this = this,
            $content = $('<div class="gridifier-items clearfix" />');

        switch(this.options.contentType){
            case "portfolio":
                $content = this.getFormPortfolioItems(items, $content);
                break;

            case "blog":
                $content = this.getFormBlogItems(items, $content);
                break;

            case "gallery":
                $content = this.getFormGalleryItems(items, $content);
                break;
        }

        this.bindGridEvents( $content );
        return $content.children();
    };

    /**
     *
     */

    Gridifier.initGrid = function(data){

        var _this = this,
            items = data.items;

        this.ajaxState = "idle";
        if(!this.options.infScroll){
            this.$container.parent().find('.loadmore').remove();
        }

        var $items = this.getFormItems( items );

        this.$container.append( $items );


        if(this.options.filter == "1"){
            this.$container.parent().find('.portfolio-filter').remove();
            this.$container.before( this.getFormFilter() );
        }

        if(!data.loadmore){
            this.loadMoreState = false;
            $("#infscroll").remove();
        }

        if( data.loadmore && !this.options.infScroll){

            var parent = this.$container.parent();
            this.$container.after( $( '<div class="loadmore"><a href="#">' + "Load more " + '</a></div>' ) );

            parent.find('.loadmore').click( function(event) {
                event.preventDefault();
                _this.hideActiveContent();
                _this.loadMore();
            });
        }

        if(this.options.type == "justified"){

            $items.each(function(){
            var $thisItem = $(this);

                var $preloader = $thisItem.find(".grid-preloader");
                if(!$("html").hasClass("ie")){
					if($preloader.length){
						$("<img/>")
							.load(function() {
								$preloader.addClass("animated fadeOut");
								$preloader.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
									$preloader.remove();
								});
								$(this).remove();

								$thisItem.addClass("animated fadeIn");
								$thisItem.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
									$thisItem.css({opacity: 1});
									$thisItem.removeClass("animated fadeIn");
								});
							})
							.error(function() {})
							.attr("src", $preloader.attr("data-wait-for"))
						;
						$thisItem.show();
					}
				}
				else{
					$preloader.remove();
					$thisItem.addClass("animated fadeIn");
					$thisItem.css({opacity: 1});
				}
            });

            this.animate($items);

            $('body #loading-content').remove(); // remove it now, bc it's not masonry
        }

        $(window).trigger("resize");
        $(window).trigger("scroll");
    };

    Gridifier.mobileCheck = function(){
        var ua = navigator.userAgent.toLowerCase();

        this.android = ua.indexOf("android") > -1;
        this.iPhone = navigator.userAgent.match(/iPhone/i);
        this.iPad = navigator.userAgent.match(/iPad/i);
        this.mobileDevice = this.android || this.iPhone || this.iPad || $(window).width() <= 1024;
    };

    /**
     *
     * @param $container
     */

    Gridifier.init = function($container){

        this.$container = $container;

        this.options = {
            type: $container.attr("data-type"),
            contentType: $container.attr("data-content-type"),
            itemTemplate: $container.attr("data-item-template"),
            cols: $container.attr("data-cols"),
            filter: $container.attr("data-filter"),
            autoload: $container.attr("data-autoload"),
            postId: $container.attr("data-id") || "",
            initRows: $container.attr("data-init-rows"),
            category: $container.attr("data-category") || "",
            initLoaded: false,
            loadmoreRows: $container.attr("data-loadmore-rows"),
            showType: $container.attr("data-show-type"),
            infScroll: $container.attr("data-infscroll"),
            masonryAnimate: false
        };

        this.mobileCheck();

        this.ajaxState = "idle";
        this.loadMoreState = true;

        this.$container.addClass("columns" + this.options.cols);

        if(this.options.contentType == "portfolio"){
            this.itemTemplate = $("#template-portfolio-item" ).html();
        }

        if(this.options.contentType == "blog"){
            this.itemTemplate = $("#template-blog-item" ).html();
        }

        $container.data("gridifier", this);

        this.loadContent();

        var _this = this,
            $window = $(window);

        /**
         * Responsive for Masonry
         */

        if(this.options.type == "masonry"){
            $(window).on("debouncedresize", function(){
                 var bodyheight = $(window).height();
                 $("#main-content, .left-content").css('height', bodyheight-75+'px');
                _this.mobileCheck();

                if($window.width() <= 480){
                    _this.base = _this.$container.width();
                    _this.options.cols = 1;
                    _this.mobile = true;
                    _this.$container.addClass("mobile");
                    _this.$container.removeClass("desktop");
                    _this.$container.removeClass("tablet");
                }
                else if($window.width() > 480 && $window.width() <= 1024 && _this.$container.attr("data-cols") == 12){
                    _this.options.cols = 6;
                    _this.base = _this.$container.width() / _this.options.cols;
                    _this.mobile = false;
                    _this.tablet = true;
                    _this.$container.addClass("tablet");
                    _this.$container.removeClass("desktop");
                    _this.$container.removeClass("mobile");
                }
                else{
                    if(_this.mobile || _this.tablet){
                        _this.options.cols = _this.$container.attr("data-cols");
                    }
                    _this.base = _this.$container.width() / _this.options.cols;
                    _this.mobile = false;
                    _this.tablet = false;
                    _this.$container.addClass("desktop");
                    _this.$container.removeClass("mobile");
                    _this.$container.removeClass("tablet");
                }
                _this.smartMasonryLayout();
            });
        }

        /**
         * Classes for the grid
         */

        if(this.options.type == "justified"){
            $(window).on("debouncedresize", function(){
                 var bodyheight = $(window).height();
                $("#main-content, .left-content").css('height', bodyheight-75+'px');
                _this.mobileCheck();

                if($window.width() <= 480){
                    _this.$container.addClass("mobile");
                    _this.$container.removeClass("desktop");
                    _this.$container.removeClass("tablet");
                }
                else if($window.width() > 480 && $window.width() <= 1024){
                    _this.$container.addClass("tablet");
                    _this.$container.removeClass("desktop");
                    _this.$container.removeClass("mobile");
                }
                else{
                    _this.$container.addClass("desktop");
                    _this.$container.removeClass("mobile");
                    _this.$container.removeClass("tablet");
                }

                /**
                 * Fit videos
                 */

                _this.$container.find(".ajax-portfolio-item").each(function(){
                    var $video = $(this).find('.grid-video'),
                        $thisItem = $(this);

                    if($video.length){
                        $video.height($thisItem.height());
                        $video.width($thisItem.width());
                        var video = $video.find("video").get()[0];

                        if($thisItem.width() == $thisItem.height()){
                            video.width = Math.ceil( $thisItem.width() * 16 / 9 );
                            video.setAttribute("style",
                                "margin-left: -" + Math.ceil(( (video.width - $thisItem.width() ) / 2) ).toString() + "px");
                        }
                        else if($thisItem.width() > $thisItem.height()){
                            video.width = Math.ceil( $thisItem.width() * 16 / 9 );
                            video.setAttribute("style",
                                "margin-left: -" + Math.ceil(( (video.width - $thisItem.width() ) / 2) ).toString() + "px");
                        }

                        else if($thisItem.width() < $thisItem.height()){
                            video.width = $thisItem.height() * 16 / 9 ;
                            video.setAttribute("style",
                                "margin-left: -" + Math.ceil(( (video.width - $thisItem.width() ) / 2) ).toString() + "px");
                        }
                    }
                });


            });
        }

        /**
         * Infinite scroll
         */

        if(this.options.infScroll){
            var $infMarker = $( '<div id="infscroll">Loading...</div>' );
            $container.after( $infMarker );

            $window.on("scroll", function(){
                if(!_this.loadMoreState) return;
                if(_this.ajaxState == "idle" && $infMarker.offset().top < ( $window.scrollTop() + $window.height() ) ){
                    _this.ajaxState = "waiting"; // just in case :)
                    $('body').append('<div id="loading-content">Loading...</div>');
                    _this.loadMore();
                }
            });
        }
    };

    /**
     * jQuery bridge
     */

    $.fn.gridifier = function(){

        var gridifierItems = $('.gridifier');

        gridifierItems.each(function(index, value){
            var gridifier = Gridifier.extend();
            gridifier.init($(this));
        });
    };

    /**
     * Fire it!
     */

    $(window).load(function(){
        setTimeout(function(){
            $("wall").gridifier();
        }, 100);
    });
})(jQuery);
