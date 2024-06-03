sjs.using("Core5.Util.Lang")
.using(".ServiceShow")
.using(".TaskList")
.define(function(lang,serviceShow,taskList){
    return {
        $extend:serviceShow
        
        ,onAutoGet:function(tool,minute){
            this.auto(minute * 60);
        }
        
        ,_render:function(){        //因為init時還沒有.
            this.$base();
            //this.auto(this.interval * 60);
            this.startGet();
        }
        
        ,"-task":true
        
        ,interval:0
        
        ,dataInner:taskList
        
        ,noDataInfo:"<i en='No Task Now'>目前沒有待辦任務</i>"

        ,dataQueryService:"PCIWeb.TaskService"
        ,dataQueryMethod:"GetTask"
        
        ,_dataByRet:function(ret){
            return ret;
        }
       
        
        ,onExpand:function(src){
            var expand = src.attr("expand");
            if(!expand){
                src.parent().parent().addClass("task-show-detail");
                src.attr("expand","1");
                lang.html(src," - <i en='Hide'>隱藏</i>");
            }
            else{
                src.parent().parent().removeClass("task-show-detail");
                src.attr("expand","");
                lang.html(src," + <i en='Detail'>明細</i>");
            }
        }

        ,onLinkTask:function(src){
            var core5 = src.attr("Core5");
            //應該是和當前的Host有關，暫時全部取消
            /*
            if(this.dataInner.data[index].key != "PGDWebApps" && core5){
                this.js = core5;
                this.text = src.html();
                this.closeDestroy = true;
                this.report("prg");
            }
            else{
            */
                var linkID = src.attr("linkID");
                var parentLevel = src.attr("parentLevel");
                var index = parseInt(parentLevel.split(".")[0]) - 1;
                var key = this.dataInner.data[index].Key;
                this.openTask(key,linkID);
            //}
        }
        
        ,openTask:function(key,linkID){
            window.open("/RIAService/MessageLink.aspx?MsgKind=" + key + "&MsgID=" + linkID);
        }
        
    };
    
});