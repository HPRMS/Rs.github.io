/*
disable功能
*/
sjs.define(function(){
    return {
        /**
        @data {bool}
        {default:false}
        if false,it will be no responsed to the child or dom event.
        */
        disabled:false
        
        /**
        @config {string}
        add class when set to disabled.
        */
        ,disabledClass:"s-disabled"         //可以在具體widget中用這個class帶來提示效果
                
        ,init:function(){
            this.$base();
            this._initData("disabled");
        }
        
        
        //view(响应model事件)-----------------------------------------------------
        ,_setDisabled:function(disabled,change){
            if(!change){
                return;
            }
            //UI的反應一般要依change，而數據的改變則不依change
            disabled ? this._disable() : this._enable();
        }
        
        ,_disable:function(){
            this.addClass(this.disabledClass);
        }
        
        ,_enable:function(){
            this.removeClass(this.disabledClass);
        }
        
        //model(操作数据)--------------------------------------------------------
        ,isDisabled:function(){
            return this.disabled;
        }
        
        ,disable:function(){
            this.set("disabled",true);
            return this;            
        }
        
        ,enable:function(){
            this.set("disabled",false);
            return this;            
        }     

        ,setDisabled:function(disabled){
            this.set("disabled",disabled);
            return this;
        }

    };
});