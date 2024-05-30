sjs.define(function(){
    return {
        init:function(){
            this.$base();
            this._initData("width",0);
            this._initData("height",0);
        }

        ,_setWidth:function(width){
            this.css("width",!isNaN(width)?(width?width+"px":0):"auto");
        }

        ,_setHeight:function(height){
            this.css("height",!isNaN(height)?(height?height+"px":0):"auto");
        }

        ,getWidth:function(){
            return this.isRender()?this.jq().width():this.width;
        }

        ,getHeight:function(){
            return this.isRender()?this.jq().height():this.height;
        }

        ,setWidth:function(width){
            this.set("width",width);
            return this;
        }

        ,setHeight:function(height){
            this.set("height",height);
            return this;
        }
    }
});