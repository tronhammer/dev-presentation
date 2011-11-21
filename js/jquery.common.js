$(function(){
	$.extend($, {
		state: "uninitialized",
		bindEvent: function fireEvent(name, action){
			$.debug("bind: "+name, action);
			$("#eventHub").bind(name, action);
			return $("#eventHub");
		},
		triggerEvent: function fireEvent(){
			var opts = $.extend([], arguments);
			var name = opts.shift();
			arguments.callee.name += name;
			$.debug("trigger: "+name, opts);
			$("#eventHub").trigger(name+"[init]", opts);
			$("#eventHub").trigger(name, opts);
			$("#eventHub").trigger(name+"[done]", opts);
			return $("#eventHub");
		},
		debug: function debug(toggle){
			return (toggle==1)&&(this.state=true)||(toggle==0)&&(this.state=false)||this.state&&(function(args){
				if (args.length){
					var callee = ('caller' in args.callee)?args.callee.caller.name:"unknown";
					var preface = "["+callee+"]: ";
					if (args.length == 1){
						console.log(preface + args[0]);
					} else if (args.length <= 2) {
						var name = args[0];
						if (name == "error")
							console.error(preface + args[1])&&(args.length <= 3)&&consol.log(args[2]);
						if (name == "warning")
							console.warn(preface + args[1])&&(args.length <= 3)&&consol.log(args[2]);
						else
							console.log(preface + args[0])&&(args.length <= 2)&&consol.log(args[1]);
					}
				}
				return true;
			})(arguments)||false;
		},
	});
	
	$.bindEvent("include:files->configure", function(e, files){
		// Include all required js files.
		$.config.includeFiles = files
		$.each($.config.includeFiles, function(name, path){
			$.include(path, function(){ 
				$.triggerEvent("include:files->loadSuccess", name); 
			});
		});
	});
	
	$.bindEvent("include:files->loadSuccess", function(e, name){
		if (!('_items' in $.config.includeFiles)){
			var total = 0;
			$.each($.config.includeFiles, function(k){
				total++;
			});
			$.config.includeFiles._items = total;
		}
		
		if (name in $.config.includeFiles){
			delete $.config.includeFiles[name] && $.config.includeFiles._items--;
		}
		
		if (!$.config.includeFiles._items){
			delete $.config.includeFiles;
			$.triggerEvent("include:done");
		}
	});
});