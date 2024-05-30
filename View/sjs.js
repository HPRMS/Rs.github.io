(function(nm, UNDEF) {
    /*
    window.onerror=function(msg, url, linenumber){
         alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber)
         return true
    } 
    */   
    //var bb=cc;

    //nodejs call
    /*
    if(!window && typeof(require)!="undefined"){
        window = global;
    }
    if(typeof(alert)!="function"){
        alert = function(msg){
            console.log("[alert]" + msg);
        }
    }
    */

    
          
    var _language = "";
    
        
    var ui_client_id = new Date().valueOf() + Math.random().toFixed(10) +  + Math.random().toFixed(10) + Math.random().toFixed(10);
    var _call_svc_count = 0;
    function getSvcCallId(){
        return ui_client_id + "-" + new Date().valueOf() + "-" + (++_call_svc_count);
    }


    //---------------------------------------私有方法-----------------------------------------------------------//
    //異常退出，終止全部執行
    function exExist(msg){
        alert(msg); 
        _runNextSjs();
        //throw new Error(msg);
    }

        
    var _develop = false;
    var _loadjs_error_exit = false;

    /*
    function _loadByIframe(path,refJs,successFn){
        var loadIframe = document.getElementById("TEMPLATE_LOAD_IFRAME");
        if(!loadIframe){
            loadIframe = document.createElement("iframe");
            loadIframe.id = "TEMPLATE_LOAD_IFRAME";
            if (loadIframe.attachEvent){
                loadIframe.attachEvent("onload",successFn);
            } else {
                loadIframe.onload = successFn;
            }
            document.getElementsByTagName("body")[0].appendChild(loadIframe);
        }
        loadIframe.src = path;
    }
    */
    function _onLoading(){
        var evtManager = _sjs_private._getSjsResult()["Core5.Util.EventManager"];
        evtManager && evtManager.publish && evtManager.publish(_sjs_private,"usingJs");
    }

    function _onLoadOK(){
        var evtManager = _sjs_private._getSjsResult()["Core5.Util.EventManager"];
        evtManager && evtManager.publish && evtManager.publish(_sjs_private,"usingJsOK");
    }

    function _onLoadErr(error){
        var evtManager = _sjs_private._getSjsResult()["Core5.Util.EventManager"];
        evtManager && evtManager.publish && evtManager.publish(_sjs_private,"usingJsErr",error);
    }

    function _loadByXmlHttp(path,refJs,successFn){
        var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
        var onerror = function(msg) {            //IE6,7,8,9不會進入,但是successFn會檢查出來錯誤，沒有sjs.define定義
            ////debugger;
            _is_waitingLoad_using[_current_loading_using.js] = 0;       //暫時先放到這里,以后應該在_loadJs加一個failFn,再在那里處理相關變量
            exExist(path + " failed to load,[js:" + refJs + "]:" + msg);
            _onLoadErr(msg);
        };
    
        // Wait for a response to come back
        var onreadystatechange = function(){
            if (xhr.readyState == 4){
                xhr.onreadystatechange = function(){};
                if (xhr.status == 200){
                    log();
                    log();
                    log("[新的異步代碼開始]*Template载入完成:" + path + "，開始執行successFn函數...");                
                    _onLoadOK();
                    successFn(xhr.responseText);
                }
                else{
                    onerror("http status:" + xhr.status);
                }
                xhr = null;
                
            }
        };
        xhr.onreadystatechange = onreadystatechange;
        xhr.open("GET",path,true);
        // Send the data
        try {
            _onLoading();
            xhr.send();
        } catch(e) {
            onerror(e.description);
        }
    }
    
    function _loadJs(path,refJs,successFn){
        // if(path=="http://172.19.6.86/RIAService/ajaxServiceNew.ashx?callback=sjs._jsonp_&jsonservice=null")
            // //debugger;
        var head = document.getElementsByTagName("head")[0] || document.documentElement;
        var scriptTag = document.createElement("script");
        scriptTag.setAttribute("type", "text/javascript");
        scriptTag.setAttribute("src",  path);
        scriptTag.setAttribute("charset", "utf-8");
        scriptTag.onload = scriptTag.onreadystatechange = function() {
            if ((!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                //if(path=="http://eipx.pci.co.id/aa.bb")
                //    //debugger;   
                //if (this.readyState === 'loaded' && this.nextSibling === null) {
                //    this.onerror();
                //}

                //if(path.indexOf("Core2/Component")>=0){
                    //alert('loaded');  //alert是會兩次，可是因為alert會pending進程，造成下一行代碼沒辦法執行，所以IE9會兩次alert，所以不用擔心IE9的兩次執行問題
                //    console.log("js載入完成0")
                //}
                scriptTag.onerror = scriptTag.onload = scriptTag.onreadystatechange = null;     //IE內存洩漏
                //if(path.indexOf("Core2/Component")>=0){
                    //alert('loaded');
                //    console.log("js載入完成1")
                //}
                if (head && scriptTag.parentNode){
                    head.removeChild(scriptTag);
                }
                scriptTag = UNDEF;                  //仿jquery-1.5.1的ajax清除寫法
                log();
                log();
                log("[新的異步代碼開始]*JS载入完成:" + path + "，開始執行successFn函數...");      
                
                //else 
                //    //debugger;       
                _onLoadOK();
                successFn();
                //if(path.indexOf("Core2/Component")>=0){
                //    //alert('loaded');
                //    console.log("js載入完成2")
                //}
                //log("*JS载入完成:" + path + "，并且執行完successFn函數<OK>");
            }
        };
        scriptTag.onerror = function() {            //IE6,7,8,9不會進入,但是successFn會檢查出來錯誤，沒有sjs.define定義
            _onLoadErr(path + " failed to load,[js:" + refJs + "]");
            if(_loadjs_error_exit){
                _is_waitingLoad_using[_current_loading_using.js] = 0;       //暫時先放到這里,以后應該在_loadJs加一個failFn,再在那里處理相關變量
                exExist(path + " failed to load,[js:" + refJs + "]");
            }
            else{
                scriptTag.onerror = scriptTag.onload = scriptTag.onreadystatechange = null;     //IE內存洩漏
                if (head && scriptTag.parentNode){
                    head.removeChild(scriptTag);
                }
                scriptTag = UNDEF;                  //仿jquery-1.5.1的ajax清除寫法
                alert(path + " failed to load,[js:" + refJs + "]");
                log(path + " failed to load,[js:" + refJs + "]");
                successFn();
            }
        };
        _onLoading();
        head.appendChild(scriptTag);
        //log("开始载入js:" + path);
    }
    
    function _loadCss(path,successFn,charset,js){
        var link = document.createElement('link');
        link.setAttribute("rel","stylesheet");
        link.setAttribute("href",path);
        link.setAttribute("type","text/css");
        if (charset){
            link.setAttribute('charset', charset);
        }
        var head = document.getElementsByTagName("head")[0] || document.documentElement;
        //樣式載入與否不影響view(沒有要去抓當前的width,height了)
        /*
        //http://www.fantxi.com/blog/archives/load-css-js-callback/
        var sheet, cssRules;
        if ( 'sheet' in link ) { //FF/CM/OP   注不能跨域
            sheet = 'sheet'; cssRules = 'cssRules';
        }
        else if('styleSheet' in link) { //IE
            sheet = 'styleSheet'; cssRules = 'rules';
        }            
        else{
            exExist('流覽器不能識別sheet和styleSheet在link element中，無法檢測css loading狀態');
        }
            var _timer1,_timer2;
            _timer1 = setInterval( function() { // 通过定时器检测css是否加载成功
                try {
                    if ( link[sheet] && link[sheet][cssRules] && link[sheet][cssRules].length ) { // css被成功加载
                        clearInterval( _timer1 ); // 清除定时器
                        if(_timer2){
                            clearTimeout( _timer2 );
                        }
                        log("*CSS载入完成:" + path + "，準備回調函數");  
                       // if(_totalLoadedCssCount==1)
                       //     //debugger;
                        try{
                            successFn() // 加载成功执行callback
                        }
                        catch(exEx){
                            alert("主程式執行錯誤:" + exEx);
                            
                        }
                    }
                } catch( ex ) {
                    
                    //console && console.log("！主程式執行錯誤:" + ex + " [js:" + js + "]");
                    //exExist("load css exception:" + ex + " [js:" + js + "]");
                    //FF看到的可能的报错：
                    //本地：nsresult: "0x8053000f (NS_ERROR_DOM_INVALID_ACCESS_ERR)" ，因为没加载完成还不能读取，加载完毕就不会报错了
                    //跨域：Security error, code: "1000" nsresult: "0x805303e8"，因为不能跨域读取CSS。。。
                    //关于跨域访问：FF/OP/CM都禁止，IE6-9都可以跨域读取css。
                }finally {}
            }, 20 );
            // 创建超时定时器，如果过10秒没检测到加载成功
            _timer2 = setTimeout( function() {
                    clearInterval( _timer1 ); // 清除定时器
                    clearTimeout( _timer2 );
                    exExist(path + " failed to load(time out 5s)" + " [js:" + js + "]");
                    // 都过了这么长时间了，虽然没判断加载成功也执行callback（这里可能本身就加载失败，也可能是跨域的情况）
            }, 5000 );
        /*
        * /
            
                
        /*
        }
        else { //IE
            //sheet = 'styleSheet'; cssRules = 'rules';
            link.onload = link.onreadystatechange = function() {
                if ((!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                    link.onerror = link.onload = link.onreadystatechange = null;     //IE內存洩漏
                    link = UNDEF;                  //仿jquery-1.5.1的ajax清除寫法
                    log("*CSS载入完成:" + path + "，準備回調函數(css IE)");
                    successFn();
                }
            };
            link.onerror = function() {     //IE6,7,8不能觸發
                alert(path + " failed to load(css IE)");
            };        
        }
            */
        head.appendChild(link);
        log("开始载入css:" + path);
        successFn();
    }


    //兩種路徑格式
    //一.普通路徑格式(直接载入，路径相对于/PCIService/View/UI.aspx)
    //1. http://xxxx/yy/cc.aspx
    //2. /xxx/yy.js
    //3. ./cc.aspx?xx=y
    //4. ./xxx.aspx，不能用xxx.aspx,這個會識別為xxx/aspx.js
    //5. ./aa.js，不能用aa.js,這個會識別為aa/js.js
    //7. ../../cc/dd/ee.js
    
    //默认的host，用于不部署服务端时的开发工作
    var _host = "";         //可设定为其它站点（暂不作这样的设定，好像没有用，如果以后有，也要考虑for每一个独立的sjs可设定包）
    
    //二.簡化格式（用于當前路徑或在當前路徑以下的js文件）
    //UI.Core
    //jQuery
    //B2B.Supplier.Fields
    
    var _jsFilesVersion = {};
    
    var _packagePath = {};
    var _packageVersion = {};
    var _defaultFolder = "";

    function _path(path,ext) {
        if (!(
            path.indexOf("/")>=0
           // path.toLowerCase().indexOf("://") > 0 
           // || path.indexOf("/") == 0 
           // || path.indexOf("./") == 0 
           // || path.indexOf("../") == 0 
        )){
            //add 目錄包指定(默認在sjs當前目錄)
            //從最大的匹配開始
            var orgPath = path;
            var folder = _defaultFolder;
            var paths = path.split(".");
            for(var i=paths.length;i>0;i--){
                var key = paths.join(".");
                if(_packagePath[key]){
                    folder = _packagePath[key];
                    path = path.substr(key.length+1);       //去掉開頭的.，會替換成/的，在vs的臨時webserver上會出錯
                    //完全匹配掉了
                    if(path.length==0){
                        folder = folder.slice(0,-1);
                    }
                    break;
                }
                paths.length--;
            }
            if(ext==".js"){
                //如果指定開發階段和如果沒有編譯后的運行程式，則直接使用開發版本的代碼
                if(!_develop && _jsFilesVersion[orgPath]){
                    //if(!_jsFilesVersion[path])
                    //    throw new Error(path + "沒有運行時程式(需程式人員編譯)");
                    var version = _jsFilesVersion[orgPath];
                    //if(_jsFilesVersion[orgPath + "." + _language]){        //是否有語言包
                    //    version = _jsFilesVersion[orgPath + "." + _language];
                    //    orgPath += "." + _language;        //默認en-us語言不編譯成語言包格式
                        //如果有其它語言包，則編譯成Site.Main.zh-tw文件，直接引入
                    //}
                    //./Runtime還要經過一次替換
                    return loadJsPath("./Runtime/" + orgPath + ext + "?" + version);
                }
                else{
                    //因為refresh和ctrl+refresh只會影響第一次load時加載的js或css，圖片。
                    //而之后動態加載的js還是from cache，所以就算user F5或Ctrl+F5也影響不了
                    //所以沒辦法利用流覽器自身的緩存機制
                    //path = path.replace(/\./g,"/") + ext + (_develop?"?" + new Date().getTime():"");
                    path = path.replace(/\./g,"/") + ext + "?" + getPackageVersion(orgPath);//new Date().getTime();
                }
            }
            else{   //編譯后的js會在最后一行sjs._loadCss("./Runtime/Core5.All.css?22771691.706488551");如果本身有Core5.All.css，也會在之前就sjs._setCssLoaded("Core5.All");
                //path = path.replace(/\./g,"/") + ext + (_develop?"?" + new Date().getTime():"");
                path = path.replace(/\./g,"/") + ext + "?" + getPackageVersion(orgPath);//new Date().getTime();
            }
            path = folder + path;
        }
        else{
            //相對路徑，則要在前面加_defaultFolder
            //jQuery中繼續loadJs('./Ref/jQuery.1.10.1.js')
            return loadJsPath(path);
        }
        return path;
    }

    function loadJsPath(path){
        var refolder = "";
        for(var p in _packagePath){     //只匹配一個
            if(path==p){
                path = p;
                break;
            }
            if(path.indexOf(p + (p.slice(-1)=='/'?'':'/'))==0 && p.length > refolder){        //p以/結尾
                refolder = p;
                //沒有break，找最長的匹配
            }
        }
        if(refolder){
            var newFolder = _packagePath[refolder];
            path = newFolder + path.substr((refolder + (refolder.slice(-1)=='/'?'':'/')).length);
        }

        //TODO:目前只支持./的向defaultFolder的替換，還不支持../或../../這樣的替換
        if(_defaultFolder && (path.indexOf("./")==0 || path.substr(0,1) != "/" && path.indexOf("://")<0)){
            path = _defaultFolder + (path.indexOf("./")==0?path.substr(2):path);        //_defaultFolder必須以/結尾
        }
        return path;
    }

    function getPackageVersion(orgPath){
        //if(!_develop){
            var paths = orgPath.split(".");
            for(var i=0,len=paths.length;i<len;i++){
                var package = paths.join(".");
                if(_packageVersion[package]){
                    return _packageVersion[package];
                }
                paths.pop();
            }
        //}
        return new Date().getTime();
    }

    //-------------------------------------------sjs數據結構---------------------------------------------------------//
    var _callID = 0;        //全局call service id

    var _cssReMap = {};     //将css的路径重组(用于部分程式更新)
    var _jsReMap = {};      //将js的路径重组
    var _tplReMap = {};      //将js的路径重组
    //var DEFAULT_PACKAGE = "Core5";  //默認包，如果是.XXX -> Core5.XXX(暫時不需要好了，永遠都是引用Core5也可以（就算以后有Core6），免得到時再修改過)
    function _getMapPath(path,ext){
        if (!(
            path.indexOf("/")>=0
            //path.toLowerCase().indexOf("http://") == 0 
            //|| path.indexOf("/") == 0 
            //|| path.indexOf("./") == 0 
            //|| path.indexOf("../") == 0 
        )){
            //增加. .. ...等相對包位置處理
            if(path.indexOf(".")==0){
                if(!_current_loading_using || !_current_loading_using.js){
                    exExist(path + ' loading error,no current load using');
                }
                var currentJs = _current_loading_using.js.split(".");
                var folderLevel;
                for(folderLevel=1;folderLevel<path.length;folderLevel++){
                    if(path[folderLevel]!="."){
                        break;
                    }
                }
                currentJs.length = currentJs.length - folderLevel;
                path  = currentJs.join(".") + "." + path.substr(folderLevel);
            }

            var reMap = ext=="css"?_cssReMap:(ext=="js"?_jsReMap:(ext=="html"?_tplReMap:null));
            if(reMap && reMap[path]){
                return reMap[path];
            }
            //不再對某段路徑或前綴替換，因為有如Core5a.Widget.Input.css有替換，但是下面的Core5.Widget.Input.CheckGroup.css確不要替換
            //如果按前綴來就會出錯了
            /*
            var paths = path.split(".");
            for(var i=paths.length;i>0;i--){
                var mapKey = paths.slice(0,i).join('.');
                if(reMap[mapKey]){
                    return reMap[mapKey] + (i<paths.length?"." + (paths.slice(i,paths.length).join(".")):"");
                }
            }
            */
        }
        return path;
    }

    function _sjs() {
        this._usingList = [];
        this._cssList = [];     //计算的时候载入(先计算先载入，保证css的顺序)
        this._fn = null;
        this._link = [];

        function link(kind, service) {
            this._link.push({ kind: kind, service: service });
            return this;
        }

        function loadCss(url,charset){
            //_loadCss(_path(url,".css"),charset);
            //放在这里reMap，是想让编译的时候也承认这个动作，而直接编译进去
            this._cssList.push({url:_getMapPath(url,"css"),charset:charset,org:url});
            return this;
        }
        
        //保持依賴順序(執行fn時，此js應該要載入完成)
        function loadJs(js) { 
            //TODO:loadJs可以并行加載，只管加載數量，不管順序，判斷.sjs!=1
            this._usingList.push({js:_getMapPath(js,"js"),org:js});
            return this;
        }
        
        //調用服務
        //不支持長url調用
        //放在這里好是好，但是要記得可能UI出來前被阻塞
        function call(service,arg1,arg2){
            var args = Array.prototype.slice.call(arguments,0);
            args.unshift("");
            return callOther.apply(this,args);
        }
        
        //考慮其它服務器的
        function callOther(host,service,arg1,arg2){
            _callID++;
            //js用/開頭，可以統一在編譯打包時，不打包進去
            this._usingList.push({host:host,sjs:1,js:"/SERVICE_CALL_" + _callID,service:service,params:Array.prototype.slice.call(arguments,2)});
            return this;
        }
        
        function lang(){
            this._usingList.push({js:"$LANG",sjs:1});
            return this;
        }
        
        function service_config(){
            this._usingList.push({js:"$SERVICE_CONFIG",sjs:1});
            return this;
        }

        //將js中的sjs.define形成sjs對應此對象
        //noArg: undefined(calculate and cache), true(no need calculate), false(calculate but no cache)
        function using(js,noArg) {
            var serviceConfig;
            if (!(
                js.indexOf("/")>=0
                /*
                js.toLowerCase().indexOf("http://") == 0 
                || js.indexOf("/") == 0 
                || js.indexOf("./") == 0 
                || js.indexOf("../") == 0 
                */
            ) && js.indexOf("$")>0){
                var jsStr = js.split("$");
                js = jsStr[0];
                serviceConfig = jsStr[1];
            }
            //if(js=="$SERVICE_CONFIG")
            //    //debugger
            this._usingList.push({js:_getMapPath(js,"js"),sjs:1,noArg:noArg,org:js,serviceConfig:serviceConfig});
            return this;
        }

        function tpl(tplPath){
            //sjs:1表示載入的文件里面會有sjs.define字眼
            //js可設定唯一性，只載入一次
            this._usingList.push({sjs:1,js:"/TEMPLATE_CALL_" + tplPath,tpl:_getMapPath(tplPath,"html"),org:tplPath});
            return this;
        }

//        function setNm(sjsName){
//            this._sjsName = sjsName;
//            return this;
//        }

        function define(nmOrFn,fn){
            var realFn = nmOrFn;
            if(typeof(nmOrFn)=="string"){
                this._sjsName = nmOrFn;
                realFn = fn;
            }
            this._fn = realFn;//fn;
            _defineSjs(this);
        }

        function run(fn) {
            if(typeof(fn)!="function"){
                exExist("sjs.run的參數必須是函數,(js:" + (_current_loading_using?_current_loading_using.js:"")+ ")");
            }
            this._fn = fn;
            _runSjs(this);
        }
 
        //導出
        this.loadCss = loadCss;
        this.loadJs = loadJs;
        this.using = using;
        this.lang = lang;
        this.call = call;
        this.callOther = callOther;
        this.tpl = tpl;
//        this.setNm = setNm;
        this.define = define;
        this.run = run;
        this.link = link;
    }
    
    
    //---------------------------------------載入和執行過程-------------------------------------------------------------//
    
    var _currentRun_sjs;                    //當前正在run的sjs
    var _waitingRun_sjs_queue = [];         //等待run的sjs，同一時刻，只能有一個run在進行，因此在執行過程中，如果碰到了sjs.run，就先存起來，等當前的sjs run完成后，再按先進先出順序依次執行
    
    var _loaded_js = {};                    //[全局緩存]已經load的js，value為1(無定義，只表示已載入)或sjsObj(表示這個js是一個模塊定義)

    var _waitingLoad_using_queue = [];      //當前需要載入的using隊列，one by one載入，主要是sjs.define要匹配js
    var _current_loading_using;             //當前正在載入的using
    
    var _waitingLoad_call_queue = [];       //當前run sjs所有的call服務，只運行一次，減少請求次數（以后可通過命令ID，去除重復）
    
    var _current_service_config;            //當前run的sjs的service config

    function _runSjs(sjsObj) {
        //任何時候，通過sjs載入的，必須one by one進行
        //因為在執行sjs.define時，會不知道當前的js是什么
        if (_currentRun_sjs){
            _waitingRun_sjs_queue.push(sjsObj);
            log("+++ 加入sjs run階列",sjsObj,"當前隊階大小",_waitingRun_sjs_queue.length);        
        }
        else {
            delete _sjs_result["$SERVICE_CONFIG"];
            _current_service_config = null;
            _loaded_js["$SERVICE_CONFIG"] = {
                _fn:function(){
                    return _current_service_config;
                }
                ,_cssList:[]
                ,_usingList:[]
            };

            _currentRun_sjs = sjsObj;
            _waitingLoad_using_queue.length = 0;
            log("==> 設置并run當前sjs",sjsObj);
            _loadSjs(sjsObj);
        }
    }
    
    var _is_waitingLoad_using = {};
    
    function _loadSjs(sjsObj){
        _addUsingList(sjsObj);
        _loadUsingList();
    }
    
    function _addUsingList(sjsObj,refJs){
        var usingList = sjsObj._usingList;
        for(var i=0;i<usingList.length;i++){
            var js = usingList[i].js;
            //服務調用，統一一次進行(因為不會編譯合并)
            if(usingList[i].service){
                ;//_waitingLoad_call_queue.push(usingList[i]);
            }
            //增加語言包導入
            else if(js=="$LANG"){
                js = usingList[i].js = refJs + ".en-us";
            }
            //讀入當前config配置，上層的override下層
            usingList[i]._refJs = refJs;          //建立一個反向引用，方便調試
            if(!usingList[i].service && !_is_waitingLoad_using[js] && typeof(_sjs_result[js])==="undefined" && !_loaded_js[js]){
                log(" -> 加入using至載入隊列",usingList[i]);    
                _is_waitingLoad_using[js] = 1;    
                _waitingLoad_using_queue.push(usingList[i]);
            }
        }
    }
    
    
    var _sjs_result = {};                   //[全局緩存]js的計算結果(緩存，如果一樣，則不用執行2次函數)
    var _currentCal_sjs_stack = [];         //開始run的sjs堆疊(后進先出)
    
    function _loadUsingList() {
        if(_waitingLoad_using_queue.length>0){
            //按隊列先進先出，載入所有js，目的為在_loaded_js中建立js與sjs(fn,result,using)的對應
            _current_loading_using = _waitingLoad_using_queue.shift();           //先進先出
            var js = _current_loading_using.js;
            if(_define_loaded_js[js]){
                log("--------------------------------------------------------------------------------------------------------");
                log("當前js的sjsObj直接已定義(勿需載入script)",js);  
                _loaded_js[js] = _define_loaded_js[js];
                _define_loaded_js[js] = null;      
                _loadUsingFinish();
            }
            else if(!_loaded_js[js]){
                //log();
                //log();
                log("--------------------------------------------------------------------------------------------------------");
                log("設置并載入當前using",_current_loading_using);        
                if(_current_loading_using.tpl){
                    // var path = "TemplateCompile.aspx?tpl=" + _current_loading_using.tpl;
                    ////debugger;
                    var path = _path(_current_loading_using.tpl,".html");
                    log("载入模板",path)
                    _loadByXmlHttp(path,_current_loading_using._refJs, _loadTplFinish);
                    // _loadByIframe(path,_current_loading_using._refJs, _loadTplFinish);
                }
                else{ 
                    var path = _path(js,".js");
                    log("載入js",path);       
                    _loadJs(path,_current_loading_using._refJs, _loadUsingFinish);
                }
            }
            else{
                //log("（js已載入）",js);   
                //log("========================================================================================================");
                     
                _loadUsingList();
            }
        }
        else{
            log("當前run sjs的using js全部已開始載入...");        
            _currentCal_sjs_stack.length = 0;
            _current_loading_using = null;      //這個變量要清空,防止下一次define時誤用

            _waitingLoad_call_queue.length = 0;
            //同一個sjs._fn因為有service_config的定義，所以需要按需計算
            //有using $SERVICE_CONFIG的，其本身需要重新計算，有call service的，本身需要重新計算，然後凡是有引用前2者的，都需要重新計算
            setSjsObjServiceConfig(_currentRun_sjs);

            for(var sjsJs in _currentRun_sjs._serviceList){
                _waitingLoad_call_queue.push(_currentRun_sjs._serviceList[sjsJs]);
            }

            //統一調用服務后再運行
            _callSjsService();
            //_calSjs(_currentRun_sjs);
        }
    }

    function setSjsObjServiceConfig(sjsObj,parentSjsObjList){

        if(typeof(sjsObj._set_config_service)=="undefined"){
            var usingList = sjsObj._usingList;

            sjsObj._serviceList = {};               //key是serivce的ID，value是usingList[i]
            parentSjsObjList = parentSjsObjList || [];
            parentSjsObjList.push(sjsObj);

            for(var i=0;i<usingList.length;i++){
                var js = usingList[i].js;
                if(!_current_service_config &&  usingList[i].serviceConfig){
                    //serviceConfig與host不一樣，host是可以寫在代碼中，表示明確調用哪個host，querystring中的qs.HOST只是一個default Host，用來取代所有默認的host的
                    //但是其實Host也是一樣的道理，不能在同一個Portal中，設定不同的Host?

                    //其實serviceConfig也應該和host一樣，只是一個默認的serviceConfig，如果內對象有自己的serviceConfig，則以自己的代替，否則用默認的
                    //!另外考慮是否疊加serviceConfig，然后外層優先級高一些，但是這樣會讓權限設定變得復雜（暫時不做）
                    //而且一般都會同時call多個相同的service，如果目前這種模式，則會讓每一個service變成一樣了，所以不能簡單的另在前面，而是要和每一個做相加動作
                    //serviceConfig和Host一樣，采用默認機制，代碼優先配置

                    //目前serviceConfig在服務端(Server.cs)的call中，如果是PermissionCall，則認為是一次全新的call，則會清空serviceConfig，這也適用于sjs一包service丟過去同時call
                    
                    //目前serviceConfig在sjs.call和Core5.Util.Service中，都是以最外層的ServiceConfig優先級別來做的，如果有外層的ServiceConfig，則會override掉具體代碼那時的ServiceConfig
                    //為保險見，目前不要在一般的代碼中使用ServiceConfig進行call，統一由qs.JS2或Menu中的js來設定
                    //即只有在sjs.using.run里才可以有serviceConfig，而在sjs.using.define中最好不要出現serviceConfig
                    
                    //serviceConfig由第一個碰到的service_config決定，以后可能會允許里面有嵌套的service_config(2015.8.20 kevin注)
                    _current_service_config =  usingList[i].serviceConfig;
                }


                if(usingList[i].service){
                    sjsObj._set_config_service = 1;
                    //_waitingLoad_call_queue.push(usingList[i]);
                    for(var j=0;j<parentSjsObjList.length;j++){
                        parentSjsObjList[j]._serviceList[usingList[i].js] = usingList[i];
                    }
                }
                else if(js=="$SERVICE_CONFIG"){
                    ////debugger
                    sjsObj._set_config_service = 1;
                }
                else{
                    var subSjsObj = _loaded_js[js];
                    if(typeof(subSjsObj)=="object"){
                        setSjsObjServiceConfig(subSjsObj,parentSjsObjList);
                        if(subSjsObj._set_config_service){
                            sjsObj._set_config_service = 1;
                        }
                        for(var subServiceID in subSjsObj._serviceList){
                            for(var j=0;j<parentSjsObjList.length;j++){
                                parentSjsObjList[j]._serviceList[subServiceID] = subSjsObj._serviceList[subServiceID];
                            }
                        }
                    }
                }
            }
            if(!sjsObj._set_config_service){
                sjsObj._set_config_service = 0;
            }

            parentSjsObjList.pop();
        }
    }

    

    function prefixCall(ret) {
        var getRet=[];
        var errMsg="";
        if(!ret.AjaxError) {
            for(var i=0;i<ret.Result.length;i++) {
                getRet.push(ret.Result[i].Result);
                if(ret.Result[i].AjaxError){
                    errMsg+=(errMsg.length>0?"\n":"")+ret.Result[i].Message;
                }
            }
        }
        else
            errMsg=ret.Message;

        if(errMsg.length>0){
            alert(errMsg);
            log(errMsg);
        }
        return getRet;
    }   
    
    
    function createJsonpBackFn(host,dicHost){
        return function(ret){
            //建立統一call service的結果對應
            var realRet = prefixCall(ret);
            if(realRet){
                var hostCalls = _waitingLoad_call_dic[dicHost];
                for(var i=0;i<hostCalls.length;i++){
                    var serviceJs = hostCalls[i].js;
                    if(_current_service_config){
                        serviceJs = hostCalls[i].js + "$" + _current_service_config;
                    }
                    _sjs_result[serviceJs] = realRet[i];
                }
                delete _waitingLoad_call_dic[dicHost];
            }
        };
    }
    
    var _waitingLoad_call_dic = {};     //等待統一call(每個host，集中為一次call)
    
    //host:/ (root for vs express)
    //host:www.pci.co.id
    //host:/RIAServiceUpd
    //host:www.pci.co.id/RIAServiceUpd
    //host:https://www.pci.co.id
    //host:http://www.pci.co.id
    //has / or not
    function getRIAServiceByHost(host){
        var serviceApp = "/SjsService";
        var servicePath = "/ajaxServiceNew.ashx";
        if(host){
            //host:/
            //start from /, means replace RIAService only(same protocol, same domain)
            if(host=="/"){
                return servicePath;
            }

            var isHttps = host.toLowerCase().indexOf("https://") == 0;
            var isHttp = host.toLowerCase().indexOf("http://") == 0;
            if(isHttps){
                host = host.substr("https://".length);
            }
            else if(isHttp){
                host = host.substr("http://".length);
            }

            var serviceAppIndex = host.indexOf("/");

            //host: https://www.pci.co.id/RIAServiceUpd
            //host: http://www.pci.co.id/RIAServiceUpd
            //host: www.pci.co.id/RIAServiceUpd
            //host contains /, means another domain, another RIAService
            if(serviceAppIndex>0){
                return (isHttps?"https:":isHttp?"http:":location.protocol) + "//" + host + servicePath;
            }

            //host:/RIAServiceUpd  
            //same protocol, same domain, but different RIAService
            else if(serviceAppIndex==0){
                return host + servicePath;
            }

            //host:www.pci.co.id
            //host: https://www.pci.co.id
            //host: http://www.pci.co.id
            else{
                return (isHttps?"https:":isHttp?"http:":location.protocol) + "//" + host + serviceApp + servicePath;
            }
        }
        return serviceApp + servicePath;
    }


    
    //TODO：多個不同的服務器呢？目前只能調用本地服務
    function _callSjsService(){
        if(_waitingLoad_call_queue.length>0){
            _waitingLoad_call_dic = {};
            for(var i=0;i<_waitingLoad_call_queue.length;i++){
                var callItem = _waitingLoad_call_queue[i];

                var serviceJs = callItem.js;
                if(_current_service_config){
                    serviceJs = serviceJs + "$" + _current_service_config;
                }
                if(typeof(_sjs_result[serviceJs]) == "undefined"){
                    var host = callItem.host;
                    if(!_waitingLoad_call_dic[host]){
                        _waitingLoad_call_dic[host] = [];
                    
                    }
                    _waitingLoad_call_dic[host].push({js:callItem.js,service:callItem.service,params:callItem.params});
                }
            }
            
            var hasService = false;
            for(var host in _waitingLoad_call_dic){
                var realHost = host;
                var jsonDic = _waitingLoad_call_dic[realHost];
                host = host || _host;
                var jsonpFnName = "_jsonp_" + (host.replace(/\./g,"_").replace(/\//g,"_").replace(":","_"));
                sjs[jsonpFnName] = sjs[jsonpFnName] || createJsonpBackFn(host,realHost);
                if(_current_service_config){
                    if(jsonDic.push){
                        for(var i=0;i<jsonDic.length;i++){
                            jsonDic[i].service = jsonDic[i].service.split("$")[0] + "$" + _current_service_config;
                        }
                    }
                    else{
                        jsonDic.service = jsonDic.service.split("$")[0] + "$" + _current_service_config;
                    }
                }
                var path = getRIAServiceByHost(host) + "?callback=sjs." + jsonpFnName + "&jsonservice=" + JsonHelper.encode(jsonDic) + "&_client_call_id=" + getSvcCallId();
                log("調用service",path);        
                
                _loadJs(path,"", function(){
                    var remainCall = false;
                    for(var p in _waitingLoad_call_dic){
                        remainCall = true;
                        break;
                    }
                    if(!remainCall){
                        _calSjs(_currentRun_sjs);
                    }
                });
                hasService = true;
            }
            if(!hasService){
                _calSjs(_currentRun_sjs);
            }
        }
        else{
            _calSjs(_currentRun_sjs);
        }
    }
    
    function _runNextSjs(){
        _currentRun_sjs = null;
        
        //執行下一個
        if(_waitingRun_sjs_queue.length>0){
            var nextSjsObj = _waitingRun_sjs_queue.shift();
            log("run下一個sjs",nextSjsObj,"階列大小",_waitingRun_sjs_queue.length);        
            _runSjs(nextSjsObj);
        }
        else{
            log("全部sjs run完成");        
        }
    }
    
    var _define_loaded_js = {};             //重新動態定義sjs

    function _resetSjs(js){
        js = js.split("$")[0];
        _loaded_js[js] = null;
        var needDeletedResult = [js];
        for(var p in _sjs_result){
            if(p.indexOf(js + "$")==0){
                needDeletedResult.push(p);
            }
        }
        for(var i=0;i<needDeletedResult.length;i++){
            delete _sjs_result[needDeletedResult[i]];
        }
        _is_waitingLoad_using[js] = 0;
    }

    function _defineSjs(sjsObj){
        //原本要用一個獨立的方法,但這里為了API更美觀,和define放一起
        //實際上這樣做,是直接定義sjsObj,而不是需要載入js后,再用_current_loading_using方式來建立js和sjsObj的對應
        if(sjsObj._sjsName){       //直接定義,不是通過載入js文件中知曉
            var js = sjsObj._sjsName;       //別名
            log("sjs.nm自定義模塊名稱",js,sjsObj);
            //清空資料
            _resetSjs(js);
            _define_loaded_js[js] = sjsObj;

        }
        else if(_current_loading_using){
            var js = _current_loading_using.js;
            if(typeof(_sjs_result[js])==="undefined"){
                if(_loaded_js[js])
                    log("! WARN !","當前js載入過程中，出現重複定義，override",js,_loaded_js[js]); 
                log("定義js與sjs對應",js,sjsObj); 
                if(_develop && _current_loading_using.sjs!="1")
                    log("! WARN !","非using载入的定义会被忽略(此警告仅Develop时可见，因compile后不设置sjs)",js,sjsObj); 
                _loaded_js[js] = sjsObj;            //如果有多個，則取最后一個，因為載入js后，執行js，ok后馬上執行_loadUsingFinish函數
                //TODO:別名 sjs.alias(可以用alias)
            }
            else{
                log("! WARN !","js已計算，忽略sjs定義",js,sjsObj);        
            }
        }
        else{
            log("! WARN !","執行sjs.define時，沒有當前using，忽略sjs定義",sjsObj);        
        
            //直接執行模塊定義js，就忽略，不執行，也不做任何動作
            //throw new Error("必須用sjs.using載入這個用sjs.define定義的js模塊")            
        }
    }

    function _loadTplFinish(text){
        sjs.define(function(){
            template.config("escape",false);        //html不轉義
            return template.compile(text);
            var fn = template.compile(text);
            return function(){
                return fn(this);
            }
        });
        _loadUsingFinish();
    }

/*
    function _loadTplFinish(){
        ////debugger;
        var loadIframe = document.getElementById("TEMPLATE_LOAD_IFRAME");
        if(loadIframe.src && loadIframe.src !="about:blank"){
            var frameDoc = loadIframe.contentDocument || loadIframe.window.document;
            var text = frameDoc.getElementsByTagName("body")[0].innerHTML;
            alert(loadIframe.src + ":" + text);
            sjs.define(function(){
                var fn = template.compile(text);
                return function(){
                    return fn(this);
                }
            });
            _loadUsingFinish();
        }
    }*/
    
    function _loadUsingFinish(){
        _addUsingListAfterDefine();
        _loadUsingList();
    }
    
    function _addUsingListAfterDefine(){
        var js = _current_loading_using.js;
        if(typeof(_sjs_result[js])=="undefined"){
            var sjsObj = _loaded_js[js];
            if(sjsObj){                         //不作using中的sjs匹配檢查(檢查在執行時進行)
                //log("=====當前using載入完成=====","*****js與sjs定義OK*****");        
                //log("========================================================================================================");
                _addUsingList(sjsObj,js);
            }
            else{
                //log("=====當前using載入完成=====","（無定義，只設置js已載入）");        
                _loaded_js[js] = 1;             //js中無sjs.define定義,1表示已載入完成
                //log("========================================================================================================");
            }
        }
        else{
            log("! WARN !","當前using載入完成時，發現js已計算",js);        
            //log("========================================================================================================");
        }
    }

    //檢查是否循環調用
    function _checkLoopCall(js){
        var jsChain = js;
        for (var i = _currentCal_sjs_stack.length - 1; i >= 0; i--) {
            var preJs = _currentCal_sjs_stack[i];
            jsChain = preJs + ">" + jsChain;
            if (preJs == js){
                exExist("sjs.define存在循環調用:" + jsChain);
            }
        }
    }
    
    var _load_css_finish = null;
    function _loadSjsCss(sjsObj,js,fn){
        var css = sjsObj._cssList;
        if(css.length){
            _load_css_finish = fn;
            var isLoad = false;
            for(var i=0;i<css.length;i++){
                isLoad = _loadCssNotExists(css[i].url,css[i].charset,js) || isLoad;
            }
            //如果sjs.run時(注意,不是sjs.define),有using已load的css,則可能有bug,即run(function)不會執行,因為沒有css觸發它
            //全部的css已有載入,則直接執行fn
            if(!isLoad && fn){
                fn();            
            }
        }
        else if(!_totalLoadedCssCount && fn){
            fn();
        }
        else if(fn){
            _load_css_finish = fn;
        }
    }
    
    var _totalLoadedCssCount = 0;
    
    function _loadCssNotExistsOK(){
        _totalLoadedCssCount--;
        log("load css finish,還有:" + _totalLoadedCssCount);
        if(!_totalLoadedCssCount && _load_css_finish){
            log("load css完成，執行主回調函數");
            _load_css_finish();
        }
    }
    
    var _loaded_css = {};
    function _loadCssNotExists(url,charset,js){
        var cssUrl = url;//.toLowerCase();
        if(!_loaded_css[cssUrl]){
            _totalLoadedCssCount++;
            _loaded_css[cssUrl] = 1;
            _loadCss(_path(cssUrl,".css"),_loadCssNotExistsOK,charset,js);
            //this._cssList.push({url:url,charset:charset});
            return true;
        }
        return false;
    }
       
    function _calSjs(sjsObj,js,pUsing){
        var needResult = arguments.length > 1;
        var logPrefix = "";
        var logPrefixLen = needResult?2 + _currentCal_sjs_stack.length:1;
        for(var i=0;i<logPrefixLen;i++)
            logPrefix += " -> ";
        var logStack = js;//(needResult? _currentCal_sjs_stack.join(" -> ") + " -> " + js:js);
        var fn = sjsObj._fn;
        var isFnDef = typeof(fn)==="function";
        if(!isFnDef){
            log(logPrefix,"--計算sjs--",logStack,sjsObj);                
            log(logPrefix,"sjs.define非函數，直接返回");    
            _loadSjsCss(sjsObj,js);            
            return fn;
        }
        var sjsResultJs = _current_service_config && sjsObj._set_config_service ? js +"$" + _current_service_config:js;
        if(!needResult || typeof(_sjs_result[sjsResultJs])==="undefined" || pUsing && pUsing.noArg===false){
            log(logPrefix,"--計算sjs--",logStack,sjsObj);                
            //檢查找參數是否會死循環
            if(needResult){
                _checkLoopCall(js);
                _currentCal_sjs_stack.push(js);
            }
            var usingList = sjsObj._usingList;
            var args = [];
            /*
            if(!needResult){
                _loadCssFinishRunFn = fn;
                var _loadCssFinishRunLogPrefix;
                var _loadCssFinishRunJs;
                
            }
            */
            for(var i=0;i<usingList.length;i++){
                var using = usingList[i];
                var using_js = using.js;
                if(using.service){
                    var serviceJs = using_js;
                    if(_current_service_config){
                        serviceJs = using_js + "$" + _current_service_config;
                    }
                    args.push(_sjs_result[serviceJs]);
                }
                else if(using.sjs){      //load進來的不要進入參數
                    var using_sjsObj = _loaded_js[using_js];
                    //log(logPrefix,"計算參數",i+1,using_js);
                    if(typeof(using_sjsObj)==="object"){
                        var arg = _calSjs(using_sjsObj,using_js,using);
                        if(using.noArg !== true){
                            args.push(arg);
                        }
                    }
                    else{
                        exExist(using_js + "文件中沒有用sjs.define定義的模塊,[js:" + using._refJs + "]");
                    }
                }
                else{
                    ;//log(logPrefix,"（非using引用，此參數不需要）",using_js);
                }
            }
            if(needResult){
                !pUsing._calculated && _loadSjsCss(sjsObj,js);   
                var ret; 
                //因為catch掉ex后，IE等不好查看錯誤堆棧
                if(_develop){
                    ret = fn.apply(null,args);      //因為會根據是否undefined來判斷有無執行,所以要加一個null
                    if(typeof(ret)=="undefined"){
                        ret = null;
                    }
                    _currentCal_sjs_stack.pop();
                    if(pUsing.noArg!==false){
                        pUsing._calculated = true;
                        _sjs_result[sjsResultJs] = ret;
                    }
                    log(logPrefix,"==計算完成==",js);//,"*******緩存結果并返回*********");   
                }
                else{
                    try{                    
                        ret = fn.apply(null,args);      //因為會根據是否undefined來判斷有無執行,所以要加一個null
                        if(typeof(ret)=="undefined"){
                            ret = null;
                        }
                        _currentCal_sjs_stack.pop();
                        if(pUsing.noArg!==false){ 
                            pUsing._calculated = true;
                            _sjs_result[sjsResultJs] = ret;
                        }
                        log(logPrefix,"==計算完成==",js);//,"*******緩存結果并返回*********");   
                    }
                    catch(ex){
                        _runNextSjs();                                                              
                        throw ex;
                    }
                }
                return ret;
            }
            else{
                _loadSjsCss(sjsObj,js,function(){
                    if(!_develop){
                        try{
                            log(logPrefix,"==計算完成==",js,"*******開始sjs.run*******"); 
                            _load_css_finish = null;
                            fn.apply(null,args);
                            log(logPrefix,"==計算完成==",js,"*******最頂層計算完成*******");   
                        }
                        catch(ex){
                            throw ex;
                        }
                        finally{
                            _runNextSjs();                             
                        }
                    }
                    else{
                        log(logPrefix,"==計算完成==",js,"*******開始sjs.run*******"); 
                        _load_css_finish = null;
                        fn.apply(null,args);
                        log(logPrefix,"==計算完成==",js,"*******最頂層計算完成*******");   
                        _runNextSjs();                             
                    }
                });
            }
        }
        else{
            ;//log(logPrefix,"==計算完成==",js,"（js已計算,直接返回）");                        
            return _sjs_result[sjsResultJs];
        }
    }

    //---------------------------------------外部方法加殼-----------------------------------------------------------//
        
    function loadCss(url,charset){
        return new _sjs().loadCss(url,charset);
    }

    function loadJs(js) {
        return new _sjs().loadJs(js);
    }

    function using(js,noArg) {
        return new _sjs().using(js,noArg);
    }
    
    function lang(){
        return new _sjs().lang();
    }
    
    function tpl(tplPath){
        return new _sjs().tpl(tplPath);
    }

//    function setNm(sjsName){
//        return new _sjs().setNm(sjsName);
//    }

    //用于動態創建sjs object
    function newSjs(){
        return new _sjs();
    }
    
    function call(){
        var args = Array.prototype.slice.call(arguments,0);
        var ret = new _sjs();
        ret.call.apply(ret,args);
        return ret;
    }
    
    function callOther(){
        var args = Array.prototype.slice.call(arguments,0);
        var ret = new _sjs();
        ret.callOther.apply(ret,args);
        return ret;
    }
    
    function define(nmOrFn,fn){
        new _sjs().define(nmOrFn,fn);
    }

    function run(fn) {
        new _sjs().run(fn);
    }

    function link(kind, service) {
        return new _sjs().link(kind, service);
    }
    
    //-----------------------------------------------------log工具----------------------------------------------//
    
    var _logOn = false;
    
    function getFnName(callee){
        var _callee = callee.toString().replace(/[\s\?]*/g,""),
        comb = _callee.length >= 50 ? 50 :_callee.length;
        _callee = _callee.substring(0,comb);
        var name = _callee.match(/^function([^\(]+?)\(/);
        if(name && name[1]){
            return name[1];
        }
        var caller = callee.caller,
        _caller = caller.toString().replace(/[\s\?]*/g,"");
        var last = _caller.indexOf(_callee),
        str = _caller.substring(last-30,last);
        name = str.match(/var([^\=]+?)\=/);
        if(name && name[1]){
            return name[1];
        }
        return "anonymous"
    };    
    
    function _formatSjs(sjs){
        var using = sjs._usingList;
        var ret = [];
        for(var i=0;i<using.length;i++)
            ret.push(using[i].js + (using[i].sjs?"":"(load)"));
        return "{sjs} [using list]:" + ret.join(",") + "";
    }
    
    function formatArgs(args){
        for(var i=1;i<args.length;i++){
            if(typeof(args[i])==="object" && args[i]._usingList)
                args[i] = _formatSjs(args[i]);
            else if(typeof(args[i])=="object" && args[i].js)
                args[i] = "[using]:" + args[i].js + "";
        }
    }
        
    function _log(args){
        formatArgs(args);
        console.log(args.length>0?args.join(","):"");
    }
    
    function log(){
        if(_logOn){
            try{
                //var fnName = getFnName(arguments.callee.caller);
                var args = Array.prototype.slice.call(arguments,0);
                //args.push("   :" + fnName + "");
                _log(args);
            }
            catch(ex){
                //exExist('log出錯(已停用):' + ex.description);
                _logOn = false;
            }
        }
    }
/* report error */
    if(window.addEventListener){
        window.addEventListener("unhandledrejection",function (e) {
            throw e.reason;
        });
        window.addEventListener("error",function (event) {
            var target = event.target || event.srcElement;
            var isElementTarget = //false;
            target instanceof HTMLScriptElement ||
            target instanceof HTMLLinkElement ||
            target instanceof HTMLImageElement;
            if (!isElementTarget){
                var err;
                if(target instanceof HTMLScriptElement ){
                    if(target.src.indexOf("_client_call_id")>=0){
                        return true;
                    }
                    err = {message:"script error",stack:target.src}
                }
                else if(target instanceof HTMLLinkElement ){
                    err = {message:"link error",stack:target.href}
                }
                else if(target instanceof HTMLImageElement ){
                    err = {message:"image error",stack:target.src}
                }
                else{
                    err = event.error || {message:"unknown",stack:event.type};
                }
                for(var i=0;i<1;i++){
                    window.setTimeout(function(){
                        atCmdDoIt(err,event.timeStamp,"addEventListener");
                    },1000);
                }
                return false;
            }
        },true);
    }
    else{
        window.onerror = function(message, source, lineno, colno, error) {
            window.setTimeout(function(){
                atCmdDoIt(event.error,event.timeStamp,"onerror");
            },1000);
        }
    }

    var _lastReportError = null;
    var _lastReportTime = 0;
    var _lastReportRepeat = 0;

    function atCmdDoIt(err,timeStamp,kind){
        var errTime = new Date();
        if(_lastReportError && _lastReportError.message == err.message 
            && _lastReportError.stack == err.stack && errTime - _lastReportTime < 5000
            || errTime - _lastReportTime < 2000
            ){
            _lastReportRepeat++;
            return;
        }
        var jsonDic = {
            service:"ClientTool.ATCmdDoItx"
            ,params:[err.message && err.message.length>400?err.message.substr(0,400):err.message,err.stack,kind,_lastReportRepeat]
        }
        _lastReportError = err;
        _lastReportTime = errTime;
        _lastReportRepeat = 0;
        var path = getRIAServiceByHost() + "?jsonservice=" + JsonHelper.encode(jsonDic) + "&NoJsonError=1&_client_call_id=";
        for(var i=0;i<1;i++){
            var reqPath = path + getSvcCallId();         
            var img = new Image();
            img.width = 1;
            img.height = 1;
            img.src = reqPath;
            //_loadJs(reqPath,"", function(){});
        }
    }

    /*----------------*/
    //------------------------------------------------------輸出----------------------------------------------//
    
    //如果有其它js庫用到了全局sjs變量名，那先備份
    //注意jsonp和server call回部份，還有眾多的寫死sjs的代碼，可能已不支持sjs改名了
    window["_" + nm] = window[nm];
    //Test一下
    //定義全局變量
    var _sjs_private = window["__sjs__real"]  = window[nm] = {
        ver:"1.42"           //sjs的版本號自動編譯計算在UI.aspx中，然後會在UI.aspx中動態替換代碼，完成UI.aspx的更新，再完成browser的更新
	    
        ,getSvcCallId: getSvcCallId

        ,noConflict: function() {
	        window[nm] = window["_" + nm];
	        return _sjs_private;
	    }
        
        , loadCss: loadCss
        , loadJs: loadJs
        ,link:link
        , using: using
        , lang: lang
        , call: call
        , callOther:callOther
        , define: define
        , tpl:tpl
        //, setNm:setNm
        , newSjs:newSjs
        , run: run
        , resetSjs:_resetSjs        //重新載入sjs
        
        //以下為設定_path路徑-------------------------------------------------------
        , setDevelop:function(){
            _develop = true;
            return _sjs_private;
        }
        
        ,getDevelop:function(){
            return _develop;
        }
        
        ,setLanguage:function(lang){
            _language = lang;
            return _sjs_private;
        }
        
        ,getLanguage:function(){
            return _language;
        }

        , setFileVersion:function(js,version){
            _jsFilesVersion[js] = version;
        }

        , getFileVersion:function(js){
            return _jsFilesVersion[js];
        }
        
        //為方便調試，可以從對象反溯導入的js名稱
        , getDefineIn:function(obj,reMap){
            for(var p in _sjs_result){
                if(_sjs_result[p] == obj){
                    if(reMap){
                        for(var ret in _jsReMap){
                            if(_jsReMap[ret]==p){
                                return ret;
                            }
                        }
                    }
                    return p.replace("$","-");
                }
            }
            return null;
        }
        
        , getSjsDefine:function(){
            return _sjs_result;
        }
        
        //啟用日志監控sjs過程------------------------------------------------------
        , enableLog: function(){
            _logOn = true;
            return _sjs_private;
        }
        
        , disableLog: function(){
            _logOn = false;
            return _sjs_private;
        }
        
        //以下這些提供合并js文件直接使用---------------------------------------------
        , _getLoadedJs:function(){
            return _loaded_js;
        }

        ,_getSjsResult:function(){
            return _sjs_result;
        }
                
        , _setCurrentLoadingUsing:function(js){
            _current_loading_using = js;
        }
        , _getCurrentLoadingUsing:function(js){
            return _current_loading_using;
        }
        
        , _addUsingListAfterDefine:function(){
            _addUsingListAfterDefine();
        }
        
        ,_setCssLoaded:function(cssUrl){        //小写
            _loaded_css[cssUrl] = 1;        
        }
        
        ,_loadCss:function(css){
            _loadCssNotExists(css);
        }
        
        ,setHost:function(host){
            _host = host;
            return _sjs_private;
        }

        ,getHost:function(){
            return _host;
        }

        ,getRIAService:function(){
            return getRIAServiceByHost(_host);
        }

        ,getRIAServiceByHost:function(host){
            return getRIAServiceByHost(host);
        }
		/*
        ,getUsingPath:function(path,ext){
            return _path(_getMapPath(path,ext),"." + ext);
        }
		*/
        //用于升级(可以只修改几个文件，便于分批升级和更新)
        ,reMap:function(oldPath,newPath){
            var map = oldPath;
            if(typeof(oldPath)=="string"){
                map = {};
                map[oldPath] = newPath;
            }      
            for(var p in map){
                var keys = p.split(".");
                var mayBeExt = keys[keys.length-1];
                var ext = mayBeExt == "js" || mayBeExt=="css" || mayBeExt=="html"?mayBeExt:null;
                if(ext){
                    keys.length -= 1;
                }
                var key = ext?keys.join("."):p;
                if(ext=="js"){
                    _jsReMap[key] = map[p];
                }
                else if(ext=="css"){
                    _cssReMap[key] = map[p];
                }
                else if(ext=="html"){
                    _tplReMap[key] = map[p];
                }
                else{
                    _jsReMap[key] = map[p];
                    _cssReMap[key] = map[p];
                    _tplReMap[key] = map[p];
                }
            }      
            return _sjs_private;        //请放在sjs.load和using之前
        }
        
        ,path:function(js,folder){
            if(folder && folder.slice(-1)!="/"){
                folder = folder + "/";
            }
            _packagePath[js] = folder;
            return _sjs_private;
        }

        ,pathVersion:function(js,version){
            _packageVersion[js] = version;
            return _sjs_private;
        }

        ,setLoadJsErrorExit:function(exit){
            _loadjs_error_exit = exit;
            return _sjs_private;
        }

        ,basePath:function(folder){
            //取消basePath，統一用path
            sjs.baseFolder = folder;
            sjs.path("Core5",folder + "Core5")
                .path("jQuery",folder + "jQuery")
                .path("./Ref",folder + "Ref")
                .path("./Runtime",folder + "Runtime")
            return _sjs_private;
        }

        ,defaultFolder:function(folder){
            if(folder && folder.slice(-1)!="/"){
                folder = folder + "/";
            }
            _defaultFolder = folder;
            return _sjs_private;
        }

        ,getDefaultFolder:function(){
            return _defaultFolder;
        }

        ,_setLoadJs:function(loadJsFn){
            _loadJs = loadJsFn;
        }

        ,getPath:function(path,ext){
            return _path(path,ext || ".js");
        }
    };


})("sjs");


