sjs.loadCss(".SysMenu")
.using(".App")
.using("Core5.Util.Service")
.call("ClientTool.Query","Select_BASE_MENU@Flow",{MENU_ID:qs.MENU_ID})
.define(function(app,sc,rootMenuRet){
    var isIE = "ActiveXObject" in window;//navigator.userAgent.indexOf("MSIE")>=0;
    var rootMenu;
    //alert(isIE);
    if(rootMenuRet.Count){
        rootMenu = rootMenuRet.Rows[0];
    }

    var itemCfg = JsonHelper.decode(rootMenu.UI_OPTIONS || "{}") || {};

    if(itemCfg.PACKAGES){
        var packages = itemCfg.PACKAGES.split(";");
        for(var j=0;j<packages.length;j++){
            var pkgSet = packages[j].split("=");
            sjs.path(pkgSet[0],pkgSet[1]);
        }
    }

    var dynamicLoadItems = {
        menuItems:[{text:"loading..."}]
        ,showPop:function(){
            this.$base();
            if(!this._getMenuItems){
                this._getMenuItems = 1;
                this._getMenus(this.menuID,this.ieOnly);
            }
        }

        ,_getMenus:function(menuId,parentIEOnly){
            //callService("ClientTool","Query",["Prj/SysMenuAll",{UP_MENU_ID:menuId}],this,function(ret){
            sc.callService("ClientTool","Query",["Prj/SysMenu",{UP_MENU_ID:menuId}],this,function(ret){
                var items = [];
                if(ret.Rows){
                    for(var i=0;i<ret.Rows.length;i++){
                        var item = ret.Rows[i];
                        if(!item.STOP_MK && item.RIGHT_LEVEL>-100){
                            var ieOnly = parentIEOnly || item["IE_ONLY"];
                            var itemCfg = JsonHelper.decode(item.UI_OPTIONS || "{}") || {};

                            if(itemCfg.PACKAGES){
                                var packages = itemCfg.PACKAGES.split(";");
                                for(var j=0;j<packages.length;j++){
                                    var pkgSet = packages[j].split("=");
                                    sjs.path(pkgSet[0],pkgSet[1]);
                                }
                            }

                            if(itemCfg.ABOVE_LINE == "Y"){
                                items.push("-");
                            }
                            var nm = ret.Rows[i].MENU_NM;
                            var nm2 = ret.Rows[i].MENU_NM_EN;
                            if(nm2 && nm2 != nm){
                                nm = "<i en='" + nm2 + "'>" + nm + "</i>";
                            }

                            var menuItem;
                            if(item.LINK_KIND=="Core5"){
                                menuItem = {
                                    text:nm
                                    ,icon:itemCfg.ICON
                                    ,evt:"menuPrg"
                                    ,js:ret.Rows[i].LINK
                                    ,menuID:item.MENU_ID
                                    ,closeDestroy:true
                                };
                            }
                            else if(item.LINK_KIND){
                                menuItem = {
                                    text:nm
                                    ,icon:itemCfg.ICON
                                    ,evt:"linkMenu"
                                    ,menuID:item.MENU_ID
                                };
                            }
                            else{
                                menuItem = {
                                    text:nm
                                    ,icon:itemCfg.ICON
                                    ,$mixin:[dynamicLoadItems]
                                    ,type:"menu"
                                    ,menuID:ret.Rows[i].MENU_ID
                                    ," s-click":"overMenuItem"
                                    ,ieOnly:ieOnly
                                };
                            }
                            menuItem[";color"] = item.RIGHT_LEVEL==-100?"#999999":item.RIGHT_LEVEL>=0?isIE || !ieOnly?"#000084":"#840000":null;
                            var menuTitle = "";
                            if(item.RIGHT_LEVEL==-100){
                                menuTitle += "\n沒有權限訪問此選單\nNo Permission for this menu\n";
                            }
                            if(ieOnly && !isIE && (item.LINK_KIND || item.RIGHT_LEVEL>=0)){
                                menuTitle += "\n此選單只能使用IE瀏覽器訪問\nplease open this by IE(Internet Explore)\n";
                            }
                            menuItem[" title"] = menuTitle;
                            items.push(menuItem);
                        }
                    }
                }
                var pop = this.pop;
                if(pop){
                    pop.setInner(items);
                }
                else{
                    this.menuItems = items;
                }
                
            });
        }
    }
    return {
        $extend:app
        ,rootMenuId:qs.MENU_ID || 0
        ,ieOnly:rootMenu?rootMenu["IE_ONLY"]:false
        ,noRightHide:true        //true:選單沒有權限時不顯示，false:顯示，但user點時提醒他申請權限（或系統角色）

        ,inner:function(){
            var ret = this.$base();
            var startMenu = ret[0].inner[0];
            startMenu.$mixin = startMenu.$mixin || [];
            startMenu.$mixin.push(dynamicLoadItems);
            startMenu.menuID = this.rootMenuId;
            return ret;
        }

        ,_recordOK:function(){}

        ,onMenuPrg:function(btn){
            if(this.openPrg(btn)){
                sc.callService("ClientTool","RecordMenuAccess",[btn.menuID],this,this._recordOK);
            }
        }

        ,onLinkMenu:function(btn){
            var win = window.open("/RIAService/MessageLink.aspx?MenuID=" + btn.menuID,"SJS_MENU_" + btn.menuID);   
            win.focus();
        }
    };
});