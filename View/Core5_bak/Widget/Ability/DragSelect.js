sjs.using("jQuery")
.using("Core5.DomEvent.DragMove")
.define(function($){
    return {
       
        regUIObj:true
        ,";cursor":"default"
        ," s-dragStart":"selectStart"
        ," s-dragMove":"selectMove"
        ," s-dragEnd":"selectEnd"

        ,init:function(){
            this.$base();
            this.attr("s-drag",this._objId);
        }

        ,selectDragDivOverDistance:8        //為了命名drag select時不觸發下面的onmouseover事件，讓div把滑鼠包進來的x,y坐標減量
        ,onSelectStart:function(src,e,addParam){
            var dragDiv = this.getSelectDiv();
            dragDiv.css({
                width:"0"
                ,height:"0"     //border
                //TODO:滾動條
                ,left:e.pageX -this.selectDragDivOverDistance + "px"
                ,top:e.pageY - this.selectDragDivOverDistance + "px"
            }).show();          //這個會影響click事件，因為show了，滑鼠就到drag div上，原來的mouseup就不能完成，所以無效
        }

        ,onSelectMove:function(src,e,addParam){
            var dragDiv = this.getSelectDiv();
            var pos = dragDiv.position();
            var moveX = addParam[0];
            if(moveX){
                if(addParam[2]<0){      //滑鼠往左邊移
                    dragDiv.css("left",e.pageX -this.selectDragDivOverDistance +"px").width(-addParam[2]);// + this.selectDragDivOverDistance);
                }
                else{
                    /*
                    var oldWidth = dragDiv.width();
                    moveX = oldWidth + moveX;
                    var newWidth = Math.abs(moveX);
                    dragDiv.width(addParam[2]+ this.selectDragDivOverDistance*2);//newWidth);// + this.selectDragDivOverDistance);
                    moveX <0 && dragDiv.css("left",pos.left + moveX -this.selectDragDivOverDistance + "px");
                    */
                    //6,7是mousedown時的坐標
                    dragDiv.css("left",addParam[6] + "px").width(addParam[2]+ this.selectDragDivOverDistance);
                }
            }
            var moveY = addParam[1];
            if(moveY){
                if(addParam[3]<0){      //往上面移
                    dragDiv.css("top",e.pageY -this.selectDragDivOverDistance +"px").height(-addParam[3]);// + this.selectDragDivOverDistance);
                }
                else{
                    /*
                    var oldHeight = dragDiv.height();
                    moveY = oldHeight + moveY;

                    dragDiv.height(addParam[3]+ this.selectDragDivOverDistance*2);
                    moveY<0 && dragDiv.css("top",pos.top + moveY -this.selectDragDivOverDistance + "px");
                    */
                    dragDiv.css("top",addParam[7] + "px").height(addParam[3]+ this.selectDragDivOverDistance);

                }
            }
            //if(moveX || moveY){
            //    dragDiv.show();
            //}
            //判斷哪個child落在子項里面
            var newPos = dragDiv.position();
            var newWidth = dragDiv.width();
            var newHeight = dragDiv.height();
            this._selectByRange(newPos.left,newPos.left + newWidth,newPos.top,newPos.top + newHeight);
        }

        //暫時只作ListContainer的子項次選取
        ,_selectByRange:function(left,right,top,bottom){
            var items = this._items;
            var selected = [];
            if(items){
                for(var i=0;i<items.length;i++){
                    var item = items[i];
                    var itemPos = item.jq().offset();//position();
                    var itemWidth = item.jq().width();//getWidth();
                    var itemHeight = item.jq().height();//getHeight();
//                    if(itemPos.left >= left && itemPos.left + itemWidth<=right
//                        && itemPos.top >= top && itemPos.top + itemHeight <= bottom){
//                        item.setSelected(true);
//                    }
                    //有重疊到就OK

                    var itemLeft = itemPos.left;
                    var itemRight = itemPos.left + itemWidth;
                    var itemTop = itemPos.top;
                    var itemBottom = itemPos.top + itemHeight;
                    if(!(itemRight < left || itemLeft > right || itemBottom < top || itemTop > bottom)){
                        selected.push(item._keyValue);
                    }
                }
            }
            this.select(selected);
        }

        ,onSelectEnd:function(src,e,addParam){
            this.getSelectDiv().hide();
            this.dragSelectEvt && this.report(this.dragSelectEvt,this.selected);
        }

        ,getSelectDiv:function (){
            if(!$("#s-selectDiv").length){
                $("<div id='s-selectDiv' style='display:none;position:absolute;border:1px solid #5d91c1;z-index:999;overflow:hidden;background-color:#A8CAED;cursor:default;'>&nbsp;</div>").css("opacity","0.5").appendTo("body");
            }
            return $("#s-selectDiv");
        }
    }
});