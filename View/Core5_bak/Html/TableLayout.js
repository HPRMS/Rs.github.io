sjs.loadCss("Core5.Html.Layout")
.using("Core5.Html.CalTableLayout")
.define(function(calTableLayout){
    //這是個對象式函數，使用new，以config代替參數傳入
    return {
        //這兩個幫助方法，幫忙產生rows,columnCount兩個參數
        _getLayoutRows:function(items,columnCount){
            return calTableLayout(items,columnCount);
        }
        
        ,_getColumnCount:function(items,columnCount){
            return columnCount <=0 || columnCount > items.length?items.length:columnCount;
        }
        /*
        //rows:經過calTableLayout計算過的
        //columnCount也是經過篩選的
        ,tableHtml:function(rows,columnCount,inHtml){
            var tableTag = this._table(rows,columnCount);
            if(inHtml){
                inHtml.push(tableTag);
            }
            else{
                //TODO:tag.html(tableTag);
                return ;
            }
        }
        */
        ,tableClass:''
        ,tableStyle:''
        ,tableAttr:''
        ,cellSpacing:0
        ,cellPadding:0
        
        ,thAttr:""
        ,thStyle:""
        ,thClass:""
        
        ,tdAttr:""
        ,tdStyle:""
        ,tdClass:""
        
        ,cellsWidth:null         //用陣列表示的單元格寬度(因用fixed排版，所以要用第一行來設定寬度)
        
        //override只要加一個參數怎么處理？還沒想到好的方法，所以只能在這里幫忙加一個再說了
        ,_table:function(layoutRows,columnCount){
            return {
                tag:"table"
                ,attribute:this.tableAttr
                ," class":this.tableClass
                ," style":this.tableStyle
                ," cellspacing":this.cellSpacing
                ," cellpadding":this.cellPadding
                ,"-s-layout-table":true
                ,inner:[
                    this._colgroup(columnCount)
                    ,this._tbody(layoutRows)
                ]
            }
        }
        
        ,_colgroup:function(columnCount){
            var cellsWidth = this.cellsWidth;
            if(cellsWidth){
                var cols = [];
                for(var i=0;i<cellsWidth.length;i++){
                    cols.push(this._col(cellsWidth[i]));
                }
                return {
                    tag:"colgroup"
                    ,inner:cols
                };
            }
            return "";
        }
        
        ,_col:function(cellWidth){
            return {
                tag:"col"
                ,tagNoInner:true
                ,";width":cellWidth?cellWidth + (('' + cellWidth).indexOf("%")>0?"":"px"):null
            };
        }
        
        ,_tbody:function(layoutRows){
            return {
                tag:"tbody"
                ,inner:this._trs(layoutRows)
            }
        }
        
        ,_trs:function(layoutRows){
            var ret = [];
            for(var i=0;i<layoutRows.length;i++){
                ret.push(this._tr(layoutRows[i],i,layoutRows));
            }
            return ret;
        }
        
        ,_tr:function(cells,rowIndex,layoutRows){
            return {
                tag:"tr"
                ,attribute:(this.trAttr || "") + (this.trAttr && cells[0] && cells[0].item.trAttr?" ":"") + (cells[0] && cells[0].item.trAttr?cells[0].item.trAttr : "")
                ," class":(this.trClass || "") + (this.trClass && cells[0] && cells[0].item.trClass?" ":"") + (cells[0] && cells[0].item.trClass?cells[0].item.trClass : "")
                ," style":(this.trStyle || "") + (this.trStyle && cells[0] && cells[0].item.trStyle?";":"") + (cells[0] && cells[0].item.trStyle?cells[0].item.trStyle : "")
                ,inner:this._tds(cells,rowIndex,layoutRows)
            };
        }
        
        ,_tds:function(cells,rowIndex,layoutRows){
            var ret = [];
            for(var i=0;i<cells.length;i++){
                ret.push(this._td(cells[i],i,cells,rowIndex,layoutRows));
            }
            return ret;
        }
        
        ,_td:function(cell,cellIndex,cells,rowIndex,layoutRows){
            var ret = this._tdTag(cell.item,cell,cellIndex,cells,rowIndex,layoutRows);
            ret.tag = "td";
            //,"-s-table-layout-td":true
            ret[" colspan"] = cell.colspan>1?cell.colspan:null;
            ret[" rowspan"] = cell.rowspan>1?cell.rowspan:null;
            //ret["-s-form-item-" + cell.index] = true;
            return ret;
        }

        ,_tdTag:function(item,cell,cellIndex,cells,rowIndex,layoutRows){
            return {
                attribute:(this.tdAttr || "") + (this.tdAttr && item.tdAttr?" ":"") + (item.tdAttr || "")
                ," class":(this.tdClass || "") + (this.tdClass && item.tdClass?" ":"") + (item.tdClass || "")
                ," style":(this.tdStyle || "") + (this.tdStyle && item.tdStyle?";":"") + (item.tdStyle || "")
                ,inner:this._tdInner(item,cell,cellIndex,cells,rowIndex,layoutRows)
            };
        }

        ,_tdInner:function(item,cell,cellIndex,cells,rowIndex,layoutRows){
            return item;
        }

    };
});