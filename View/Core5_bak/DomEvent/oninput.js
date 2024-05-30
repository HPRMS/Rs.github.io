//input,textarea,select的onchange事件,input中引入
sjs.using("jQuery")
.using("Core5.DomEvent.GetHelper")
.define(function($, getHelper) {

    function onchange(e){
        var src = $(this);//getHelper.getHasAttr($(e.target),"s-click");
        var sjsObj = getHelper.getSjsObj(src);
        //sjsObj && sjsObj.onchange && sjsObj.onchange(src,src.val());
        sjsObj && sjsObj._onDomEvent && sjsObj._onDomEvent("change",src,e,src.val());        
    }
    
    //暫時沒這些需求，如果有，再考慮以單獨的模塊引入

    function onfocus(e){
        var src = $(this);
        var sjsObj = getHelper.getSjsObj(src);
        sjsObj && sjsObj._onDomEvent && sjsObj._onDomEvent("focus",src,e,src.val());        
    }

    function onblur(e){
        var src = $(this);
        var sjsObj = getHelper.getSjsObj(src);
        sjsObj && sjsObj._onDomEvent && sjsObj._onDomEvent("blur",src,e,src.val());        
    }

    function onkeyup(e){
        var src = $(this);
        var sjsObj = getHelper.getSjsObj(src);
        sjsObj && sjsObj._onDomEvent && sjsObj._onDomEvent("keyup",src,e,src.val());        
    }

    function onkeydown(e){
        var src = $(this);
        var sjsObj = getHelper.getSjsObj(src);
        sjsObj && sjsObj._onDomEvent && sjsObj._onDomEvent("keydown",src,e,src.val());        
    }

    function onkeypress(e){
        var src = $(this);
        var sjsObj = getHelper.getSjsObj(src);
        sjsObj && sjsObj._onDomEvent && sjsObj._onDomEvent("keypress",src,e,src.val());        
    }    

    $(document)
        .delegate("[s-change]","change",onchange)
        .delegate("[s-focus]","focus",onfocus)
        .delegate("[s-blur]","blur",onblur)
        .delegate("[s-keyup]","keyup",onkeyup)
        .delegate("[s-keydown]","keydown",onkeydown)
        .delegate("[s-keypress]","keypress",onkeypress)
        ;

});