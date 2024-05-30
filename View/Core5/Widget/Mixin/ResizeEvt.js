sjs.using("Core5.DomEvent.onmouseover")
.define(function(){
    return {
        regUIObj:true
        ," s-mouseover":"resize"
        ,onResize:function(){
            //console.log("onresize");

            this._doResize && this._resize();
        }
        
        ,_resize:function(forceResize){
            var jqWidth = this.jq().width();
            var jqHeight = this.jq().height();
            if (forceResize || (jqWidth != this._jqWidth || jqHeight != this._jqHeight)) {
                this._jqWidth = jqWidth;
                this._jqHeight = jqHeight;
                return this._doResize(jqWidth,jqHeight);
            }
        }

        ,renderResizeWait:500       //render后等待resize的時間(因為可能browser的樣式還沒套用完,所以默認等個500毫秒)

        ,_render:function(){
            this.$base(); 
            if(this._doResize){
                var oThis = this;   
                window.setTimeout(function(){
                    oThis.onResize();
                },this.renderResizeWait);     //样式还没载入完成
            }
        }
    };
});