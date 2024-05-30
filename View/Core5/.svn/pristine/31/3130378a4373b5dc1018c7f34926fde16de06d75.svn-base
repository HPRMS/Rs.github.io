sjs.loadCss("Core5.Widget.Input.CheckGroup")
.using("Core5.ListContainer")
.using("Core5.Widget.Input.CheckBox")
.using("Core5.Util.DataFn")
.using("Core5.Layout.Float")
.define(function(listContainer,checkbox,dataFn,floatLayout) {
    return {
        $extend:listContainer 

        ,$mixin:[floatLayout]
        
        ,"-s-checkgroup":true
        
        ,itemType:checkbox
        
        ,textField:"text"           //與item不綁定，不做變化
//        ,iconField:null             //有這個,則全部用這個icon,只是樣式不一樣
//        ,checkIcon:null
//        ,noneIcon:null
//        ,icon:null
//        
        ,_getItemCfg:function(item,itemIndex){
            var itemValue = this.valueField?item[this.valueField]:item;
            var checked = dataFn.indexOf(this.selected,itemValue)>=0;

            return {
                text:this.textField ? item[this.textField] : null
//                ,checkIcon:this.iconField ? item[this.iconField] : this.checkIcon || this.icon
//                ,noneIcon:this.iconField ? item[this.iconField] : this.noneIcon || this.icon                
                ,data:item
                ,evt:"itemSelect"
                //,checked:false  //設不設定無所謂，因為后面會初始化selected
                //動態設定items時，需要設定
                ,checked:checked
            };
        }
        
        ,onItemSelect:function(toggle,checked){
            var data = toggle.data;
            var itemData = this.valueField?data[this.valueField]:data;
            checked?this.add("selected",itemData):this.remove("selected",itemData);
            this.onCommand(this.selected,checked,itemData);             //用onClick而不是report,可以用配置的方式onClick直接回應事件,而不用report到上面去      
        }
        
        //,evt:"select"
        
        ,onCommand:function(selected,checked,data){
            //console.log("set checked:" + selected);
            this.evt && this.report(this.evt,selected,checked,data);
            //alert(selected + "\n" + checked + "\n" + data);
        }
        
        ,valueField:"value"

        ,init:function(){
            this.$base();
            this._initData("items",[]);
            this._initData("selected",[]);             //這個是value值
        }
                
        ,_getItemByValue:function(value){
            var items = this.inner;
            for(var i=0;i<items.length;i++){
                var data = items[i].data;
                var itemValue = this.valueField ?  data[this.valueField]:data;
                if(itemValue === value){
                    return items[i];
                }   
            }
            return null;
        }
        
        ,_setSelected:function(selected){
            var items = this._items;        //控件即數據，控件集即數據集(this._children也行)
            if(items){
                for(var i=0;i<items.length;i++){
                    var item = items[i];
                    var itemValue = this.valueField?item.data[this.valueField]:item.data;
                    items[i].setChecked(dataFn.indexOf(selected,itemValue)>=0);
                }
            }
        }
        
        //此不方法不外部調用，因為沒有判斷存不存在
        ,_addSelected:function(items,index,item){
            //console.log("set checked true again");
            this._getItemByValue(item).setChecked(true);
        }
        
        ,_removeSelected:function(items,index,item){
            this._getItemByValue(item).setChecked(false);
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
        
        /*
        ,items:[
            {
                value:"a"
                ,text:"中文 xxyyaa"
            }
            ,{
                value:"b"
                ,text:"bb fdas aaa bbb fdasfdas dfa s"
            }
            ,{
                value:"c"
                ,text:"cc"
            }
            ,{
                value:"d"
                ,text:"dd"
            }
        ]
        
        ,selected:["b","c"]
        */
    }
});