sjs.using("Core5.Widget.Input.Command")
.using("Core5.Widget.Input.RadioGroup")
.using("Core5.Widget.Input.Formatter.Item")
.define(function(command,radioGroup,itemFormatter){
    return {
        $extend:command
        ,$mixin:[itemFormatter]
        
        ,_initValueText:function(){
            this._initData("items",[]);         //格式化一下
            this.$base();
        }
        
        ,rightIcon:"chevron-down"
        
        ,popType:radioGroup
        
        ,maxPopHeight:200
        ,minPopWidth:200
        ,_getPopConfig:function(){
            //console.log("forceFullEqualSelected:",this.forceFullEqualSelected);
            return { 
                textField:this.textField
                ,valueField:this.valueField
                ,";max-height":this.maxPopHeight + "px"
                ,";min-width":this.minPopWidth + "px"
                ,";overflow-y":"auto"    
                ,"-s-radiogroup-select":true
                ,evt:"popSelect" 
                ,forceFullEqualSelected:this.forceFullEqualSelected
            };
        }
        
        //可override此方法,提供一個享元pop,避免浪費
        ,_getPop:function(popType){
            var ret = this.$base(popType);
            //alert(this.value);
            ret.setItems(this.items).css("width",this.jq().outerWidth() + "px").select(this.value);
            return ret;
        } 
        
        //,evt:"select"
        
        ,onPopSelect:function(group,v,item,itemIndex){
            this.pop.hide();
            var oldValue = this.get("value");
            this.setValue(v);
            if(!this.textFromValue){
                var text = typeof(this.textField)=="function" ? this.textField(item):item[this.textField || this.valueField];                
                this.set("text",text);
            }
            //還是數據要記得和初始化保持一致，不建議這種專為某個事件或操作的數據出現和使用
            //this.set("selectItem",item);            //not selectedItem，only for this event select
            this.evt && this.report(this.evt,v,item,itemIndex,oldValue);
        }

        ,clearValueAndText:function(){
            var oldValue = this.$base();
            this.evt && this.report(this.evt,null,null,-1,oldValue);
        }
        
        //如果是共用怎么辦,所以不能這樣設定,只能等pop彈出時設定
        /*
        ,_setByItems:function(items){
            this.pop && this.pop.setItems(items);
        }
        
        ,_setBySelected:function(selected){
            this.pop && this.pop.select(selected);
        }
        */
        
        ,_setItems:function(items,change){
            this._innerSetText();           //value和items同時影響text，所以items變化時，也要變化，和radiogroup不一樣，后者設定items，會重設inner，所以沒關係
            this.pop && this.pop.set("items",items);
        }

        ,_setValue:function(value,change){
            this.$base(value,change);
            this.pop && this.pop.select(this.value);
        }
        
        ,setItems:function(items){
            this.set("items",items);
            return this;
        }
        
        /*
        ,items:[
            {
                value:"a"
                ,text:"a1"
            }
            ,{
                value:"b"
                ,text:"b1"
            }
            ,{
                value:"c"
                ,text:"c1"
            }
        ]
        
        ,value:"b"
        */
    }
});