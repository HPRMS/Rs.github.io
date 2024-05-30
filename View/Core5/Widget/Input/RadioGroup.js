sjs.using("Core5.ListContainer")
.using("Core5.Widget.Input.Toggle")
.define(function(listContainer,toggle) {
    return {
        $extend:listContainer 
        
        ,"-s-radiogroup":true
        
        ,itemType:{
            $extend:toggle
            ,onToggleClick:function(){
                //if(!this.toggle){
                    this.report("itemSelect",this.data);
                //}
            }
        }
        
        //這三個不要同時設定為null哦
        //這些都不是動態變化的，都是控制view的靜態數據，所以做配置
        //textField(可為valueField)和iconField必須設定一個,也可以同時設定
        ,textField:"text"           //與item不綁定，不做變化
        ,iconField:null             //有這個,則全部用這個icon,只是樣式不一樣
        ,checkIcon:null
        ,noneIcon:null
        ,icon:null
        
        ,_getItemCfg:function(item,itemIndex){
            var field = this.textField || this.valueField;
            return {
                text:field ? item[field] : (this.iconField?null:item)
                ,checkIcon:this.iconField ? item[this.iconField] : this.checkIcon || this.icon
                ,noneIcon:this.iconField ? item[this.iconField] : this.noneIcon || this.icon
                ,data:item
                ,"-s-tgl-left":itemIndex==0
                ,toggle:(this.valueField?item[this.valueField]:item) == this.selected
            };
        }
                        
        //操作子對象toggle時，是通過綁定數據來控制UI，而不是直接調用setToggle方法
        //UI事件取代為數據事件
        ,onItemSelect:function(toggle,data){
            this.set("selected",this.valueField?data[this.valueField]:data);
            this.onCommand(this.selected);             //用onClick而不是report,可以用配置的方式onClick直接回應事件,而不用report到上面去      
                  
        }
        
        //,evt:""
        
        ,onCommand:function(s){
            if(this.evt){
                var item = this._getItemByValue(s);
                this.report(this.evt,s,item?item.data:null,item.text);
            }
        }
                
        ,valueField:"value"

        ,init:function(){
            this.$base();
            this._initData("selected");             //這個是value值        
        }
        
        //通過value選取item                
        ,_getItemByValue:function(value){
            //有沒有指定數據，記得用id來標識,如this.mp
            var items = this._items || [];        //控件即數據，控件集即數據集(this._children也行)
            for(var i=0;i<items.length;i++){
                var data = items[i].data;
                var itemValue = this.valueField ?  data[this.valueField]:data;
                if(itemValue === value){
                    return items[i];
                }   
            }
            return null;
        }
        
        ,_setSelected:function(selected,change,oldSelected){
            if(change){
                var oldItem = this._getItemByValue(oldSelected);
                oldItem && oldItem.setToggle(false);              //可能是第一次選中（上次的選中為null）
                var item = this._getItemByValue(selected);
                item && item.setToggle(true);                     //可能是clear
            }
        }
                        
        //選取值
        ,select:function(value){
            //if(value=="b")
            ////debugger;
            this.set("selected",value);
            return this;
        }
                
        //如果null也是一個值，怎么辦？
        //就用null表達吧，要不然外面怎么取？
        //依database來控制吧
        ,clear:function(){
            this.select(null);
            return this;
        }      
        /*
        ,getSelected:function(){
            return this.selected;
        }
        */
        /*
        ,items:[
            {
                value:"a"
                ,text:"aa"
            }
            ,{
                value:"b"
                ,text:"bb"
            }
            ,{
                value:"c"
                ,text:"cc"
            }
        ]
        
        ,selected:"b"
        */
        
    }
});