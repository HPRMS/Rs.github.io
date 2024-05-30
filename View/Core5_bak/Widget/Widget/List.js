/*
因現在的table和form之間使用兩種方式定義，造成寫了table的field不能很好的重用在form視圖中
因此改變思路，不再使用table方式，而是統一采用form的欄位定義方式
即把form對象當作一個控件來使用，一直用它getHtml？如果需要render，就使用Grid.js來實現
*/
sjs.using("Core5.Component")
.define(function(component){
    return {
        $extend:component
        ,init:function(){
            this.$base();
            this.initItemComponent();
            this._initData("items",[]);
        }

        ,inner:function(){
            return this._list(this.items);
        }

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
                var html = [];
                this.innerHtml(html);
                this.jq().html(html.join(""));
            }          
        }

        ,itemType:component


        ,initItemComponent:function(){
            this.createChild({
                $extend:this.itemType
                ,id:"itemComponent"
                ,initDomId:function(){}
                ,init:function(){
                    this.$base();
                    this._initData("item",{});
                }

                ,_setRowIndex:function(rowIndex){
                    this.attr("row-index",rowIndex);
                }

                ,regUIObj:true

                ,onRowEvt:function(btnOrSrc,srcOrE,e){
                    var evt = btnOrSrc.jq?btnOrSrc.rowEvt:btnOrSrc.attr("s-evt");
                    var jq = btnOrSrc.jq?srcOrE:btnOrSrc;
                    var rowIndex = jq.parents("[row-index]")[0].getAttribute("row-index") * 1;
                    this.response(this,evt,rowIndex);
                }

                ,_initInnerItem:function(itemCfg,itemIndex){
                    var oldInitDomId = itemCfg.initDomId;      
                    itemCfg.initDomId = function(){};           
                    var ret = this.$base(itemCfg,itemIndex);
                    if(!oldInitDomId){
                        delete itemCfg.initDomId;
                    }
                    else{
                        itemCfg.initDomId = oldInitDomId;
                    }
                    return ret;
                }
            });
        }

        ,_list:function(rows){
            var ret = [];
            if(rows){
                for(var i=0;i<rows.length;i++){
                    this.itemComponent.set("rowIndex",i);
                    this.itemComponent.set("item",rows[i]);
                    ret.push(this.itemComponent.getHtml());
                }
                this.itemComponent.set("item",{});        //清0，因為此對象只是UI模板，不具對象性質.不用null，item必須要有，否則會出錯
                this.itemComponent.set("rowIndex",-1);        //清0，因為此對象只是UI模板，不具對象性質.不用null，item必須要有，否則會出錯
            }
            return ret;
        }
    };
});