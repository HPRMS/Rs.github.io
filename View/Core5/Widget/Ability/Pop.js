/*Component的Mixin,繼承ShowHide*/
sjs.loadCss("Core5.Shp.Other")
.using("jQuery")
.using("Core5.DomEvent.PopManager")
.using("Core5.DomEvent.UIManager")
.define(function($,popManager,uiManager){
    function adjustPos(pop){
        var popJq = pop.jq();
        var newpos=popJq.offset();
        var popHeight=popJq.outerHeight();
        var winHeight=$(window).height();
        //var isTop = false;
        var scrollTop = $("html").scrollTop() || $("body").scrollTop();
        if(newpos.top+popHeight>winHeight+scrollTop) {
            var newTop=scrollTop + winHeight - popHeight - 5;//newpos.top-(pos.outerHeight()+popHeight);
            pop.css("top",newTop>=0 ? newTop + "px":0);
        }
        var popWidth=popJq.outerWidth();
        var winWidth=$(window).width();
        var scrollLeft = $("html").scrollLeft() || $("body").scrollLeft();
        if(newpos.left+popWidth>winWidth+scrollLeft) {
            var newLeft=scrollLeft + winWidth-popWidth - 5;//newpos.left - (popWidth-pos.outerWidth());
            pop.css("left",newLeft>=0 ? newLeft + "px":0);
        }
    }

    var posKinds = {
        lt:["left","top","right","bottom"]
        ,rt:["right","top","left","bottom"]
        ,lb:["left","bottom","right","top"]
        ,rb:["right","bottom","left","top"]
    };


    return {
        regUIObj:true
        ,"-s-pop":true
        ," pop-obj":"1"
        ,visible:false
        ,";position":"absolute"

        ,autoAdjustPos:true
        ,mask:false     //是否在下面顯示一個透明遮罩

        ,maskOpacity:0.3
        
        ,getHtml:function(){
            var ret = this.$base();
            this.mask && (ret = "<div id='" + this._domId + "_mask' style='opacity:" + this.maskOpacity +"' class='maskDiv'></div>" + ret);
            return ret;
        }
        //如果是pop，則一定要用renderTo方式呈現，而不是用getHtml方式
        /*
        ,renderTo: function(con,append) {
            var ret = this.$base(con,append);
            if(this.mask){
                $("<div id='" + this._domId + "_mask' class='maskDiv'></div>").css({opacity: this.maskOpacity})
                    .insertBefore($("#" + this._domId));//.appendTo("body");
            }
            return ret;
        }   */
        /*
        //本來是說activeWin時,會造成pop show不上來,現在已解決pop關閉的搶先執行問題,所以show的時候,會重新設定z-index
        //以后看還有沒有其它bug,再決定是否啟用這個,加一個保險
        */
        //在window最大化后,再叫它show,它要到最上面來
        ,show:function(){
            this.$base();
            this.setOnTopLevel();
            return this;
        }     
        ,_show:function(){
            var zIndex = popManager.getTopZIndex();
            this.set("zIndex",zIndex+1);
            //chrome,和IE,ff不同，前者body就可以找到完整的scrollWidth和height
            //后者則只有通過html元素才可以找到
            this.mask && $("#" + this._domId + "_mask").css({
                "width":Math.max(document.documentElement.scrollWidth,$("body")[0].scrollWidth) + "px"
                ,"height":Math.max(document.documentElement.scrollHeight,$("body")[0].scrollHeight) + "px"
            }).show();            
            this.$base();
        }

        ,setOnTopLevel:function(){
            //如果這個pop里面還有pop，且這些pop在popManager._pops并沒在移除掉（顯示中），然後也要一并移出，再一并設置高z-index
            var innerShowPops = [];
            var oThis = this;
            this.jq("[pop-obj=1]").each(function(){
                var innerPop = uiManager.get($(this).attr("s-objid"));
                //第一層inner pop，因為再里面的會遞歸
                if(innerPop.jq().parents("[pop-obj]")[0]==oThis.jq()[0] && popManager.find(innerPop)!=-1 && innerPop.setOnTopLevel){
                    innerShowPops.push(innerPop);
                }
            })
            popManager.remove(this);
            var zIndex = popManager.getTopZIndex();
            this.set("zIndex",zIndex+1);
            for(var i=0;i<innerShowPops.length;i++){          //里面的順序無關，因為Parent不一樣，所以z-index不同也不會影響實際顯示的順序
                innerShowPops[i].setOnTopLevel();
            }
        }

//        ,_getTopZIndex:function(){
//            var zIndex = popManager.length();           //從1開始
//            return zIndex > 0 ? popManager._pops[zIndex-1].zIndex : 0;
//        }
//        
        //,noAutoZIndex:false
        ,_setZIndex:function(zIndex){
            //100是常數，只用在這里先
            !this.noAutoZIndex && this.css("z-index",zIndex);       //有些如鎖定表頭的absolute，并不是從這里取得的
            !this.noAutoZIndex && this.mask && $("#" + this._domId + "_mask").css("z-index",zIndex);
            popManager.add(this);       //放在最后面，以便可以讀取
        }

        ,posKind:"lt"

        //get方法直接用jq()取,但是set方法,一般要用對象的方法來調用,因為可能有事件回應
        ,move:function(left,top){
            if(typeof(left)=="string"){     //可只设定一个top,left
                this.css(left, top + "px");
            }
            else{
                var pos = posKinds[this.posKind];
                this.css(pos[0],left + "px")
                    .css(pos[1],top + "px")
                    //.css(pos[2],"auto")
                    //.css(pos[3],"auto")
                    ;
            }
            this.autoAdjustPos && this.adjustPos();//this);
            return this;
        }

        ,adjustPos:function(){
            adjustPos(this);
        }
        
        ,_hide:function(){
            this.$base();
            this.mask && $("#" + this._domId + "_mask").hide();            
            popManager.remove(this);
        }
        
        ,_dispose:function(noRemoveJq){
            this.$base(noRemoveJq);
            this.mask && $("#" + this._domId + "_mask").remove();
            popManager.remove(this);
        }
    };
});