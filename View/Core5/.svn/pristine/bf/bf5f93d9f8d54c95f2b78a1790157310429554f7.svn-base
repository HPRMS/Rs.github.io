sjs.loadCss("Core5.Widget.Input")
.loadCss("Core5.Shp.Icon")
.using("Core5.Component")
.using("Core5.Widget.Mixin.Pop")
.define(function(component,pop){
    return {
        $extend:component
        ,regUIObj:true
        ,$mixin:[pop]
        ,rightIcon:"cog"        //配置項,未提供動態變更chevron-down
        ,rightClearIcon:"remove-circle"

        ,"-s-command":true
        ," s-click":"popClick"
        ,textFromValue:true     //text值是根據value來,還是外部給?
        ,disabledClass:"s-command-disabled"
        
        ,init:function(){
            this.$base();
            this._initValueText();
        }
        
        ,_initValueText:function(){
            this._initData("value");         //格式化一下
            !this.textFromValue && this._initData("text");
        }
        
        ,_setValue:function(value,change){
            this._innerSetText();
            if(this.clearable && this.isRender()){
                if(value){
                    this.jq(".s-command-icon").removeClass("icon-" + this.rightIcon).addClass("icon-" + this.rightClearIcon);
                }
                else{
                    this.jq(".s-command-icon").removeClass("icon-" + this.rightClearIcon).addClass("icon-" + this.rightIcon);
                }
            }
        }
        
        ,_innerSetText:function(input){
            if(this.textFromValue){           //text是從value過來的,text也不會單獨變化。但是像select,items也影響text
                var text = this.format(typeof(input)=="undefined" ? this.value:input);
                text = text === null || typeof(text)=="undefined" || text ==="" ?"&nbsp;":text;
                this.set("text",text);
            }
        }
        
        ,_setText:function(text,change){
            if(this.isRender() && change){
                this.jq(".s-command-text").html(text);
            }
        }

        ,format:function(value){
            return value;// + "-bbb";    //轉成字符串出去,好讓override可以統一處理
        }
        
        ,inner:function(){
            return [
                {
                    "-s-command-text":true
                    //," title":this.text       //TODO:text改變時要同步更新title，現在暫時關閉
                    ,inner:this.text
                }
                ,{
                    inner:"&nbsp;"
                    ,"-s-command-btn":true
                }   
                ,{
                    "-s-command-icon":true
                    ,"-icon":true
                    ," class":"icon-" + (this.clearable && this.value ? this.rightClearIcon:this.rightIcon)
                    ,inner:"&nbsp;"
                    ," s-click":"clearIconClick"
                }
            ];
        }    
        
        ,onPopClick:function(){
            this.showPop();
            this.clickEvt && this.report(this.clickEvt);
        }

        ,onClearIconClick:function(src,e){
            if(this.clearable & !!this.value){
                this.clearValueAndText();
                e.stopPropagation();
            }
        }

        ,clearValueAndText:function(){
            var oldValue = this.get("value");
            this.set("value",null);
            return oldValue;
        }

        ,setValue:function(value){
            this.set("value",value);
            return this;
        }        
        
    }
});