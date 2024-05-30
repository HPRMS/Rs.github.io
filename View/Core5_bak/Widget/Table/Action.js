/*
Action插件
為table增加一個action欄位
*/
sjs.using("Core5.Widget.Table.RowEvent")
.using("Core5.Component")
.using("Core5.Widget.Button")
.using("Core5.Widget.Window")
.using("Core5.Widget.Form")
//.using("Core5.Layout.Form2")
.using("Core5.Widget.Msg.Tool")
.using("Core5.Util.Service")
.define(function(rowEvent,component,button,window,form,formLayout,tool,sc){
    return {
        $extend:rowEvent
               
        ,setFields:function(fields,noRefresh){
            var buttons = [];
            var actions = this.actions;
            for(var i=0;i<actions.length;i++){
                var action = actions[i];
                action.$extend = action.$extend || button;
                action.evt = action.evt || "rowEvt";
                if(action.evt == "rowEvt"){
                    action.rowEvt = action.rowEvt || "action";          //以action作為默認的事件回應方式
                }
                action.initDomId = function(){};
                buttons.push(action);
            }
            var tdWidth = this.actionWidth || 150;
            buttons.push({
                $extend:component
                ,inner:"doing"     //doing/waiting,cancel/finish,refresh/error,close,try again
                //,";color":'gray'
                ,";line-height":"30px"
                ,";float":"left"
                ,";padding":"0 5px"
                ,"-info-cmp":true
                ,";width":tdWidth + "px"
                ,";overflow":"hidden"
                ,visible:false
            });
            var oThis = this;
            var newFields = [{
                prompt:"Action"
                ,type:"con"
                ,width:tdWidth
                ,"-action-td":true
                ,inner:buttons
                ,noResize:true
                ,"@row":"item"
                ,_setRow:function(row){
                    oThis._actionContainer = this;            //記住button
                    var status = oThis.getActionStatus(oThis.getRowKey(row));
                    var showInfo = status && (status.status == "doing" || status.status=="ok");
                    var infoCmp = this.inner[this.inner.length-1];
                    infoCmp.setVisible(showInfo);
                    if(showInfo){         //doing,ok,error
                        infoCmp.inner = oThis._statusHtml(status.btn,status.status);
                    }
                    for(var i=0;i<this.inner.length-1;i++){
                        var item = this.inner[i];
                        var isShow = true;
                        if(item.isShow){
                            isShow = item.isShow(row);
                        }
                        item.setClass("action-btn",isShow);
                        item.setVisible(isShow && !showInfo);
                    }
                }
            }].concat(fields);
            this.$base(newFields,noRefresh);
        }     
        
        ,onCloseRowErr:function(src,row,rowKey){
            this._setActionStatus(rowKey,src,"init");
        }
               
        ,onAction:function(btn,row,rowKey){
            this.doAction(btn,row,rowKey);
        }

        ,doAction:function(btn,row,rowKey){
            if(typeof(btn)=="number"){
                btn = this._actionContainer.inner[btn];
            }
            if(!row && rowKey.push){
                row = [];
                for(var i=0;i<rowKey.length;i++){
                    row.push(this.getRowByKey(rowKey[i]));
                }
            }
            //alert(btn.actionNm + "\n" + rowKey);
            if(btn.inputInner){
                if(!btn.inputForm){
                    btn.createChild(window,{
                        id:"inputForm"
                        ,inner:{
                            $extend:form
                            ,$mixin:[formLayout,btn.formMixin]
                            ,id:"form"
                            ,promptPos:btn.promptPos || "top"
                            ,columnCount:btn.columnCount || 1
                            ,inner:btn.inputInner
                            ,item:btn.inputDefault || {}
                        }
                        //,title:btn.inputTitle || "請輸入(Please input)..."
                        ,icon:"question-sign"
                        ,toolbarPos:"bottom"
                        ,toolbarItems:[
                            {
                                text:"確定(Yes)"
                                ,icon:"ok"
                                ,floatRight:true
                                ,";font-weight":"bold"
                                ,evt:"confirm"
                            }
                            ,"-|"
                            ,{
                                text:"取消(No)"
                                ,icon:"remove"
                                ,floatRight:true
                                ,";color":'gray'
                                ,evt:"close"
                            }
                        ]  
                        ,width:btn.inputWidth || 400
                        ,height:btn.inputHeight || 250
                        ,context:this
                        ,contextFn:this.doRowAction
                        ,onConfirm:function(){
                            var args = this.contextArgs || [];
                            args.push(this.form.item);
                            var inputItem = this.form.item;
                            for(var i=0;i<this.form.inner.length;i++){
                                var fieldItem = this.form.inner[i];
                                if(fieldItem.fieldNo && fieldItem.required
                                    && (typeof(inputItem[fieldItem.fieldNo]) == "undefined" || inputItem[fieldItem.fieldNo]===null || inputItem[fieldItem.fieldNo]=="")){
                                    alert((fieldItem.fieldNm || fieldItem.prompt || fieldItem.fieldNo) + " can not be empty!");
                                    return;
                                }
                            }
                            this.hide();
                            this.contextFn.apply(this.context,args);
                        }                                  
                    });
                }
                btn.inputForm.setTitle((btn.inputTitle || "<b style='color:" + (btn.promptColor || "black") + "'>" + (btn.prompt || btn.text || "deal")) + "</b> " + ((!row.push || row.length==1) && btn.promptField ? (row.push?row[0]:row)[btn.promptField]:(row.push?"((批次" + row.length + "筆," + row.length + " together)":"this")) + "?");

                btn.inputForm.contextArgs = [btn,row,rowKey];
                btn.inputForm.form.set("row",row.push?row[0]:row);      //如果是批次處理，則使用第一筆，所以這批資料的邏輯都要一致
                btn.inputForm.show();
            }
            else if(btn.needConfirm){
                tool.confirm("Are you sure to <b style='color:" + (btn.promptColor || "black") + "'>" + (btn.prompt || btn.text || "commit") + "</b> " + ((!row.push || row.length==1) && row[btn.promptField] ? (row.push?row[0]:row)[btn.promptField]:(row.push?"(批次" + row.length + "筆," + row.length + " together)":"this")) + "?",this,function(){
                    //alert((btn.prompt || btn.text || "deal") + row.FORM_NO + "ok");
                    this.doRowAction(btn,row,rowKey);
                });

            }
            else{
                this.doRowAction(btn,row,rowKey);
            }
        }  

        ,_statusHtml:function(btn,status){
            if(status=="doing"){
                var text = (btn.prompt || btn.text || "deal");// + row.FORM_NO + "\n" + rowKey + "\n" + (input ?input.Reason:""));
                return "<font color='black'>" + text + "...</font>";
            }
            /*
            else if(status == "waiting"){
                var text = (btn.prompt || btn.text || "deal");// + row.FORM_NO + "\n" + rowKey + "\n" + (input ?input.Reason:""));
                return '<b s-click="rowEvt" s-rowEvt ="closeRowErr" style="text-decoration:underline;cursor:pointer;color:blue">cancel</b><font color="gray">' + text + '(wait)</font>';
            }
            */
            else if(status == "ok"){
                var text = (btn.prompt || btn.text || "deal");// + row.FORM_NO + "\n" + rowKey + "\n" + (input ?input.Reason:""));
                return "<font title='data is changed,you can refresh to get newest data' color='green'>" + text + " successfully!</font>";
            }
            else{
                return '<b s-click="rowEvt" s-rowEvt ="closeRowErr" style="text-decoration:underline;cursor:pointer;color:blue">close</b><font title="' + status.replace(/"/g,"&quot;") + '" color="red">' + status + '</font>';
            }
        }

        //依數據變化而變化
        ,Xset:function(key,value,notifyFrom){
            
        }

        //,actionStatusEvt:"action"

        //數據的初始化，清空交由上層來控制
        ,_setActionStatus:function(rowKey,btn,status){
            var actionStatus = this._actionStatus;
            if(!actionStatus){
                actionStatus = this._actionStatus = {};
            }
            var rowJq = this.rowJq(rowKey);
            if(status == "init"){
                delete actionStatus[rowKey];
                rowJq.find(".action-btn").show();
                rowJq.find(".info-cmp").hide();
                //this.disableChecked && this.disableChecked(rowKey);
            }
            else{
                actionStatus[rowKey] = {btn:btn,status:status};
                var text = this._statusHtml(btn,status);
                rowJq.find(".action-btn").hide();
                rowJq.find(".info-cmp").html(text).show();
                //this.enabledChecked && this.enabledChecked(rowKey);
            }
            this.actionStatusEvt && this.report(this.actionStatusEvt,btn,status,rowKey,text);
        }

        ,getActionStatus:function(rowKey){
            var actionStatus = this._actionStatus;
            return actionStatus?actionStatus[rowKey]:null;
        }

        ,hasDoingAction:function(){
            if(this._actionStatus){
                for(var rowKey in this._actionStatus){
                    if(this._actionStatus[rowKey].status == "doing"){
                        return true;
                    }
                }
            }
            return false;
        }

        //最好調用一下hasDoingAction，再來clear
        ,clearActionStatus:function(){
            if(this._actionStatus){
                delete this._actionStatus;          //一般用作
            }
        }

        //,_batchActionCount:2            //每次2個執行?(全部doing好了，一次性全部交給流覽器，讓它來選擇)

        ,doRowAction:function(btn,row,rowKey,input){
            if(btn.service && btn.command){
                if(!row.push){
                    this._doRowAction(btn,row,rowKey,input);
                }
                else{
                    row = [].concat(row);
                    rowKey = [].concat(rowKey);     //不要被checked影響 了
                    for(var i=0;i<row.length;i++){
                        this._doRowAction(btn,row[i],rowKey[i],input);
                    }
                }
            }
        }

        ,_doRowAction:function(btn,row,rowKey,input){
            var status = this.getActionStatus(rowKey);
            if(!status || status.status != "doing" && status.status != "ok"){
                //var text = (btn.prompt || btn.text || "deal");// + row.FORM_NO + "\n" + rowKey + "\n" + (input ?input.Reason:""));
                this._setActionStatus(rowKey,btn,"doing");
                if(typeof(btn.service)=="string"){
                    sc.callService(btn.service,btn.command,btn.params?btn.params(row,rowKey,input,this):[]
                        ,this,this._actionOK,this._actionErr,[rowKey,btn,row]);
                }
                else{
                    var fn = btn.service[btn.command];
                    var params = btn.params?btn.params(row,rowKey,input,this):[];
                    fn.call(btn.service,params,this,this._actionOK,this._actionErr,[rowKey,btn,row]);
                }
            }
        }

        ,_actionOK:function(ret,addParam){
            this._setActionStatus(addParam[0],addParam[1],"ok");
        }

        ,_actionErr:function(result,addParam){
            this._setActionStatus(addParam[0],addParam[1],result.Message);
        }
    };
});     