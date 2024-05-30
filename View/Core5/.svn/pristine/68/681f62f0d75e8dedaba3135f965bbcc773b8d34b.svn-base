//有s-overClass，一定會有s-objId，從而可以切入到sjs中來作業，一定要有onmouseover回應
sjs.using("jQuery")
.using("Core5.DomEvent.GetHelper")
.define(function($,getHelper) {
    function onmouseover(e){
        var src = $(this);
        if (isMouseLeaveOrEnter(e, src[0])) {
            var sjsObj = getHelper.getSjsObj(src);
            sjsObj && sjsObj._onDomEvent && sjsObj._onDomEvent("mouseover",src,e);            
        }
    }

    function onmouseout(e){
        var src = $(this);
        if (isMouseLeaveOrEnter(e, src[0])) {
            var sjsObj = getHelper.getSjsObj(src);
            sjsObj && sjsObj._onDomEvent && sjsObj._onDomEvent("mouseout",src,e,$(e.relatedTarget || e.toElement));              
        }
    }

    function isMouseLeaveOrEnter(e, handler) {
        var reltg = e.relatedTarget || (e.type == 'mouseout' ? e.toElement : e.fromElement);
        while (reltg && reltg != handler)
            reltg = reltg.parentNode;
        return (reltg != handler);
    }
    /*
    function onmousemove(e){
        //console.log("onmousemove e.pageY:",e.pageY);
        if(e.which === 1){
            var src = $(this);
            var sjsObj = getHelper.getSjsObj(src);
            sjsObj && sjsObj._onDomEvent && sjsObj._onDomEvent("mousemove",src,e);

                if(window.getSelection){//w3c
                   window.getSelection().removeAllRanges();
                }
                else  if(document.selection){
                   document.selection.empty();//IE
                }            

        }
    }
    */
    
    $(document).delegate("[s-mouseover]", "mouseover", onmouseover)
        .delegate("[s-mouseout]","mouseout",onmouseout);
        //.delegate("[s-mousemove]","mousemove",onmousemove)
});