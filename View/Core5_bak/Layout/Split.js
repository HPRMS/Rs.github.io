sjs.using("Core5.Component")
.using("Core5.Layout.AutoFit")
.using("Core5.DomEvent.DragMove")
.define(function(component,autoFitLayout){
    //TODO:dragresize也可以仿這種方式,以避免多個方法出現
    return {
        $extend:autoFitLayout

        ,regUIObj:true

        ,_initInner:function(inner){
            var splitter = this.splitter;
            if(splitter){
                for(var i=0;i<splitter.length;i++){
                    var spl = splitter[i];
                    if(spl.items && spl.items.length >1){
                        var posKind = spl.posKind = spl.posKind || "top";
                        spl.pos = spl.pos || 200;
                        spl.splitIndex = spl.splitIndex || 1;  
                        var splInner = {
                            $extend:component
                            ,";background-color":"#d0d0d0"
                            ,";cursor":posKind=="top" || posKind=="bottom"?"row-resize":"col-resize"

                            ," s-drag":this._objId
                            ," s-dragStart":"splitStart"
                            ," s-dragMove":"splitMove"
                            ," s-dragEnd":"splitEnd"
                            ," s-split-id":i
                        

                        }

                        //posKind:"left,right,top,bottom"
                        //pos
                        if(spl.id){
                            splInner.id = spl.id;
                        }
                        splInner[posKind] = (spl.pos?spl.pos: 200 );//+  (spl.basePos || 0) ;
                        splInner[posKind=="top" || posKind=="bottom"?"height":"width"] = 5;

                        inner.push(splInner);
                    }
                }

                //TODO:為autofit作準備
                for(var i=0;i<splitter.length;i++){
                    this._splitItems(splitter[i],splitter[i].pos,inner);
                }
            }
            this.$base(inner);
        }

        ,splitStartActiveDisabled:true
        ,splitMoveActiveDisabled:true
        ,splitEndActiveDisabled:true

        ,onSplitStart:function(src,e,addParam){
            src.css("background-color","#888888");
        }  
        
        ,onSplitMove:function(src,e,addParam){
            var spl = this.splitter[parseInt(src.attr("s-split-id"))];
            var posKind = spl.posKind;
            var usefulIndex = posKind == "top" || posKind=="bottom" ? 1:0;          //當前哪個方向的值有用
            var addOrPlus = posKind == "top" || posKind=="left" ? 1 : -1 ;
            if(addParam[usefulIndex]){
                var top = parseInt(src.css(posKind).replace("px","")) + addParam[usefulIndex] * addOrPlus;
                src.css(posKind,top + "px");
            }
        }

        ,_getInnerItemById:function(id,inner){
            for(var i=0;i<inner.length;i++){
                if(inner[i].id == id){
                    return inner[i];
                }
            }
            return null;
        }

        ,_splitItems:function(spl,top,inner){
            var items = spl.items;
            if(items){
                var posKind = spl.posKind;
                var splitIndex = spl.splitIndex;  
                for(var i=0;i<items.length;i++){
                    var item = inner?this._getInnerItemById(items[i],inner) : this[items[i]];

                    //是小于splitIndex調整,還是大于調整
                    var firstAdjustMeasure = posKind == "top" || posKind == "left";             //是否第一個是調整width或height
                    var isLessSplitIndex = i < splitIndex;

                    var adjustKind = posKind == "top" || posKind == "bottom"?"height":"width";
                    var curAdjust = firstAdjustMeasure === isLessSplitIndex ? adjustKind:posKind;        //posKind:left,top,right,bottom
                    var adjTop = top + (curAdjust==adjustKind?0:5);// - (curAdjust==adjustKind?spl.basePos || 0:0);
                    if(inner){
                        item[curAdjust] = adjTop  - (curAdjust==adjustKind?spl.basePos || 0:0);
                        //如果是調整bottom或right,然後又是在width或height時,默認調整其right,bottom為0
                        //其實這個只適用整個維度只有兩個對象的情形
                        if(firstAdjustMeasure === isLessSplitIndex){//  && !spl.noAdjustOtherSize){
                            if(posKind=="bottom"){
                                item["bottom"] = 0 + (spl.basePos || 0);
                            }
                            else if(posKind=="right"){
                                item["right"] = 0 + (spl.basePos || 0);
                            }
                        }
                    }
                    else{
                        item.css(curAdjust,adjTop  - (curAdjust==adjustKind?spl.basePos || 0:0) + "px");       //+5加一個spliter的寬度或高度
                        //item.css(curAdjust,adjTop  + "px");       //+5加一個spliter的寬度或高度
                    }
                }
            }
        }
          
        ,onSplitEnd:function(src,e,addParam){
            src.css("background-color","#d0d0d0");

            var spl = this.splitter[parseInt(src.attr("s-split-id"))];
            var posKind = spl.posKind;

            var top = parseInt(src.css(posKind).replace("px",""));
            var basePos = spl.basePos || 0;
            top = top < basePos ? basePos : top;

            var measHeight = posKind=="top" ||  posKind=="bottom";
            var thisHeight = measHeight ? this.jq().height():this.jq().width();

            var minMeas = 8;
            if(top > thisHeight - minMeas){
                top = thisHeight - minMeas;
                src.css(measHeight?"height":"width",(minMeas -1) + "px");
            }
            else{
                src.css(measHeight?"height":"width",(minMeas - 2) + "px");
            }
            //console.log("posKind:" + posKind + " top:" + top + " bottomFrom:" + spl.bottomFrom);
            //src.css(posKind,top + (spl[posKind + "From"] || 0) + "px");
            src.css(posKind,top + "px");
            
            this._splitItems(spl,top);
        }
    };
});