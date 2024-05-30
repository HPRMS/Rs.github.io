sjs.using("jQuery")
.using("Core5.DomEvent.onmouseover")
.define(function($){
	var cursors = {  
        right:"e"        //右邊
        ,bottom:"s"
        ,left:"w"
        ,top:"n"
        ,rb:"se"          //右下
        ,lb:"sw"         //左下
        ,rt:"ne"         //右上
        ,lt:"nw"         //左上
    };
    var resizers = ["left","right","bottom","top","lt","rt","lb","rb"];
    var resizeObjId = null;


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
        var resizeRet = {};
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
                resizeRet.width = newWidth;
                if(isReverseW){
                    var oldLeft = target.position().left;
                    var newLeft = oldLeft - (newWidth - oldWidth);
                    newLeft = newLeft < 0 ?0:newLeft;
                    target.setLeft?target.setLeft(newLeft):target.css("left",newLeft + "px");
                    resizeRet.left = newLeft;
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
                resizeRet.height = newHeight;
                if(isReverseH){
                    var oldTop = target.position().top;
                    var newTop = oldTop - (newHeight - oldHeight);
                    newTop = newTop < 0 ?0:newTop;
                    target.setTop?target.setTop(newTop):target.css("top",newTop + "px");
                    resizeRet.top = newTop;
                }
            }  
        }
        return resizeRet;

    }  
    
	return {
		" s-mouseover":"showResizer"
		,onShowResizer:function(){
            //if(resizeObjId != this._objId){
            
			    this._getResizerDiv();
                
			    var thisJq = this.jq();

			    var pos = thisJq.offset();
			    var size = {width:thisJq.outerWidth(),height:thisJq.outerHeight()};
			    for(var i=0;i<resizers.length;i++){
				    var clas = "s-resize-" + resizers[i];
				    var visible = this.resizePos.indexOf(resizers[i])>=0;
				    if(visible){
					    var left = pos.left;
					    if(resizers[i]=="right"){
						    left = pos.left + size.width - this.resizerWidth;
					    }
					    else if(resizers[i]=="rt" || resizers[i]=="rb"){
						    left = pos.left + size.width - this.resizerCornerWidth;
					    }
					    var top = pos.top;
					    if(resizers[i]=="bottom"){
						    top = pos.top + size.height - this.resizerHeight;
					    }
					    else if(resizers[i]=="lb" || resizers[i]=="rb"){
						    top = pos.top + size.height - this.resizerCornerHeight;
					    }
					    var width = resizers[i].length==2?this.resizerCornerWidth:(resizers[i]=="top" || resizers[i]=="bottom"?size.width:this.resizerWidth);
					    var height = resizers[i].length==2?this.resizerCornerHeight:(resizers[i]=="left" || resizers[i]=="right"?size.height:this.resizerHeight);
					    
                        
                        $(".s-resize-" + resizers[i]).show().attr("s-drag",this._objId).css({
						    "left":left + "px"
						    ,"top":top + "px"
						    ,"width":width + "px"
						    ,"height":height + "px"
					    });
				    }
				    else{
					    $(".s-resize-" + resizers[i]).hide();
				    }

                    //resizeObjId = this._objId;
               // }
			}
		}



		,resizePos:"top,right"
		,resizerWidth:6
		,resizerHeight:6
		,resizerCornerWidth:15
		,resizerCornerHeight:15

		,_getResizerDiv:function(){
            if(!$(".s-resizerDiv").length){
            	for(var i=0;i<resizers.length;i++){
                    var kind = resizers[i];
                    var html = [];
                    if(kind == "right" || kind == "left"){
                        html.push(" s-dragResizeNoH='1'");
                    }
                    else if(kind == "top" || kind == "bottom"){
                        html.push(" s-dragResizeNoW='1'");
                    }
                    if(kind == "left" || kind == "lt" || kind == "lb"){
                        html.push(" s-dragResizeReverseW='1'");
                    }
                    if(kind == "top" || kind == "lt" || kind == "rt"){
                        html.push(" s-dragResizeReverseH='1'");
                    }



                	$("<div class='s-resizerDiv s-resize-" + resizers[i] + "' " + html.join("") +  " s-dragStart='resizeStart' s-dragMove='resize' s-dragEnd='resizeEnd' style='position:absolute;z-index:999;cursor:" + cursors[resizers[i]] + "-resize;overflow:hidden;'>&nbsp;</div>").appendTo("body");
               	}
            }
            return $(".s-resizerDiv");
		}

        ,minWidth:20             //最小寬度
        ,maxWidth:0            //0表示不限制最大寬度，不能為負數，不能小于minWidth
        ,minHeight:20           //最小高度
        ,maxHeight:0           //0表示不限制最大高度，不能為負數，不能小于minHeight
            
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
               // ,"z-Index":popManager.getTopZIndex()+1
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
            var resizeRet = resize(this.jq(),addParam[0],addParam[1],this.widthCell || 10,this.heightCell || 10);
            getResizeDiv().hide();
            //resizeObjId = null;
            this.resizeEvt && this.report(this.resizeEvt,resizeRet);
        }  

        ,getResizeDiv:getResizeDiv

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
	};
});