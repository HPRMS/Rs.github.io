/*Component的Mixin,繼承ShowHide*/
sjs.loadCss("Core5.Shp.Other")
.using("jQuery")
.define(function($){
    var _addTransDivToBody = false;     //有加入transformDiv嗎，所有動畫效果皆用同一個

    return {
        visible:false
        //,displayMode:"visible"
        //要動態改的話直接改，不需要保存其原始config
        ,orgWidth:0
        ,orgHeight:0
        ,orgLeft:0
        ,orgTop:0    
        ,_lastPos:null  
        ,_hide:function(){
            var targetJq = this.jq();
            var targetOffset = targetJq.offset(); 
            this._lastPos = targetOffset;
            this.$base();
            var oThis = this;                       
            $(".transformDiv").stop(true,true).css({
                opacity: 0.8
                ,"visibility":"visible"
                ,"width":targetJq.width() + "px"
                ,"height":targetJq.height() + "px"
                ,"left":targetOffset.left + "px"
                ,"top":targetOffset.top + "px"
            }).animate({
                opacity: 0.1
                ,"width":this.orgWidth + "px"
                ,"height":this.orgHeight + "px"
                ,"left":this.orgLeft + "px"
                ,"top":this.orgTop + "px"
            },250,function(){
                //alert('finish hide');
                oThis._finishHide.call(oThis);
            });
        }
        
        ,_finishHide:function(){
            $(".transformDiv").css("visibility","hidden");
        }
        
        ,_show:function(){
            if(this._lastPos){          //因為display為none,抓不到位置，所以第一次不用動畫
                if(!_addTransDivToBody){
                    $("<div class='transformDiv'></div>").appendTo("body");
                    _addTransDivToBody = true;
                }
                var baseFn = this.$base("$ONLY_GET");
                var oThis = this;
                var targetJq = this.jq();
                var targetWidth = targetJq.width();
                var targetHeight = targetJq.height();
                var targetOffset = this._lastPos || targetJq.offset();
                //queryJq.css("color","black");
                //$(".transformDiv").stop(true,true).css({
                $(".transformDiv").stop(true,true).css({
                    opacity: 0.8
                    ,"visibility":"visible"
                    ,"width":this.orgWidth + "px"
                    ,"height":this.orgHeight + "px"
                    ,"left":this.orgLeft + "px"
                    ,"top":this.orgTop + "px"
                }).animate({
                    opacity: 0.3
                    ,"width":targetWidth + "px"
                    ,"height":targetHeight + "px"
                    ,"left":targetOffset.left + "px"
                    ,"top":targetOffset.top + "px"
                },200,function(){
                        oThis._finishShow.call(oThis);
                        baseFn.call(oThis);
                    }
                );
            }
            else{
                this.$base();
            }
        }
        
        ,_finishShow:function(){
            $(".transformDiv").css("visibility","hidden");
        }
        
    };
});