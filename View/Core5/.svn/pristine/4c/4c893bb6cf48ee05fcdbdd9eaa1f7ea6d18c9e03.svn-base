sjs.loadCss(".ReportStyle")
.using("jQuery")
.define(function($){
    return {
        "-s-report-style":true
        /*
        */

        ,_grid:function(fields,rows){
            var ret = this.$base(fields,rows);
            var head = ret[0];
            ret.shift();
            ret.splice(1,0,head);
            head[";display"] = "none";
            return ret;
        }
        ,_gridHeadInner:function(fields,titleRows){
            var ret = this.$base(fields,titleRows);
            var headInner = [].concat(ret.inner);
            headInner.shift();
            this._tmpGridHeadInner = headInner;
            ret[";table-layout"]= "auto";
            return ret;
        }

        //_td,_tds要這樣來，否則形成不了chain
        ,_fillFormMixin:function(ret){
            this.$base(ret);
            ret.push({
                _td:function(field,fieldIndex,row,rowIndex,fields,rows){
                    var ret = this.$base(field,fieldIndex,row,rowIndex,fields,rows);
                    if(ret && rowIndex==0){
                        ret[" s-field-index"] = fieldIndex;
                        ret["-s-width-td"] = true;
                    }
                    return ret;
                }  
            });
        }
        /*
        ,_td:function(field,fieldIndex,row,rowIndex,fields,rows){
            var ret = this.$base(field,fieldIndex,row,rowIndex,fields,rows);
            if(ret && rowIndex==0){
                ret[" s-field-index"] = fieldIndex;
                ret["-s-width-td"] = true;
            }
            return ret;
        }*/


        ,noTdTag:true
        //使用items組合tr
        ,_gridBody:function(fields,rows){
            this._resizeColsWidth = false;
            var ret = this.$base(fields,rows);
            //ret.inner.inner.shift();        //no colgroup
            var headInner = this._tmpGridHeadInner;
            for(var i=headInner.length-1;i>=0;i--){
                //ret.inner.inner.unshift(headInner[i]);
                ret.inner.inner.splice(1,0,headInner[i]);
            }
            ret[";top"] = "0";
            ret.inner[";table-layout"]= "auto";

            return ret;
        }        
        
        ,noAddBlankTd:true   


        ,_gridCol:function(field,fieldIndex){
            delete field.width;
            delete field.paddingLeft;
            delete field.paddingRight;      //在很窄的情況下，padding會占用寬度，導致table不能撐寬寬度
            delete field.width;
            var ret = this.$base(field,fieldIndex);
            ret[" s-field-index"] = fieldIndex;
            delete ret[";width"];
            return ret;
        }

        ,colMinWidth:30
        ,colMaxWidth:200
        
        //showRightScroll時說明會滾動表頭了，這時候需要對齊表頭，所以需要調整
        //showBottomScroll就算沒有右滾動條時也要調整，否則沒有寬度，會在有fixColumnsCount有值時不會滾動了，因為后者不是簡單地調整，而是要算columnWidth調整

        ,_doResize:function(jqWidth,jqHeight){
            this.$base(jqWidth,jqHeight);

            if(this._resizeColsWidth){
                return;
            }
            this._resizeColsWidth = true;
            var oThis = this;
            //window.setTimeout(function(){
                //oThis.jq(".s-grid-body").css("top",headHeight + "px");
                //var bodyWidth = oThis.jq(".s-grid-body-table").width();
                //oThis.jq(".s-grid-body-table").css("width",bodyWidth + "px");
                //return;
                oThis.jq(".s-grid-head").show();
                var headCols = oThis.jq(".s-grid-head-table col");//.s-grid-th");// .s-grid-prompt");
                var bodyCols = oThis.jq(".s-grid-body-table col");//.s-grid-th");
                var bodyThs = oThis.jq(".s-grid-body-table .s-width-td");
                var fields =  this.htmlForm?this.htmlForm.inner:this.fields;
                //var headThs = oThis.jq(".s-grid-body-table .s-grid-th");
                for(var i=0;i<bodyThs.length;i++){        //最后一個不設定，因為又設定table,又設定每個td，可能會對不齊
                    var bodyTh = $(bodyThs[i]);
                    var fieldIndex = bodyTh.attr("s-field-index");
                    if(fieldIndex){
                        fieldIndex = fieldIndex*1;
                        var actualWidth = Math.ceil(bodyTh.width());
                        var field = fields[fieldIndex];
                        var minWidth = field.minWidth || this.colMinWidth || 0;
                        actualWidth = actualWidth < minWidth?minWidth:actualWidth;
                        var maxWidth = field.maxWidth || this.colMaxWidth;
                        if(maxWidth){
                            actualWidth = actualWidth > maxWidth?maxWidth:actualWidth;
                        }
                        field.width = actualWidth;
                    }
                }
                //oThis.jq(".s-grid-body-table").css("table-layout","fixed");
                for(var i=0;i<headCols.length;i++){        //最后一個不設定，因為又設定table,又設定每個td，可能會對不齊
                    var fieldIndex = 1 * $(headCols[i]).attr("s-field-index");
                    $(headCols[i]).css("width",fields[fieldIndex].width + "px");
                    $(bodyCols[i]).css("width",fields[fieldIndex].width + "px");
                    //console.log(fieldIndex + ":" + fields[fieldIndex].width);
//                    $(headThs[i]).width(widths[i]);
//                    $(bodyThs[i]).width(widths[i]);
//                    //$(headThs[i]).height(heights[i]) + "px";
                    //$(bodyThs[i]).height(heights[i]) + "px";
                }
                oThis.jq(".s-grid-body-table").css("table-layout","fixed");//css("width",bodyWidth + "px");
                oThis.jq(".s-grid-head-table").css("table-layout","fixed");//css("width",bodyWidth + "px");

                //var headHeight = oThis.jq(".s-grid-head").height();
                oThis.jq(".s-grid-r-scroll").css("top",0);// headHeight+ "px");//
                //oThis.jq(".s-grid-body").css("top",headHeight + "px");

            //},1000);
        }        


    };
});