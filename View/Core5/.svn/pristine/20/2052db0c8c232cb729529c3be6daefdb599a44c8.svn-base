/*
讓Table和TableLayout的大部分config保持一致
*/
sjs.loadCss("Core5.Html.Layout")
.define(function(){
    return {
        tableClass:''
        ,tableStyle:''
        ,tableAttr:''
        ,cellSpacing:1
        ,cellPadding:0
        
        ,thAttr:""
        ,thStyle:""
        ,thClass:""
        
        ,tdAttr:""
        ,tdStyle:""
        ,tdClass:""
        
        //使用items組合tr
        ,_table:function(fields,rows){
            return {
                tag:"table"
                ,attribute:this.tableAttr
                ," class":this.tableClass
                ," style":this.tableStyle
                ," cellspacing":this.cellSpacing
                ," cellpadding":this.cellPadding
                ,"-s-grid-layout":true                
                ,inner:[
                    this._thead(fields)
                    ,this._tbody(fields,rows)
                ]
            }
        }
        
        ,_thead:function(fields){
            return {
                tag:"thead"
                ,inner:this._thsTr(fields)
            }
        }
        
        ,_thsTr:function(fields){
            return {
                tag:"tr"
                ,inner:this._ths(fields)
            };
        }
        
        ,_ths:function(fields){
            var ret = [];
            if(fields){
                for(var i=0;i<fields.length;i++){
                    ret.push(this._th(fields[i],i,fields));
                }
            }
            return ret;
        }     
        
        ,_th:function(field,fieldIndex,fields){
            return {
                tag:"th"
                ,"-s-field-prompt":true
                ,attribute:(this.thAttr || "") + (this.thAttr && field.thAttr?" ":"") + (field.thAttr || "")
                ," class":(this.thClass || "") + (this.thClass && field.thClass?" ":"") + (field.thClass || "")
                ," style":(this.thStyle || "") + (this.thStyle && field.thStyle?";":"") + (field.thStyle || "")
                ,inner:field.prompt || "&nbsp;"
            }
        }
                        
        ,_tbody:function(fields,rows){
            return [{
                tag:"tbody"
                //," id":this._domId + "_tbody"
                //items是tds ok了的
                ,inner:this._trs(fields,rows)
            }]
        }
        
        ,_trs:function(fields,rows){
            var ret = [];
            if(rows && fields){
                for(var i=0;i<rows.length;i++){
                    ret.push(this._tr(rows[i],i,fields,rows));
                }
            }
            return ret;
        }
        
        ,_tr:function(row,rowIndex,fields,rows){
            return {
                tag:"tr"
                ,attribute:this.trAttr
                ," class":this.trClass
                ," style":this.trStyle
                ,inner:this._tds(row,rowIndex,fields,rows)
            }
        }
        
        ,_tds:function(row,rowIndex,fields,rows){
            var ret = [];
            for(var i=0;i<fields.length;i++){
                ret.push(this._td(fields[i],i,row,rowIndex,fields,rows));
            }
            return ret;
        }
        
        ,_td:function(field,fieldIndex,row,rowIndex,fields,rows){
            //item.addClass && item.addClass("s-grid-content-item");
            return {
                tag:"td"
                ,"-s-field-content":true
                //,"-s-grid-content-no-item":!item.addClass
                
                ,attribute:(this.tdAttr || "") + (this.tdAttr && field.tdAttr?" ":"") + (field.tdAttr || "")
                ," class":(this.tdClass || "") + (this.tdClass && field.tdClass?" ":"") + (field.tdClass || "")
                ," style":(this.tdStyle || "") + (this.tdStyle && field.tdStyle?";":"") + (field.tdStyle || "")
                //留下了接口，可以临时虚拟一个getHtml方法，来接收row,rowIndex等参数
                ,inner:typeof(field.getHtml)=="function" ? field.getHtml(row,rowIndex,this):field
            };
        }

        
    };
});