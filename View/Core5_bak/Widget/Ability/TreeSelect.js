sjs.define(function(){
    var treeNodeSelect = {
        init:function(){
            this.$base();
            this._initData("selected");
        }
        
        ,_setSelected:function(selected,change,oldSelected){
            selected ? this.addClass("s-tree-selected"): this.removeClass("s-tree-selected");
            //if(selected){
            //    window.location.hash = this._domId;
            //}
        }     
        
        ,setSelected:function(selected){
            this.set("selected",selected);
        }
           
        ,onClickTitle:function(){
            if(!this.selected){
                this.report("treeNodeSelect");
            }
        }
    };

    function getItemBykey(items,key){
        if(items){
            for(var i=0;i<items.length;i++){
                if(items[i].key === key){
                    return items[i];
                }
                if(items[i].treeBody){
                    var selectSubNode = getItemBykey(items[i].treeBody.inner,key);
                    if(selectSubNode!==null){
                        return selectSubNode;
                    }
                }
            }
        }
        return null;
    }

    var treeSelect = {                        
        //操作子對象toggle時，是通過綁定數據來控制UI，而不是直接調用setToggle方法
        //UI事件取代為數據事件
        onTreeNodeSelect:function(node){
            //this._newItem = node;
            this.set("selected",node.key);
            this.selectEvt && this.report(this.selectEvt,this.selected,node);
        }

        ,getItemBykey:function(key){
            return getItemBykey(this.inner,key);
        }

        ,_getItemCfg:function(item,itemIndex){
            var ret = this.$base(item,itemIndex);
            ret.selected = this.selected === item.key;
            return ret;
        }

        //,evt:""
        //," s-test":"aa"
        ,nodeMixin:treeNodeSelect
        ,init:function(){
            var oThis = this;           //用閉包?
            this.treeMixin = {
                _getItemCfg:function(item,itemIndex){
                    var ret = this.$base(item,itemIndex);
                    ret.selected = oThis.selected === item.key;
                    return ret;
                }
                /*
                ,_initItem:function(item,itemIndex){
                    var ret = this.$base(item,itemIndex);
                    if(ret.selected){
                        oThis._oldItem = ret;
                    }
                    return ret;
                }
                */
            };
            this.$base();
            this._initData("selected");             //這個是value值        
        }
        
        ,_setSelected:function(selected,change,oldSelected){
            //if(this.isRender()){
                var oldItem = getItemBykey(this.inner,oldSelected);
                oldItem && oldItem.setSelected(false);              //可能是第一次選中（上次的選中為null）
                //this._oldItem && this._oldItem.setSelected && this._oldItem.setSelected(false);
                //var item = this._newItem || getItemBykey(this.inner,selected);
                var item = getItemBykey(this.inner,selected);
                //this._newItem = null;
                item && item.setSelected(true);                     //可能是clear
                //this._oldItem = item;
            //}
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

    return treeSelect;
});