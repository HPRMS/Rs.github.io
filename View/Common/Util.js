sjs.call("InstallService.RIAServiceList")
.call("InstallService.GetCurrentRIAService")
.define(function(serviceList,currentService){
    return {
        //取得sso直接登錄到另一RIAService的鏈接
        //當前Host

        //查找到目標主機的service(不用虛擬目錄，因為相同域名讀得到cookie)
        getServiceByHost:function(host){
            for(var i=0;i<serviceList.length;i++){
                if(serviceList[i].Host.indexOf(host + "/")==0){
                    return serviceList[i];
                }
            }
            return null;
        }

        ,isCurrentHost:function(host){
            return currentService && currentService.Host.indexOf(host + "/")==0;
        }
        
        ,getServiceLink:function(link,targetHost){
            if(!currentService || this.isCurrentHost(targetHost)){
                return location.protocol + "//" + targetHost + link;
            }
            else{
                var targetService = this.getServiceByHost(targetHost);
                var targetUrl = encodeURIComponent(location.protocol + "//" + targetHost + link);
                var targetAskLoginReturn = encodeURIComponent(escape(location.protocol + "//" + targetHost + "/RIAService/Login/AskLogin.aspx?NotRemote=Y&ReturnPath=" + targetUrl));
                var askLoginReturn = "/RIAService/Login/AskLogin.aspx?ReturnPath=" + targetAskLoginReturn;
                return askLoginReturn;
            }
        }
    };
});