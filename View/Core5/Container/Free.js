/*
用作模板
*/
sjs.using("Core5.Container")
.using("Core5.Layout.Free")
.define(function(container,freeLayout){
	return {
		$extend:container

		,$mixin:[freeLayout]
	};
});