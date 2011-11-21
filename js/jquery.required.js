$(function(){
	
	// Third Party Plugin Initializer
	$.each($.config.thirdPartyPlugins, function(name,opts){
		$.include($.config.paths['library'] + (opts.type?opts.type+".":"") + name + "/load.js", function(){
			if (callback = opts.callback && typeof callback == "function" && delete opts.callback)
				opts.scope&&callback.call(opts.scope,opts)||callback(opts);
		});
	});
	
	// XXX - should these be in the initializer?
	// $.include($.config.paths['javascript'] + "/jquery.spin.js");
	// $.include($.config.paths['javascript'] + "/jquery.later.js");
	
	
	$.include($.config.paths['pagejs'] + "/load.js");
});