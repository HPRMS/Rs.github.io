sjs.loadCss("Core5.Shp.Icon")
.loadCss("Core5.Widget.Button")
.using("Core5.Component")
.using("Core5.DomEvent.onmouseclass")
.define(function(component) {
    return {
        $extend:component
        ,regUIObj:true
        ," s-click":"command"
        
        ,size:""
        ,"-s-btn":true
        ," s-overClass":"s-btn-over"
        ," s-downClass":"s-btn-down"
        
        ,getHtml:function(){
            this.size && this.addClass("s-btn-" + this.size);
            !this.icon && this.addClass('s-btn-no-left-icon');
            !this.rightIcon && this.addClass('s-btn-no-right-icon');
            !this.text && this.addClass('s-btn-notext' + (this.size?"-" + this.size:""));
            return this.$base();
        }
        
        ,inner:function(){
            var inner = [];
            if(this.icon){                             //不管有沒有icon,初始值時請一定設定icon
                inner.push({
                    "-icon":true
                    ,"-s-btn-icon":true
                    ," class":"icon-" + this.icon
                    ,inner:"&nbsp"
                });
            }
            if(this.rightIcon){
                inner.push({
                    "-icon":true
                    ,"-s-btn-icon-right":true
                    ," class":"icon-" + this.rightIcon                    
                    ,inner:"&nbsp"
                });
            }
            inner.push({
                inner:typeof(this.text)=="undefined" || this.text===null || ('' + this.text).length==0?"&nbsp;":this.text
                ,"-s-btn-text":true
            });
            return inner;
        }
        
        ,_setIcon:function(icon,change,oldIcon){
            if(change && this.isRender()){
                this.jq(".s-btn-icon").removeClass("icon-" + oldIcon).addClass("icon-" + icon);
            }
        }
        
        ,_setRightIcon:function(icon,change,oldIcon){
            if(change && this.isRender()){
                this.jq(".s-btn-icon-right").removeClass("icon-" + oldIcon).addClass("icon-" + icon);
            }
        }
                
        ,_setText:function(text,change){
            if(change && this.isRender()){
                this.jq(".s-btn-text").html(text===null || ('' + text).length==0?"&nbsp;":text);
            }
        }

        //外部調用(外部不要直接調用set方法)
        ,setIcon:function(icon){
            this.set("icon",icon);
            return this;
        }
        
        ,setRightIcon:function(icon){
            this.set("rightIcon",icon);
            return this;
        }
        
        ,setText:function(text){
            this.set("text",text);
            return this;
        }

        ,disabledBtnClass:"s-btn-disabled"
        ,onDisabledChange:function(){
            var disabled = this.isDisabled();
            if(!this._overDownClassSetting){
                this._overClass = this[" s-overClass"];
                this._downClass = this[" s-downClass"];
                this._overDownClassSetting = 1;
            }
            this.disabledBtnClass && this.setClass(this.disabledBtnClass,disabled);
            this.attr("s-overClass",disabled?null:this._overClass);
            this.attr("s-downClass",disabled?null:this._downClass);
            this.removeClass(this._overClass);
            this.removeClass(this._downClass);
        }

        /**
        @data {string} text
        button text
        */
             
        /**
        @event
        ,evt:""
        */

        //如果要直接在這個配置中寫事件，則直接overide onClick就可以了
        //如果要在上一層回應事件，不設置this.command，可以通過onCommand回應，如果設置this.command，如copy，則可以在上層用onCopy響應
        ,onCommand:function(src,e){
            this.evt && this.report(this.evt,src,e);
        }
        
//        ,text:"測試"
//        ,icon:"edit"
    }
});