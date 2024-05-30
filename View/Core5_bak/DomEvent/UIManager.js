//存儲需要回應dom事件的UI Object對象
sjs.define(function() {
    //------------------------------------------------dom事件體系----------------------------------------------------//
    var _objID = 0;
    var _pool = {};
    var pre = "c_";     //Core5和Core2可以并行
    return {
        reg : function(obj,objId) {
            var ret= objId ||  (pre + (++_objID));
            _pool[ret]=obj;
            return ret;
        },

        unReg : function(objId) {
            //if(_pool[objId]){
            //    console.log("UIManager unreg:" + objId + " title/text:" + (_pool[objId].title || _pool[objId].text) );
            //}
            delete _pool[objId];
        },

        get : function(objId) {
            return _pool[objId] || null;
        },
        
        getPool:function(){
            return _pool;
        },
        
        getPoolCount:function(){
            var ret = 0;
            for(var p in _pool){
                ret++;
            }
            return ret;
        }
    };
});