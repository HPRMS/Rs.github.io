//input,textarea,select的onchange事件,input中引入
sjs.using("jQuery")
.using("Core5.DomEvent.GetHelper")
.define(function($, getHelper) {

    function onchange(e){
        var src = $(this);//getHelper.getHasAttr($(e.target),"s-click");
        var sjsObj = getHelper.getSjsObj(src);
        sjsObj && sjsObj.onchange && sjsObj.onchange(src,src.val());
    }
 
    $(document)
        .delegate("[s-change]","change",onchange)
        .delegate("[s-focus]","focus",onchange)
        .delegate("[s-blur]","blur",onchange)
        .delegate("[s-keyup]","keyup",onchange)
        .delegate("[s-keydown]","keydown",onchange)
        .delegate("[s-keypress]","keypress",onchange)
        ;

});