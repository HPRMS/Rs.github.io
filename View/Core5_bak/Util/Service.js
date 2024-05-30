//如果bsom,qip日記等之前的程式如果改動后有問題，可能是jQuery升級到1.8.3的原因，可以先改回來，compile后再改回去即可
//sjs.loadJs("./ref/jQuery-1.4.2.min.js")
//sjs.loadJs("./ref/jquery-1.8.3.min.js")
sjs.loadJs("./Ref/JSON.js")
.using("jQuery")
.using("$SERVICE_CONFIG")
.using("Core5.Util.EventManager")
.define(function(jq,serviceConfig,eventManager){
    var serviceCaller = {};
   function prefixCall(ret) {
        var getRet=[];
        var errMsg="";
        if(!ret.AjaxError) {
            for(var i=0;i<ret.Result.length;i++) {
                if(!ret.Result[i].AjaxError)
                    getRet.push(ret.Result[i].Result);
                else
                    errMsg+=(errMsg.length>0?"\n":"")+ret.Result[i].Message;
            }
        }
        else
            errMsg=ret.Message;

        if(errMsg.length>0)
            return errMsg;
        else
            return getRet;
    }
    
    function getContextMenuJs(context){
        var callObj = context;
        while(callObj){
      
            if(callObj.MENU_JS && typeof(callObj.MENU_JS)=="string"){
                return callObj.MENU_JS;
            }

            callObj = callObj.parent;
            if(callObj==window)
                break;

        }
        return null;
    }

    function getParentMenuJs(service, args, context) {
        if (context == "contextIsParamsLast") {
            context = args[args.length-1];
        }
        var ret = [];
        var callObj = context;
        while (callObj) {
            if (callObj.MENU_JS && typeof(callObj.MENU_JS)=="string") {
                ret.push(callObj.MENU_JS.split("$")[0]);       
            }
            callObj = callObj.parent;
            if(callObj==window)
                break;
        }
        return ret.join(",");
    }

    serviceCaller.isUIService = function(service,args){
        var uiService; 
        var clientToolService = service.split("$");
        if(service.indexOf("._ui.")>0){
            uiService = service;
        }
        else if(
            (clientToolService[0]=="ClientTool.QueryPage"
                || clientToolService[0]=="ClientTool.Query"
                || clientToolService[0]=="ClientTool.QueryDataSet"
                || clientToolService[0]=="ClientTool.QueryRows"
                || clientToolService[0]=="ClientTool.QueryRow"
                || clientToolService[0]=="ClientTool.QueryObject"
                || clientToolService[0]=="ClientTool.ExecuteObject"
                || clientToolService[0]=="ClientTool.ExecuteDataSet"
                || clientToolService[0]=="ClientTool.Execute"
                || clientToolService[0]=="ClientTool.ExecuteOutput")
            && args[0] && args[0].indexOf && args[0].indexOf("._ui.")>0){
            uiService = args[0] + (clientToolService.length==2?"$" + clientToolService[1]:"");
        }
        
        return uiService;
    }

    function clientToolMenuCommand(service,args){
        var uiService; 
        var clientToolService = service.split("$");
        if(
            (clientToolService[0]=="ClientTool.QueryPage"
                || clientToolService[0]=="ClientTool.Query"
                || clientToolService[0]=="ClientTool.QueryDataSet"
                || clientToolService[0]=="ClientTool.QueryRows"
                || clientToolService[0]=="ClientTool.QueryRow"
                || clientToolService[0]=="ClientTool.QueryObject"
                || clientToolService[0]=="ClientTool.ExecuteObject"
                || clientToolService[0]=="ClientTool.ExecuteDataSet"
                || clientToolService[0]=="ClientTool.Execute"
                || clientToolService[0]=="ClientTool.ExecuteOutput")
            && args[0] && args[0].indexOf && args[0].indexOf("~.")==0){ 
            return true;
        }
        return false;
    
    }
    
    function checkContextMenuJs(service,args,context){
        //Ex: ~.Service.Method$Config
        //暫不支援~.Xx style DBCommand call(Andrie 2017.11.27)
        if(service.indexOf("~.")==0){
            var contextMenuJs = getContextMenuJs(context);
            if(!contextMenuJs){
                return 'call ~ style service(' + service + ')\ncontext(or parent) no MENU_JS property!\n(cusCallService context please set as the last params)';
            }

            //clear $config on menu
            var menuJsConfigArr = contextMenuJs.split("$");
            var menuJsConfig = menuJsConfigArr[1];
            contextMenuJs = menuJsConfigArr[0];

            
            var appUIPath = sjs.getPath(contextMenuJs).replace(/\\/g,"/");
            var uiIndex = appUIPath.indexOf("_ui");
            if(uiIndex<=0){
                return 'call ~ style service(' + service + ')\nnot a wdp app!\ncontextMenuJs:' + contextMenuJs + '\nappUIPath:' + appUIPath;
            }

            var contextMenuJsArr = contextMenuJs.split(".");
            var menuJsArr = appUIPath.split("/_ui/")[1].split("?")[0].replace(/\//g,".").split(".");
            menuJsArr.pop();        //remove .js?xxxx
            if(menuJsArr[menuJsArr.length-1]=="Index"){
                menuJsArr.pop();    //remove Index(service不是以Index开头的)
                contextMenuJsArr.pop();
            }
            var menuJsStr = menuJsArr.join(".");
            var contextMenuJsStr = contextMenuJsArr.join(".");
            var realService = contextMenuJsStr.replace(menuJsStr,"_ui." + menuJsStr);

            //so please no call $config on js code.because this program can not match any one
            var serviceMethod = service.substr(1);
            //use serviceConfig here,no use menu serviceConfig
            //if(menuJsConfig){
            //    serviceMethod = serviceMethod.split("$")[0] + "$" + menuJsConfig;
            //}

            return {service:realService + serviceMethod,parentMenuJs:getParentMenuJs(service,args,context)};
        }
        else if(clientToolMenuCommand(service,args)){
            var contextMenuJs = getContextMenuJs(context);
            if(!contextMenuJs){
                return 'call ~ style service(' + service + ')\ncontext(or parent) no MENU_JS property!\n(cusCallService context please set as the last params)';
            }

            //clear $config on menu
            var menuJsConfigArr = contextMenuJs.split("$");
            var menuJsConfig = menuJsConfigArr[1];
            contextMenuJs = menuJsConfigArr[0];

            
            var appUIPath = sjs.getPath(contextMenuJs).replace(/\\/g,"/");
            var uiIndex = appUIPath.indexOf("_ui");
            if(uiIndex<=0){
                return 'call ~ style service(' + service + ')\nnot a wdp app!\ncontextMenuJs:' + contextMenuJs + '\nappUIPath:' + appUIPath;
            }

            var contextMenuJsArr = contextMenuJs.split(".");
            var menuJsArr = appUIPath.split("/_ui/")[1].split("?")[0].replace(/\//g,".").split(".");
            menuJsArr.pop();        //remove .js?xxxx
            if(menuJsArr[menuJsArr.length-1]=="Index"){
                menuJsArr.pop();    //remove Index(service不是以Index开头的)
                contextMenuJsArr.pop();
            }
            var menuJsStr = menuJsArr.join(".");
            var contextMenuJsStr = contextMenuJsArr.join(".");
            var realService = contextMenuJsStr.replace(menuJsStr,"_ui." + menuJsStr);

            //so please no call $config on js code.because this program can not match any one
            var serviceMethod = args[0].substr(1);
            //use serviceConfig here,no use menu serviceConfig
            //if(menuJsConfig){
            //    serviceMethod = serviceMethod.split("$")[0] + "$" + menuJsConfig;
            //}
            args[0] = realService + serviceMethod;
            return {parentMenuJs:getParentMenuJs(service,args,context)};
        }

        var uiService = serviceCaller.isUIService(service,args); 
        if(uiService && uiService.indexOf("PCI.Eng.")<0){
            //cusCallService,context請放在最后一個params里
            if(context=="contextIsParamsLast"){
                context = args.pop();
            }

            if(!context || typeof(context)!="object"){
                return 'call _ui style service(' + uiService + ')\ncontext can not be empty!\n(cusCallService context please set as the last params)';
            }

            var contextMenuJs = getContextMenuJs(context);
            if(!contextMenuJs){
                return 'call _ui style service(' + uiService + ')\ncontext(or parent) no MENU_JS property!\n(cusCallService context please set as the last params)';
            }

            var serviceMenuJsErrMsg = "\n------------------\ncontextMenuJs:" + contextMenuJs + "\nuiService:" + uiService + (service.indexOf("._ui.")>0?"":"(SqlHelper)") + "\n------------------\n";
            //console.log(serviceMenuJsErrMsg);

            var menuJsConfig = contextMenuJs.split("$");
            var uiServiceConfig = uiService.split("$");
            if(menuJsConfig.length!=uiServiceConfig.length || menuJsConfig.length==2 && menuJsConfig[1]!=uiServiceConfig[1]){
                return 'call _ui style service(' + serviceMenuJsErrMsg + ')\n$SERVICE_CONFIG is not same!\ncontextMenuJs:' + contextMenuJs + "\nuiService:" + uiService;
            }

            contextMenuJs = menuJsConfig[0];
            var serviceItems = uiServiceConfig[0].split("._ui.");
            var serviceAppID = serviceItems[0] + ".";
            if(contextMenuJs.indexOf(serviceAppID) !=0){
                return 'call _ui style service(' + serviceMenuJsErrMsg + ')\ncontextMenuJs not start with serviceAppID!\ncontextMenuJs:' + contextMenuJs + "\nserviceAppID:" + serviceAppID;
            }
            

            var serviceIDAry = serviceItems[1].split(".");
            serviceIDAry.pop();
            var serviceID = serviceIDAry.join(".") + ".";
            var menuJsAry = contextMenuJs.split(".");
            if(menuJsAry[menuJsAry.length-1] == "Index"){
                menuJsAry.pop();
            } 
            var menuJs = menuJsAry.join(".").substr(serviceAppID.length) + ".";


            if(serviceID.indexOf(menuJs)!=0){
                return 'call _ui style service(' + serviceMenuJsErrMsg + ')\nserviceID not start with menuJs!\nserviceID:' + serviceID + "\nmenuJs:" + menuJs;
            }

        }
        return {parentMenuJs:getParentMenuJs(service,args,context)};
    }

    serviceCaller.cusCallService = function(service,params,view,args,serviceKind,noOpen,host){
        
        host = sjs.getRIAServiceByHost(host || sjs.getHost());
        var serviceUrl = host + "?NoMultipleLang=1&ServiceKind=" + (serviceKind || "View");
        
        var servicePackage = {service:(serviceConfig?service.split("$")[0] + "$" + serviceConfig:service),params: params};

        var errMsg = checkContextMenuJs(servicePackage.service,servicePackage.params,"contextIsParamsLast");
        var parentMenuJs;
        if (typeof (errMsg) == "string") {
            alert(errMsg);
            if(noOpen){
                return "about:blank";
            }
        }
        else if(errMsg.service){
            servicePackage.service = errMsg.service;
            parentMenuJs = errMsg.parentMenuJs;
        }
        else if(errMsg.parentMenuJs){
            parentMenuJs = errMsg.parentMenuJs;
        }

		var JsonService = encodeURIComponent(JsonHelper.encode(servicePackage));
        serviceUrl += "&JsonService=" + JsonService;
        
        serviceUrl += "&view=" + view;
        
        if (parentMenuJs) {
            serviceUrl += "&ParentMenuJs=" + parentMenuJs;
        }

        if(args){
            for(var p in args){
                serviceUrl += "&" + p + "=" + args[p];
            }
        }
        if(!noOpen){
            window.open(serviceUrl);
        }
        else{
            return serviceUrl;
        }
    }

    var _jsonKey = 0;

    function getJsonKey(){
        return (new Date().valueOf()) + "_" +  (++_jsonKey);;
    }

    if(!sjs.iframeCallBack){
        sjs._iframeCall = {};

        sjs._iframeKey = 0;

        sjs.iframeCallBack = function(result){
            //alert(JsonHelper.encode(result));

            var iframeKey = result.callbackArgs;
            var iframeCall = sjs._iframeCall[iframeKey];
            delete sjs._iframeCall[iframeKey];
            var okFn = iframeCall.okFn;
            var errFn = iframeCall.errFn;
            var context = iframeCall.context;
            var addParam = iframeCall.addParam;
            eventManager.publish(serviceCaller,!result.AjaxError?"callServiceOK":"callServiceErr",result,iframeCall.servicePackage,iframeCall.host,iframeCall.serviceConfig,context,addParam);
            if(!result.AjaxError)
                okFn && okFn.call(context || window,result.Result,addParam,result);
            else if(errFn)
                errFn.call(context || window,result,addParam);
            else if(!loadingMsgExists())
                alert((result.Message || "").replace(/\<br\>/gi,"\r\n"));

        }

    }
    function existInArray(ary,item){
        if(ary && ary.length){
            for(var i=0;i<ary.length;i++){
                if(ary[i] == item){
                    return true;
                }
            }
        }
        return false;
    }

    serviceCaller.exportExcelByHtml = function(fileName,excelHtml,titleTableHtml){
		if(!jq("#__excelOutputFrm").length){
			var strHtml = '<form name="__excelOutputFrm"  id="__excelOutputFrm" action="/RIAService/ExportExcel.aspx" method="post" target="__excelExportIfm" style="display:none">';
			strHtml += '<input type="hidden" name="__excelHtmlHdn" id="__excelHtmlHdn">';
			strHtml += '<input type="hidden" name="__excelFileNameHdn" id="__excelFileNameHdn">';
			strHtml += '<input type="hidden" name="__excelTitleHdn" id="__excelTitleHdn">';
			strHtml += '</form>';
			strHtml += '<iframe name="__excelExportIfm" style="display:none"></iframe>';				
			jq("body").append(strHtml);
		}
		jq("#__excelHtmlHdn").val(excelHtml);
		jq("#__excelFileNameHdn").val(fileName);
		jq("#__excelTitleHdn").val(titleTableHtml || "");
		jq("#__excelOutputFrm")[0].submit();
    }

    serviceCaller.callServiceUpload = function(serviceCommand,commitId,params,context,okFn,errFn,addParam,host){
        var methodIndex = serviceCommand.lastIndexOf(".");
        var service = serviceCommand.substr(0,methodIndex);
        var command = serviceCommand.substr(methodIndex+1)
        var formJq = jq("#SERVICE_UPLOAD_FORM");
        var form = formJq[0];
        if(!form){      //no any upload create
            serviceCaller.callService(service,command,params,context,okFn,errFn,addParam,host);
            return;
        }
        
        var iframeKey = (new Date().valueOf()) + "_" +  (++sjs._iframeKey);

        var servicePackage = service.push?service:typeof(service)=="string"?{service:service + "." + command ,params: params}:service;

        if(serviceConfig){
            if(servicePackage.push){
                for(var i=0;i<servicePackage.length;i++){
                    servicePackage[i].service = servicePackage[i].service.split("$")[0] + "$" + serviceConfig;
                }
            }
            else{
                servicePackage.service = servicePackage.service.split("$")[0] + "$" + serviceConfig;
            }
        }


        var parentMenuJs;
        
        if(servicePackage.push){
            for(var i=0;i<servicePackage.length;i++){
                var errMsg = checkContextMenuJs(servicePackage[i].service,servicePackage[i].params,context);
                if (typeof (errMsg) == "string") {
                    alert(errMsg);
                    var result = {AjaxError:-1,Result:null,Message:errMsg};
                    errFn && errFn.call(context || window,result,addParam);
                    return;
                }
                else if(errMsg.service){
                    servicePackage[i].service = errMsg.service;
                    parentMenuJs = errMsg.parentMenuJs;
                }
                else if (errMsg.parentMenuJs) {
                    parentMenuJs = errMsg.parentMenuJs;
                }
            }
        }
        else{
            var errMsg = checkContextMenuJs(servicePackage.service,servicePackage.params,context);
            if (typeof (errMsg) == "string") {
                alert(errMsg);
                var result = {AjaxError:-1,Result:null,Message:errMsg};
                errFn && errFn.call(context || window,result,addParam);
                return;
            }
            else if (errMsg.service) {
                servicePackage.service = errMsg.service;
                parentMenuJs = errMsg.parentMenuJs;
            }
            else if (errMsg.parentMenuJs) {
                parentMenuJs = errMsg.parentMenuJs;
            }
        }

        var jsonService = JsonHelper.encode(servicePackage);

        //var jsonService = JsonHelper.encode({service:"ClientTool.UploadTmp",params:[jsonKey]});
        //var iframeHost = host || _host;
        var iframeHost = sjs.getRIAServiceByHost(host || sjs.getHost());

        var formArr = jq.makeArray(form);       //IE8,jQuery-1.8.3(Line 595) can not use formJq in fn.apply(context,[here]).so makeArray first

        if(iframeHost.indexOf("http://")==0){       
            var url = iframeHost + "?ServiceKind=Upload&UploadKey=" + iframeKey;// + "&JsonService=" + encodeURIComponent(jsonService);
            //正常提交   

            if (parentMenuJs) {
                url += "&ParentMenuJs=" + parentMenuJs;
            }


            jq("input[name='JsonService']",formJq).val(jsonService);
            form.setAttribute("action", url);



            var cannotCommit = false;

            jq("input[type='file']",formJq).each(function(){
                var id = jq(this).attr("id");
                if(jq(this).attr("TYPE_NOT_ALLOWED")=="1"){
                    cannotCommit = true;
                }
                jq(this).prop("disabled",!existInArray(commitId,id));
            });//,formArr);
            if(cannotCommit){
                alert('file type not allowed,please choose again');
                return;
            }
            eventManager.publish(serviceCaller,"callService",servicePackage,iframeHost,serviceConfig,context,addParam);
            form.submit();

            jq("input[type='file']",formJq).each(function(){
                jq(this).prop("disabled",false);         //還原
            });

           
            serviceCaller.callService("AndrieWeb.UploadService","WaitResult",[iframeKey],context,function(result){
                    
                eventManager.publish(serviceCaller,!result.AjaxError?"callServiceOK":"callServiceErr",result,servicePackage,iframeHost,serviceConfig,context,addParam);
                if(!result.AjaxError)
                    okFn && okFn.call(context || window,result.Result,addParam,result);
                else if(errFn)
                    errFn.call(context || window,result,addParam);
                else if(!loadingMsgExists())
                    alert((result.Message || "").replace(/\<br\>/gi,"\r\n"));

            },errFn,addParam,iframeHost);
        }
        else{       

            //var url = iframeHost + "?iframeRequest=1&JsonService=" + encodeURIComponent(jsonService);

            var cannotCommit = false;
            jq("input[type='file']",formJq).each(function(){
                var id = jq(this).attr("id");
                if(jq(this).attr("TYPE_NOT_ALLOWED")=="1"){
                    cannotCommit = true;
                }
                jq(this).prop("disabled",!existInArray(commitId,id));
            });
            if(cannotCommit){
                alert('file type not allowed,please choose again');
                return;
            }

            jq("input[name='JsonService']",formJq).val(jsonService);
            eventManager.publish(serviceCaller,"callService",servicePackage,iframeHost,serviceConfig,context,addParam);
            var url = iframeHost + "?iframeRequest=1&callback=parent.sjs.iframeCallBack&callbackArgs=" + iframeKey;// + "&JsonService=" + encodeURIComponent(jsonService);

            if (parentMenuJs) {
                url += "&ParentMenuJs=" + parentMenuJs;
            }

            form.setAttribute("action", url);
            sjs._iframeCall[iframeKey] = {
                context:context
                ,okFn:okFn
                ,errFn:errFn
                ,addParam:addParam
                ,servicePackage:servicePackage
                ,host:iframeHost
                ,serviceConfig:serviceConfig
            };
            


            form.submit();

            jq("input[type='file']",formJq).each(function(){
                jq(this).prop("disabled",false);         //還原
            });

        }
       
    }


    
    function loadingMsgExists(){
        return !!sjs._getLoadedJs()["Core5.Widget.Loading"];
    }



    serviceCaller.callService = function(service,command,params,context,okFn,errFn,addParam,host,addJsonKey){
        var serverService;
        if(typeof(service)=="object" && !service.push)  
        {
            var fn = service[command];
            if(typeof(fn)=="string")                
            {
                serverService = {service:fn,params:params};
            }
            else if(typeof(fn)=="function"){        
                var fnRet = fn.call(service,params,context,okFn,errFn,addParam,host);
                if(fnRet){
                    if(typeof(fnRet)=="string"){
                        serverService = {service:fnRet,params:params};
                    }
                    else if(typeof(fnRet)=="object"){
                        serverService = fnRet;
                    }
                    else{
                        alert("only string,object or void can be return in this function:" + command);
                    }
                }
                else{
                    return;
                }
            }
            else{
                serverService = service;        
            }
        }
        else if(typeof(service)=="string"){
            //js service
            if(service.substr(0,1)=="@"){
                var servicePackage = {service:service + "." + command};
                eventManager.publish(serviceCaller,"callService",servicePackage,"","",context,addParam);

                sjs.using(service.substr(1))
                .run(function(sc){
                    var result;
                    try{
                        params = params.concat([]);
                        for(var i=0;i<params.length;i++){
                            if(typeof(params[i])=="object"){
                                params[i] = JsonHelper.decode(JsonHelper.encode(params[i]));
                            }
                        }
                        params.push(context);
                        params.push(okFn);
                        params.push(errFn);       //throw exception better
                        params.push(addParam);
                        var ret = sc[command].apply(sc,params);
                        //if need sc help okFn and errFn,please return true;
                        if(typeof(ret)!=="undefined"){
                            if(typeof(ret)=="object"){
                                ret = JsonHelper.decode(JsonHelper.encode(ret));
                            }
                            result = {AjaxError:0,Result:ret};
                        }
                        else{
                            eventManager.publish(serviceCaller,"callServiceOK",{AjaxError:0,Result:null},servicePackage,"","",context,addParam);
                            return;     //function deal result themselves
                        }
                    }
                    catch(ex){
                        result = {AjaxError:-1,Result:null,Message:ex.message};
                    }

                    eventManager.publish(serviceCaller,!result.AjaxError?"callServiceOK":"callServiceErr",result,servicePackage,"","",context,addParam);
                    if(!result.AjaxError)
                        okFn && okFn.call(context || window,result.Result,addParam,result);
                    else if(errFn)
                        errFn.call(context || window,result,addParam);
                    else if(!loadingMsgExists())
                        alert((result.Message || "").replace(/\<br\>/gi,"\r\n"));
                });
                return;
            }
            serverService = {service:service + (command?".":"") + (command || ""),params:params};
        }
        else{      
            serverService = service;
        }

        //host = host || _host;
        host = sjs.getRIAServiceByHost(host || sjs.getHost());

        var servicePackage = serverService;


        if(serviceConfig){
            if(servicePackage.push){
                for(var i=0;i<servicePackage.length;i++){
                    servicePackage[i].service = servicePackage[i].service.split("$")[0] + "$" + serviceConfig;
                }
            }
            else{
                servicePackage.service = servicePackage.service.split("$")[0] + "$" + serviceConfig;
            }
        }

        var parentMenuJs;
       
        if(servicePackage.push){
            for(var i=0;i<servicePackage.length;i++){
                var errMsg = checkContextMenuJs(servicePackage[i].service,servicePackage[i].params,context);
                if (typeof (errMsg) == "string") {
                    alert(errMsg);
                    var result = {AjaxError:-1,Result:null,Message:errMsg};
                    errFn && errFn.call(context || window,result,addParam);
                    return;
                }
                else if (errMsg.service) {
                    servicePackage[i].service = errMsg.service;
                    parentMenuJs = errMsg.parentMenuJs;
                }
                else if (errMsg.parentMenuJs) {
                    parentMenuJs = errMsg.parentMenuJs;
                }
            }
        }
        else{
            var errMsg = checkContextMenuJs(servicePackage.service,servicePackage.params,context);
            if (typeof (errMsg) == "string") {
                alert(errMsg);
                var result = {AjaxError:-1,Result:null,Message:errMsg};
                errFn && errFn.call(context || window,result,addParam);
                return;
            }
            else if (errMsg.service) {
                servicePackage.service = errMsg.service;
                parentMenuJs = errMsg.parentMenuJs;
            }
            else if (errMsg.parentMenuJs) {
                parentMenuJs = errMsg.parentMenuJs;
            }
        }


        var jsonService = JsonHelper.encode(servicePackage);


        //var jsonService = JsonHelper.encode(serverService)//service.push?service:typeof(service)=="string"?{service:serviceCommand ,params: params}:service);
        var successFn = function(result, textStatus) {
            if(service.push){
                var ret = prefixCall(result);
                if(!ret.push){
                    result.Message = ret;
                }
                eventManager.publish(serviceCaller,ret.push?"callServiceOK":"callServiceErr",result,servicePackage,host,serviceConfig,context,addParam);
                if(ret.push){
                    okFn && okFn.call(context || window,ret,addParam,result);
                }
                else if(errFn)
                    errFn.call(context || window,result,addParam);
                else if(!loadingMsgExists())
                    alert((ret || "").replace(/\<br\>/gi,"\r\n"));
            }
            else{
                eventManager.publish(serviceCaller,!result.AjaxError?"callServiceOK":"callServiceErr",result,servicePackage,host,serviceConfig,context,addParam);
                if(!result.AjaxError)
                    okFn && okFn.call(context || window,result.Result,addParam,result);
                else if(errFn)
                    errFn.call(context || window,result,addParam);
                else if(!loadingMsgExists())
                    alert((result.Message || "").replace(/\<br\>/gi,"\r\n"));
            }
        }
        
        var errorFn = function(XMLHttpRequest, textStatus, errorThrown) {
            var result = {AjaxError:-1,Result:null,Message:XMLHttpRequest.statusText,textStatus:textStatus,errorThrown:errorThrown};
            eventManager.publish(serviceCaller,"callServiceErr",result,servicePackage,host,serviceConfig,context,addParam);
            if(errFn)
                errFn.call(context || window,result,addParam);
            else if(!loadingMsgExists())
                alert((result.Message || "").replace(/\<br\>/gi,"\r\n"));
        }         
        
        eventManager.publish(serviceCaller,"callService",servicePackage,host,serviceConfig,context,addParam);
        var maxLen = 800;//1024 chrome?;         
        if(!addJsonKey && jsonService.length<=maxLen){      
            jq.ajax({
                url: host + "?JsonService=" + encodeURIComponent(jsonService) + (parentMenuJs?"&ParentMenuJs=" + parentMenuJs:"")
                ,async: true
                ,type: "get"             
                ,dataType: "jsonp"       /
                //,contentType: "application/x-www-form-urlencoded;charset=utf-8"
                ,success: successFn
                ,error: errorFn
            });
        }
        else{
            ////debugger;
            var jsons = [];
            for(var i=0;i<jsonService.length;i+=maxLen){
                var remainLen = i<jsonService.length-1?maxLen:jsonService.length - i;
                var jsonStr = jsonService.substr(i,Math.max(remainLen,maxLen));
                jsons.push(jsonStr);
            }
            
            var jsonKey = addJsonKey || getJsonKey();
            var startIndex = 0;//addJsonKey ? 1 : 0;
            var jsonTotal = jsons.length + startIndex;
            var jsonNotFinish = jsons.length;
            var isFinish = false;
            for(var i=0;i<jsons.length;i++){
                jq.ajax({
                    url: host + "" +
                        "?JsonKey=" + jsonKey +
                        "&JsonTotal=" + jsonTotal +
                        "&JsonSeq=" + (i + startIndex) +
                        "&JsonService=" + encodeURIComponent(jsons[i]) + (parentMenuJs ? "&ParentMenuJs=" + parentMenuJs : "")
                    ,async: true
                    ,type: "get"             //支持IE6
                    ,dataType: "jsonp"       //可跨域請求
                    //,contentType: "application/x-www-form-urlencoded;charset=utf-8"
                    ,success: function(result, textStatus){
                        if(!isFinish){
                            if(!result.PartPackage){
                                isFinish = true;
                                successFn(result, textStatus);
                            }
                        }
                        //jsonNotFinish--;
                        //[bug fix]one by one execute,but maybe the last request not the last finish execute
                        //if(jsonNotFinish==0){
                        //    successFn(result, textStatus);
                        //}
                    }
                    ,error: function(XMLHttpRequest, textStatus, errorThrown){
                        if(!isFinish){
                            isFinish = true;
                            errorFn(XMLHttpRequest, textStatus, errorThrown);
                        }
                       // jsonNotFinish--;
                       // if(jsonNotFinish==0){
                       //     errorFn(XMLHttpRequest, textStatus, errorThrown);
                       // }
                    }
                });
            }
        }
    }        

    return serviceCaller;
});