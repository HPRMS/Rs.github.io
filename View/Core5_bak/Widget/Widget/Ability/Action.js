/*
Action插件
為table增加一個action欄位
*/
sjs.using("Core5.YT.Button")
.using("Core5.YT.Model")
.using("Core5.YT.Msg")
.using("Core5.Widget.Form")
.using("Core5.Layout.Form")
.using("Core5.Widget.Ability.ActionInfoWin")
.using("Core5.Util.Service")
.define(function(button,model,msg,form,formLayout,actionInfoWin,sc){
    return {
        onActionDoing:function(cfg,row,rowKey){
            this._actionCfg = cfg;
            this._actionRows = row.push?[].concat(row):[row];
            this._actionRowKeys = row.push?[].concat(rowKey):[rowKey];     //不要被checked影響 了
            if(cfg.actionWindow){       //完全自定義
                var actionID = cfg.actionID;
                if(!actionID)
                    throw "please set actionID first";
                var actionWindow = this[actionID];
                if(!actionWindow){
                    actionWindow = this.createChild(cfg.actionWindow,{
                        id:actionID
                    });
                }
                actionWindow.set("actionConfig",this._actionCfg);   
                actionWindow.set("rowKeys",this._actionRowKeys);      
                actionWindow.set("rows",this._actionRows);      
                actionWindow.show();
            }
            else if(cfg.actionForm || cfg.actionInner){
                var actionID = cfg.actionID;
                if(!actionID)
                    throw "please set actionID first";
                var actionWindow = this[actionID];
                if(!actionWindow){
                    actionWindow = this.createChild(model,{
                        id:actionID
                        ,inner:cfg.actionForm || {
                            $extend:form
                            ,$mixin:[cfg.formLayout || formLayout,cfg.formMixin]
                            ,id:"form"
                            ,promptPos:cfg.promptPos || "left"
                            ,columnCount:cfg.columnCount || 1
                            ,cellsWidth:cfg.cellsWidth
                            ,inner:cfg.actionInner
                        }
                        ,width:cfg.inputWidth || 400
                        ,height:cfg.inputHeight || 250
                        ,noClickHide:true
                        ,showBottomBorder:false
                        ,footer:[
                            {
                                text:"確定(OK)"
                                ,floatRight:true
                                ,evt:"confirm"
                            }
                            ,{
                                text:"取消(Cancel)"
                                //,floatRight:true
                                ,evt:"close"
                            }
                        ]  
                        ,service:cfg.service
                        ,command:cfg.command
                        ,params:cfg.params
                        ,onConfirm:function(){
                            if(this.form && this.form.checkError){
                                var ret = this.form.checkError();
                                if(ret.length){
                                    msg.error(ret.join("<br>"));
                                    return;
                                }
                            }
                            var input = null;
                            if(this.form){
                                if(this.form.getConfirmInput){
                                    input = this.form.getConfirmInput();
                                }
                                else{
                                    input = this.form.item;
                                }
                            }
                            this.report("formConfirm",input);
                            this.hide();
                        }                             
                    });
                }
                actionWindow.setTitle((cfg.promptTitle || "Please input...")+ (!cfg.noShowTotalInTitle && this._actionRows.length?"(Total:" + this._actionRows.length + ")":""));
                actionWindow.form && actionWindow.form.set("row",this._actionRows[0]);
                actionWindow.form && actionWindow.form.set("rowKey",this._actionRowKeys[0]);
                actionWindow.form && actionWindow.form.set("rows",this._actionRows);
                actionWindow.form && actionWindow.form.set("rowsKey",this._actionRowKeys);
                actionWindow.show();
            }
            else if(cfg.needConfirm){
                msg.ask(
                (cfg.promptTitle || "Are you sure?") + (!cfg.noShowTotalInTitle && this._actionRows.length?"(Total:" + this._actionRows.length + ")":"")
                ,function(){
                    this.doAction();
                }
                ,null
                ,this);
            }
            else{
                this.doAction();
            }
        }  

        ,onFormConfirm:function(actionWindow,input){
            this._actionInput = input;
            this.doAction(input);
        }

        //,actionStatusEvt:"action"
        
        //,_batchActionCount:2            //每次2個執行?(全部doing好了，一次性全部交給流覽器，讓它來選擇)

        ,doAction:function(){
            var cfg = this._actionCfg;
            if(cfg.service && cfg.command){
                if(this._actionExecute){
                    msg.warn("please wait all executions finish,remain:" + (this._actionTotalCount - this._actionTotalExec));
                    return;
                }
                this._actionExecute = true;
                this._actionTotalCount = this._actionRows.length;
                this._actionTotalExec = 0;
                this._actionExecOK = 0;
                this._actionExecError = 0;
                this._actionInfo = [];
                this._doAction();
            }
            else{
                msg.error("action cfg has no service and command config");
            }
        }

        ,onCancelAll:function(){
            this._actionExecute = false;
            this.actionMsgWin.hide();
        }

        ,onRetryAll:function(){
            this.doAction();
        }

        ,_doAction:function(){
            if(!this._actionExecute){
                return;
            }
            var cfg = this._actionCfg;
            var input = this._actionInput;
            var msg = this._actionTotalCount + "(OK:" + this._actionExecOK + ",Error:" + this._actionExecError + ")" + "<br>" + this._actionInfo.join("<br>");
            if(this._actionTotalExec >= this._actionTotalCount){
                var rows = this._actionRows;            //成功的要丟掉，可以重試(多選情況下)
                var rowKeys = this._actionRowKeys;
                for(var i=rows.length;i>=0;i--){
                    if(!rows[i]){
                        rows.splice(i,1);
                        rowKeys.splice(i,1);
                    }
                }

                msg = "Total:" + msg;
                this._actionExecute = false;
                this._showActionInfo(this._actionExecError?"error":"ok",msg);
                this.onActionFinish && this.onActionFinish(this,this._actionExecError?"error":"ok",this._actionInfo);
                //this.report("actionFinish",this._actionExecError?"error":"ok",this._actionInfo);
                this.actionFinishEvt && this.report(this.actionFinishEvt,this._actionExecError?"error":"ok",this._actionInfo);
                return;
            }
            msg = this._actionTotalExec + "/" + msg;
            var actionIndex = this._actionTotalExec;
            var row = this._actionRows[actionIndex];
            var rowKey = this._actionRowKeys[actionIndex];
            this._showActionInfo("start","共(Total)" + this._actionTotalCount + "筆");
            var params = cfg.params?cfg.params(row,rowKey,input,this):[];
            //if(typeof(cfg.service) == "string"){
                sc.callService(cfg.service,cfg.command,params
                    ,this,this._doActionOK,this._doActionErr,actionIndex);

//            }
//            else{
//                var fn = cfg.service[cfg.command];
//                fn.call(cfg.service,params
//                    ,this,this._doActionOK,this._doActionErr,actionIndex);
//            }

        }

        ,_doActionOK:function(ret,actionIndex){
            this._actionExecOK++;
            this._actionTotalExec++;
            var row = this._actionRows[actionIndex];
            var rowKey = this._actionRowKeys[actionIndex];
            this._actionInfo[actionIndex] = actionIndex+1 + ":OK";
            this._actionRows[actionIndex] = null;
            this.onActionOK && this.onActionOK(this,row,rowKey,actionIndex);
            this.actionOKEvt && this.report(this.actionOKEvt,this._actionCfg,row,rowKey,actionIndex,this._actionInput);
            this._doAction();
        }

        ,_doActionErr:function(result,actionIndex){
            this._actionExecError++;
            this._actionTotalExec++;
            this._actionInfo[actionIndex] = actionIndex+1 + ":[error]" + result.Message;
            var row = this._actionRows[actionIndex];
            var rowKey = this._actionRowKeys[actionIndex];
            this.onActionError && this.onActionError(this,row,rowKey,actionIndex);
            this.actionErrEvt && this.report(this.actionErrEvt,this._actionCfg,row,rowKey,actionIndex,this._actionInput);
            this._doAction();
        }

        ,onActionInfoWinHide:function(actionMsgWin){
            if(actionMsgWin.msgCon.status=="error"){
                var cfg = this._actionCfg;
                var actionID = cfg.actionID;
                this[actionID] && this[actionID].show();
            }
        }

        ,_showActionInfo:function(status,info){
            if(!this.actionMsgWin){
                this.createChild(model,{
                    id:"actionMsgWin"
                    ,inner:{
                        $extend:actionInfoWin
                        ,id:"msgCon"   
                    }
                    ,footer:[
                        {id:"closeBtn",text:"Close",floatRight:true,evt:"close",visible:false}
                        ,{id:"cancelAllBtn",text:"Cancel All",evt:"cancelAll",visible:false}
                        ,{id:"retryBtn",text:"Retry All",evt:"retryAll",visible:false}
                    ]
                    ,width:700
                    ,height:240
                    ,noClickHide:true       //不要click hide
                    ,title:"服務執行訊息(Execute Info)"

                    ,_getTitleToolsInner:function(){return [];}       //不要show close button

                    ,hideEvt:"actionInfoWinHide"
                }).show();
            }
            this.actionMsgWin.msgCon.set("status",status);
            this.actionMsgWin.msgCon.set("msg",info);
            if(status == "ok"){
                //this.actionMsgWin.footerCon.closeBtn.show();
                //this.actionMsgWin.footerCon.cancelAllBtn.hide();
                //this.actionMsgWin.footerCon.retryBtn.hide();
                //var oThis = this;
                //window.setTimeout(function(){
                    //oThis.actionMsgWin.hide();
                    this.actionMsgWin.hide();
                    //oThis = null;
                //},500);
            }
            else if(status=="start"){
                this.actionMsgWin.footerCon.closeBtn.hide();
                this.actionMsgWin.footerCon.cancelAllBtn.show();
                this.actionMsgWin.footerCon.retryBtn.hide();
                this.actionMsgWin.show();
            }
            else{
                this.actionMsgWin.footerCon.closeBtn.show();
                this.actionMsgWin.footerCon.cancelAllBtn.hide();
                this.actionMsgWin.footerCon.retryBtn.show();
                this.actionMsgWin.show();
            }
        }
    };
});     