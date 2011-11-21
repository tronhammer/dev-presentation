$(function(){
	var componentName = "later";
	var type = "jQuery";
	var localPath = $.config.paths["library"]+type+"."+componentName;
	$.include(localPath+"/jquery.later.js")
});