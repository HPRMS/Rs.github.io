﻿/*
由多個Line Form組成的Grid，一般用于批次增刪改，以及資料少的情況
如果是報表顯示，或主要用于查看的grid，請改用Core5.Widget.Table
*/
sjs.loadCss("Core5.Widget.Grid")
.using("Core5.Bind.BindSource")
.using("Core5.Bind.BindTarget")
.using("Core5.ListContainer")
.using("Core5.Html.Grid")
.using("Core5.Html.GridMixin")
.using("Core5.Widget.Form")
.using("Core5.Util.EventManager")
.define(function(source,target,listContainer,grid,gridMixin,form,eventManager){
    return {
        $extend:listContainer
        ,$mixin:[source,grid,gridMixin]
        ,"-s-edit-grid":true
        ,init:function(){
            this.$base();
            this.setFields(this.fields);//,true);
            //this._initData("rows",[]);
            this._initData("error",[]);
        }

        ,_getItemCfg:function(item,itemIndex){
            var ret = this.$base(item,itemIndex);
            var mixin = ret.$mixin = ret.$mixin || [];
            mixin.push(this._getInnerMixin(item,itemIndex));
            mixin.push(target);
            this._fillFormMixin(mixin);
            ret["@item"] = "items." + itemIndex;        //使用綁定語法
            ret["@error"] = "error." + itemIndex;        //使用綁定語法
            ret.bindFieldError = true;
            return ret;
        }

        ,setInner:function(inner){
            this.isRender() && this._disposeScroll();
            this.$base(inner);
            this.isRender() && this._initScroll();
        }

        ,itemType:form

        ,_fillFormMixin:function(ret){
        }

        ,noTdTag:true
        ,_getInnerMixin:function(row,rowIndex){
            return {
                rowIndex:rowIndex

                ,tag:"tr"
                ,defaultItemType:"text"        //默認只讀
                ,"-s-grid-body-tr":true                  
                //," s-overClass":"s-grid-tr-over"        

                ,xgetHtml:function(){
                    this.setClass("s-grid-body-tr-odd",!this.parent.noTrOdd && this.rowIndex % 2==1);
                    return this.$base();
                }
                ,_itemsHtml:function(html,items){
                    var tds = this._tds(this.item,this.rowIndex,this.inner,this.parent.items);//rows);
                    this._itemHtml(html,tds);        
                }

                ,defaultWidth:this.defaultWidth
                ,cellsWidth:this.cellsWidth
                ,attribute:this.trAttr
                ," class":this.trClass
                ," style":this.trStyle
                ,_tds:this._tds
                ,_tdBlank:this._tdBlank
                ,noAddBlankTd:this.noAddBlankTd

                ,_td:this._td       //直接這樣過來$base的鏈條會斷掉
                ,_tdInner:this._tdInner
                ,noTdTag:this.noTdTag
                ,inner:this.fields
            };
        }
        
        ,_itemsHtml:function(html,items){
            ////debugger
            var fields = items.length>0? items[0].inner:this.fields;//.fields;//.inner;
            if(fields){
                var table = this._grid(fields,this.items);
                this._itemHtml(html,table);        
            }
        }
                
        ,_tbody:function(fields){
            return [{
                tag:"tbody"
                ," id":this._domId + "_tbody"
                ,inner:this.inner
            }]
        }

        ,_thInner:function(field,titleRowIndex,fieldIndex,fields){
            var fieldPrompt = (typeof(field.prompt)=="string"?(field.required?"<b title='required' style='color:red'>*</b>":"") + field.prompt:field.prompt) || "&nbsp;"
            if(!field.noGridPrompt){
                var ret = this.$base(field,titleRowIndex,fieldIndex,fields);
                ret.inner = fieldPrompt;
                return ret;
            }
            else{
                return fieldPrompt;
            }
        }

        
        //因為是ListContainer的plugin，所以需要override，告訴包裝后的子項container抓法
        ,_itemsContainerJq:function(){
            return "#" + this._domId + "_tbody";
        }
        
        ,setFields:function(fields,noRefresh){
            this.fields = fields || [];
            if(!noRefresh){
                this.set("items",[].concat(this.items || []));//this._updateInner();
            }
        }

        ,_addItems:function(items,index,item){
            this.$base(items,index,item);
            this.error.splice(index,0,{});
	        this._resize(true);
        }

        ,_removeItems:function(items,index,item){
            this.$base(items,index,item);
            this.error.splice(index,1);
	        this._resize(true);
        }

        //這個會調用_initScroll，后者會_resize(true)
        ,_setItems:function(items,change){
            this.$base(items,change);
            this.set("error",[]);
        }

        ,checkError:function(){
            var ret = [];
            var items = this._items;
            for(var i=0;i<items.length;i++){
                var err = items[i].checkError();
                if(err.length){
                    ret.push("<b style='color:#000084'>" + (i+1) + ":</b>" + err.join("<br>"));
                }
            }
            return ret;
        }

        ,doCheckError:function(){
            var itemsError = this.checkError();
            if(itemsError.length){
                eventManager.publish(this,"displayLoadingMsg","err",itemsError.join("<br>"));
                return false;
            }
            return true;
        }

        /*
        ,setRows:function(rows){
            this.set("rows",rows);
            return this;
        }

        ,_setRows:function(rows){
            this.set("items",rows);
        }
        */
    };
});