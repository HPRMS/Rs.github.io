/*可輸入可選的combox*/
/*給合text和一個button，用于show dropdownlist*/
sjs.loadCss("Core5.Widget.Input")
.loadCss("Core5.Shp.Icon")
.using("Core5.Widget.Input.Select")
.using("Core5.DomEvent.oninput")
.define(function(select){
    return {
        $extend:select
        ,regUIObj:true
        ,rightIcon:"chevron-down"        
        ,"-s-combox":true
        ,"-s-command":null
        ,disabledClass:"s-combox-disabled"
        ," s-click":null

        ,inner:function(){
            return [
                {
                    tag:"input"
                    ,tagNoInner:true 
                    ,"-s-combox-input":true
                    ," s-change":"input"
                    ," value":this.text?('' + this.text).replace(/"/g,"&quot;"):""
                    ," type":this.inputType
                    ,attribute:this.inputAttr
                    ," readonly":this.isDisabled()?true:null
                }
                ,{
                    inner:"&nbsp;"
                    ,"-s-combox-btn":true
                    ," s-click":"popClick"
                }                
                ,{
                    "-s-combox-icon":true
                    ,"-icon":true
                    ," class":"icon-" + this.rightIcon
                    ,inner:"&nbsp;"
                    ," s-click":"popClick"
                }
            ];
        }    
        
        ,onDisabledChange:function(){
            var disabled = this.isDisabled();
            if(this.isRender()){
                this.jq(".s-combox-input").prop("readonly",disabled);
            }
        }     

        ,_setText:function(text,change){
            if(this.isRender() && change){
                this.jq(".s-combox-input").val(text);
            }
        }

        ,noForceMatchItem:true      //不一定要在items中

        ,_innerSetText:function(){
            if(this.textFromValue){           //text是從value過來的,text也不會單獨變化。但是像select,items也影響text
                var text = this.format(this.value);
                this.set("text",text);
            }
        }

        ,onInput:function(ipt,e,text){
            this.set("value",text);
            this.evt && this.report(this.evt,text);
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