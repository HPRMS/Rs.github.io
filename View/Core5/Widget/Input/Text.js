sjs.loadCss("Core5.Widget.Input")
.using("Core5.Component")
.using("Core5.Widget.Mixin.Input")
.using("Core5.DomEvent.oninput")
.define(function(component,input) {
    return {
        $extend:component
        ,$mixin:[input]
        ,regUIObj:true
        ,"-s-text":true
        ,inputType:"text"
        ,init:function(){
            this.$base();
            this.emptyText && this.attr("title",this.emptyText);        //only the first time add title(IE8,IE9)
        }
        ,inner:function(){
            var ret = {
                tag:"input"
                ,tagNoInner:true 
                ,"-s-text-input":true
                //," s-change":"input"
                ," s-focus":"iptFocus"
                ," s-blur":"iptBlur"
                ," s-mouseup":"mouseup"
                ," value":this._text?this._text.replace(/"/g,"&quot;"):""
                ," type":this.inputType
                ," readonly":this.isDisabled()?true:null
                ," maxlength":this.maxlength
                ," placeholder":this.emptyText          //IE10,IE11才支援
                ,attribute:this.inputAttr
            };
            ret[this.keyInput ? " s-keyup" : " s-change"] = "input";
            return ret;
        }

        ,onIptFocus:function(){
            if(!this.isDisabled()){  
                !this.error && this.renderInputText(true);
                this._needSelect = true;
            }
        }

        ,onIptBlur:function(){
            !this.error && this.renderInputText();
        }

        //_focues for bug，狂閃select和blur事件，光標在input中狂閃
        ,onMouseup:function(ipt,e){
            //fix for : designer drag move up on input, also can response mouseup event
            if(this._needSelect){
                this._needSelect && ipt[0].select();
                this._needSelect  = false;
                e.stopPropagation();        //cancel mouseup return false in DragMove.js
            }
        }

        ,focus:function(){
            if(this.isRender()){
                var ipt = this.jq(".s-text-input")[0];
                ipt.focus();
                ipt.select();
                this._needSelect  = false;
            }
        }

        ,onDisabledChange:function(){
            var disabled = this.isDisabled();
            this.setClass("s-readonly",disabled);
            if(this.isRender()){
                this.jq(".s-text-input").prop("readonly",disabled);
            }
        }
        
        ,_set_text:function(text,change){
            if(this.isRender()){                  //不用change，因為_text的值可以被用戶直接輸入改變，不能把值正確記錄到這個控件中
                this.jq(".s-text-input").val(text);
            }
        }
        
        ,onInput:function(ipt,e,text){
            if(!this.isDisabled()){        
                this.setInput(text);
            }
        }
        
        ,_setError:function(error,change){
            if(change){
                this.setClass("s-input-error",error);
                this.attr("title",error || null);
            }
        }
    }
});