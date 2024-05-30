sjs.using("Core5.Util.Service")
.define(function(sc){
    return {
        doLoad:function(){
            sc.callService(this.itemsService || "~"
                ,this.itemsMethod || "Load"
                ,typeof(this.itemsArgs)=="function"?this.itemsArgs():this.itemsArgs || []
                ,this
                ,function(items){
                    this.set(this.itemsName || "items",items || []);
                    this.loadedEvt && this.report(this.loadedEvt,items);
                }
            );
        }

        ,init:function(){
            this.$base();
            this.initStart && this.doLoad();
        }
    };
});