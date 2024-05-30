sjs.loadCss("Core5.Widget.Toolbar")
.using("Core5.Container")
.using("Core5.Layout.Float")
.using("Core5.Widget.Button")
.using("Core5.Widget.Input.Toggle")
.using("Core5.Widget.Input.RadioGroup")
.using("Core5.Widget.MenuButton")
.using("Core5.DomEvent.onmouseover")
.define(function(container,floatLayout,button,toggle,group,menuButton) {

    var types = {
        button:{
            $extend:button
            ,"-s-toolbar-btn":true
            ," s-downClass":"s-toolbar-btn-down"
            ," s-overClass":"s-toolbar-btn-over"
        }
        ,toggle:{
            $extend:toggle
            ,"-s-tgl":null
            ,"-s-toolbar-btn":true
            ," s-overClass":"s-toolbar-tgl-over"
            ,toggleClass : "s-toolbar-tgl-checked"
        }
        ,group:{
            $extend:group
            ,$mixin:[floatLayout]
            ,_getItemCfg:function(item,itemIndex){
                var ret = this.$base(item,itemIndex);
                ret["-s-tgl"] = null;
                ret["-s-toolbar-btn"] = true;
                ret[" s-overClass"] = "s-toolbar-tgl-over";
                ret.toggleClass = "s-toolbar-tgl-checked";
                return ret;
            }
            
        }
        ,menu:{
            $extend:menuButton
            ,"-s-toolbar-btn":true
            ," s-downClass":"s-toolbar-btn-down"
            ," s-overClass":"s-toolbar-btn-over"
            ," s-mouseover":"showPop"
            ," s-mouseout":"hidePop"
            ,rightIcon:"chevron-down"
            ,onShowPop:function(src,e){
                this.showPop();
                e.stopPropagation();        //因為menu的mouseover會隱藏所有子選單，所以這里不冒泡，讓事件不執行
            }
            ,onHidePop:function(src,e,toJq){
                //console.log("mouseout to:" + toJq.html());
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
        ,$mixin:[floatLayout]          //必須放在config后面作擴展的
        ,"-s-toolbar":true
        ,_initInnerItem:function(itemCfg,itemIndex){
            if(itemCfg == "-"){
                return '<div class="s-toolbar-split">&nbsp;</div>';
            }
            if(itemCfg == "-|"){
                return '<div class="s-toolbar-split" style="float:right">&nbsp;</div>';
            }
            itemCfg.$extend = itemCfg.$extend || types[itemCfg.type || "button"];
            return this.$base(itemCfg,itemIndex);
        }  
        
        /**
        @data {items} {inner..type}
        -button:button
        -toggle:checked or not
        -group:radio group
        -menu:menu button
        */

        ,regUIObj:true
        ," s-mouseover":"hideMenuBtnMenu"

        //如果移入，則要隱藏當前有顯示的所有menu item的子menu
        ,onHideMenuBtnMenu:function(){
            hideAllSubMenu(this);
        }
          
    }
});