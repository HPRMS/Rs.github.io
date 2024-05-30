sjs.using("jQuery")
.using("Core5.DomEvent.GetHelper")
.using("Core5.DomEvent.UIManager")
.define(function($,getHelper,uiManager){
    var orgStartX;
    var orgStartY;
    var startX;
    var startY;
    var totalMoveX;
    var totalMoveY;
    var sjsObj;         //onDragStart,onDragMove,onDragEnd
    var dragSrc;        //記錄事件地點
    var isMove;

    function mousedown(e){
        if(sjsObj){         //可能在resize(類似阻止冒泡事件)
            return;
        }
        dragSrc = $(this);
        sjsObj = uiManager.get(dragSrc.attr("s-drag"));     //指定回應的對象
        if(!sjsObj){
            dragSrc = null;
            return;
        }
        isMove = false;
        orgStartX = e.pageX;
        orgStartY = e.pageY;
        startX = e.clientX;
        startY = e.clientY;
        totalMoveX = 0;
        totalMoveY = 0;
        document.unselectable  = "on";          
        document.onselectstart = function(){
           return false;
        }
        //return false;
        //console.log("mouse down:" + evtType);
    }
    
    function mousemove(e){
        if(e.which === 1 && sjsObj){     //需要存下來,因為mousemove事件不會再標記在html dom中
            var moveX = Math.round(e.clientX - startX);
            var moveY = Math.round(e.clientY - startY);
            if(moveX || moveY){
                if(!isMove){
                    //console.log("release start:" + evtType);
                    sjsObj._onDomEvent && sjsObj._onDomEvent("dragStart",dragSrc,e,[startX,startY,dragSrc]);
                    isMove = true;     //start事件請自己記錄起來
                }
                totalMoveX += moveX;
                totalMoveY += moveY;
                //console.log("move:" + totalMoveX + "," + totalMoveY);
                sjsObj._onDomEvent && sjsObj._onDomEvent("dragMove",dragSrc,e,[moveX,moveY,totalMoveX,totalMoveY,startX,startY,orgStartX,orgStartY]);
                startX = e.clientX;
                startY = e.clientY;
                if(window.getSelection){//w3c
                   window.getSelection().removeAllRanges();
                }
                else  if(document.selection){
                   document.selection.empty();//IE
                }            
            }
        }
        else{
            sjsObj = null;
            dragSrc = null;
            isMove = false;
        }
        //return false;     //鼠標不可選取
    }

    function mouseup(e){
        if(sjsObj && isMove){
            //console.log("mouse up release sjsObj");
            //很多時候因為有刷新UI,造成sjsObj已經被dispose掉了
            //所以一般在回應drop事件時處理就好了
            //當然如果沒有移到目標,也要通過此事件回應
            sjsObj._onDomEvent && sjsObj._onDomEvent("dragEnd",dragSrc,e,[totalMoveX,totalMoveY,orgStartX,orgStartY]);
            document.unselectable  = "off";
            document.onselectstart = null;    
        }
        else if(sjsObj){
            //YT.Window的toolbar上有一個close button，單擊后就會讓sjsObj又存在，但是又觸發不了document.unselectable，所以后續會選不上
            document.unselectable  = "off";
            document.onselectstart = null;    
        }
        sjsObj = null;
        dragSrc = null;
        isMove = false;
        //return false;
    }
        
    //與drag不一樣,因為這個事件是掛在某個html dom之上
    function drop(e){
        if(sjsObj && isMove){     //請自己識別drop的對象是否符合標準
            //console.log("[drop]raise drop release event");
            var dropSrc = $(this);
            var dropEvtObj = getHelper.getSjsObj(dropSrc);
            //用_onDomEvent,事件可以冒泡回應
            dropEvtObj && dropEvtObj._onDomEvent && dropEvtObj._onDomEvent("drop",dropSrc,e,[sjsObj,dragSrc]);
        }
    }


    function mouseover(e,src,className){
        //var src = $(this);
        if(src.attr("s-overself")){
            src.addClass(src.attr(className));
        }
        else if (isMouseLeaveOrEnter(e, src[0])) {
            src.addClass(src.attr(className));
        }
    }

    function mouseout(e,src,className){
        //var src = $(this);
        if(src.attr("s-overself")){
            src.removeClass(src.attr(className));
        }
        else if (isMouseLeaveOrEnter(e, src[0])) {
            src.removeClass(src.attr(className));
        }
    }

    function ondropover(e){
        sjsObj && isMove && mouseover(e,$(this),"s-dropOverClass");
    }

    function ondropout(e){
        sjsObj && isMove && mouseout(e,$(this),"s-dropOverClass");
    }

    function isMouseLeaveOrEnter(e, handler) {
        var reltg = e.relatedTarget || (e.type == 'mouseout' ? e.toElement : e.fromElement);
        while (reltg && reltg != handler)
            reltg = reltg.parentNode;
        return (reltg != handler);
    }

    function ondropover2(e){
        sjsObj && isMove && mouseover2(e,$(this),"dropover");
    }

    function ondropout2(e){
        sjsObj && isMove && mouseout2(e,$(this),"dropout");
    }

    function mouseover2(e,src,type){
        //var src = $(this);
        if (isMouseLeaveOrEnter(e, src[0])) {
            var sjsObj = getHelper.getSjsObj(src);
            sjsObj && sjsObj._onDomEvent && sjsObj._onDomEvent(type,src,e);            
        }
    }

    function mouseout2(e,src,type){
        //var src = $(this);
        if (isMouseLeaveOrEnter(e, src[0])) {
            var sjsObj = getHelper.getSjsObj(src);
            sjsObj && sjsObj._onDomEvent && sjsObj._onDomEvent(type,src,e,$(e.relatedTarget || e.toElement));              
        }
    }

    //Dom Event擴展
    $(document).delegate("[s-drag]", "mousedown", mousedown)
        .bind("mousemove",mousemove)        //觸發兩個事件
        .delegate("[s-drop]", "mouseup", drop)
        .delegate("[s-dropOverClass]", "mouseover", ondropover)
        .delegate("[s-dropOverClass]","mouseout",ondropout)
        .delegate("[s-dropover]", "mouseover", ondropover2)
        .delegate("[s-dropout]","mouseout",ondropout2)
        .bind("mouseup",mouseup);
});