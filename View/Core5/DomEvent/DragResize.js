﻿sjs.using("jQuery")
//.using("Core5.DomEvent.UIManager")
.using("Core5.DomEvent.GetHelper")
.define(function($,getHelper,uiManager){
    //標籤內有dragMove=數字，表示拖動哪一層父element，0表示拖動自己本身
    var dragObject;
    var startX;
    var startY;
    var isResizeW;
    var isResizeH;
    var isReverseW;
    var isReverseH;
    
    var minWidth;
    var maxWidth;
    var minHeight;
    var maxHeight;
    
    var eventJsObj;
    var eventName;
    var okEventName;
    
    function mouseDown(e){
        ////debugger;
        if(sjs._isDrag)
            return;
        sjs._isDrag = true;
        
        var src = $(e.target);
        var parentLevel = parseInt(src.attr("s-dragResize"));           //目前只for這個UI做，即對父容器調整大小，以后可增加id,class等jq選擇器
        isResizeW  = src.attr("s-dragResizeNoW") != "1";
        isResizeH  = src.attr("s-dragResizeNoH") != "1";
        isReverseW  = src.attr("s-dragResizeReverseW") == "1";          //默認往下拉增加高度，這個設定相反，往上拉增高
        isReverseH  = src.attr("s-dragResizeReverseH") == "1";          //默認往下拉增加高度，這個設定相反，往上拉增高
        
        
        for(var i=0;i<parentLevel;i++){
            src = src.parent();
        }
        dragObject = src;
        
        //if(dragObject.attr("s-isDrag")){        //拖動和移動不要一起(自己注意吧，這里好像加這個沒用，也不想再研究下去了)
        //    return;
        //}
        //dragObject.attr("s-isDrag",1);
        
        minWidth = parseInt(dragObject.attr("s-minWidth") || "0");
        maxWidth = parseInt(dragObject.attr("s-maxWidth") || "0");
        minHeight = parseInt(dragObject.attr("s-minHeight") || "0");
        maxHeight = parseInt(dragObject.attr("s-maxHeight") || "0");
        
        //position:一定要是absolute，且只初始化一次

        eventJsObj = getHelper.getSjsObj(src);//getSjsObject(dragObject);
        eventName = dragObject.attr("s-dragResizeEvent") || "onDragResize";
        okEventName = dragObject.attr("s-dragResizeOKEvent") || "onDragResizeOK";
        startX = e.clientX;
        startY = e.clientY;
        //console.log("startX:" + e.clientX);
        
        //可用在固定的一些標籤上，如工具欄等
        //document.documentElement.style["-moz-user-select"] = "none";
        //document.documentElement.style["-webkit-user-select"] = "none";
        //document.documentElement.style["-kthml-user-select"] = "none";
        document.unselectable  = "on";          
        document.onselectstart = function(){
           return false;
        }
    }
    /*
    var moveId = null;
    var moveE = null;
    
    function mouseMove(e){
        if(moveId != null){
            window.clearTimeout(moveId);
        }
        moveE = e;
        moveId = window.setTimeout(_mouseMove,10);
    }
    
    function _mouseMove(){
        e = moveE;
        moveE = null;
    */
    function mouseMove(e){  
        //window.setTimeout(function(){
        //},1000);
        if(e.which === 1 && dragObject){
            var isResize = false;
            var stopDrag = isResize && eventJsObj && eventName && eventJsObj[eventName] && eventJsObj[eventName]();
            if(!stopDrag){
                if(isResizeW){
                    moveX = Math.round((e.clientX - startX) * (isReverseW?-1:1));
                    //console.log("moveX:" + moveX);
                    if(moveX){
                        var oldWidth = dragObject.width();
                        var newWidth = oldWidth + moveX;
                        if(maxWidth!==0 && newWidth > maxWidth){
                            newWidth = maxWidth;
                        }
                        if(newWidth < minWidth){
                            newWidth = minWidth;
                        }
                        if(newWidth != oldWidth){
                            //console.log("startX:" + startX+ ",clientX:" + e.clientX + ",moveX:" + moveX + ",oldWidth:" + oldWidth + ",newWidth:" + newWidth);
                            dragObject.width(newWidth);
                            if(isReverseW){
                                var pos = dragObject.position();
                                dragObject.css("left",(pos.left - moveX) + "px");
                            }
                            isResize = true;
                       }
                       startX = e.clientX;
                    }
                }
                if(isResizeH){
                    moveY = Math.round((e.clientY - startY) * (isReverseH?-1:1));
                    if(moveY){
                        var oldHeight = dragObject.height();
                        var newHeight = oldHeight + moveY;
                        if(maxHeight!==0 && newHeight > maxHeight){
                            newHeight = maxHeight;
                        }
                        if(newHeight < minHeight){
                            newHeight = minHeight;
                            //moveY = moveY - minHeight + newHeight;
                        }
                        if(newHeight != oldHeight){
                            dragObject.height(newHeight);
                            if(isReverseH){
                                var pos = dragObject.position();
                                dragObject.css("top",(pos.top - moveY) + "px");
                            }
                            
                            isResize = true;
                        }
                    }
                    startY = e.clientY;
                }
            }
            
            if(window.getSelection){//w3c
               window.getSelection().removeAllRanges();
            }
            else  if(document.selection){
               document.selection.empty();//IE
            } 
                
        }
        else{
            //console.log("mouse move up...");
            mouseUp();       
        }
    }
    
    function mouseUp(){
        if(dragObject){
            eventJsObj && eventName && eventJsObj[okEventName] && eventJsObj[okEventName](dragObject);
            dragObject = null;
            eventJsObj = null;
            
            document.unselectable  = "off";
            document.onselectstart = null;      
            
            //dragObject.attr("s-isDrag",0);           
        }
        sjs._isDrag = false;        
    }
    
    function getSjsObject(src) {
        var selfObjId = src.attr("s-objId");
        if (selfObjId) {
            var obj = uiManager.get(selfObjId);
            return obj;
        }
        return null;
    }
    
    //Dom Event擴展
    $(document).bind("mousemove",mouseMove)
        .bind("mouseup",mouseUp)
        .delegate("[s-dragResize]", "mousedown", mouseDown);
});