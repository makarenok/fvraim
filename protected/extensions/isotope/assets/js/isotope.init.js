$(function(){

  var $container = $('#wall .items');
  var $container_group1 = $('#testimonials-groups-1 .itemsgroups');
  var $container_group2 = $('#testimonials-groups-2 .itemsgroups');
  var $container_group3 = $('#testimonials-groups-3 .itemsgroups');

  var bodyheight, topheight;

  function bdheight(){
     bodyheight = $(window).height();
     topheight = $('.navbar').height() + $('#options').height() + parseInt($('#wall').css('margin-top'));
     $("#main-content, #left-content, #testimonials-groups-1, #testimonials-groups-2, #testimonials-groups-3").css('height', bodyheight-topheight+'px');

  }   
  $(window).load(function(){   
    bdheight();
  }

  $("#main-content, #left-content, #testimonials-groups-1, #testimonials-groups-2, #testimonials-groups-3").css('height', bodyheight-topheight+'px');
  $(window).bind("debouncedresize", function(){
         bdheight();
         reloy();
    });
    
    $('#testimonials-groups').on('slid.bs.carousel', function (e) {
      $('#testimonials-groups .item.active .testimonials > div.row').isotope({
         'layoutMode': 'masonry',
        'columnWidth':'.grid-sizer',
        'itemSelector': '.item_group'
      }); 
    })
    
    
      // add randomish size classes
    /* $container.find('.item').each(function(){
        var $this = $(this),
            number = parseInt( $this.find('.number').text(), 10 );
        if ( number % 7 % 2 === 1 ) {
          $this.addClass('width2');
        }
        if ( number % 3 === 0 ) {
          $this.addClass('height2');
        }
      });
    
    $container.isotope({
      layoutMode:'perfectMasonry',
      perfectMasonry:{columnWidth:120,rowHeight:240,liquid:true,minCols:1,maxCols:10,},
      itemSelector : '.itemsevents',
       masonry : {
        columnWidth : 120
      },
      masonryHorizontal : {
        rowHeight: 120
      },
      cellsByRow : {
        columnWidth : 240,
        rowHeight : 240
      },
      cellsByColumn : {
        columnWidth : 240,
        rowHeight : 240
      },

    });
    */

    
      var $optionSets = $('#options .option-set'),
          $optionLinks = $optionSets.find('a');

      if(firstinitselect()==false){

          changegrid($('#newgrid'));
      }

      function firstinitselect(){
        var isselected = false;
        $('#options .option-set a').each(function (index) {
            if ($(this).hasClass('selected') ) {
              isselected = true;
            } 
        });
        return isselected;
      }
       

      $optionLinks.click(function(){
        var $this = $(this);
        // don't proceed if already selected
        if ( $this.hasClass('selected') ) {
          return false;
        }
       changegrid($this);
       return false;

      });

      function changegrid(value){
        var $this = value;
        var $optionSet = $this.parents('.option-set');
        $optionSet.find('.selected').blur().removeClass('selected');
        $this.focus().addClass('selected');
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        value = value === 'false' ? false : value;
        options[ key ] = value;
        $container.isotope(options);
        return false;
      }
      


 /*$container.infinitescroll({
	navSelector : '.pager', // selector for the paged navigation
	nextSelector : '.yiiPager .next a', // selector for the NEXT link (to page 2)
	itemSelector : '.itemsevents', // selector for all items you'll retrieve
	loading: {
	finishedMsg: 'No more pages to load.',
	img: 'http://i.imgur.com/qkKy8.gif'
	}
	},
	// call Isotope as a callback
	function( newElements ) {
	$container.isotope( 'appended', $( newElements ) );
	}
	); */

    function reloy() {
        
        $container.isotope('bindResize');
        $container_group1.isotope('bindResize');
        $container_group2.isotope('bindResize');
        $container_group3.isotope('bindResize');
    }
  });


  
/*jQuery(function ($) {
    var $container = $('#container');
    $container.imagesLoaded(function () {
        $container.isotope({

            itemSelector: '.portfolio',
            masonry: {
                columnWidth: $container.width() / 12
            }

        });
    });
    $(window).on('smartresize', function () {
        $container.isotope({

            masonry: {
                columnWidth: $container.width() / 12
            }

        });
    });
    window.addEventListener("orientationchange", function () {
        $container.isotope({

            masonry: {
                columnWidth: $container.width() / 12
            }

        });
    }, false);
    var $optionSets = $('#options .option-set'), $optionLinks = $optionSets.find('a');
    $optionLinks.click(function () {
        var $this = $(this);
        // don't proceed if already selected
        if ($this.hasClass('selected')) {
            return false;
        }
        var $optionSet = $this.parents('.option-set');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');
        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[ key ] = value;
        $container.isotope(options);
        return false;
    });
    function reloy() {
        var $container = $('#container');
        $container.isotope('reLayout');
    }


});*/



/*jQuery(function ($) {
    "use strict";
    function reloyout() {
        var $container = $('#container');
        $container.isotope({
            masonry: {
                columnWidth: $container.width() / 12
            }
        });
        $container.isotope('reLayout');

    }

    var $container = $('#container');
    $container.isotope({
        itemSelector: '.portfolio',
        masonry: {
            columnWidth: $container.width() / 12
        }
    });
    $(window).on('smartresize', function () {
        reloyout();
    });
    window.addEventListener("orientationchange", function () {
        $container.isotope({
            masonry: {
                columnWidth: $container.width() / 12
            }
        });
    }, false);
    var $optionSets = $('#options .option-set'), $optionLinks = $optionSets.find('a');
    $optionLinks.click(function () {
        var $this = $(this);
        if ($this.hasClass('selected')) {
            return false;
        }
        var $optionSet = $this.parents('.option-set');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        value = value === 'false' ? false : value;
        options[ key ] = value;
        $container.isotope(options);
        return false;
    });
    $('.load_more').click(function () {
        var offset_post = $('#port-container .j-port-l').length;
        $.ajax({

            url: $(this).attr('href'),
            data: 'offset=' + offset_post,
            method: 'GET',
            cache: false

        }).done(function (more) {
                //console.log(more);
                if ($(more).length === 0) {
                    $('.load_more').hide();
                }
                else {
                    var $newEls = $(more);
                    $container.isotope('insert', $newEls, reloyout);
                    $('.portfolio_pop').magnificPopup({

                        type: 'ajax'

                    });
                }
            });
        return false;
    });
});*/

