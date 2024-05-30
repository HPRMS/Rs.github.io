/*
Component的Mixin，為Dom事件提供抓取sjs object的機會
*/
sjs.using("Core5.DomEvent.UIManager")
.define(function(uiManager){
    return {
        regUIObj:false     //因為不想再加函數override
        
        ,init: function() {
            this.$base();
            if(this.regUIObj){
                this._objId = uiManager.reg(this);
                //console.log("reg sjs:" + this._objId + "," + this._domId);
                this.attr("s-objId",this._objId);
            }
        }
        
        ,_dispose:function(noRemoveJq){
            this.$base(noRemoveJq);
            if(this.regUIObj){            
                uiManager.unReg(this._objId);
                //console.log("un-reg sjs:" + this._objId+ "," + this._domId);
            }
        }  

        ,disableEvent:function(evt){
            this[evt + "-disabled"] = true;
        }

        ,enableEvent:function(evt){
            this[evt + "-disabled"] = false;
        }

        ,_onDomEvent:function(domEvt,src,e,addParam){

            var evt = src.attr("s-" + domEvt);
            if(!evt){       //有的evt來源不是根據attr來的，而是根據
                return;
            }
            if(this[evt + "-disabled"]){
                return;
            }
            //disabled時依舊有效
            var evtActiveOnDisabled = this[evt + "ActiveDisabled"] === true;
            if(evtActiveOnDisabled || !this.isDisabled()){
                var evtName = "on" + evt.substr(0,1).toUpperCase() + evt.substr(1);
                var fn = this[evtName];
                if(typeof(fn)=="function"){
                    fn.call(this,src,e,addParam);
                }       //不冒泡了
                else if(this.report){       //如果有report mixin，則冒泡報告，否則就算了
                    this.report(evt,src,e,addParam);
                }
            }
        }
    };
});