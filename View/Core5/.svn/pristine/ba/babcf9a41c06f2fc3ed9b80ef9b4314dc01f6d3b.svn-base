sjs.loadCss("Core5.Widget.Input")
.using("Core5.Component")
.using("Core5.DomEvent.oninput")
.define(function(component) {
    return {
        $extend:component
        ,regUIObj:true
        ,"-s-textarea":true
        //,rows:3
        //,lineHeight:20
        ,disabledClass:"s-textarea-disabled"
        
        ,inner:function(){
            return {
                tag:"textarea"
                ,"-s-textarea-input":true
                ," s-change":"input"
                //," onfocus":"var me=this;window.setTimeout(function(){me.select()},10)"         //chrome,opeara,safari由為onmouseup事件，會讓focus一閃而過
                //," rows":this.rows
                //,";height":(this.lineHeight * this.rows) +"px"

                ," s-focus":"iptFocus"
                ," s-mouseup":"mouseup"

                ," readonly":this.isDisabled()?true:null
                ,inner:this.value
            };
        }

        ,onIptFocus:function(){
            //console.log("onfocus");
            if(!this.isDisabled()){  
                this._focused = true;
            }
        }

        ,onMouseup:function(ipt,e){
            this._focused && ipt[0].select();
            this._focused  = false;
            e.stopPropagation();        //cancel mouseup return false in DragMove.js
        }


        ,onDisabledChange:function(){
            var disabled = this.isDisabled();
            this.setClass("s-readonly",disabled);
            if(this.isRender()){
                this.jq(".s-textarea-input").prop("readonly",disabled);
            }
        }


        /*
        ,setValue:function(value){
            this._set("value",value);
            return this;
        }
        */

        ,_setValue:function(value,change){
            this.isRender() && change && this.jq(".s-textarea-input").val(value);
        }
        
        ,onInput:function(ipt,e,text){
            this.set("value",text);
            this.evt && this.report(this.evt,this.value);
        }
        
        //,value:"Hello\n第二行"

    }
});