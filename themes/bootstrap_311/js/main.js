
$(function() {
	

    $('#collapsed_leftbutton').on('click', function () {
    	if($('#sidebar').css("left") == "-" + $('#sidebar').width() + "px") {
	        $('#sidebar').animate({"left": "0px"},
	        	{complete: function() { 
	        		$('#sidebar').niceScroll({styler:"fb",touchbehavior:true,cursoropacitymax : 0, cursorwidth: '3', cursorborderradius: '10px', background: '#D3D3D3', spacebarenabled:false, cursorborder: ''});
	        	}}
	        	);
	        
	        	
	    } 
    });
    $('#sidebar').mouseleave(function(){
    	$(this).getNiceScroll().hide();
    	if($('#sidebar').css("left") == "0px") {
	        $('#sidebar').animate({"left": "-" + $('#sidebar').width() + "px"},
	        	{complete: function() { 
	        		$(this).removeAttr('style');
	        	}}
	        );
	    } 
    });

});

