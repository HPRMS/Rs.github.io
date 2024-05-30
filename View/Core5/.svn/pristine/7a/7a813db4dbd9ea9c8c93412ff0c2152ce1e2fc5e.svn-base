/*
Component的mixin，提供show/hide功能
*/
sjs.define(function(){
    return {
        /**
        @data {bool}
        show or hide
        */
        //visible:true
      
        /**
        @config {items}
        -visible:use visibility(display) to show or hide component
        -display(undefined):(default),{ref:@displayBlock}
        */
        //displayMode:"display"      //還有visible
                
        init:function(){
            this.$base();
            this._initData("visible",true);
        }
        
        ,_setVisible:function(visible,change){
            if(!change){
                return;
            }
            if(this.displayBlock || this.isRender()){
                visible?this._show():this._hide();
            }
            else{
                if(visible){
                    this.css(this.displayMode=="visible"?"visibility":"display",null);           //null表示不輸出display屬性
                }
                else{
                    this.displayMode=="visible"?this.css("visibility","hidden"):this.css("display","none");
                }
            }
            //真正用這個回應比較好點
            this.onVisibleChange && this.onVisibleChange(visible);
        }   
        
        /**
        @config {items}
        {c:displayMode != "visible"}
        if displayMode is not setting to visible,it can be set:<br>
        -inline:visible true,use display:inline to show
        -inline-block:display:inline-block
        -block:[default]
        */
        //displayBlock:"block"
        ,_show:function(){
            this.displayMode=="visible"?this.css("visibility","visible"):this.css("display",this.displayBlock || "block");
        }
        
        ,_hide:function(){
            this.displayMode=="visible"?this.css("visibility","hidden"):this.css("display","none");
        }   
        
        ,isVisible:function(){
            return this.visible;
        }
                       
        ,show:function(){
            this.set("visible",true);
            return this;
        }
        
        ,hide:function(){
            this.set("visible",false);
            return this;
        }   
             
        ,setVisible:function(visible){
            this.set("visible",visible);
            return this;
        }
    };
});