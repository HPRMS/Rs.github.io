sjs.define(function(){
    var eventObjects = [];
    //var eventForEvt = {};
    //var eventForPublisher = {};     //會給publisher加一個唯一ID:_id_in_event_manager
   
    return {

        subscribe:function(obj){//,evt,sourceOrID,idName){
            eventObjects.push(obj);
        }

        ,unSubscribe:function(obj){
            for(var i=0;i<eventObjects.length;i++){
                if(eventObjects[i] == obj){
                    eventObjects.splice(i,1);
                    break;
                }
            }
        }

        ,publish : function(reporter,evt,arg1,arg2,argN){
            var args = Array.prototype.slice.call(arguments,2);
//            var method = evtObj[evt];
//            if(typeof(method)=="function"){
//                method.apply(evtObj,args);
//            }
//            else{
            var evtName = evt.substr(0,1).toUpperCase() + evt.substr(1);
            var fnName = "on" + evtName;
            for(var i=0;i<eventObjects.length;i++){
                var evtObj = eventObjects[i];

                //暫時無需求,不管(現在是處理callService和sjs.using的事件處理)
                //if(evtObj.response){        //是否需要對UI對象進行事件發布?有一些向全體發布的事件?
                //    
                //}

                 //暫時也不需要,訂閱全局事件,一定用onXxx來響應
                 //暫時不考慮普通UI對象
                    var fn = evtObj[fnName];
                    if(typeof(fn)=="string"){
                        fn = evtObj[fn];
                    }
                    if(typeof(fn)=="function"){
                        fn.apply(evtObj,[reporter].concat(args));
                    }
    //            }
            }
        }
    };
});