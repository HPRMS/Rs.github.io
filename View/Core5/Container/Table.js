/*
用作模板
*/
sjs.using("Core5.Container")
.using("Core5.Layout.Table")
.define(function(container,tableLayout){
	return {
		$extend:container

		,$mixin:[tableLayout]
	};
});