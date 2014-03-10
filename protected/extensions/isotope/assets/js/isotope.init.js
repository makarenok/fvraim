
$(function(){

  var $container = $('#wall .items');
  var $container_group1 = $('#testimonials-groups-1 .itemsgroups');
  var $container_group2 = $('#testimonials-groups-2 .itemsgroups');
  var $container_group3 = $('#testimonials-groups-3 .itemsgroups');

  var isotopeInstance = $container.data('isotope');
  var isotopeInstance1 = $container_group1.data('isotope');
  var isotopeInstance2 = $container_group2.data('isotope');
  var isotopeInstance3 = $container_group3.data('isotope');

  var bodyheight, topheight;

  function bdheight(){
     bodyheight = $(window).height();
     topheight = $('.navbar').height() + $('#options').height() + parseInt($('#wall').css('margin-top'));
     $("#main-content, #left-content, #testimonials-groups-1, #testimonials-groups-2, #testimonials-groups-3").css('height', bodyheight-topheight+'px');

  }   

  //  bdheight();
 

  $("#main-content, #left-content, #testimonials-groups-1, #testimonials-groups-2, #testimonials-groups-3").css('height', bodyheight-topheight+'px');
  $(window).on("debouncedresize", function(){
         bdheight();
         reloy();
    });
    
    $('#testimonials-groups').on('slid.bs.carousel', function (e) {
        
         isotopeInstance1.layout()
         isotopeInstance2.layout()
         isotopeInstance3.layout()

    })
    
    
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
      




    function reloy() {
        
        isotopeInstance.layout();
        isotopeInstance1.layout();
        isotopeInstance2.layout();
        isotopeInstance3.layout();
    }
  });


 