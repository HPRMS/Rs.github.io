sjs.define(function() {
    //-----------------------------------------繼承鏈實現----------------------------------------//
    // $大寫：元數據，不對外
    // $小寫：元數據，提供給外部使用
    var CHAIN_NAME="$CHAIN";            //存于對象中的一個屬性，{method:[fnList]}
    var FN_METHOD_NAME = "$METHOD";
    var TMP_CHAIN_INDEX = "$TMP_CHAIN_INDEX";
    var ONLY_GET_CALL = "$ONLY_GET";        //如果用this.$base("$ONLY_GET")则不会呼叫函数，只是返回函数对象，用于函数参数不定时的调用
    //var TMP_FN_METHOD_NAME = "$TMP_FN_METHOD_NAME";
    
    //*注意*call override是明確的一種調用父類函數的方法，請勿調用多次，在循環體內或遞歸調用
    //此函數未考慮在一次調用鏈中，對同一個對象的同一個方法，多次調用（包括循環遞歸）的情形，可能會造成死循環或鏈條錯誤
    var CALL_OVERRIDE = "$base";
    function callOverride() {
        //var dt1 = new Date();
        if(!this[CHAIN_NAME]){
            return;
        }
        var callFn=arguments.callee.caller;     //在哪個函數中調用this.$base()
        var fnName = callFn[FN_METHOD_NAME];
        if(!fnName){
            return;
        }
        var fnChain = this[CHAIN_NAME][fnName];
        if(!fnChain || !fnChain.length){
            return;
        }
        
        var currentFn = null;
        if(this[fnName] == callFn){     //屬于對象的起始call
            currentFn = fnChain[fnChain.length - 1];        //從鏈條的后面依次往前call，這個為override的順序
        }
        else{
            for(var i=fnChain.length-1;i>=0;i--){
                if(fnChain[i] == callFn){
                    if(i>=1){
                        currentFn = fnChain[i-1];
                    }
                    break;
                }
            }
            /*
            //通過js調用堆棧可以不管如何call，不會死循環或call錯，但是否有性能影響？如果有，則可能要約定不能遞歸或循環調用了
            var lastCallFn = callFn;
            for(var i=fnChain.length-1;i>=0;i--){
                if(fnChain[i] == lastCallFn){
                    if(i>=1){       //即使沒有override，也可以空call，不會出錯（某些mixin需要用到）
                        currentFn = fnChain[i-1];
                    }
                    break;
                }
                else{
                    lastCallFn = lastCallFn.caller.caller;      //第一個caller是這個函數callOverride，第二個caller是this.$base所在的函數
                }
            }
            */
        }

        if(arguments.length==1 && arguments[0]==ONLY_GET_CALL)
            return currentFn;
        //var dt2 = new Date();
        //_callBaseCount++;
        //_callBaseTime += (dt2-dt1); 
        if(typeof (currentFn)=="function") {
            var args=Array.prototype.slice.call(arguments,0);
            return currentFn.apply(this,args);
        }
        else {
            return currentFn;              //可以override非function,如字符串，array等，供子類函數用this.$base()獲取使用
        }
    }
    
    //mix1和mix2都繼承baseMix,現在$mixin:[mix1,mix2]，那麼mix2的this.$base就會跳過baseMix中的函數，直接調用到mix1的override
    //最終保證mix1的this.$base能夠如預期，而mix2的this.$base可能不是預期
    //目前應該很少有這種情況，真的有，那也是對this.$base()的結果或調用過程不關心，只是不要中斷，單純傳遞而已
    function addIfNoExist(ary,items){
        //if(items===null)
        //    return;
        //if(!items.push){
        //    items = [items];
        //}
        for(var i=0;i<items.length;i++){
            if(items[i]){
                var exist = false;
                for(var j=0;j<ary.length;j++){
                    if(ary[j]==items[i]){
                        exist = true;
                        break;
                    }
                }
                if(!exist){
                    ary.push(items[i]);
                }
            }
        }
    }
    
    function removeExists(ary,baseFn){
        for(var i=0;i<ary.length;i++){
            if(ary[i]==baseFn){
                ary.splice(i,1);
                break;
            }
        }
    }

    //一個function只能處于一個對象中，并只有一個屬性名與之對應，不允許動態拼裝函數，組成對象
    //用單獨的CHAIN記錄函數鏈，比直接在函數中記錄要好，因為同一個函數在不同對象中可能存在，在ret和c都已經有chain時，會更復雜
    //用c override ret,c不變，ret變
    function apply(ret,c) {
        if(c) {
            //if(c.$isDebug)
            //    //debugger;
            for(var p in c) {
                //if(p==CHAIN_NAME ||p==CALLBASE_NAME)        //中間的apply對象，不要加這個
                if(p.substr(0,1) == "$")        //元數據，不繼承
                    continue;
                //以為準，最終是以c[p]調用，因為是c override ret,ret原有的東西要放到$chain中去
                if(typeof(c[p])=='function' && (typeof(ret[p])!= 'undefined' || c[CHAIN_NAME] && c[CHAIN_NAME][p])){
                    if(!ret[CHAIN_NAME])
                        ret[CHAIN_NAME]={};
                    if(!ret[CHAIN_NAME][p])
                        ret[CHAIN_NAME][p]=[];        //不能改變o和c,只能記錄在ret中
                    c[p][FN_METHOD_NAME] = p;
                    if(typeof(ret[p])=='function'){
                        ret[p][FN_METHOD_NAME] = p;     //同一個函數，在不同的對象中，也請保持相同的method name，請勿將同一個函數賦值給不同對象的不同屬性（新增一個函數調用，完全可避免此種情形）
                    }
                    //重複的函數在一個對象中只會被調用一次
                    if(typeof(ret[p])!='undefined'){
                        addIfNoExist(ret[CHAIN_NAME][p],[ret[p]]);      //如果ret[p]就是一個普通對象，如inner，而且剛好是一個array，這下chain就會構建出錯
                    }
                    if(c[CHAIN_NAME] && c[CHAIN_NAME][p]){
                        addIfNoExist(ret[CHAIN_NAME][p],c[CHAIN_NAME][p]);
                    }
                    //如果c[p]已存在ret[CHAIN_NAME][p]，則要移除，保證沒有重複調用，并且c[p]永遠是最新的
                    removeExists(ret[CHAIN_NAME][p],c[p]);      //還有當前的c[p]，也要在里面找一找，然後移掉重複的
                }
                else if(ret[CHAIN_NAME] && ret[CHAIN_NAME][p]){
                    delete ret[CHAIN_NAME][p];
                }
                ret[p]=c[p];
            }
            //if(ret[CHAIN_NAME])       //只要apply了就有此方法，以支持this.$base任何時候調用
                ret[CALL_OVERRIDE]=callOverride;
        }

        var args=Array.prototype.slice.call(arguments,2);
        if(args.length>0) {
            for(var i=0;i<args.length;i++){
                apply(ret,args[i]);
            }
        }

        return ret;
    }
    
    //函數override鏈復制(深拷貝)
    function copyChain(chain){
        var ret = {};
        for(var fnName in chain){
            ret[fnName]=[].concat(chain[fnName]);
        }
        return ret;
    }
    
    //對象混合，可多個一起，所有原參數不影響，最終返回一個累加了所有屬性的新對象
    //后面的覆蓋前面的，后面的函數可以通過在函數體中call this.base()呼叫前面被覆蓋的(按順序)
    function mixin(o,c) {
        var ret={};
        for(var p in o) {
            if(p==CHAIN_NAME) {        //深拷貝，不影響o的繼承鏈
                ret[p] = copyChain(o[p]);
            }
            else if(p.substr(0,1) == "$")        //元數據，不繼承
                continue;
            else{
                ret[p]=o[p];
            }
        }
        var args=Array.prototype.slice.call(arguments,1);
        if(args.length>0){
            args.unshift(ret);
            apply.apply(null,args);
        }
        return ret;
    }
    
    var EXTEND = "$extend";                 //第一進入
    var MIXIN = "$mixin";                   //第二進入混合(合并功能)
    var PLUGIN = "$plugin";                 //第四進入混合，在config后添加的插件功能
    var TYPE_CACHE = "$TYPE_CACHE";     //config -> object(mixin) 后的緩存
    var TYPE_FN_CACHE = "$TYPE_FN_CACHE";               //object作為function的prototype，function的緩存
    var IS_NEW = "$new";               //object作為function的prototype，function的緩存

    var DEFINE_IN = "$DEFINE_IN";       //找到這個后自己找源代碼
    //var EXTEND_IN = "$EXTEND_IN";
    //var MIX_IN = "$EXTEND_IN";
    //var PLUG_IN = "$EXTEND_IN";
    function define(typeCfg){
        //這行報錯，可能是$extend,$mixin或$plugin是undefined或null
        if(typeCfg[IS_NEW]){
            throw new Error("請勿將cls.create出來的對象，又用來extend子對象");
        }
        var ret;
        if(!typeCfg[EXTEND] && !typeCfg[MIXIN] && !typeCfg[PLUGIN]){
            ret = typeCfg;
        }
        else if(typeCfg[TYPE_CACHE]){
            ret = typeCfg[TYPE_CACHE];
        }
        else{
            var mixes = [];
            var extend = typeCfg[EXTEND];               //也是一個config，遞迴
            if(extend){
                mixes.push(define(extend));
            }
            var mixins = typeCfg[MIXIN];
            if(mixins){
                for(var i=0;i<mixins.length;i++){
                    if(mixins[i]){
                        mixes.push(define(mixins[i]));      //遞迴實例化
                    }
                }
            }
            //typeCfg.$init && typeCfg.$init();
            mixes.push(typeCfg);
            var plugins = typeCfg[PLUGIN];
            if(plugins){
                for(var i=0;i<plugins.length;i++){
                    if(plugins[i]){
                        mixes.push(define(plugins[i]));      //遞迴實例化
                    }
                }
            }
            var ret = mixin.apply(null,mixes);
            typeCfg[TYPE_CACHE] = ret;                  //緩存
            ret[DEFINE_IN] = typeCfg[DEFINE_IN];
            //return ret;  
        }
        //ret.$init && ret.$init();                   //提供在使用時的初始化(如動態生成方法等操作)(不會copy $開頭的屬性或函數)
        //ret.$init = null;
        if(!ret[CALL_OVERRIDE])
            ret[CALL_OVERRIDE] = callOverride;
        return ret;
    }
    /*
    chrome測試結果
 Object.prototype.toString.apply(null)
"[object Null]"  ==> IE6,7,8 [object Object]
 Object.prototype.toString.apply(undefined)
"[object Undefined]"  ==> IE6,7,8 [object Object]
 Object.prototype.toString.apply(5)
"[object Number]"
 Object.prototype.toString.apply("")
"[object String]"
 Object.prototype.toString.apply({})
"[object Object]"
 Object.prototype.toString.apply(function(){})
"[object Function]"
 Object.prototype.toString.apply(0)
"[object Number]"
 Object.prototype.toString.apply(true)
"[object Boolean]"
 Object.prototype.toString.apply(/aaa/g)
"[object RegExp]"
 Object.prototype.toString.apply([a,b])
ReferenceError: a is not defined
 Object.prototype.toString.apply([1,'b'])
"[object Array]"
 Object.prototype.toString.apply(new Date())
"[object Date]"    
    */
    
    function isArray(obj){
        return Object.prototype.toString.apply(obj) === '[object Array]'; 
    }
    
    
    //var base = {};
    
    //代替new fn_xxx(cfg)
    //function create(objCfg){
    //中間的mixins可以是多個，且可以是數組，也可以是null，還可以是對象(有$extend和$mixin)，最后一個是cfg(不會再處理它的$extend和$mixin)，沒有plugins(暫時無需求，以后有再說)
    function create(typeDefine,mixin1,mixin2,mixinN,cfg){
        /* 暫不用先，反正也會write cfg，就讓調用方自己設定cfg.$extend吧
        if(arguments.length==2){
            if(cfg[EXTEND]){
                throw new Error("直接以類型創建對象時，配置中請勿再有$extend屬性");
            }
            cfg[EXTEND] = objCfg;
            objCfg = cfg;
        }
        */
        //if(objCfg[IS_NEW]){
        //    throw new Error("請勿將cls.create出來的對象，又用來create");
        //}
        //var typeDefine = objCfg[EXTEND];// || base;        //應該所有的都要有extend,除非做測試
        if(typeof(typeDefine[DEFINE_IN])=="undefined"){
            typeDefine[DEFINE_IN] = sjs.getDefineIn(typeDefine);
        }
        var type = define(typeDefine);                  //一定要有$type，否則創建出錯
        var cls = type[TYPE_FN_CACHE];
        if(!cls){
            cls = function(mixins,config){
                this[CHAIN_NAME] = copyChain(this[CHAIN_NAME]);     //因為this已經通過prototype得到了$chain，這里要清空，否則麻煩就大了
                this[IS_NEW] = true;        //已經實例化

                var applies = [this];
                
                //var mixins = config[MIXIN];
                //if(mixins){
                    for(var i=0;i<mixins.length;i++){
                        if(mixins[i]){
                            applies.push(define(mixins[i]));      //遞迴實例化
                        }
                    }
                //}
                
                applies.push(config);       //config最后一個參數是$extend,$mixin都不再處理，所以如果有mixin，則一定要傳config，null或{}都行
                
                //插件通過主對象的事件進入，插件與主對象各自獨立，但還是有需要設定主對象屬性，且對方法的注入比較不易
                //mixin則是直接混入主對象，易污染主對象屬性，添加太多主對象用不著的屬性
                /*
                var plugins = config[PLUGIN];                            //當作是某個類的可選組件，如grid可選checkbox,check等組件單獨進去
                if(plugins){
                    for(var i=0;i<plugins.length;i++){
                        applies.push(define(plugins[i]));
                    }
                }
                */
                apply.apply(null,applies);                            //這種方式會影響里面的prototype，this這個時候已經不管了
                
                if(this._REMEMBER_NEW){
                    this._REMEMBER_NEW = {
                        $extend:typeDefine
                        ,$mixin:mixins
                    };
                }

                ////debugger;
                this.init && this.init();                           //調用構建器
                this.init = null;       //構造器只能調用一次
                this[CHAIN_NAME].init = null;       //后面还有可能重新对init赋值（已实例化，又来apply）



                
            }
            cls.prototype = type;
            type[TYPE_FN_CACHE] = cls;
        }
        var args = Array.prototype.slice.call(arguments,1);
        var objCfg = null;
        if(args.length>0){
            objCfg = args.pop();
        }
        var objMixins = [];
        for(var i =0;i<args.length;i++){
            if(isArray(args[i])){       //數組(數組元素不能為null，否則會報錯in define)
                objMixins = objMixins.concat(args[i]);
            }
            else{           //不為null
                objMixins.push(args[i]);
            }
        }
        //var dt1 = new Date();
        var ret = new cls(objMixins,objCfg);
        //var dt2 = new Date();
        //_createTime += (dt2-dt1);
        //_createCount++;
        return ret;
    }
    
    var _createCount = 0;
    var _createTime = 0;
    var _callBaseCount = 0;
    var _callBaseTime = 0;
    
    //每個type有個享元實例
    var TYPE_SINGLE_CACHE = "$TYPE_SINGLE_CACHE";
    
    //這種方法還是比new慢，所以暫不考慮了。雖然只有一個實例的確吸引人
    //儘量將頻率大的改成函數調用(而不是對象)，參考getTagHtml
    function create_single(typeDefine,mixin1,mixin2,mixinN,cfg){
        if(typeof(typeDefine[DEFINE_IN])=="undefined"){
            typeDefine[DEFINE_IN] = sjs.getDefineIn(typeDefine);
        }
        var type = define(typeDefine);                  //一定要有$type，否則創建出錯
        
        var ret = type[TYPE_SINGLE_CACHE];
        if(!ret){
            ret = create.apply(null,Array.prototype.slice.call(arguments,0));
            type[TYPE_SINGLE_CACHE] = ret;
        }
        
        //加這個影響很大，相當于在new了，所以要保證config可override ? 很難吧? 本來就是不想寫這么多config

        //對obj delete(把config全刪除)
        /*
        for(var p in ret){
            //if(ret.hasOwnProperty(p)){
                delete ret[p];      
            //}
        }
        */
           
        var args = Array.prototype.slice.call(arguments,1);
        var objCfg = null;
        if(args.length>0){
            objCfg = args.pop();
        }
        var objMixins = [];
        for(var i =0;i<args.length;i++){
            if(isArray(args[i])){       //數組(數組元素不能為null，否則會報錯in define)
                objMixins = objMixins.concat(args[i]);
            }
            else{           //不為null
                objMixins.push(args[i]);
            }
        }
        
        //不能對有些對象delete方法
        type[TYPE_FN_CACHE].call(ret,objMixins,objCfg);
        return ret;
    }    
    
    function create_no_new(typeDefine,mixin1,mixin2,mixinN,cfg){
        if(typeof(typeDefine[DEFINE_IN])=="undefined"){
            typeDefine[DEFINE_IN] = sjs.getDefineIn(typeDefine);
        }
        var type = define(typeDefine);                  //一定要有$type，否則創建出錯
        var args = Array.prototype.slice.call(arguments,1);
        var objCfg = null;
        if(args.length>0){
            objCfg = args.pop();
        }
        var objMixins = [];
        for(var i =0;i<args.length;i++){
            if(isArray(args[i])){       //數組(數組元素不能為null，否則會報錯in define)
                objMixins = objMixins.concat(args[i]);
            }
            else{           //不為null
                objMixins.push(args[i]);
            }
        }
        var ret = newObj(type,objMixins,objCfg);
        return ret;
    }
    
    function newObj(type,mixins,config){
        var applies = [{},type];
        for(var i=0;i<mixins.length;i++){
            if(mixins[i]){
                applies.push(define(mixins[i]));      //遞迴實例化
            }
        }
        applies.push(config);       //config最后一個參數是$extend,$mixin都不再處理，所以如果有mixin，則一定要傳config，null或{}都行
        var ret = apply.apply(null,applies);        //不用mixin，因為會丟失this.$base
        ret.init && ret.init();                           //調用構建器
        ret.init = null;       //構造器只能調用一次
        if(ret[CHAIN_NAME]){
            ret[CHAIN_NAME].init = null;      
        }
        return ret; 
    }
    

    return {
        apply : apply
        ,mixin : mixin
        ,define : define        //動態臨時定義type
        ,create : create            //基本上外面只用這一個函數
        ,create_no_new:create_no_new
        ,create_single:create_single
        ,createCount:function(){
            return _createCount;
        }
        ,createTime:function(){
            return _createTime;
        }
        ,callBaseTime:function(){
            return _callBaseTime;
        }
        ,callBaseCount:function(){
            return _callBaseCount;
        }
    };
});