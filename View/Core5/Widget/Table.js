/*
因現在的table和form之間使用兩種方式定義，造成寫了table的field不能很好的重用在form視圖中
因此改變思路，不再使用table方式，而是統一采用form的欄位定義方式
即把form對象當作一個控件來使用，一直用它getHtml？如果需要render，就使用Grid.js來實現
*/
sjs.loadCss("Core5.Widget.Table")
.using("Core5.Component")
.using("Core5.Html.Grid")
.using("Core5.Html.GridMixin")
.using("Core5.Widget.Form")
.using("Core5.Util.EventManager")
.using("Core5.DomEvent.onmouseclass")
.using("Core5.DomEvent.oncontextmenu")
.define(function(component,grid,gridMixin,form,eventManager){
    return {
        $extend:component
        ,"-s-table":true
        ,$mixin:[grid,gridMixin]
        ,init:function(){
            this.$base();
            this.setFields(this.fields,true);
            this._initData("items",[]);
        }

        ,_fillFormMixin:function(ret){
        }

        ,noTdTag:false

        //,regUIObj:true    //COMMENT BECAUSE MAYBE ERROR WHEN PARENTS HAS ON-EVENT
        //," s-rightclick":"clickShowFieldTitle"

        //,onClickShowFieldTitle:function(src,e){
        //    if(e.target && e.target.getAttribute){
        //        var title = e.target.getAttribute("title");
        //        title && eventManager.publish(this,"displayLoadingMsg","common",title.replace(/\n/g,"<br>"));
        //    }
        //}

        ,_initHtmlForm:function(){
            var ret = [];
            this._fillFormMixin(ret);
            this.createChild(form,{
                id:"htmlForm"

                ,tag:"tr"
                ,defaultItemType:"label"        //默認只讀
                ,"-s-grid-body-tr":true          
                
                //," s-overClass":"s-grid-tr-over"        
                ,getHtml:function(){
                    this.setClass("s-grid-body-tr-odd",!this.parent.noTrOdd && this.rowIndex % 2==1);
                    !this.parent.noTrOver && this.attr("s-overClass","s-grid-tr-over");
                    return this.$base();
                }
                ,_itemsHtml:function(html,items){
                    var tds = this._tds(this.item,this.rowIndex,this.inner,this.parent.rows);
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
                ,_td:this._td       //直接這樣過來$base的鏈條會斷掉，所以請在_fillFormMixin中override _td這樣的方法
                ,_tdInner:this._tdInner
                ,noTdTag:this.noTdTag
                ,inner:this.fields
                ,_initInnerItem:function(itemCfg,itemIndex){
                    var oldInitDomId = itemCfg.initDomId;       //保證欄位cfg不被修改
                    itemCfg.initDomId = function(){};           //不寫入dom id，否則會在document中產生多個相同的id
                    //暫時不能加,因為有很多程式已經在運行了,它們要得到這個sjs object
                    //button(Core5.App.EditGrid,還有rowEvt等)和con(Core5.Widget.Table.Action)已經有用到這里面的對象在做事
                    //所以暫時這兩個對象放開,以對象回應事件
                    //還是不做任何處理了,如果不要回應事件,請記得手動在field中設定regUIObj:false,否則容易讓obj內部的dom event往上擴散
                    if(itemCfg.mouseoverShowTitle || itemCfg.align=="left" && itemCfg.width>120 && !itemCfg.noShowTdTitle){
                        itemCfg.$mixin = itemCfg.$mixin || [];
                        itemCfg.$mixin.push({
                            _setText:function(text,change){
                                this.$base(text,change);
                                this.attr("title",text);
                            }
                        });
                    }
                    var ret = this.$base(itemCfg,itemIndex);
                    if(!oldInitDomId){
                        delete itemCfg.initDomId;
                    }
                    else{
                        itemCfg.initDomId = oldInitDomId;
                    }
                    if(itemCfg.mouseoverShowTitle || itemCfg.align=="left" && itemCfg.width>120 && !itemCfg.noShowTdTitle){
                        itemCfg.$mixin = itemCfg.$mixin || [];
                        itemCfg.$mixin.pop();
                    }

//                    if(itemCfg.type!="button" && itemCfg.type!="con"){
//                        if(typeof(oldRegUIObj)=="undefined"){
//                            delete itemCfg.regUIObj;
//                        }
//                        else{
//                            itemCfg.regUIObj = oldRegUIObj;
//                        }
//                    }
                    return ret;
                }
                /*
                ,_initInnerItem:function(itemCfg,itemIndex){
                    var newMixin = {initDomId : function(){}};
                    if(itemCfg.push){
                        itemCfg.push(newMixin);
                    }
                    else{
                        itemCfg = [itemCfg,newMixin];
                    }
                    return this.$base(itemCfg,itemIndex);
                }
                */

            },this.formMixin,ret,{});
        }

        ,inner:function(){
            return this._grid(this.htmlForm.inner,this.items);
        }
                
        ,_tbody:function(fields,rows){
            var ret = [];
            if(rows){
                for(var i=0;i<rows.length;i++){
                    this.htmlForm.rowIndex = i;
                    this.htmlForm.setItem(rows[i]);
                    ret.push(this.htmlForm.getHtml());
                }
                this.htmlForm.setItem({});        //清0，因為此對象只是UI模板，不具對象性質.不用null，item必須要有，否則會出錯
            }
            return [{
                tag:"tbody"
                ,inner:ret
            }];
        }

        /*
        ,setRows:function(rows){
            this.set("rows",rows);
            return this;
        }
        
        ,_setRows:function(rows){
            this._updateInner();
        }
        */

        ,setItems:function(items){
            this.set("items",items);
            return this;
        }
        
        ,_setItems:function(items){
            this._updateInner();
        }



        //如果是display:none的，_initScroll會沒用
        ,_updateInner:function(){
            if(this.isRender()){
                this._disposeScroll();
                var html = [];
                this.innerHtml(html);
                this.jq().html(html.join(""));
                this._initScroll();      
            }          
        }

        ,setFields:function(fields,noRefresh){
            this.fields = fields;
            this.htmlForm && this.htmlForm.dispose();
            this._initHtmlForm();
            if(!noRefresh){
                this._updateInner();
            }
        }
        
    };
});