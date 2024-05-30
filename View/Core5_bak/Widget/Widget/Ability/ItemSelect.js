sjs.define(function(){
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
        ,onClickItem:function(){
            if(!this.selected){
                this.report("itemSelect");
            }
        }
    };

    function getItemBykey(items,key){
        if(items){
            for(var i=0;i<items.length;i++){
                if(items[i].key === key){
                    return items[i];
                }
            }
        }
        return null;
    }

    return {                        
        //操作子對象toggle時，是通過綁定數據來控制UI，而不是直接調用setToggle方法
        //UI事件取代為數據事件
        onItemSelect:function(item){
            this.set("selected",item.key);
            this.selectEvt && this.report(this.selectEvt,this.selected,item);
        }

        ,_getItemCfg:function(item,itemIndex){
            var ret = this.$base(item,itemIndex);
            ret.selected = this.selected === item.key;
            ret.key = item.key;
            ret.$mixin = ret.$mixin || [];
            ret.$mixin.push(itemSelectMixin);
            return ret;
        }

        ,init:function(){
            this.$base();
            this._initData("selected");             //這個是value值        
        }
        
        ,_setSelected:function(selected,change,oldSelected){
            if(this.isRender()){
                var oldItem = getItemBykey(this._items,oldSelected);
                oldItem && oldItem.setSelected(false);              //可能是第一次選中（上次的選中為null）
                var item = getItemBykey(this._items,selected);
                item && item.setSelected(true);                     //可能是clear
            }
        }
                        
        //選取值
        ,select:function(value){
            this.set("selected",value);
            return this;
        }
                
        ,clear:function(){
            this.select(null);
            return this;
        }      
    };
});