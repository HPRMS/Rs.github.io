sjs.using("Core5.Widget.Input.Command")
.using("Core5.Widget.Input.CheckGroup")
.using("Core5.Widget.Input.Formatter.Items")
.define(function(command,checkGroup,itemsFt){
    return {
        $extend:command
        ,$mixin:[itemsFt]
        ,rightIcon:"chevron-down"
        
        
        ,_initValueText:function(){
            this._initData("items",[]);         //格式化一下
            this.$base();
        }

        ,popType:checkGroup
        
        ,maxPopHeight:200
        ,minPopWidth:200
        ,_getPopConfig:function(){
            return { 
                textField:this.textField
                ,valueField:this.valueField
                ,";max-height":this.maxPopHeight + "px"
                ,";min-width":this.minPopWidth + "px"
                ,";overflow-y":"auto"    
                ,evt:"popSelect" 
            };
        }
        
        //可override此方法,提供一個享元pop,避免浪費
        ,_getPop:function(popType){
            var ret = this.$base(popType);
            ret.setItems(this.items).css("width",this.jq().outerWidth() + "px").select(this.value);
            return ret;
        } 
        
        //,evt:"select"
        
        ,onPopSelect:function(group,v,checked,item){
            this.setValue(this.value);        //重新顯示就好,value值已自動同步(因為selectList和checkgroup的值是數組,同一個引用)
            this.evt && this.report(this.evt,v,checked,item);
        }
        
        ,_getByValue:function(value){
            return value || [];         //傳入值是數組或null
        }
        
        ,_getByItems:function(items){
            return items || [];
        }

        ,_setItems:function(items,change){
            if(change){
                this._innerSetText();           //value和items同時影響text，所以items變化時，也要變化，和radiogroup不一樣，后者設定items，會重設inner，所以沒關係
            }
        }

        
        ,setItems:function(items){
            this.set("items",items);
            return this;
        }
        
        ,fieldValueSplit:null        //暫時接收的參數是數組,如果是字符串考慮要轉義
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
            ,{
                value:"d"
                ,text:"dd"
            }
        ]
        
        ,value:["b","d"]
        */
    }
});