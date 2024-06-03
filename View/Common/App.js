sjs.loadCss("Common.App")
.using("Core5.Component")
.using("Core5.Container")
.using("Core5.Widget.Toolbar")
.using("Core5.YT.Window")
.using("Core5.YT.Taskbar")
.using("Core5.Widget.Menu")        //menu引用menuButton，但menuButton不直接using menu，以避免死循環，為了讓menu以合起來，所以加一個直接引用
.using("Core5.Util.Lang")
//.using(".Tasks.Main"),task
.call("ClientTool.User")
//.call("ClientTool.Current_Fact_No")
.define(function(component,container,toolbar,window,taskbar,menu,lang,user,factNo){
    function hideMenuItems(pop){
        if(pop){
            pop.hide();
            var inner = pop.inner;
            if(inner){
                for(var i=0;i<inner.length;i++){
                    inner[i].pop && hideMenuItems(inner[i].pop);
                }
            }
        }
    }

    var ret = {
        $extend:container
        ,regUIObj:true
        ,inner:function(){
            return [
                {
                    $extend:toolbar
                    ,id:"toolbar"
                    ,"-topbar":true
                    ," s-dblclick":"dbClickTopbar"

                    ," unselectable":"on"       /*IE???還是可以選取子項目,所以還是要js處理*/
                    ,"-unselectable":true

                    ,onHideMenuBtnMenu:function(){
                        //no hide menu when mouse over toolbar
                        //hideAllSubMenu(this);
                    }


                    ,inner:[
                        {
                            text:"<i en='Start'>开始</i>"//補料簽核系統(Material Sign System)'
                            ,type:"menu"
                            ,icon:"home"
                            ,rightIcon:null
                            //," s-mouseover":null
                            ," s-click":"showPop"
                            ,id:"startMenu"
                            ,menuItems:this.mainMenus
                        }
                        ,"-"
                        ,"-"
                        ,{
                            $extend:taskbar
                            ,id:"taskbar"
                            ,"-taskbar":true

                            ,closeEvt:"closeItem"
                            ,clickEvt:"clickItem"
                        }
                        ,{
                            text:"中文"
                            ,evt:"switchLang"
                            ,lang:"zh"
                        }
                        ,{
                            text:"English"
                            ,evt:"switchLang"
                            ,lang:"en"
                        }
                        ,"-"
                        ,{
                            icon:"th"
                            ,floatRight:true
                            ,evt:"showDesktop"
                            ," title":"隱藏所有窗口\nHide all window"
                            //,";border":"0"
                            //,";width":"16px"
                        }
                        //,"-|"
                        ,{
                            text:user?"<i en='Welcome'>歡迎您</i>," + user.Name:"<i en='Please login first!'>您還未登錄!</i>"
                            ," title":user?user.Email + "(" + user.UserID + ")\n":"please login(請登錄)"
                            ,floatRight:true
                            ,rightIcon:null
                            ,type:user?"menu":"button"
                            //," s-mouseover":null
                            ,id:"userMenu"
                            ," s-click":user?"showPop":"login"
                            ,"-s-user-btn":true
                            ,menuItems:[
                                /*{
                                    text:"個人設定..."
                                    ,evt:"prg"
                                    ,icon:"cog"
                                    ,js:"Mat.ReproShow"
                                    ,closeDestroy:true       //一般都要可以destroy
                                }
                                {
                                    text:"個人訊息(Profile)"
                                    ,icon:"user"
                                }
                                ,{
                                    text:"修改密碼(Modify Password)"
                                }
                                */
                                {
                                    text:"<i en='Home Page'>返回首頁</i>"
                                    //," title":"if you want to exit only(no login again),close the browser directly\n如果你只是想退出系統(而不是登出用戶),直接關閉流覽器即可"
                                    ,icon:"off"
                                    ,evt:"logout"
                                }
                            ]
                        }
                        ,{
                            $extend:component
                            ,"-yt-panel-title-tools":true
                            ,id:"winBtnCmp"
                            ,inner:[
                                {
                                    "-yt-panel-btn":true
                                    ," class":"yt-panel-title-min"
                                    ," s-overClass":"yt-panel-title-min-over"
                                    ," s-click":"minWin"
                                }
                                ,{
                                    "-yt-panel-btn":true
                                    ," class":"yt-panel-title-resize"
                                    ," s-overClass":"yt-panel-title-resize-over"
                                    ," s-click":"resizeWin"
                                }
                                ,{
                                    "-yt-panel-btn":true
                                    ," class":"yt-panel-title-close"
                                    ," s-overClass":"yt-panel-title-close-over"
                                    ," s-click":"closeWin"
                                }
                            ]
                        }
                        //,"-|"
                    ]
                }
                ,this.mainAreaCls
            ];
        }

        ,init:function(){
            this.$base();
            this._initData("winMax");
        }

        //---------------事件回應
        //窗口操作
        ,onMaxWindow:function(win,max){
            this.set("winMax",max);
        }

        ,onActiveWindow:function(win){
            this.showWin(win.id);
        }

        ,onHideWindow:function(win){
            this.hideWin(win.id);
        }

        ,onDestroyWindow:function(win){
            this.removeWin(win.id);
        }

        //任務欄動作
        ,onCloseItem:function(task,winId){
            var win = this[winId];
            win.closeDestroy ? this.removeWin(winId):this.hideWin(winId);
        }

        ,onClickItem:function(task,winId,e){
            //再一次就是隱藏
            //console.log("ctrlKey:" , e.ctrlKey);
            if(e.ctrlKey){
                var win = this[winId];
                if(win.MENU_ID && win.MENU_JS){
                    this.openPrgInNewTab(win.MENU_ID, win.MENU_JS, win.MENU_CORE5_ARGS);
                }
            }
            else{
                this._windows[0] == winId ? this.hideWin(winId) : this.showWin(winId);
            }
        }

        //雙擊欄,還原
        ,onDbClickTopbar:function(){
            //debugger
            if(top.window.getSelection){//w3c
                top.window.getSelection().removeAllRanges();
            }
            else  if(document.selection){
                document.selection.empty();//IE
            }            
            this.set("winMax",false);
        }

        //最大化后右上角的三個窗口按鈕
        ,onResizeWin:function(){
            this.set("winMax",false);
        }

        ,onMinWin:function(){
            var winId = this._windows[0];
            this.hideWin(winId);
        }

        ,onCloseWin:function(){
            var winId = this._windows[0];
            var win = this[winId];
            win.closeDestroy ? this.removeWin(winId):this.hideWin(winId);
        }

        ,onShowDesktop:function(){
            var wins = this._windows;
            if(wins){
                for(var i=0;i<wins.length;i++){
                    this.hideWin(wins[i],true);
                }
            }
            this._windows = [];
            this._setWinMaxCss();
        }

        //------------------數據邏輯處理
        /*
        winMax:當前狀態是否最大化
        _windows:當前windows id列表序列(激活時,先出隊,設定為_curWinId.切換時,會將上一個放到_windows中的第一個里)
        _curWinId:當前最上層的windows id
        程式屬性:可以多個(每個自然是關閉)  / 只有一個實例(可關閉) / 只有一個實例(關閉是隱藏)
        某個程式的屬性,是否正在打開中(載入狀態)(用using的)
        */

        ,_setWinMaxCss:function(){
            this.winMax  && this._windows && this._windows.length ? this.addClass("s-win-max"):this.removeClass("s-win-max");
        }

        ,_setWinMax:function(winMax){
            var wins = this._windows;
            if(wins){
                for(var i=0;i<wins.length;i++){
                    var win = this[wins[i]];
                    win && win.isVisible() && (!win.noAutoMax || !winMax) && win.set("windowMax",winMax);
                }
            }
            this._setWinMaxCss();
        }

        ,winMax:true

        ,showWin:function(winId){
            var win = this[winId];
            win && win.show && win.show();
            //只有自己最大化,才最大化.不跟著別人來最大化(即這種窗口,不跟外面的最大化掛勾,而是自己再獨立控制最大化)
            win && (!win.noAutoMax || !this.winMax) && win.set && win.set("windowMax",this.winMax);
            //出隊再入隊頭
            if(this._windows[0] != winId){

                //this.hideWin(this._windows[0]);
                this.toolbar.taskbar.deActiveItem(this._windows[0]);

                var index = this._getIndexByWinId(winId);
                index != -1 && this._windows.splice(index,1);
                this._windows.unshift(winId);

            }

            this.toolbar.taskbar.activeItem(winId);
            this._setWinMaxCss();
        }

        //隱藏窗口
        ,hideWin:function(winId,noShowNext){
            var win = this[winId];
            win && win.hide && win.hide();
            this.toolbar.taskbar.deActiveItem(winId);
            //出隊找下一個入隊頭
            if(!noShowNext){
                var index = this._getIndexByWinId(winId);
                if(index != -1){
                    this._windows.splice(index,1);
                    if(index==0 && this._windows.length){
                        this.showWin(this._windows[0]);
                    }
                    this._setWinMaxCss();
                }
            }
        }

        ,removeWin:function(winId){
            var win = this[winId];
            win && win.dispose && win.dispose();       //可能在taskbar的pop中已經close掉了
            this.toolbar.taskbar.removeItem(winId);
            
            var index = this._getIndexByWinId(winId);
            if(index != -1){
                this._windows.splice(index,1);
                if(index==0 && this._windows.length){
                    this.showWin(this._windows[0]);
                }
                this._setWinMaxCss();
            }
        }

        ,addWin:function(winId){
            this._windows = this._windows || [];
            this._windows.push(winId);

            this.showWin(winId);
        }

        ,_getIndexByWinId:function(winId){
            var wins = this._windows;
            if(wins){
                for(var i=0;i<wins.length;i++){
                    if(wins[i] == winId){
                        return i;
                    }
                }
            }
            return -1;
        }

        //主事件-----------------------------------------
        ,onWin:function(btn){
            //可能更新了sjs.js(但ui.html可能被流覽器緩存住了)
            var indexPage = btn.page || "ui.html";
            var runJs = btn.runJs || "Core5.RunCore";
            var develop_sjs = btn.develop_sjs?"&develop_sjs=1":"";
            var url = btn.url;
            if(!url){
                url = indexPage + "?js=" + runJs + "&js2=" + btn.js + develop_sjs;
            }
            top.window.open(url);
        }

        ,openPrgInNewTab:function(menuID,menuJs,core5Args){
            var url = location.href.split("?")[0] + "?js=Core5.RunCore&js2=" + menuJs + "&RECORD_MENU_ID=" + menuID + (core5Args?"&CORE5_ARGS=" + core5Args:"");
            top.window.open(url);
        }

        ,onPrg:function(btn){
            this.openPrg(btn);
        }

        ,openPrg:function(btn){
            hideMenuItems(this.toolbar.startMenu.pop);
            var id = "prg_" + btn.js + (btn.CORE5_ARGS?"-" + btn.CORE5_ARGS:"");
            if(btn.allowMultipleWin){
                this._winIdSeed = this._winIdSeed || 0;
                id = id + "-" + (++this._winIdSeed);
            }
            var prg = this[id];
            if(prg){
                this.showWin(id);//set("curWinId",id);//closeDestroyshow();
            }
            else{
                var oThis = this;
                var resultFn = function(prg){
                    var prgMixin = Array.prototype.slice.call(arguments,1);
                    prgMixin.push({CORE5_ARGS:btn.CORE5_ARGS});
                    var win = oThis.createChild(window,{//transformShowHide,{
                        id:id
                        ,title:(btn.winTitle || btn.text) + "&nbsp;<font color='#e0e0e0'>[" + id.substr(4) + "]</font>"
                        ,minWidth:btn.minWinWidth || 800
                        ,minHeight:btn.minWinHeight || 540
                        ,width:btn.winWidth || 800
                        ,height:btn.winHeight || 540
                        ,dragResizeDisabled:btn.dragResizeDisabled
                        ,maxTop:35
                        ,inner:{
                            $extend:prg
                            ,$mixin:prgMixin
                            ,RECORD_MENU_ID: btn.menuID * 1
                        }
                        ,header:typeof(btn.winHeader)=="undefined"?btn.winTitle || btn.text:btn.winHeader

                        ,noAutoMax:btn.noAutoMax
                        ,maxHideTitleAndHead:true//!btn.noMaxHideTitleAndHead
                        ,closeDestroy:btn.allowMultipleWin ? true:!!btn.closeDestroy

                        ,maxWindowEvt:"maxWindow"
                        ,activeEvt:"activeWindow"
                        ,destroyEvt:"destroyWindow"
                        ,hideEvt:"hideWindow"

                        ,MENU_ID: btn.menuID
                        ,MENU_CORE5_ARGS:btn.CORE5_ARGS
                        ,MENU_JS:typeof(btn.js) == "string"?btn.js:null
                        ,initStart:true         //tell js ,please init self and run
                    }).show();
                    oThis.toolbar.taskbar.addItem({closable:win.closeDestroy,inner:win.title.replace("#e0e0e0","#888888"),taskItemIndex:id});
                    oThis.addWin(id);

                };
                if(typeof(btn.js)=="string"){
                    if(btn.js.indexOf("@")==0){
                        sjs.call(btn.js.substr(1)).run(function(svcCfg){
                            var prgSjs = sjs.using(svcCfg.$extend);
                            if(btn.prgMixin){
                                var mixins = btn.prgMixin.split(",");
                                for(var i=0;i<mixins.length;i++){
                                    var mixin = mixins[i];
                                    mixin.indexOf("@")==0?prgSjs.call(mixin.substr(1)):prgSjs.using(mixin);
                                }
                            }
                            prgSjs.run(function(svcCfgExtend){
                                svcCfg.$extend = svcCfgExtend;
                                var resultFnArgs = [svcCfg].concat(Array.prototype.slice.call(arguments,1));
                                //resultFn(svcCfg);
                                resultFn.apply(null,resultFnArgs);
                            });
                        });
                    }
                    else{
                        var prgSjs = sjs.using(btn.js);
                        if(btn.prgMixin){
                            var mixins = btn.prgMixin.split(",");
                            for(var i=0;i<mixins.length;i++){
                                var mixin = mixins[i];
                                mixin.indexOf("@")==0?prgSjs.call(mixin.substr(1)):prgSjs.using(mixin);
                            }
                        }
                        prgSjs.run(resultFn);
                    }
                }
                else{
                    resultFn(btn.js);
                }
                return true;
            }
        }

        ,onLogin:function(){
            this._logout();
        }

        ,onLogout:function(){
            location.href = "/";
            //callService("ClientTool","Logout",[],this,this._logout,this._logout);
        }
        
        ,_logout:function(){
            location.href="/pciservice/view/ui.html?js=UI.LoginPage&ReturnJs=Core5.RunCore%2526js2%253D" + qs.JS2;
        }

        ,onSwitchLang:function(btn){
            lang.switchLang(btn.lang);
            hideMenuItems(this.toolbar.userMenu.pop);
        }
    };
    /*
    if(factNo=="0228"){
        ret.mainAreaCls = {
            $extend:task
            ,";width":"400px"
            ,";top":"150px"
            ,";left":"50%"
            ,";margin-left":"-200px"
            ,";position":"absolute"
        }
    }
    */
    return ret;
});