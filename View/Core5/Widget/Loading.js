sjs.loadCss(".Loading")
.using("Core5.Cls")
.using("Core5.Component")
.using("Core5.Util.EventManager")
//.using("Core5.Util.Service")
.using("Core5.Util.Lang")
.using("Core5.DomEvent.onmouseover",true)
.using("jQuery")
.define(function(cls,component,eventManager,lang,$){//,sc){
    var loader = cls.create({
        $extend:component
        ,"-loading-ui":true

        ,inner:[
            {
                "-loading-ui-wait":true
                ,inner:[
                    {
                        tag:"img"
                        ,tagNoInner:true
                        ," src":(sjs.baseFolder || sjs.getDefaultFolder() || ".") + "/Image/Core5/wait.gif"
                    }
                    ,{
                        "-info":true
                        ,inner:"&nbsp;"
                    }   
                ]
            }
            ,{
                "-loading-clear-div":true
                ,inner:"&nbsp;"
            }
        ]

        ,regUIObj:true  //單擊關閉和展開

        //三個加起來是總數
        ,_loadingCount:0
        ,_totalOKCount:0
        ,_totalErrCount:0

        ,loading:function(info){
            this._loadingCount++;
            this.jq(".info").html("<i en='Loading'>載入中</i>..." + (this._loadingCount>1?"<b title='total:" + this._loadingCount  + "'>(" + this._loadingCount + ")</b>":""));
            this.jq(".loading-ui-wait").stop(true,true).css("opacity",1).show().delay(1000).animate({opacity:0.8});
        }
        /*
        ,loadOK:function(info){
            this._totalOKCount++;
            this._loadingCount--;
            this._loadingCount>1?this.jq(".info b").html("<b title='total:" + this._loadingCount  + "'>(" + this._loadingCount + ")</b>"):this.jq(".info b").remove();
            !this._loadingCount && this.jq(".loading-ui-wait").stop(true,true).hide();

            if(info){
                $(lang.parseRenderHtml("<div class='load-ok-info'>" + info + "</div>"))
                    .insertAfter(this.jq(".loading-clear-div")).delay(2000).fadeOut('slow',function(){
                    $(this).remove();
                });
            }
        }
        */
        ,loadInfo:function(ok,info,justShow){
            var styleKind = ok;   
            if(!justShow){
                ok?this._totalOKCount++:this._totalErrCount++;
                this._loadingCount--;
                if(this._loadingCount<0){
                    this._loadingCount = 0;
                }
                this._loadingCount>1?this.jq(".info b").html("<b title='total:" + this._loadingCount  + "'>(" + this._loadingCount + ")</b>"):this.jq(".info b").remove();
                !this._loadingCount && this.jq(".loading-ui-wait").stop(true,true).hide();
                if(ok){
                    var width = $("body").width();
                    var oThis = this;
                    $("<div class='load-ok-item'>&nbsp;</div>").appendTo("body").animate({right:width,width:width/2,opacity:0.2},500,'swing',function(){
                        $(this).remove();
                    });
                }
                styleKind = ok?"ok":"err";
            }

            if(info){
                var html = [];
                html.push("<div class='load-info-item load-" + styleKind + "-msg");
                //justShow && html.push(" load-err-msg-pin");
                //html.push("' pin-status='" + (!justShow?"pin":"close") + "'>");
                html.push("' pin-status='" + ("pin") + "'>");
                //if(!justShow){  
                    html.push("<div s-click='pinMsg' title='pin this message(no hide automatically)' class='load-icon-pin'>&nbsp;</div>");
                //}
                //else{
                //    html.push("<div s-click='pinMsg' title='close this message' class='load-icon-pin'>&nbsp;</div>");
                //}
                html.push(info);
                html.push("</div>");
                $(lang.parseRenderHtml(html.join("")))
                    .insertAfter(this.jq(".loading-clear-div")).delay(!justShow?3000:3000).fadeOut(!justShow?2000:100,function(){
                    $(this).remove();
                });
            }
        }

        ," s-mouseover":"overMsg"
        ," s-mouseout":"outMsg"

        ,onOverMsg:function(){
            this.jq(".load-info-item[pin-status='pin']").stop(true,false).css("opacity",1).show();
        }

        ,onOutMsg:function(){
            this.jq(".load-info-item[pin-status='pin']").delay(2000).fadeOut(2000,function(){
                $(this).remove();
            });
        }

        ,onPinMsg:function(src){
            var pinStatus = src.parent().attr("pin-status");
            if(pinStatus=="pin"){
                src.parent().addClass("load-err-msg-pin").stop(true,true).show();;
                src.parent().attr("pin-status","close");
                src.attr("title","close this message");
            }
            else{
                src.parent().remove();
            }
        }

        ,onUsingJs:function(){
            this.loading();
        }

        ,onUsingJsOK:function(){
            this.loadInfo(true);
        }

        ,onUsingJsErr:function(reporter,error){
            this.loadInfo(false,error);
        }

        ,onCallService:function(sc,servicePackage,host,serviceConfig,context,addParam){
            this.loading("call service:" + (servicePackage.push?servicePackage[0].service:servicePackage.service));
        }

        ,onCallServiceOK:function(sc,result,servicePackage,host,serviceConfig,context,addParam){
            /*
            var hasRet = false;      //如果有Result(不為null),則推斷為調用方會自己處理這些數據,不需要這里顯示xxx OK,而如果沒有數據,則給出綠色框框OK
            if(servicePackage.push){
                for(var i=0;i<result.length;i++){
                    if(result[i].Result !== null){
                        hasRet = true;
                        break;
                    }
                }
            }
            else{
                hasRet = result.Result!==null;
            }
            */
            var info = null;
            if(addParam && addParam.push && addParam.length>1 && addParam[addParam.length-2] == "LOADING_MSG"){
                info = addParam[addParam.length-1];
                if(typeof(info)=="function"){
                    info = info.call(context,result,addParam);
                }
            }
            else if(addParam && addParam.push && addParam.length>0 && addParam[addParam.length-1] == "RETURN_MSG"){
                info = result.Result.replace(/\n/g,"<br>");
            }
            this.loadInfo(true,info);
        }

        ,onCallServiceErr:function(sc,result,servicePackage,host,serviceConfig,context,addParam){
            var message = result.Message.replace(/\n/g,"<br>");
            if(addParam && addParam.push && addParam.length>0 && typeof(addParam[addParam.length-1]) == "object"){
                if(typeof(addParam[addParam.length-1].getErrMsg) == "function")
                    message = addParam[addParam.length-1].getErrMsg(message);
            }


            this.loadInfo(false,message);
        }

        //ok,err,warn,common
        ,onDisplayLoadingMsg:function(reporter,type,info){
            this.loadInfo(type,info,true);
        }
    });
    eventManager.subscribe(loader);//,sc);
    return loader;
});