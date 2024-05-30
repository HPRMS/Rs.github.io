sjs.using("Core5.Component")
.using("Core5.DomEvent.DragMove")
.define(function(component){
    //TODO:dragresize也可以仿這種方式,以避免多個方法出現
    return {
        $extend:component

        ,regUIObj:true

        ,posKind:"top"      //上下分隔
        ,posItems:[]        //拖動位置的id們
        ,measureItems:[]    //拖動寬高的id們
        //,splitMax:0         //拖動最大的寬度
        //,splitMin:0         //拖動最小的寬度
        ,splitBase:0        //往上(左)拖動時,預留的距離(比如上面有一個工具欄,但是無論如何要留那個的高度)

        ,init:function(){
            this.$base();
            var posKind= this.posKind;
            var measureKind = posKind=="top" || posKind=="bottom"?"height":"width";
            this._measureKind = measureKind;
            this._measure = this[measureKind] = this[measureKind] || 5;
            this.css("cursor",measureKind=="height"?"row-resize":"col-resize");
            this.attr("s-drag",this._objId);
        }

        ,overflow:"hidden"
        ,";background-color":"#d0d0d0"

        ," s-dragStart":"splitStart"
        ," s-dragMove":"splitMove"
        ," s-dragEnd":"splitEnd"
        ,";z-index":"1"
        ,splitStartActiveDisabled:true
        ,splitMoveActiveDisabled:true
        ,splitEndActiveDisabled:true

        ,onSplitStart:function(src,e,addParam){
            src.css("background-color","#888888");
        }  
        
        ,onSplitMove:function(src,e,addParam){
            var posKind = this.posKind;
            var usefulIndex = this._measureKind=="height" ? 1 : 0;              //當前哪個方向的值有用
            if(addParam[usefulIndex]){
                var addOrPlus = posKind == "top" || posKind=="left" ? 1 : -1 ;
                var top = parseInt(src.css(posKind).replace("px","")) + addParam[usefulIndex] * addOrPlus;
                var parentWH = (usefulIndex ? this.parent.jq().height():this.parent.jq().width()) - this._measure;
                top = Math.min(top,this.splitMax || parentWH,parentWH);
                top = Math.max(top,this.splitMin || 0,0);     //最小允許0
                this.css(posKind,top + "px");
            }
        }

        ,adjustSplitItems:function(){
            var posKind = this.posKind;
            var splitterPos = parseInt(this.jq().css(posKind).replace("px",""));      //調整的新在位置
            var adjustPos = splitterPos + this._measure;

            splitterPos -= this.splitBase;
            var posItems = this.posItems;
            if(posItems){
                for(var i=0;i<posItems.length;i++){
                    var item = this.parent[posItems[i]];
                    item.css(this._measureKind,splitterPos + "px");
                }
            }

            var measureItems = this.measureItems;
            if(measureItems){
                for(var i=0;i<measureItems.length;i++){
                    var item = this.parent[measureItems[i]];
                    item.css(posKind,adjustPos + "px");
                }
            }

        }
          
        ,onSplitEnd:function(src,e,addParam){
            src.css("background-color","#d0d0d0");
            this.adjustSplitItems();      //調整的新在位置

        }
    };
});