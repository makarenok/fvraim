
$(function() {

	 $('nav #collapsing_topmenu a').each(function() {
		if ($(this).attr('href')  ===  window.location.pathname) {
			$('nav #collapsing_topmenu').collapse();
		}
  	});

    $('#collapsed_leftbutton').click(function () {
    	$("#sidebar").toggle();
    	$("#main-content").toggleClass('active');
    	if($('nav #collapsing_topmenu').hasClass('in')){
    		$("#topbarplace").empty();
    		$('nav #collapsing_topmenu').removeClass('in');
    		$("#sidebar").show();
    		$("#main-content").removeClass('active');
    	}
    	
    });

  	$('nav #collapsing_topmenu').on('shown.bs.collapse', function () {
  		console.log('col');
  		var _elementClone = $(this).clone();
  		$("#sidebar").hide();
  		$("#topbarplace").append(_elementClone);
  		$('#topbarplace #collapsing_topmenu').attr('id', 'collapsing_topmenu_clone')
    	$("#main-content").addClass('active');
	})
	$('nav #collapsing_topmenu').on('hide.bs.collapse', function () {
		console.log('ddd');
  		$("#topbarplace").empty();
	})

});

