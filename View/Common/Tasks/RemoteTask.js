
sjs.using("Core5.Util.Service")
    .using("Core5.Cls")
    .using("Common.Tasks.Task")
    .using("Core5.Util.Lang")
    .call("ClientTool.LoginRemote")
    .define(function(sc,cls,task,lang,key){
        return function(){
            //even use "" or Forever , but cross-domain, eip.pci.co.id cookie can not write to 172.19.6.86, but in line 34 must be used
            sjs.callOther("eip.pci.co.id","ClientTool.LoginOpenIDByAnotherRIAService",key,"KevinWS","").run(function(openID){
                //debugger
                //兼容舊的程式，以后直接using Core5.Util.jQueryService來callService，解決全局污染，并且可實現多份config call service
                window.cusCallService = sc.cusCallService;
                window.exportExcelByHtml = sc.exportExcelByHtml;
                window.callServiceUpload = sc.callServiceUpload;
                window.callService = sc.callService;
                var defaultLang = "en";              //默認語言
                sjs.setLanguage(defaultLang);
                debugger;
                lang.switchLang("en");
                cls.create({
                    $extend:task
                    ,dataQueryHost:"eip.pci.co.id"
                    ,dataQueryMethod:"GetTask?PCISSOOPENID=" + openID
                    ,onLinkTask:function(src){
                            var linkID = src.attr("linkID");
                            var parentLevel = src.attr("parentLevel");
                            var index = parseInt(parentLevel.split(".")[0]) - 1;
                            var key = this.dataInner.data[index].Key;
                            this.openTask(key,linkID);
                    }

                ,openTask:function(key,linkID){
                    window.open("http://eip.pci.co.id/RIAService/MessageLink.aspx?MsgKind=" + key + "&MsgID=" + linkID + "&PCISSOOPENID=" + openID);
                }
            
                }).renderTo("body");
            });
        }
    });