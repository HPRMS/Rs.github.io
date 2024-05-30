sjs.loadCss("Core5.Widget.Menu")
.using("Core5.Container")
.using("Core5.Widget.Button")
.using("Core5.Widget.Input.Toggle")
.using("Core5.Widget.Input.RadioGroup")
.using("Core5.Widget.MenuButton")
.using("Core5.DomEvent.onmouseover")
.define(function(container,button,toggle,group,menuButton) {
    var types = {
        button:{
            $extend:button
            ,"-s-menu-btn":true
            ," s-overClass":"s-menu-btn-over"
            ," s-downClass":null
        }
        ,toggle:{
            $extend:toggle
            ,"-s-tgl":false
            ,"-s-menu-btn":true
            ," s-overClass":"s-menu-tgl-over"
            ,toggleClass : "s-menu-tgl-checked"
        }
        ,group:{
            $extend:group
            ,_getItemCfg:function(item,itemIndex){
                var ret = this.$base(item,itemIndex);
                ret["-s-tgl"] = false;
                ret["-s-menu-btn"] = true;
                ret[" s-overClass"] = "s-menu-tgl-over";
                ret.toggleClass = "s-menu-tgl-checked";
                return ret;
            }
        }    
        ,menu:{
            $extend:menuButton
            ,"-s-menu-btn":true
            ," s-downClass":false
            ," s-overClass":"s-menu-btn-over"
            ," s-mouseover":"overMenuItem"
            ," s-mouseout":"outMenuItem"
            ,showPos:"right"
            ,rightIcon:"chevron-right"
            ,onOverMenuItem:function(src,e){
                // console.log("show pop")
                this.showPop();
                e.stopPropagation();        //因為menu的mouseover會隱藏所有子選單，所以這里不冒泡，讓事件不執行
            }

            ,onOutMenuItem:function(src,e,toJq){
                // console.log("mouseout to:" + toJq.html());
                var isHide = true;
                if(this.pop && toJq){
                    var popObjId = this.pop._objId;
                    //console.log("popObjId:" + popObjId);
                    if(toJq[0] == this.pop.jq()[0]){
                        isHide = false;
                    }
                    else{
                        var parents = toJq.parents("[s-objId='" + popObjId + "']");
                        if (parents.length) {
                            isHide = false;
                        }
                    }
                }
                isHide && this.hidePop();
            }
        }
    };

    function hideAllSubMenu(pop){
        var items = pop.inner;
        for(var i=0;i<items.length;i++){
            if(items[i].menuButton){
                var subPop = items[i].pop;
                if(subPop){
                    hideAllSubMenu(subPop);
                    subPop.hide();
                }
            }
        }
    }

    return {
        $extend:container
        ,"-s-menu":true
        ,_initInnerItem:function(itemCfg,itemIndex){
            if(itemCfg == "-"){
                return '<div class="s-menu-split">&nbsp;</div>';
            }
            itemCfg.$extend = itemCfg.$extend || types[itemCfg.type || "button"];
            return this.$base(itemCfg,itemIndex);
        }    
    
        ,innerHtml:function(html){
            html.push("<div class='s-menu-v-split'></div>");
            this.$base(html);
        }

        ,regUIObj:true
        ," s-mouseover":"hideMenuBtnMenu"
        //," s-overselfevt":"1"
        //如果移入，則要隱藏當前有顯示的所有menu item的子menu
        ,onHideMenuBtnMenu:function(){
            hideAllSubMenu(this);
        }

    };
});