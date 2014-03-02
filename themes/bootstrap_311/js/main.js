
$(function() {
    $('#collapsed_leftbutton').on('click', function () {
    	if($('#sidebar').css("left") == "-" + $('#sidebar').width() + "px") {
	        $('#sidebar').animate({"left": "0px"});
	    } 
    });
    $('#sidebar').on('mouseleave', function(){
    	if($('#sidebar').css("left") == "0px") {
	        $('#sidebar').animate({"left": "-" + $('#sidebar').width() + "px"},
	        	{complete: function() { $(this).removeAttr('style') }}
	        );
	    } 
    });
     
});

