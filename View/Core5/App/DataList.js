﻿/*資料查詢控件(含分頁,grid和查詢)*/
sjs.using("Core5.Layout.AutoFit")
.using("Core5.Container")
.using("Core5.Widget.Form")
.using("Core5.Layout.Form")
.using("Core5.Layout.Layout")
.using("Core5.Widget.Button")
.using("Core5.Widget.Table")

.using("Core5.Widget.Table.RowKey")
.using("Core5.Widget.Table.Sort")
.using("Core5.Widget.Table.ColResizer")
.using("Core5.Widget.Table.RowIndex")
.using("Core5.Widget.Table.Select")
.using("Core5.Widget.Table.CheckSelect")
.using("Core5.Widget.Table.RowEvent")
.using("Core5.Widget.Table.Action")
.using("Core5.Widget.Table.FixColumns")
.using("Core5.Widget.Table.ColAdjust")

.using("Core5.App.Pagebar")
.using("Core5.App.DataWindow")

.using("Core5.Bind.BindSource")
.using("Core5.Bind.BindTarget")

.using("Core5.Html.TableLayout")
.using("Core5.Util.DateFn")
.define(function(autoFitLayout,container,form,formLayout,layout,button,table
,rowKey,sort,colResizer,rowIndexer,rowSelect,checkSelect,rowEvent,action,fixColumns,colAdjust
,pagebar,dataWindow,bindSource,bindTarget,htmlTableLayout,dateFn){
    return {
        $extend:container
        ,$mixin:[autoFitLayout,bindSource,bindTarget,dataWindow]

        ,regUIObj:true
        ,"-s-datalist":true

        ,queryVisible:true
        ,pageVisible:true
        //動態產生inner
        ,inner:function(){
            return [
                this.queryFields?this._queryForm():null
                ,this.fields?this._grid():null
                ,this.pageVisible?this._pageBar():null        //分頁必須排序，所以要設定排序進行(pagesize為0時，也顯示一下pageBar，因為有總筆數和狀態訊息等)
            ];
        }
        
        ,queryCellsWidth:null
        ,queryColumnCount:4
        ,queryTdPos:-1
        ,_queryForm:function(){
            var queryFields = this.queryFields = [].concat(this.queryFields);          //fields共用問題,導致引用一致
            //自動加一個query按鈕，以后有需要，可以對這一塊自定義，暫不處理
            if(!this.hideQueryTd){
                var queryTd = this._queryTd();
                if(this.queryTdPos==-1){
                    queryFields.push(queryTd);
                }
                else{
                    queryFields.splice(this.queryTdPos,0,queryTd);
                }
            }

            var columnCount = htmlTableLayout._getColumnCount(this.queryFields,this.queryColumnCount);
            var layoutRows = htmlTableLayout._getLayoutRows(this.queryFields,columnCount);     //直接用table.,而不是this. 可以單獨調用getHtml，不用擔心context問題
            this._queryFormHeight = layoutRows.length * 31 + 1;

            return {
                $extend:form
                ,$mixin:[formLayout,bindTarget,this.queryFormMixin]
                ,cellsWidth:this.queryCellsWidth
                ,"@item":this.queryAsFilter?"filter":"condition"
                ,"@error":"conError"
                //外面已算出,不重複計算
                //不能這樣,因為_getLayoutRows會將fields放進cell.Item,造成field沒有初始化
                //,_initTableLayout:function(){}
                //,_columnCount:columnCount
                //,_layoutRows:layoutRows
                ,columnCount:this.queryColumnCount
                ,inner:this.queryFields
                ,height:this.queryFormHeight || this._queryFormHeight
                ,"-s-query-form":true
                ,visible:this.queryVisible
                ,id:"queryForm"
                ,"@queryStatus":"queryStatus"
                ," s-keyup":"queryFormKeyUp"
            };
        }

        ,onQueryFormKeyUp:function(src, e){
            if (e.keyCode == 13) {
                this.onQuery();
            }
        }
        
        ,_queryBtn:function(){
            return {
                $extend:button
                ,icon:"search"
                ,evt:"query"
                ,text:"<i zh='查詢'>Query</i>"
                //,tdStyle:"padding:0 5px;background-color:#efefef"
                ,";float":"left"
                //,";width":"100px"
                ,";padding":"0 20px"
                ,";border-width":"0"
                ,size:"small"
                ,id:"queryBtn"
                ,$mixin:[bindTarget]
                ,"@visible":"@queryStatus!=1"
                ,";margin-top":"3px"
            };
        }
        
        ,_excelBtn:function(){
            return {
                $extend:button
                ,icon:"download"
                ,evt:"excel"
                ,text:"Excel"
                //,tdStyle:"padding:0 5px;background-color:#efefef"
                ,";float":"left"
                //,";width":"100px"
                ,";margin-left":"10px"
                ,";padding":"0 15px"
                ,";border-width":"0"
                ,size:"small"
                ,id:"excelBtn"
                ,$mixin:[bindTarget]
                ,"@visible":"@queryStatus!=1"
                ,";margin-top":"3px"

            }
        }
        
        ,queryTdColspan:1
        ,queryTdRowspan:1
        ,_queryTd:function(){
            var ret = {
                $extend:container
                ,$mixin:[layout]
                ,tdStyle:"background-color:#E3E3E3"
                ,";padding":"0 15px"
                ,";height":"30px"
                ,";overflow-y":"auto"
                ,";overflow-x":"hidden"     //if so narrow, it will change line, so need y show scrollbar only, but x always hidden(Data Center, or other with excel two buttons to check)
                ,tdAttr:" s-dblclick ='showListQueryService'"
                ,inner:[
                    this._queryBtn()
                    ,this.showExcel?this._excelBtn():null
                ]
                ,colspan:this.queryTdColspan
                ,rowspan:this.queryTdRowspan
                
            };
            return ret;
        }

        ,onShowListQueryService:function(){
            if(this.listQueryService!="ClientTool"){
                alert(this.listQueryService + "." + this.listQueryMethod);
            }
            else if(this.listQuerySql && typeof(this.listQuerySql)=="string"){
                alert(this.listQuerySql.substr(0,1)=="$"?this.listQuerySql.split("@")[0].substr(1):this.listQuerySql);
            }
        }

        ,showExcel:false
        ,onExcel:function(){
            this.excel();
        }        
        
        ,divInterval:3     //query,grid,pagebar的間隔:3px
        ,_grid:function(){
            this.fields = [].concat(this.fields);
            return {
                $extend:this.tableType || table
                ,id:"table"
                ,$mixin:this._gridMixin()
                ,fields:this.fields
                ,titleRows:this.gridTitleRows
                ,top:this.queryFields && this.queryVisible ?this._queryFormHeight + this.divInterval:0        //TODO:以后可能可以根據查詢的行數算出這個高度，目前還是自定義算了
                ,bottom:this.pageVisible?34 + this.divInterval:0
                ,"@items":"rows"
            }
        }

        ,showQueryForm:function(){
            this.queryForm.show();
            this.table.css("top",this._queryFormHeight + this.divInterval + "px");
        }

        ,hideQueryForm:function(){
            this.queryForm.hide();
            this.table.css("top",0);
        }
        
        //,checkFields:null
        //,checked:null
        //,selectFields:null
        //,selected:null
        ,showIndex:true
        ,fixColumnsCount:1
        ,resizeCol:true
        //,tableMixins:[]
        ,_gridMixin:function(){
            var ret  = [bindTarget];        //默認都可以調整欄寬
            if(this.formMixin){
                ret.push({
                    formMixin:this.formMixin
                });
            }
            if(this.fixColumnsCount){
                ret.push(fixColumns);
                ret.push({
                    fixColumnsCount:this.fixColumnsCount
                });
            }
            if(this.sortField || this.sortClient){
                ret.push(sort)
                ret.push({
                    "@sortField":"sortField"
                    ,"@sortSeq":"sortSeq"
                    ,sortEvt:"sort"
                });
            }
            this.resizeCol && ret.push(colResizer);
            this.adjustCol && ret.push(colAdjust);
            this.showIndex && ret.push(rowIndexer);
            if(this.rowKeyFields){
                ret.push(rowKey);
                ret.push(rowEvent);
                ret.push({
                    rowKeyFields:this.rowKeyFields
                });
                if(this.checkEvt){
                    ret.push(checkSelect);
                    ret.push({
                        checked:this.checked
                        ,checkEvt:this.checkEvt
                    });
                }
                if(this.selectEvt){
                    ret.push(rowSelect);
                    ret.push({
                        selected:this.selected
                        ,selectEvt:this.selectEvt
                    });
                }
                if(this.actions){
                    ret.push(action);
                    ret.push({
                        actions:this.actions
                        ,actionStatusEvt:this.actionStatusEvt
                        ,actionWidth:this.actionWidth
                    });
                }
            }
            if(this.tableMixin){
                ret.push(this.tableMixin);
            }
            ret = ret.concat(this.tableMixins || []);
            return ret;
        }
        
        ,pageSizes:[10,50,100,500]
        ,_pageBar:function(){
            return {
                $extend:pagebar
                ,$mixin:[bindTarget,this.pagebarMixin]
                ,pageEvt:"page"
                ,pageSizeEvt:"page"
                ,overflow:"hidden"
                ,"@page":"page"
                ,"@totalCount":"totalCount"
                ,"@pageSize":"pageSize"
                ,bindPageSizeFrom:function(pagesize){
                    return pagesize || 0;
                }
                ,"@totalPage":"totalPage"
                ,"@loading":"queryStatus"
                ,bindLoadingFrom:function(status){
                    return status;                    
                }
                //edited from PCI.Tools.RowEditor, add as default to no show refresh when edited kevin 2023/9/8
                ,"@info":"queryStatus,queryError,_dataListQueryStartTime,_dataListQueryEndTime,_dataListQueryTime,disabled,edited"//
                ,bindInfoFrom:function(status,error,startTime,endTime,querySeconds,disabled,edited){//
                    return (endTime || status==1)
                        ? (
                            "<i zh='查詢於'>Query at </i><b>"
                            + dateFn.formatDate(dateFn.getStrFromDate(startTime)).substr(5)
                            + "</b>"
                            + (
                                status==1
                                ? " ..."
                                : (
                                    endTime
                                    ? "(<i zh='花費'>Spend</i> <b style='color:black'>" + querySeconds + "</b> <i zh='秒'>seconds</i>)"
                                    : ""
                                )
                            )
                            + (
                                status != 1 && !disabled && !edited
                                ? "<font title='click here to try query again' style='cursor:pointer;color:blue;text-decoration:underline;padding-left:5px;padding-right:5px' s-click='pagebarRefresh'>"
                                    + (error ? "<i zh='重試'>Retry</i>" : "<i zh='刷新'>Refresh</i>")
                                    //+ "<i zh='重試'>Retry</i>"
                                    + "</font>"
                                    + (error || "")
                                : ""
                            )
                        )
                        :"";
                }
                ,"@;color=>.info-label":"queryStatus,queryError"
                ,"bind;color=>.info-labelFrom":function(status,error){
                    return status==1?"blue":(error?"red":"gray");
                }

                ,pageSizes:this.pageSizes

                ,bottom:0
                ,height:32

                ,id:"pagebar"
            }
        }
        
        ,onPage:function(){
            this.doPage();
        }
        
        ,onSort:function(){
            this.doSort();
        }
        
        ,onQuery:function(){
            this.queryAsFilter ? this.doFilter() : this.doQuery();
        }

        ,onExcel:function(){
            this.doExcel();
        }

        ,onPagebarRefresh:function(){
            this.doQuery();
        }

        //,"@disabled":"this.queryStatus"         //text等輸入,并沒有disable掉,會造成view和data不一致(以后可通過disabled為計數方式來完成)
    };
});
