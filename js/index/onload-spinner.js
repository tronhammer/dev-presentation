$(function($){
	$.bindEvent("spinner:start", function(e){
		var opts = {
		  lines: 12, // The number of lines to draw
		  length: 8, // The length of each line
		  width: 8, // The line thickness
		  radius: 40, // The radius of the inner circle
		  color: '#FFF', // #rgb or #rrggbb
		  speed: 1, // Rounds per second
		  trail: 77, // Afterglow percentage
		  shadow: true // Whether to render a shadow
		};

		if (!$(".spinner").length){
			var $spinner = $((new Spinner(opts).spin()).el).css({
				"position": "absolute",
				"left": "50%",
				"top": "50%",
			}).wrap('<div class="spinner">\
				<div class="message" style="display:none;">\
			</div>').parent().hide();
			
			$("#main").append(
				$spinner.fadeIn(700)
			);
		}
	});	
	
	$.bindEvent("spinner:stop", function(e){
		var $spinner = $(".spinner");
		$spinner.addClass("stopping");
		$.triggerEvent("spinner:stop->conversing");
	});
	
	$.bindEvent("spinner:stop->conversing[done]", function(e){
		var $spinner = $(".spinner");
		if ($spinner.is(".stopping")){
			$spinner.find(".message").fadeOut(700);
			$spinner.delay(1000).fadeOut();
		}
	});
	
	$.bindEvent("spinner:start->conversing", function(e){
		var $spinner = $(".spinner");
		$spinner.addClass("animating").animate({
			"width": 200,
			"height": 200
		}, 700, function(){
			$spinner.removeClass("animating").addClass("conversing");
		});
	});
	$.bindEvent("spinner:stop->conversing", function(e){
		var $spinner = $(".spinner");
		$spinner.addClass("conversing").animate({
			"width": 150,
			"height": 150
		});
	});
	
	$.bindEvent("spinner:message", function(e, message){
		var $spinner = $(".spinner");
		var $message = $spinner.find(".message").fadeOut(700);
		
		if (!$spinner.is(".conversing")){
			$.debug("RETRYING "+(b=(new Date()))&&b.getSeconds()+" "+b.getMilliseconds());
			if (!$spinner.is(".animating"))
				$.triggerEvent("spinner:start->conversing").delay(700);
			
			$.debug("RETRYING "+(b=(new Date()))&&b.getSeconds()+" "+b.getMilliseconds());
			return $.later(800, null, $.triggerEvent, ["spinner:message", message]);
		}
		
		if (typeof message == "string")
			$message.text(message).fadeIn(1000);
		
	});
	
	$.bindEvent("state:initializing", function(e){
		$.triggerEvent("spinner:message", "Initializing content...");
	});
	
});