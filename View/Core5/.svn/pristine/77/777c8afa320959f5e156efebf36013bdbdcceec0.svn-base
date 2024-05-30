sjs.loadCss("Core5.Widget.Menu")   //css還是先載入，免得在動態loading時，樣式delay
.using("Core5.Widget.Button")
.using("Core5.Widget.Mixin.Pop")
//.using("Core5.DomEvent.onmouseclass")
.define(function(button,pop){
    var menus = [];         //當前顯示menu的對象
    function addMenu(menu){
        menus.push(menu);
    }
    
    function menuIsParent(parentMenu,menu){
        while(menu.parent){
            if(menu.parent == parentMenu){
                return true;
            }
            menu = menu.parent;
        }
        return false;
    }
    
    //用menu.parent來檢測
    function hideMenuUntilParent(menu){
        for(var i=menus.length-1;i>=0;i--){
            if(menuIsParent(menus[i],menu)){
                break;
            }
            menus[i].hide();
        }
    }
    
    function removeMenu(menu){
        for(var i=menus.length-1;i>=0;i--){
            if(menus[i] == menu){
                menus.splice(i,menus.length-i);
                break;
            }
        }
    }
    
    return {
        $extend:button
        
        ,$mixin:[pop]
        
        ,"-s-menubtn":true
        ,menuButton:true        //用于表示此項是menu的button，某些不是menu，但是是pop的也可以用此項
        //,xinit:function(){
        //    this.$base();
            //this.evt && this.addClass("s-menubtn-click");
            //this.evt && this.attr("s-overClass","s-menubtn-click-over");
        //}
              
        //,onCommand:function(){
        //    this.evt && this.report(this.evt);
        //    this.showPop();
        //}
        
        ,popType:"Core5.Widget.Menu"
        
        ,_getPopConfig:function(){
            //alert(JsonHelper.encode(this.menuItems));
            return {
                inner:this.menuItems
                ,_show:function(){
                    hideMenuUntilParent(this);
                    addMenu(this);
                    this.parent && this.parent.addClass && this.parent.addClass("s-btn-showmenu");
                    this.$base();
                }                    
                ,_hide:function(){
                    removeMenu(this);
                    this.parent && this.parent.removeClass && this.parent.removeClass("s-btn-showmenu");
                    this.$base();
                }
                ,_dispose:function(){
                    removeMenu(this);
                    this.parent && this.parent.removeClass && this.parent.removeClass("s-btn-showmenu");
                    this.$base();
                }
            }
        }    
    }
});