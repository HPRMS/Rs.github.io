sjs.using("Core5.Widget.Ability.Pop")
.define(function(pop){
    return {
        popConfig:null
        
        ,_getPopConfig:function(){
            return this.popConfig || {};
        }
        
        ,_getPopCreater:function(){
            return this;        //可以override此方法，提供單一pop的要求，如傳回this.parent.parent
        }

        //,_popId:"pop"

        ,_getPop:function(popType){
            if(!this.pop){
                var creater = this._getPopCreater();
                var popId = this.popId || (creater != this?this.fieldNo + "_pop":"pop");
                if(!popId){
                    throw new Error("如果使用_getPopCreater,必須設定fieldNo或popId,以便在parent中唯一區別對象");
                }
                //var popId = this._popId || "pop";       //解決不了重複問題?
                var popConfig = this._getPopConfig();
                if(!creater[popId]){
                    this.pop = creater.createChild(popType,pop,popConfig.$mixin,{
                        id:popId
                        ,posKind:this.showPos=="top"?"lb":"lt"
                    },popConfig,this.popMixin || {}).renderTo("body",true);
                    //},this._getPopConfig()).renderTo("body",true);
                }
                else{
                    this.pop = creater[popId];
                }
            }
            return this.pop;
        }
        
        ,_getPosJq:function(){
            return this.jq();
        }
        
        ,showPos:"bottom"           //top,right,bottom
        
        ,_getShowPos:function(){
            var thisJq = this._getPosJq();
            var offset = thisJq.offset();
            var left =  offset.left;
            var top =  offset.top;
            if(this.showPos == "right"){
                left = offset.left + thisJq.outerWidth();
            }
            else if(this.showPos == "bottom"){
                top = offset.top + thisJq.outerHeight();
            }
            return {left:left,top:top};
        }
        
        ,_showPop:function(popType){
            var pos = this._getShowPos();
            this._getPop(popType).setResponser(this).show().move(pos.left ,pos.top);
        }
        
        ,popType:""
        
        ,showPop:function(){
            if(typeof(this.popType)=="string"){
                var oThis = this;
                sjs.using(this.popType).run(function(popType){
                    oThis._showPop(popType);
                });
            }
            else{
                this._showPop(this.popType);
            }
            return this;
        }
        
        ,hidePop:function(){
            this.pop && this.pop.hide();
            return this;
        }
                
    }
});