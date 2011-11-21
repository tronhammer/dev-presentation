$(function(){
	var componentName = "spin";
	var type = "jQuery";
	var localPath = $.config.paths["library"]+type+"."+componentName;
	$.include(localPath+"/jquery.spin.js")
});