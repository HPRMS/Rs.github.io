﻿sjs.using("jQuery")
.define(function($){
    return {

        //fixColumnsCount:1
        _scrollBottom:function(){
            //window.clearTimeout(this._doScrollBottomID);
            var oThis = this;
            //this._doScrollBottomID = window.setTimeout(function(){
                oThis._doScrollBottom();
            //},100);
        }

        ,_doResize:function(jqWidth,jqHeight){
            //var hideCellCls = "s-hide-td-" + this._objId;
            //var scrollLeft =;//this.jq(".s-grid-b-scroll").scrollLeft();
            //this.jq("." + hideCellCls).show();      //全部show出來,然後右邊scroll才能計算準確

            /*
            this.jq(".s-fix-column-td").show();
            //把colspan修改回來
            this.jq(".hasModifiedColspan").attr("colspan",function(){
                return $(this).attr("oldColspan");
            }).removeClass("hasModifiedColspan");
            */
            if(this._lastHideEndIndex>0){
                var oThis = this;
                this.jq("col.s-fix-column-td").each(function(){//filter(function(){
                    var col = $(this);
                    var fieldIndex = parseInt(col.attr("fixFieldIndex"));
                    var field = oThis.htmlForm?oThis.htmlForm.inner[fieldIndex]:oThis.fields[fieldIndex];//oThis.fields[fieldIndex];
                    col.css("width",(field.width || oThis.defaultWidth) + "px");
                });
            }
            this._lastHideEndIndex = 0;

            var ret = this.$base(jqWidth,jqHeight);
            //this.jq(".s-grid-b-scroll").scrollLeft(this._lastScrollLeft);     //因為滾勸條位置一樣,不會觸發事件
            //this._doScrollBottom(this._lastScrollLeft);
            ////debugger
            this._doScrollBottom();         //上面的跳來跳去很煩,乾脆只在拖動欄寬時變化就好了
            return ret;
        }


        ,_th:function(field,titleRowIndex,fieldIndex,fields,titleRows){
            var ret = this.$base(field,titleRowIndex,fieldIndex,fields,titleRows);
            if(field.fixFieldIndex || this.fixColumnsCount && fieldIndex >= this.fixColumnsCount){
                ret["-s-fix-column-td"] = true;
                ret[" fixFieldIndex"] = field.fixFieldIndex || fieldIndex;
                ret[" fixNotFirstRow"] = field.fixFieldIndex?"1":false;
                //if(field.colspan && field.colspan > 1){
                //    ret[" fixFieldIndex"] = fieldIndex + field.colspan - 1;     //只有到最后一個時才隱藏
                //}
            }
            return ret;
        }

        ,_gridCol:function(field,fieldIndex){
            var ret = this.$base(field,fieldIndex);
            if(this.fixColumnsCount && fieldIndex >= this.fixColumnsCount){
                ret["-s-fix-column-td"] = true;
                ret[" fixFieldIndex"] = fieldIndex;
            }
            return ret;
        }


        ,_fillFormMixin:function(ret){
            this.$base(ret);
            ret.push({
                _td:function(field,fieldIndex,row,rowIndex,fields,rows){
                    var ret = this.$base(field,fieldIndex,row,rowIndex,fields,rows);
                    if(field.bodyFixFieldIndex || this.parent.fixColumnsCount && fieldIndex >= this.parent.fixColumnsCount){
                        ret["-s-fix-column-td"] = true;
                        ret[" fixFieldIndex"] = field.bodyFixFieldIndex || fieldIndex;
                        ret[" fixNotFirstRow"] = field.bodyFixFieldIndex?"1":false;
                    }
                    return ret;
                }  
            });
        }


        ,_doScrollBottom:function(scrollLeft){
            //this.$base();
            //    //debugger
            //console.log("move");
            //var d1 = new Date();
            //var hideCellCls = "s-hide-td-" + this._objId;
            var scrollTop = scrollLeft || this.jq(".s-grid-b-scroll").scrollLeft();
            var hideEndIndex = 0;
            if(scrollTop > 0){
                var rowHeight = 0;
                var tds =  this.htmlForm?this.htmlForm.inner:this.fields;//this.fields;//this.jq(".s-grid-head-table th");
                var len = tds.length;//.size();
                var startIndex = this.fixColumnsCount;
                /*
                //是否滾動條在最右邊(最后一個過寬,則前面隱藏掉多少個都沒有用)
                var scrollWidth = this.jq(".s-grid-b-scroll-inner").width();
                var divWidth = this.jq(".s-grid-b-scroll").width();
                
                if(1==2 && divWidth + scrollTop >= scrollWidth-5){      //允許5的誤差,即滾動條離右邊還有5px時,就認為滾到底了
                    ////debugger
                    var fixWidth = 0;           //要計算fixWidth
                    for(var i=0;i<startIndex;i++){
                        fixWidth += tds[i].width || this.defaultWidth;//$(tds[i]).outerWidth();
                    }
                    divWidth -= fixWidth;
                    console.log("right");
                    var lastBlankTdWidth = 20;//因為會變，特別是成-1，所以規定一下好了this.jq(".s-grid-th-blank").width();
                    divWidth -= lastBlankTdWidth;
                    for(var i=len-1;i>startIndex;i--){         //右邊第一個是空白,不算在里面
                        rowHeight += tds[i].width || this.defaultWidth;//$(tds[i]).outerWidth();
                        //如果有滾動條情況，且滾到了最右邊，但是所有的td加起來都不還要小于總顯示寬度，說明出現滾動條原因很可能是空白td自適應寬度的緣故
                        //故如果有滾動條，且到了最右邊，則至少要隱藏一個td，這樣保證滾動最右邊時能從右邊起正確顯示
                        if(i==startIndex+1 || rowHeight > divWidth){
                            hideEndIndex = i+2;     //超過了,則不顯示當前的,所以要+2,另外一個1是等下循環判斷的終點,不包括在內
                            //如果scroll到了最后面了,safari還是顯示不出來,因此增加一個到最右邊的判斷,確保都能顯示
                            break;
                        }
                    }
                }
                else{
                */
                    for(var i=startIndex;i<len;i++){
                        rowHeight += tds[i].width || this.defaultWidth;//$(tds[i]).outerWidth();
                        //會有一個問題，如果某個單元格太寬，則寬度再也調不回來了
                        //目前一是程式員設定width不要太寬，二就是只能user不要拖太大力，以免過了。程式暫時不好管控
                        //因為涉及鎖定多欄時，不好判斷。而且如果是先拖ok，然後再把固定的幾個欄位調寬，也會出現調不回來的問題。所以暫時不處理了
                        if(i==len-2 || rowHeight >= scrollTop){
                            hideEndIndex = i+1;
                            //如果scroll到了最后面了,safari還是顯示不出來,因此增加一個到最右邊的判斷,確保都能顯示
                            break;
                        }
                    }
                //}
            }
            if(this._lastHideEndIndex != hideEndIndex){
                //this.jq("." + hideCellCls).removeClass(hideCellCls).show();
                //console.log("no equal,adjust");
                //var adjustCount = 0;
                //var adjustHideCount = 0;
                //this.jq(".s-fix-column-td").show();
                //把colspan修改回來
                /*
                this.jq(".hasModifiedColspan").attr("colspan",function(){
                    return $(this).attr("oldColspan");
                }).removeClass("hasModifiedColspan");*/
                var oThis = this;
                this.jq("col.s-fix-column-td").each(function(){//filter(function(){
                    var col = $(this);
                    var fieldIndex = parseInt(col.attr("fixFieldIndex"));
                    var field = oThis.htmlForm?oThis.htmlForm.inner[fieldIndex]:oThis.fields[fieldIndex];//oThis.fields[fieldIndex];
                    /*
                    var colspanAttr = $(this).attr("fixNotFirstRow")=="1"?"colspan2":(this.tagName=="TD"?"bodyColspan":(this.tagName=="TH"?"colspan":"COL_NO_COLSPAN"));
                    //if(fieldIndex < hideEndIndex)
                      //  //debugger
                    if(fieldIndex < hideEndIndex && field[colspanAttr] && field[colspanAttr] > 1){
                        //if(hideEndIndex==5)
                            ////debugger
                        var ret = fieldIndex + field[colspanAttr] - 1 < hideEndIndex;
                        //如果colspan對應的field列表沒有全部隱藏，則修改colspan就好，否則恢復原有的colspan，因為會整個hide掉
                        $(this).attr("colspan",field[colspanAttr] - (!ret?hideEndIndex-fieldIndex:0));
                        if(!ret){
                            $(this).attr("oldColspan",field[colspanAttr]).addClass("hasModifiedColspan");
                        }
                        return ret;
                    }
                    */
                   // adjustCount++;
                    var isHide = fieldIndex < hideEndIndex;
                    if(isHide){
                        //adjustHideCount++;
                        col.css("width","1px");     //用0在有colspan情況下，不會收縮(PPH.VSM可看)
                    }
                    else{
                        col.css("width",(field.width || oThis.defaultWidth) + "px");
                    }
                    //return isHide;
                });//.hide();
                /*
                var startIndex = this.fixColumnsCount;
                for(var i=startIndex;i<hideEndIndex;i++){
                    this.jq(".s-grid-head-table tr th:nth-child(" + (i+1) +")").addClass(hideCellCls).hide();
                    this.jq(".s-grid-body-table tr td:nth-child(" + (i+1) +")").addClass(hideCellCls).hide();
                }
                */
                this._lastHideEndIndex = hideEndIndex;
                //this._onFixHideTitleCells && this._onFixHideTitleCells(startIndex,hideEndIndex);
            }

            this._lastScrollLeft = scrollTop;
            //var d2 = new Date();
            //console.log("time:" + (d2-d1)/1000,",adjustCount:" + adjustCount + ",adjustHideCount:" + adjustHideCount);
            //可能會有一行都不顯示,那沒關係,把欄寬放小就好了,user喜歡拖太長就這樣
        }
    };
});