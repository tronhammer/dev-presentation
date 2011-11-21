$(function(){
	$.triggerEvent("state:initializing"); // keep a state machine for the loader? why not...
	
	$.triggerEvent("include:files->configure", {
		spinner: $.config.paths['pagejs'] + "/onload-spinner.js",
		slideSquence: $.config.paths['pagejs'] + "/onload-slideSquence.js",
	});
	
	$.bindEvent("include:done", function(e){
		$.triggerEvent("spinner:start");
		
		$.triggerEvent("spinner:message", "Loading content...");
		$.triggerEvent("slideSquence:start");
		
		$.triggerEvent("spinner:message", "Done!");
		$.triggerEvent("spinner:stop");
	});
});