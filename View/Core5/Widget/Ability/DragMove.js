sjs.using("Core5.Widget.Ability.Movable")
.using("jQuery")
.using("Core5.DomEvent.PopManager")
.using("Core5.DomEvent.DragMove")
.define(function(move,$,popManager){
    return {
        $extend:move
        ,regUIObj:true
            
        ,_render:function(){
            //這個時候，一般子元素的DomID都出來了
            this.$base();
            if(this.dragDom){
                var domIdStr = "";
                var dragDom = this.dragDom.split(",");
                for(var i=0;i<dragDom.length;i++){
                    var item = dragDom[i];
                    var selector = this[item]?"#" + this[item]._domId:item;
                    if(selector){
                        this.jq(selector)
                        .css("cursor",this.moveDisabled?"default":"move")
                        .attr({
                            "s-drag":this._objId
                            ,"s-dragStart":"moveStart"
                            ,"s-dragMove":"move"
                            ,"s-dragEnd":"moveEnd"
                        });
                    }
                }
            }
            else{
                this.css("cursor",this.moveDisabled?"default":"move")
                .attr({
                    "s-drag":this._objId
                    ,"s-dragStart":"moveStart"
                    ,"s-dragMove":"move"
                    ,"s-dragEnd":"moveEnd"
                });
            }
        }

        ,onMoveStart:function(src,e,addParam){
            var dragDiv = this.getDragDiv();
            var dragTarget = this.jq();
            var pos = dragTarget.offset();
            dragDiv.css({
                width:dragTarget.outerWidth() -2  + "px"
                ,height:dragTarget.outerHeight() -2  + "px"     //border
                ,left:pos.left + "px"
                ,top:pos.top + "px"
                ,"z-Index":popManager.getTopZIndex()+1
            }).text(this.dragText || "").show();          //這個會影響click事件，因為show了，滑鼠就到drag div上，原來的mouseup就不能完成，所以無效
        }

        ,onMove:function(src,e,addParam){
            var dragDiv = this.getDragDiv();
            var pos = dragDiv.position();
            var moveX = addParam[0];
            var moveY = addParam[1];
            moveX && dragDiv.css("left",(pos.left + moveX) + "px");
            moveY && dragDiv.css("top",(pos.top + moveY) + "px");
        }

        ,onMoveEnd:function(src,e,addParam){
            //console.log("end x:" + addParam[0] + ",y:" + addParam[1]);
            var totalMoveX = addParam[0];
            var totalMoveY = addParam[1];
            var dragTarget = this.jq();
            var cellPx = 10;
            var pos = dragTarget.position();
            var left = pos.left + totalMoveX;
            left = left<0?0:left;
            var remPx = left % cellPx;
            if(remPx > 0){
                left = Math.round(left % cellPx / cellPx)?left+cellPx-remPx:left-remPx;
            }
            var top = pos.top + totalMoveY;
            top = top<0?0:top;
            var remPx = top % cellPx;
            if(remPx > 0){
                top = Math.round(top % cellPx / cellPx)?top+cellPx-remPx:top-remPx;
            }
            this.setLeft(left);
            this.setTop(top);
            //dragTarget.css({"left":left + "px","top":top + "px"});
            this.getDragDiv().hide();

        }

        ,getDragDiv:function (){
            if(!$("#s-dragDiv").length){
                $("<div id='s-dragDiv' style='display:none;position:absolute;border:1px dotted black;z-index:999;overflow:hidden;background-color:#f3f3f3;'>&nbsp;</div>").css("opacity","0.5").appendTo("body");
            }
            return $("#s-dragDiv");
        }

        ,_setMoveDisabled:function(disabled){
            if(disabled){
                this.disableEvent("moveStart");
                this.disableEvent("move");
                this.disableEvent("moveEnd");
                this.isRender() && this.jq("[s-dragStart='moveStart']").filter("[s-drag='" + this._objId + "']").css("cursor","default");
            }
            else{
                this.enableEvent("moveStart");
                this.enableEvent("move");
                this.enableEvent("moveEnd");
                this.isRender() && this.jq("[s-dragStart='moveStart']").filter("[s-drag='" + this._objId + "']").css("cursor","move");
            }
        } 

        ,disableDragMove:function(){
            this.set("moveDisabled",true);
        }

        ,enableDragMove:function(){
            this.set("moveDisabled",false);
        }
    }
});