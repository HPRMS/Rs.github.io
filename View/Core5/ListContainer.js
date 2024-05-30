/*以數據的方式動態產生inner（並且通過各種mixin，可以對items產生的inner自定義，如分組，分層，tree等）*/
sjs.using("Core5.Component")
.using("Core5.Container")
.define(function(component,container) {
    return {
        $extend:container

        /**
        @data {array object}
        data of the ListContainer
        */
        //items:[]
        
        ,init:function(){
            this.$base();
            //items作為數據，而不是inner寫入
            this._initData("items",[]);
        }
                   
        ,itemType:component
        
        ,_getItemType:function(item,itemIndex){
            return this.itemType;
        }

       //這里的index會有問題，當remove后，后面的index會變化。閉包也會有問題。謹慎使用這個itemIndex
        ,_getItemCfg:function(item,itemIndex){
            return {
                //item:item
                //,itemIndex:itemIndex
                //"@item":"items." + itemIndex        //使用綁定語法
            };
        }
        
        /*
        ,_initInnerItem:function(item,itemIndex){
            var itemCfg = this._getItemCfg(item,itemIndex);
            itemCfg.$extend = this.itemType;
            return this.$base(itemCfg);
        }
        
        //,items_NOT_ALLOWED_NULL:true
        
        ,_setItems:function(items){
            //debugger
            this.setInner(items);
        }
        
        */
        
        ,_initItem:function(item,itemIndex){
            var cfg = this._getItemCfg(item,itemIndex);
            cfg.$extend = this._getItemType(item,itemIndex);
            if(this.itemMixin){
                cfg.$mixin = cfg.$mixin || [];
                cfg.$mixin.push(this.itemMixin);
            }
            return this._initInnerItem(cfg,itemIndex);
            //return this.createChild(this._getItemType(item,itemIndex),cfg.$mixin,cfg);
        }
        
        ,_itemsContainerJq:function(){
            return "";//"#" + this._domId;
        }
        
        //上面那樣寫也是一樣的，一個是直接把數據當作item，然後再在_initInnerItem中初始化中對象
        //下面這個則直接是本質，即將items轉成對象后，再放到inner中。感覺更清晰一些，所以采用下面這種寫法（雖然多了一個迴圈）
        ,_setItems:function(items,change){
            //if(this["@items"] == "item.PURD_ITEMS")
            ////debugger
            if(!change && !this.ignoreItemsCompareOnSet){
                //alert('nochange return');
                return;
            }
            this.setInner("render");        //先disposeInner掉
            var inner = [];
            if(items){
                for(var i=0;i<items.length;i++){
                    inner.push(this._initItem(items[i],i));
                }
            }
            this._items = [].concat(inner);
            this.setInner(inner);
        }

        ,_dyRenderItem:function(innerItem,index){
            this.renderItem(innerItem
                ,index == 0?(this._items[0]?this.INSERT_BEFORE:true):this.INSERT_AFTER
                ,index == 0?(this._items[0]?"#" + this._items[0]._domId:this._itemsContainerJq()):"#" + this._items[index-1]._domId
            );
        }
        
        ,_addItems:function(items,index,item){
            if(this.isRender()){            //只能在render后調用的工具方法
                //var innerItem = this._initInnerItem(item,index);
                var innerItem = this._initItem(item,index);
                ////debugger;
                this._dyRenderItem(innerItem,index);
                this._items.splice(index,0,innerItem);
                /*
                //innerItem.container = this;
                if(index == items.length-1){
                    //TODO:如果items有layout，則要重新取得這個domID
                    innerItem.renderTo(this._itemsContainerJq(),true);
                    //要按順序插入，所以不用container本身的renderItem方法
                    //其實應該再用一個變量來按順序記錄inner，這樣更符合本質一些
                    this.inner.push(innerItem);         //不為展示了，只為以后setInner時，這個也會正常dispose掉
                    
                }
                else{
                    var con = "#" + this.inner[index]._domId;
                    innerItem.renderTo(con,this.INSERT_BEFORE);
                    this.inner.splice(index,0,innerItem);         //不為展示了，只為以后setInner時，這個也會正常dispose掉
                }
                */
            }
        }
                
        ,_removeItems:function(items,index,item){
            ////debugger
            if(this.isRender()){            //只能在render后調用的工具方法
                //dispose時會調用splice方法，從inner中移除
                //this.inner[index].dispose();
                this._items[index].dispose();
                this._items.splice(index,1);
            }
        }
        
        
        ,setItems:function(items){
            this.set("items",items);
            return this;
        }
        
        ,addItem:function(item,index){
            this.add("items",item,index);
        }
        
        ,removeItem:function(item){
            this.remove("items",item);
        }
        
        ,removeItemAt:function(index){
            this.removeAt("items",index);
        }
        
    }
});