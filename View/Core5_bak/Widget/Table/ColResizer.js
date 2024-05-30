﻿/*safari有問題，可能是拖動時改變td寬，然後會影響table寬，然後會重新計算td寬，結果造成不準，可能通過拖完后再一次性改變寬來實現*/
sjs.using("jQuery")
.using("Core5.DomEvent.PopManager")
.using("Core5.DomEvent.DragMove")
.define(function($,popManager){
    return {

        x_grid:function(fields,rows){
            var ret = this.$base(fields,rows);
            ret.push({
                "-resize-div":true
                ,";display":"none"
                ,";border-width":"0 1px"
                ,";border-style":"solid"
                ,";border-color":"gray"
                ,";position":"absolute"
                ,";top":"0"
                ,";bottom":"0"
                ,";left":"30px"
                ,";width":"120px"
            });
            return ret;
        }

        ,_gridCol:function(field,fieldIndex){
            var ret = this.$base(field,fieldIndex);
            ret[" resizeFieldIndex"] = fieldIndex;
            return ret;
        }


        ,_th:function(field,titleRowIndex,fieldIndex,fields,titleRows){
            var ret = this.$base(field,titleRowIndex,fieldIndex,fields,titleRows);
            if(ret && ((field.colspan || 1)<2) && titleRowIndex==0 && !field.noResize){
                var inner = ret.inner;      //div.s-grid-prompt     
                var resier = {                    
                    "-s-grid-resizer":true
                };
                resier[" s-drag"] = this._objId;     //本身拖動
                resier[" s-dragStart"] = "resizeStart";
                resier[" s-dragMove"] = "resizeMove";
                resier[" s-dragEnd"] = "resizeEnd";
                //ret[" s-minWidth"] = field.minWidth || 20;
                ret[" fieldIndex"] = fieldIndex;
                inner.inner = [
                    inner.inner
                    ,resier
                ];            
            }
            return ret;
        }   
        
        ,_fillFormMixin:function(ret){
            this.$base(ret);
            ret.push({
                _td:function(field,fieldIndex,row,rowIndex,fields,rows){
                    var ret = this.$base(field,fieldIndex,row,rowIndex,fields,rows);
                    if(ret && !field.noResize){        
                        if(rowIndex==0){
                            ret[" fieldIndex"] = fieldIndex;
                        }
                    }
                    return ret;
                }  
            });
        }
           
        

        ,onResizeStart:function(dragSrc,e,addParam){
            var cell = dragSrc.parent().parent();//parents("th")[0];//.parent();//s("td")[0];
            ////debugger;
            var pos = cell.offset();
            this._resizeFieldIndex = parseInt(cell.attr("fieldIndex"));
            //兼容grid，沒有統一用this.fields，是因為table時如果資料重載，會重新用this.htmlForm來呈現，這時需要保持上次adjust的欄寬
            var resizeField = this.htmlForm?this.htmlForm.inner[this._resizeFieldIndex]:this.fields[this._resizeFieldIndex];
            var width = (resizeField.width || this.defaultWidth) + (resizeField.paddingLeft || 0) + (resizeField.paddingRight || 0);//cell.outerWidth();
            //console.log("drag resize start:" + addParam + ",pos.right:" + (pos.left + width) + ",pos.left:" + pos.left);

            if(!$(".s-grid-resize-div").length){
                var html = [];
                html.push("<div class='s-grid-resize-div' style='border-width:0 1px;border-style:solid;border-color:gray;position:absolute;'></div>");
                $("body").append(html.join(""));
            }
            $(".s-grid-resize-div")
                .css("left",pos.left + "px")
                .css("top",this.jq().offset().top + "px")
                .css("z-index",popManager.getTopZIndex() + 1)         //從100開始的
                .height(this.jq().height())
                .width(width)
                .show();
            //this.jq(".resize-div").css("left",pos.left).width(width).show();
            this._resizeStartWidth = width;
            this._resizeMinWidth = resizeField.minWidth || 20;
            this._resizeField = resizeField;
        }

        //這里跟筆數沒關係,雖然500筆會很慢,但除了resize,drag move也會一樣
        //IE,CHROME會這樣,ff看起來好一些
        ,onResizeMove:function(dragSrc,e,addParam){
//            console.log("resize move");
//            //this.jq(".resize-div").width(150 + addParam);
//            return;
            var oldWidth = $(".s-grid-resize-div").width();
            var newWidth = oldWidth + addParam[0];
            var minWidth = this._resizeMinWidth;
            $(".s-grid-resize-div").width(newWidth < minWidth?minWidth:newWidth);
        }

        ,onResizeEnd:function(src,e,addParam){
            //console.log("resize end");
            $(".s-grid-resize-div").hide();
            var newWidth = addParam[0] + this._resizeStartWidth;
            var minWidth = this._resizeMinWidth;
            var resizeField =  this._resizeField;
            //newWidth -= (resizeField.paddingLeft || 0) - (resizeField.paddingRight || 0);
            newWidth = newWidth < minWidth?minWidth:newWidth;
            this.jq("[resizeFieldIndex='" + this._resizeFieldIndex + "']").width(newWidth);
            this._resize(true);  
            resizeField.width = newWidth -(resizeField.paddingLeft || 0) - (resizeField.paddingRight || 0);     
        }
        
               
    };
});