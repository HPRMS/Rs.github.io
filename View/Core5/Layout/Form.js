sjs.loadCss("Core5.Layout.Form")
.using("Core5.Layout.Table")//Layout")
.define(function(tableLayout) {
    //cellsWidth照常可用，只是要自己注意prompt th的問題
    return {
        $extend:tableLayout 
        ,"-s-form":true
        ,promptPos:"left"       //or top

        ,_tr:function(cells,rowIndex,rows,data){
            var promptRow = this.promptPos=="top"?this._thsTr(cells,rowIndex,rows,data):null;
            var ret = this.$base(cells,rowIndex,rows,data);
            return [promptRow,ret];
        }
        
        ,_td:function(cell,cellIndex,cells,rowIndex,rows,data,isPrompt){
            var item = cell.item;
            //如果prompot放在top,现在在输出普通行，又没有prompt时，那整个cell都不要（因为已放到上一行promptRow去了)
            if(this.promptPos=="top" && !isPrompt && !item.prompt){
                return null;
            }
            var promptCell =this.promptPos=="left"?this._th(cell,cellIndex,rows[rowIndex],rows,rowIndex):null;
            if(this.promptPos=="left"){
                if(!item.prompt){
                    cell.colspan = (cell.colspan || 1) * 2 - (item.promptColspan || 0);
                }
                else if(cell.colspan > 1){
                    cell.colspan = cell.colspan * 2 - (item.promptColspan || 1);
                }
            }
            else if(this.promptPos=="top"){
                if(!item.prompt){
                    cell.rowspan = (cell.rowspan || 1) + 1;
                }
                else if(cell.rowspan > 1){
                    cell.rowspan = cell.rowspan * 2 - 1;
                }
            }
            //item.addClass && item.addClass("s-field-content-item");
            var ret = this.$base(cell,cellIndex,rowIndex,rows,data);
            ret["-s-form-td"] = true;
            //if(!item.addClass){     //直接内容
            //    ret["-s-field-content-no-item"] = true;
            //}
            return [promptCell,ret];
        }
        
        //直接用對象填滿
        ,_tdTag:function(item,cell,cellIndex,cells,rowIndex,layoutRows){
            return this.noTdTag || item.noTdTag?{       //提供一個不用td包裝的對象，防止ff的td必須加display:block,而又讓colspan失效
                inner:item
                ,attribute:(this.tdAttr || "") + (this.tdAttr && item.tdAttr?" ":"") + (item.tdAttr || "")
                ," class":(this.tdClass || "") + (this.tdClass && item.tdClass?" ":"") + (item.tdClass || "")
                ," style":(this.tdStyle || "") + (this.tdStyle && item.tdStyle?";":"") + (item.tdStyle || "")
            }:item;
        }

        
        ,_thsTr:function(cells,rowIndex,rows,data){
            return {
                tag:"tr"
                ,inner:this._ths(cells,rowIndex,rows,data)
            };
        }
        
        ,_ths:function(cells,rowIndex,rows,data){
            var ret = [];
            for(var i=0;i<cells.length;i++){
                ret.push(this._th(cells[i],i,cells,rowIndex,rows,data));
            }
            return ret;
        }     
        
        ,_th:function(cell,cellIndex,cells,rowIndex,rows,data){
            var item = cell.item;
            if(item.prompt){
                return {
                    tag:"th"
                    ,"-s-form-th":true
                    ,attribute:(this.thAttr || "") + (this.thAttr && item.thAttr?" ":"") + (item.thAttr || "")
                    ," class":(this.thClass || "") + (this.thClass && item.thClass?" ":"") + (item.thClass || "")
                    ," style":(this.thStyle || "") + (this.thStyle && item.thStyle?";":"") + (item.thStyle || "")
                    ,inner:typeof(item.prompt)=="string"?(item.required?"<b title='required' style='color:red'>*</b>":"") + item.prompt + (item.noColon?"":":"):item.prompt
                    ," colspan":this.promptPos=="top" ?( cell.colspan>1?cell.colspan:null):(item.promptColspan || null)
                    ," rowspan":this.promptPos=="left"?( cell.rowspan>1?cell.rowspan:null):(item.promptRowspan || null)
                }
            }
            else if(this.promptPos=="top"){         //没有Prompt，又要放top时，要把原有的提上来
                return this._td(cell,cellIndex,cells,rowIndex,rows,data,true);
            }
            return null;
        }
    }
});