sjs.using("Core5.Util.DataFn")
.define(function(dataFn){
    var itemSelectMixin = {
        regUIObj:true
        ,init:function(){
            this.$base();
            this._initData("selected");
        }
        
        ,_setSelected:function(selected,change,oldSelected){
            this.setClass("s-item-selected",selected);
        }     
        
        ,setSelected:function(selected){
            this.set("selected",selected);
        }
           
        ," s-click":"clickItem"
        ,onClickItem:function(src,e){
            if(e.ctrlKey){
                this.report("itemSelect",!this.selected);
            }
            else{
                this.report("select");
            }
            e.stopPropagation();        //不冒泡了，因為click空白處要取消選取所有
        }
    };

    return {                        
        //操作子對象toggle時，是通過綁定數據來控制UI，而不是直接調用setToggle方法
        //UI事件取代為數據事件               
        //valueField:"value"
        
        _getItemCfg:function(item,itemIndex){
            var ret = this.$base(item,itemIndex);
            ret.selected = false;           //會初始化一次selected，不著急
            ret._keyValue = this.valueField?item[this.valueField]:item;
            ret.$mixin = ret.$mixin || [];
            ret.$mixin.push(itemSelectMixin);
            return ret;
        }
        
        ,onItemSelect:function(item,selected){
            var keyValue = item._keyValue;
            selected?(dataFn.indexOf(this.selected,keyValue)<0?this.add("selected",keyValue):""):this.remove("selected",keyValue);
            this.mulSelectEvt && this.report(this.mulSelectEvt,selected,checked,data);
        }

        ,onSelect:function(item){
            this.select([item._keyValue]);
            this.selectEvt && this.report(this.selectEvt,this.selected);
        }
        
        ,init:function(){
            this.$base();
            this._initData("selected",[]);             //這個是value值
        }
                
        ,_getItemByValue:function(value){
            var items = this._items;
            if(items){
                for(var i=0;i<items.length;i++){
                    if(items[i]._keyValue === value){
                        return items[i];
                    }   
                }
            }
            return null;
        }
        
        //此不方法不外部調用，因為沒有判斷存不存在
        ,_addSelected:function(items,index,keyValue){
            var item = this._getItemByValue(keyValue);
            item && item.setSelected(true);
        }
        
        ,_removeSelected:function(items,index,keyValue){
            var item = this._getItemByValue(keyValue);
            item && item.setSelected(false);
        }    
        
        ,_setSelected:function(selected){
            var items = this._items;        //控件即數據，控件集即數據集(this._children也行)
            if(items){
                for(var i=0;i<items.length;i++){
                    var item = items[i];
                    item.setSelected(dataFn.indexOf(selected,item._keyValue)>=0);
                }
            }
        }
                
        //選取值
        ,select:function(value){
            this.set("selected",value);     //不將null或undefined變成[]，主要是因為如果是綁定情況時，如果對象內部換數擾（引用），則到時就綁定不起來了
            return this;
        }
        
        ,clear:function(){
            this.select([]);
            return this;
        }

        ,regUIObj:true
        ," s-click":"clickBlank"
        ,onClickBlank:function(){
            //console.log("click blank");
            this.clear();
            this.mulSelectEvt && this.report(this.mulSelectEvt,this.selected);
            
        }

           
    };
});