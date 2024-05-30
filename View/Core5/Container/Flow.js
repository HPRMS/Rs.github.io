/*
用作模板
*/
sjs.using("Core5.Container")
.using("Core5.Layout.Float")
.define(function(container,floatLayout){
	return {
		$extend:container

		,$mixin:[floatLayout]
	};
});