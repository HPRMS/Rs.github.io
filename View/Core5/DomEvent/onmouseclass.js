//用到s-overClass s-downClass的地方引入
sjs.using("jQuery")
.define(function($) {
    function mouseover(e){
        var src = $(this);
        if(src.attr("s-overself")){
            src.addClass(src.attr("s-overClass"));
        }
        else if (isMouseLeaveOrEnter(e, src[0])) {
            src.addClass(src.attr("s-overClass"));
        }
    }

    function mouseout(e){
        var src = $(this);
        if(src.attr("s-overself")){
            src.removeClass(src.attr("s-overClass"));
        }
        else if (isMouseLeaveOrEnter(e, src[0])) {
            src.removeClass(src.attr("s-overClass"));
        }
    }

    function mousedown(e){
        $(this).addClass($(this).attr("s-downClass"));
    }

    function mouseup(e){
        $(this).removeClass($(this).attr("s-downClass"));
    }

    function isMouseLeaveOrEnter(e, handler) {
        var reltg = e.relatedTarget || (e.type == 'mouseout' ? e.toElement : e.fromElement);
        while (reltg && reltg != handler)
            reltg = reltg.parentNode;
        return (reltg != handler);
    }
    
    $(document).delegate("[s-overClass]", "mouseover", mouseover)
        .delegate("[s-overClass]","mouseout",mouseout)
        .delegate("[s-downClass]","mousedown",mousedown)
        .delegate("[s-downClass]","mouseup",mouseup);

});