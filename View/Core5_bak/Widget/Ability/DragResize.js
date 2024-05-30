sjs.loadCss("Core5.Widget.Ability.DragResize")
.using("jQuery")
.using("Core5.Widget.Ability.Movable")
.using("Core5.Widget.Ability.Resizable")
.using("Core5.DomEvent.PopManager")
.using("Core5.DomEvent.DragMove")
.using("Core5.DomEvent.onmouseclass")
.define(function($,movable,resizable,popManager){
    var cursor = {  
        Right:"e"        //右邊
        ,Bottom:"s"
        ,Left:"w"
        ,Top:"n"
        ,RB:"se"          //右下
        ,LB:"sw"         //左下
        ,RT:"ne"         //右上
        ,LT:"nw"         //左上
    }
    
    function resizeDivHtml(objId,kind,width,height,obj){
        var html = [];
        html.push("<div class='s-dragDiv' s-drag='" + objId + "' s-dragStart='resizeStart' s-dragMove='resize' s-dragEnd='resizeEnd'");   //改變當前父控件
        if(kind == "Right" || kind == "Left"){
            html.push(" s-dragResizeNoH='1'");
        }
        else if(kind == "Top" || kind == "Bottom"){
            html.push(" s-dragResizeNoW='1'");
        }
        if(kind == "Left" || kind == "LT" || kind == "LB"){
            html.push(" s-dragResizeReverseW='1'");
        }
        if(kind == "Top" || kind == "LT" || kind == "RT"){
            html.push(" s-dragResizeReverseH='1'");
        }
        html.push(" style='");
        html.push(";width:" + width);
        html.push(";height:" + height);
        if(kind == "Top" || kind == "Left" || kind == "Right" || kind == "LT" || kind == "RT")
            html.push(";top:0");
        
        if(kind == "Bottom" || kind == "RB" || kind == "LB")               
            html.push(";bottom:0");
        
        if(kind == "Top" || kind == "Left" || kind == "Bottom" || kind == "LT" || kind == "LB")
            html.push(";left:0");
        
        if(kind == "Right" || kind == "RB" || kind == "RT")               
            html.push(";right:0");
        html.push(";cursor:" + cursor[kind] + "-resize");

        obj.resizeDisabled && html.push(";display:none");

        html.push("'></div>");
        return html.join("");
    }   
    
    function getResizeDiv(){
        if(!$("#s-resizeDiv").length){
            $("<div id='s-resizeDiv' style='display:none;position:absolute;border:1px dotted black;z-index:999;overflow:hidden;background-color:#f3f3f3;'>&nbsp;</div>").css("opacity","0.5").appendTo("body");
        }
        return $("#s-resizeDiv");
    }   
    
    var minWidth;
    var minHeight;
    var maxWidth;
    var maxHeight;
    var isResizeW;
    var isResizeH;
    var isReverseW;
    var isReverseH;

    function resize(target,moveX,moveY,widthCell,heightCell){
        if(isResizeW && moveX){
            var oldWidth = target.getWidth?target.getWidth():target.width();
            var newWidth = oldWidth + (moveX * (isReverseW?-1:1));
            newWidth = maxWidth && newWidth > maxWidth?maxWidth:newWidth;
            newWidth = newWidth < minWidth?minWidth:newWidth;
            newWidth = newWidth < 0?0:newWidth;
            var remPx = newWidth % widthCell;
            newWidth = remPx > 0?newWidth - remPx + (Math.round(remPx / widthCell)?widthCell:0):newWidth;
            if(newWidth != oldWidth){
                target.setWidth?target.setWidth(newWidth):target.width(newWidth);
                if(isReverseW){
                    var oldLeft = target.position().left;
                    var newLeft = oldLeft - (newWidth - oldWidth);
                    newLeft = newLeft < 0 ?0:newLeft;
                    target.setLeft?target.setLeft(newLeft):target.css("left",newLeft + "px");
                }
            }  
        }
        if(isResizeH && moveY){
            var oldHeight = target.getHeight?target.getHeight():target.height();
            var newHeight = oldHeight + (moveY * (isReverseH?-1:1));
            newHeight = maxHeight && newHeight > maxHeight?maxHeight:newHeight;
            newHeight = newHeight < minHeight?minHeight:newHeight;
            newHeight = newHeight < 0?0:newHeight;
            var remPx = newHeight % heightCell;
            newHeight = remPx > 0?newHeight - remPx + (Math.round(remPx / heightCell)?heightCell:0):newHeight;
            if(newHeight != oldHeight){
                target.setHeight?target.setHeight(newHeight):target.height(newHeight);
                if(isReverseH){
                    var oldTop = target.position().top;
                    var newTop = oldTop - (newHeight - oldHeight);
                    newTop = newTop < 0 ?0:newTop;
                    target.setTop?target.setTop(newTop):target.css("top",newTop + "px");
                }
            }  
        }

    }  
    
    //動態創建mixin
    function createMixin(pos,width,height){
        var ret = {
            $mixin:[movable,resizable]
            ,regUIObj:true
            ," s-overClass":"s-dragresize-over"
            ," s-overself":"1"
            ,";position":"absolute"      //可override為absolute
            ,minWidth:20             //最小寬度
            ,maxWidth:0            //0表示不限制最大寬度，不能為負數，不能小于minWidth
            ,minHeight:20           //最小高度
            ,maxHeight:0           //0表示不限制最大高度，不能為負數，不能小于minHeight
            
            ,init:function(){
                this.$base();
                this._initData("resizeDisabled");
            }

            ,innerHtml:function(html){
                this.$base(html);                
                var resizeKey = "resize" + pos;
                var width = this[resizeKey].width;
                if(width != "100%")
                    width += "px";
                var height = this[resizeKey].height;
                if(height != "100%")
                    height += "px";
                    

                html.push(resizeDivHtml(this._objId,pos,width,height,this));
            }    
                                    
            ,onResizeStart:function(src,e,addParam){
                //console.log("resize start");
                var dragDiv = getResizeDiv();
                var dragTarget = this.jq();
                var pos = dragTarget.offset();
                dragDiv.css({
                    width:dragTarget.outerWidth() -2  + "px"
                    ,height:dragTarget.outerHeight() -2  + "px"     //border
                    ,left:pos.left + "px"
                    ,top:pos.top + "px"
                    ,"z-Index":popManager.getTopZIndex()+1
                }).show();          //這個會影響click事件，因為show了，滑鼠就到drag div上，原來的mouseup就不能完成，所以無效
                
                //用靜態變量，提供性能（不用每次move都去取）
                isResizeW = src.attr("s-dragResizeNoW") != "1";
                isReverseW = src.attr("s-dragResizeReverseW") == "1";
                isResizeH = src.attr("s-dragResizeNoH") != "1";
                isReverseH = src.attr("s-dragResizeReverseH") == "1";
                maxWidth = this.maxWidth;
                minWidth = this.minWidth;
                maxHeight = this.maxHeight;
                minHeight = this.minHeight;
            }  

           ,onResize:function(src,e,addParam){
                resize(getResizeDiv(),addParam[0],addParam[1],1,1);
            } 
            
            ,onResizeEnd:function(src,e,addParam){
                resize(this,addParam[0],addParam[1],this.widthCell || 10,this.heightCell || 10);
                getResizeDiv().hide();
            }   
            
            ,_setResizeDisabled:function(disabled){
                if(disabled){
//                    this.disableEvent("resizeStart");
//                    this.disableEvent("resize");
//                    this.disableEvent("resizeEnd");
                    this.isRender() && this.jq(".s-dragDiv").filter("[s-drag='" + this._objId + "']").hide();
                }
                else{
//                    this.enableEvent("resizeStart");
//                    this.enableEvent("resize");
//                    this.enableEvent("resizeEnd");
                    this.isRender() && this.jq(".s-dragDiv").filter("[s-drag='" + this._objId + "']").show();
                }
            } 

            ,disableDragResize:function(){
                this.set("resizeDisabled",true);
            }

            ,enableDragResize:function(){
                this.set("resizeDisabled",false);
            }
            
        }
        //config設定
        ret["resize" + pos] = {
            width:width
            ,height:height
            ,regUIObj:true
        }
        return ret;
    }
    
    return {
        right:createMixin("Right",6,"100%")
        ,bottom:createMixin("Bottom","100%",6)
        ,left:createMixin("Left",6,"100%")
        ,top:createMixin("Top","100%",6)
        ,rb:createMixin("RB",15,15)
        ,lb:createMixin("LB",15,15)
        ,rt:createMixin("RT",15,15)
        ,lt:createMixin("LT",15,15)
    }
});