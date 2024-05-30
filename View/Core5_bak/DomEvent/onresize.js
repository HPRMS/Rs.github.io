sjs.using("jQuery")
.using("Core5.DomEvent.GetHelper")
//在load过程中，而不是run过程中产生的run，一般用using，因为这样保证在主run计算时，所有依赖都已计算完毕
//不要在loading过程中再去run一个，因为这样不好控制
//出现的run队列，一般都是与上一个run没有关系的时候才出现
//define要与using对应，这样才会执行。当然如果是loadJs引入的，会有警告讯息
//不用loadJs和run的组合，是因为不好打包合并，因为只能合并一个run的js，所以优先使用using(在最后，无参数)和define的组合，利于打包
//不用loadJs的run的组合，是要保证这些代码在主代码之前要执行（打包问题已解决）
//出现多个sjs.run，一般两个run之间是没有任何关系的一前一后，而不是一个依赖另一个，这种情况用using
.define(function($, getHelper) {
    var oldWidth = $(window).width();
    var oldHeight = $(window).height();;
    function onresize(e){
        var height = $(window).height();
        var width = $(window).width();
        if(height != oldHeight || width != oldWidth){
            oldHeight = height;
            oldWidth = width;
            //console.log("resize can execute");
            var src = $("[s-resize]");
            $.each(src,function(index,item){
                var sjsObj = getHelper.getSjsObj($(item));
                sjsObj && sjsObj.onresize && sjsObj.onresize();
            });
        }
        //console.log("resize event");
    }
    $(window).resize(onresize);
});