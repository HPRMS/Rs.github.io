﻿//必須當作plugin來用
sjs.using("jQuery")
.using("Core5.DomEvent.onmouseclass")
.using("Core5.DomEvent.onmouseover")
.define(function($){
    return {
        regUIObj:true
        
        ,_render:function(){
            this.$base();    
            this._initScroll();
        }

        ,_disposeScroll:function(){
            if(this[";position"] != "static"){
                this.jq(" > .s-grid-r-scroll").scroll(null);
                this.jq(" > .s-grid-b-scroll").scroll(null);  
                this.jq(" > .s-grid-body").unbind("mousewheel",this._scrollBodyFn);
            }
        }
        
        ,_dispose:function(noRemoveJq){
            this._disposeScroll();
            this.$base(noRemoveJq);
        }        

        ,_initScroll:function(){
            if(this[";position"] == "static"){
                return;
            }
            var oThis = this;
            //safari有問題，下面的滾動條伸不直
            //this.jq(".s-grid-r-scroll").hide();            
            //this.jq(".s-grid-b-scroll").hide();  
            window.clearTimeout(this._resizeScrollID);
            this._resizeScrollID = window.setTimeout(function(){
                oThis && oThis._resize && oThis._resize(true);
            },500);        //1秒后，才做，可能有樣式問題?
            this.jq(" > .s-grid-r-scroll").scroll(function(){
                oThis._scrollRight();
            });
            this.jq(" > .s-grid-b-scroll").scroll(function(){
                oThis._scrollBottom();
            });
            this._scrollBodyFn = function(event, delta){
                ////debugger
                if(!oThis._rightScrollVisible){
                    return;
                }
                //var jq = oThis.jq(".s-grid-body-table");
                //var top  = parseInt(jq.css("top").replace("px",""));
                var top = -oThis.jq(" > .s-grid-r-scroll").scrollTop();
                var newTop = top + (delta * 30)        //每滾動一次30px     //delta -1
                if(newTop >0)
                    newTop =0;
                var bodyHeight = oThis.jq(" > .s-grid-body").height();
                var innerHeight = oThis.jq(" > .s-grid-r-scroll > .s-grid-r-scroll-inner").height();//jq.height();
                if(newTop < bodyHeight - innerHeight){
                    newTop = bodyHeight - innerHeight;
                }
                //jq.css("top",newTop + "px");
                oThis.jq(" > .s-grid-r-scroll").scrollTop(-newTop);
                oThis.onScrollBody(newTop);
                //console.log(top);
                /*
                .css("top" , (-1 * oThis.jq(".s-grid-r-scroll").scrollTop()) + "px");
                oThis.jq(".s-grid-body-table").css("top" , (-1 * oThis.jq(".s-grid-r-scroll").scrollTop()) + "px");
                */
                return false;
            }
            this.jq(' > .s-grid-body').bind("mousewheel",this._scrollBodyFn);
            this._resize(true);
        }
        
        ,onScrollBody:function(newTop){
        
        }
        
        ," s-mouseover":"resize"
        ,onResize:function(){
            this._resize();
        }

        ,onVisibleChange:function(visible){
            visible && this.isRender() && this._resize(true);
        }
        
        //高度设定推荐：首先看是否栏位会很多，超过最小宽度，这样就会出现下面的滚动条，这时候高度应该设置为行数+22
        //如果不会超过最小宽度，那就设定行数即可
        //重新resize時，要重新設定這些值
        ,_resize:function(forceResize){
            if(this[";position"] == "static"){
                return;
            }
            //return;
            var jqWidth = this.jq().width();
            var jqHeight = this.jq().height();
            //console.log("resize","jqWidth",jqWidth,"jqHeight",jqHeight,"this._jqWidth",this._jqWidth,"this._jqHeight",this._jqHeight);
            if (forceResize || (jqWidth != this._jqWidth || jqHeight != this._jqHeight)) {
            ////debugger
                this._jqWidth = jqWidth;
                this._jqHeight = jqHeight;
                return this._doResize(jqWidth,jqHeight);
                /*
                */
            }
            //this.jq(".s-grid-body-table").css("top" , "0px").css("left" , "0px");
            //this.jq(".s-grid-head-table").css("left" ,"0px");
            //this.jq(".s-grid-b-scroll-inner").css("left" ,"0px");
            //this.jq(".s-grid-r-scroll-inner").css("top" ,"0px");
        }


        //之前移動窗口會直接移動，所以會有些性能問題，現在只移動一個div，所以不再考慮這么復雜的顯示隱藏tr單中是
        //在IE8這種慢速瀏覽器中，還是用顯示隱藏的方式會比較好，其實有更好的，就是用window.setTimeout來做
        ,rightScrollHideTr:true       //右邊滾動條滾動時是通過隱藏行來實現的(隱藏行可以提高html頁面的性能，如500行，display none比直接顯示500行性能要高,chrome測試結果)
        //但是，通過隱藏行來實現固定表頭的方式，會讓在body中有單元格rowspan時產生很多困擾，除了隱藏行，還需要處理某些單元格的rowspan問題
        //這和固定欄的colspan一樣。目前先直接提供這個屬性，以便在損失html頁面性能時，可以保證表頭固定，及右邊滾動行為OK

        ,_doResize:function(jqWidth,jqHeight){
            this.rightScrollHideTr && this.jq(" > .s-grid-body > table > tbody > .s-grid-body-tr").show();      //全部show出來,然後右邊scroll才能計算準確
            //檢查是否需要下面的滾動條
            var bodyWidth = this.jq(" > .s-grid-body").width();
            var bodyTableWidth = this.jq("> .s-grid-body > .s-grid-body-table").width();
            //console.log("bodyWidth:",bodyWidth,"bodyTableWidth:",bodyTableWidth);
            //檢查是否需要右滾動條
            var bodyHeight = jqHeight - this._headerHeight - (bodyTableWidth > bodyWidth?22:0);
            var bodyTableHeight = this.jq("> .s-grid-body > .s-grid-body-table").height();
                
            if(bodyTableWidth > bodyWidth){
                this._showBottomScroll(bodyTableWidth,bodyWidth,bodyTableHeight > bodyHeight,bodyHeight);
            }
            else{
                this._hideBottomScroll();
            }
            //this.jq(".s-grid-body").height(bodyHeight);
            if(bodyTableHeight > bodyHeight){
                this._showRightScroll(bodyTableHeight,bodyHeight,bodyTableWidth > bodyWidth);
                ////debugger
                this.rightScrollHideTr && this._initBodyTrHeights();

            }
            else{
                this._hideRightScroll(bodyTableWidth > bodyWidth);
            }
            return {
                bodyWidth:bodyWidth
                ,bodyHeight:bodyHeight
                ,bodyTableWidth:bodyTableWidth
                ,bodyTableHeight:bodyTableHeight
            }
        }
        
        ,_showBottomScroll:function(bodyTableWidth){
            //this.jq(".s-grid-body").css("margin-bottom","22px");        
            this.jq(" > .s-grid-b-scroll > .s-grid-b-scroll-inner").css("width",bodyTableWidth + "px");
            //this.jq(".s-grid-body").height(bodyHeight-22);            
            this.jq(" > .s-grid-b-scroll").show();//("margin-right","24px");
        }
        
        ,_hideBottomScroll:function(){
            this.jq(" > .s-grid-b-scroll").hide();
            this.jq(" > .s-grid-body > .s-grid-body-table").css("left" , "0");
            this.jq(" > .s-grid-head > .s-grid-head-table").css("left" ,"0");
        }
        
        ,_showRightScroll:function(bodyTableHeight,bodyHeight,showBScroll){
            this._rightScrollVisible=true;
            this.jq(" > .s-grid-head").css("right","22px");
            this.jq(" > .s-grid-body").css("right","22px").css("bottom",(showBScroll?"22px":"0"));
            this.jq(" > .s-grid-b-scroll").css("right","22px");//("margin-right","24px");
            //height 1先恢复scroll位置
            //不用height()，因为height()不容错
            this.jq(" > .s-grid-r-scroll > .s-grid-r-scroll-inner").css("height",bodyTableHeight + "px");
            //console.log("set body height:", bodyTableHeight);
            this.jq(" > .s-grid-r-scroll").css("bottom",(showBScroll?"22px":"0"));
            this.jq(" > .s-grid-r-scroll").show();
            //this.jq(".s-grid-r-scroll").css("height",bodyHeight + "px").show();//.css("overflow","scroll").show();
        }
        
        ,_hideRightScroll:function(showBScroll){
            this._rightScrollVisible = false;          
            this.jq(" > .s-grid-head").css("right","0");
            this.jq(" > .s-grid-body").css("right","0").css("bottom",(showBScroll?"22px":"0"));
            this.jq(" > .s-grid-b-scroll").css("right","0");//("margin-right","24px");
            this.jq(" > .s-grid-r-scroll").hide();
            
            this.jq(" > .s-grid-body > .s-grid-body-table").css("top" , "0");
            
        }
        
        ,_scrollRight:function(){
            if(this.rightScrollHideTr){
                var top = this.jq(" > .s-grid-r-scroll").scrollTop();
                var totalHeight = this.jq().height();
                this._displayCurrentTrs(top,totalHeight);
            }
            else{
                this.jq(" > .s-grid-body > .s-grid-body-table").css("top" , (-1 * this.jq(" > .s-grid-r-scroll").scrollTop()) + "px");
            }
        }
        
        ,_scrollBottom:function(){
            var srollLeft = -1 * this.jq(" > .s-grid-b-scroll").scrollLeft() + "px";
            this.jq(" > .s-grid-head  > .s-grid-head-table").css("left" , srollLeft);
            this.jq(" > .s-grid-body > .s-grid-body-table").css("left" , srollLeft);
        }
        
        

        /*增加使用只顯示當前頁的rows,其它display:none起來,會有效的提高拖動等性能*/
        /*例如500行時,每次display:block只10幾行,效率會很高*/

        //將每一行高度建檔
        ,_initBodyTrHeights:function(){
            //記錄各行高
            var bodyTrs = this.jq(" > .s-grid-body > table > tbody > .s-grid-body-tr");
            //bodyTrs.show();
            var heights = [];
            var len = bodyTrs.size();
            for(var i=0;i<len;i++){
                var bodyTr = $(bodyTrs[i]);
                heights.push(bodyTr.outerHeight());
            }
            this._bodyTrHeights = heights;
            this._lastDisplayTrIndex = null;
            bodyTrs.hide();

            var totalHeight = this.jq().height();
            this._displayCurrentTrs(this.jq(" > .s-grid-r-scroll").scrollTop() || 0,totalHeight);

        }

        ,_displayCurrentTrs:function(top,totalHeight){
            //先計算出本次要顯示哪些行
            var heights = this._bodyTrHeights;
            var curTop = 0;
            var curHeight = 0;

            var startIndex = -1;
            var endIndex = -1;
            for(var i=0;i<heights.length;i++){ 
                if(curTop >= top){
                    if(startIndex==-1){
                        startIndex = i;
                    }
                    curHeight += heights[i];
                    if(curHeight > totalHeight){
                        endIndex = i;
                        break;
                    }
                }
                else{
                    curTop += heights[i];
                }
            }
            if(endIndex == -1){
                endIndex = heights.length-1;
                //if(curHeight < totalHeight && startIndex > 0){            //仍然小于,則補前面一行
                //    startIndex--;;
                //}     //會讓最后一行讓滾動條擋住,還是算了
            }
            //記錄上一次顯示的索引
            var lastShow = this._lastDisplayTrIndex;
            //if(startIndex && endIndex){
                if(lastShow && lastShow[0] == startIndex && lastShow[1] == endIndex){
                    return;
                }
                else{
                     //重複區間不動
                     var bodyTrs = this.jq(" > .s-grid-body > table > tbody > .s-grid-body-tr");

                     if(lastShow){
                         var lastStartIndex = lastShow[0];
                         var lastEndIndex =  lastShow[1];
                        //隱藏上次的
                        for(var i=lastStartIndex;i< lastEndIndex+1;i++){
                            (i<startIndex || i > endIndex)  && $(bodyTrs[i]).hide();
                        } 
                     }
                     for(var i=startIndex;i< endIndex+1;i++){
                        (!lastShow || i<lastStartIndex || i > lastEndIndex) && $(bodyTrs[i]).show();
                     } 

                     this._lastDisplayTrIndex = [startIndex,endIndex];
                }
            //}
        }
    };
});