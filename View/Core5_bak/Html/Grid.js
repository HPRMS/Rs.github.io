/*
grid控件，為保持外部接口一致，繼承自table
但是可以鎖定表頭
*/
sjs.loadCss("Core5.Html.Grid")
.define(function(){
    return {
        "-s-grid":true
        ,cellSpacing:0
        ,defaultWidth:120

        ,gridHeadRowHeight:27
        //,gridBodyRowHeight:27
        ,_grid:function(fields,rows){
            //其實第一行是30，上border被table拿去,下border算在下一個上面，中間的是31，最后的是32（2px bottom），而table top border(1px)在最后加
            //因此乾脆全部是31，然後最后一行是32就好
            if(this[";position"] != "static"){
                this._headerHeight = this.headerHeight || ((this.titleRows?this.titleRows.length:0) * this.gridHeadRowHeight + this.gridHeadRowHeight);//-1;//31 + 31;//32;
                return [
                    this._gridHead(fields,this.titleRows)
                    ,this._gridBody(fields,rows)
                    ,this._gridRightScroll()
                    ,this._gridBottomScroll()
                ];
            }
            else{
                this._headerHeight = 0;
                return this._gridBody(fields,rows);
            }
        }
        
        ,_gridRightScroll:function(){
            return {
                "-s-grid-r-scroll":true
                ,";top":this._headerHeight + "px"
                ,inner:{
                    "-s-grid-r-scroll-inner":true
                }
            }
        }
        
        ,_gridBottomScroll:function(){
            return {
                "-s-grid-b-scroll":true
                ,inner:{
                    "-s-grid-b-scroll-inner":true
                }
            }
        }
        
        //使用items組合tr
        ,_gridHead:function(fields,titleRows){
            return {
                "-s-grid-head":true
                ,inner:this._gridHeadInner(fields,titleRows)
            };
        }
        
        ,_gridHeadInner:function(fields,titleRows){
            return {
                tag:"table"
                ," cellspacing":this.cellSpacing
                ," cellpadding":0       //td中設定padding來代替
                ,"-s-grid-head-table":true      //暫不允許grid嵌套grid(萬一以后需要，這里要用id代替class)
                ,inner:
                    [
                        this._gridColgroup(fields)//this.headCellsWidth || this.cellsWidth)
                        ,this._thsTr(fields,0,titleRows)
                        ,titleRows?this._gridHeadExt(titleRows):null
                    ]
            };
        }
        
        ,_gridHeadExt:function(titleRows){
            var ret = [];
            for(var i=0;i<titleRows.length;i++){
                ret.push(this._thsTr(titleRows[i],i+1,titleRows));
            }
            return ret;
        }
        
        ,_thsTr:function(fields,titleRowIndex,titleRows){
            return {
                tag:"tr"
                ,"-s-grid-head-tr":true
                ,inner:this._ths(fields,titleRowIndex,titleRows)
            };
        }
        
        ,_ths:function(fields,titleRowIndex,titleRows){
            var ret = [];
            if(fields){
                for(var i=0;i<fields.length;i++){
                    if(fields[i].prompt !== null){
                        ret.push(this._th(fields[i],titleRowIndex,i,fields,titleRows));
                    }
                }
            }
            !this.noAddBlankTd && ret.push(this._thBlank(titleRowIndex,titleRows));
            return ret;
        }  
         
        //拖動需要被差異，然後多行表頭時，需要它控制行高對齊
        ,_thBlank:function(titleRowIndex,titleRows){
            var totalRows = titleRows?titleRows.length+1:1;            
            return {
                tag:"th"
                ,"-s-grid-th":true
                ,"-s-grid-th-blank":true
                ,"-s-grid-th-up":titleRowIndex< totalRows-1
                ,inner:{
                    "-s-grid-prompt":true
                    ,inner:"&nbsp;"
                }
                //,";width":"20px"
            };
        }  
        
        ,_th:function(field,titleRowIndex,fieldIndex,fields,titleRows){
            var colspan = field.colspan || 1;
            var totalRows = titleRows?titleRows.length+1:1;
            var rowspan = field.rowspan || (!titleRowIndex && titleRows?titleRows.length+1:1);

            return {
                tag:"th"
                ,"-s-grid-th":true
                ,"-s-grid-th-up":titleRowIndex + (rowspan-1)< totalRows-1
                //,";width": this.headCellsWidth || this.cellsWidth?null:(field.width || this.defaultWidth) * colspan + (colspan-1) + "px"  
                ," colspan":colspan==1?null:colspan
                ," rowspan":rowspan==1?null:rowspan  
                //多行表頭時，要注意設定好不同行的padding，以免和body對不齊
                ,";padding-left":field.paddingLeft?field.paddingLeft + "px" : null              
                ,";padding-right":field.paddingRight?field.paddingRight + "px" : null              
                ,attribute:(this.thAttr || "") + (this.thAttr && field.thAttr?" ":"") + (field.thAttr || "")
                ," class":(this.thClass || "") + (this.thClass && field.thClass?" ":"") + (field.thClass || "")
                ," style":(this.thStyle || "") + (this.thStyle && field.thStyle?";":"") + (field.thStyle || "")

                ,inner:this._thInner(field,titleRowIndex,fieldIndex,fields)
            };
        }      
        
        ,_thInner:function(field,titleRowIndex,fieldIndex,fields){
            if(!field.noGridPrompt){
                return {
                    "-s-grid-prompt":true
                    ,attribute:(this.thInnerAttr || "") + (this.thInnerAttr && field.thInnerAttr?" ":"") + (field.thInnerAttr || "")
                    ," class":(this.thInnerClass || "") + (this.thInnerClass && field.thInnerClass?" ":"") + (field.thInnerClass || "")
                    ," style":(this.thInnerStyle || "") + (this.thInnerStyle && field.thInnerStyle?";":"") + (field.thInnerStyle || "")
                    ,inner:field.prompt || "&nbsp;"
                    ," title":field.noTitle?null:field.titleText || field.prompt || null
                };
            }
            else{
                return field.prompt || "&nbsp;";
            }
        }
        
        //使用items組合tr
        ,_gridBody:function(fields,rows){
            var ret= {
                "-s-grid-body":true
                ,";top":this._headerHeight + "px"                
                ,inner:{
                    tag:"table"
                    ," cellspacing":this.cellSpacing
                    ," cellpadding":0
                    ,"-s-grid-body-table":true                
                    ,inner:[
                        this._gridColgroup(fields)
                        ,this._tbody(fields,rows)     //_tbody是接口，請子類實現
                    ]
                }
            };
            if(this[";position"] == "static"){
                ret[";position"]  = "static";
                var gridHeader = this._gridHeadInner(fields,this.titleRows);
                gridHeader.tag = "thead";
                gridHeader.inner.shift();//     不要head里的colgroup了
                ret.inner.inner.splice(1,0,gridHeader);
            }
            return ret;
        }           
                                

        //下面為line form的設定
        ,_tds:function(row,rowIndex,fields,rows){
            var ret = [];
            if(fields){
                for(var i=0;i<fields.length;i++){
                    ret.push(this._td(fields[i],i,row,rowIndex,fields,rows));
                }
            }
            !this.noAddBlankTd && ret.push(this._tdBlank());
            return ret;
        }
        
        //拖動需要被差異，然後多行表頭時，需要它控制行高對齊
        ,_tdBlank:function(){
            return {
                tag:"td"
                ,"-s-grid-td":true
                ,"-s-grid-td-blank":true   
                ,inner:"&nbsp;"
            };   
        }

        ,_td:function(field,fieldIndex,row,rowIndex,fields,rows){
            //return field;
            var colspan = field.bodyColspan || 1;
            var rowspan = field.bodyRowspan || 1;
            var ret= this._tdInner(field,fieldIndex,row,rowIndex,fields,rows);
            ret.tag = "td";
            ret["-s-grid-td"] = true;
            //if(!this.cellsWidth){
            //    ret[";width"] = (field.width || this.defaultWidth) * colspan + (colspan-1) + "px";
            //}
            ret[";padding-left"] = field.paddingLeft?field.paddingLeft + "px" : null;
            ret[";padding-right"] = field.paddingRight?field.paddingRight + "px" : null;
            ret[";text-align"] = field.align || null;
            ret[" colspan"] = colspan==1?null:colspan;
            ret[" rowspan"] = rowspan==1?null:rowspan;    

            ret["attribute"] = field.tdAttr || "";
            ret[" class"] = field.tdClass || "";
            ret[" style"] = field.tdStyle || "";

            return ret;
        }     

        ,_tdInner:function(field,fieldIndex,row,rowIndex,fields,rows){
            return this.noTdTag || field.noTdTag?{       //提供一個不用td包裝的對象，防止ff的td必須加display:block,而又讓colspan失效
                inner:field
            }:field;
        }


        ,_gridColgroup:function(fields){
            //if(fields){
                var cols = [];
                //for(var i=0;i<cellsWidth.length;i++){
                for(var i=0;i<fields.length;i++){
                    cols.push(this._gridCol(fields[i],i));
                }
                return {
                    tag:"colgroup"
                    ,inner:cols
                };
            //}
            //return "";
        }
        
        ,_gridCol:function(field,fieldIndex){
            return {
                tag:"col"
                ,tagNoInner:true
                //和將樣式設定在td中不一樣，設定在col里面的width，會將td padding包含在內，因此這里補上paddingLeft和paddingRight的值
                ,";width":(field.width?field.width:this.defaultWidth) + (field.paddingLeft || 0) + (field.paddingRight || 0)+ "px"
            };
        }

    };
});