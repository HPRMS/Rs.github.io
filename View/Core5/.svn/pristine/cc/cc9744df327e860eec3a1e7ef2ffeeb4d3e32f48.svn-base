sjs.loadCss("Core5.Shp.Icon")
.loadCss("Core5.YT.Tab")
.using("Core5.Container")
.using("Core5.Html.Tag")
.using("jQuery")
.using("Core5.Widget.Mixin.Pop")
.using("Core5.DomEvent.onmouseclass",true)
.using("Core5.Component")
.using("Core5.DomEvent.onmouseover")
.define(function(container,tag,$,pop,component){
    return {
        $extend:container
        ,$mixin:[pop]
        ,"-y-tab":true
        ,regUIObj:true

        ,tabIndex:0

        ,_getTabHeadItem:function(item,tabIndex){
            return {
                "-y-tab-head-item":true
                ," s-click":"tabClick"
                ," s-tab-index":this._objId + "_" + tabIndex
                ," s-overClass":"y-tab-item-over"
                //,";display":tabIndex < 3?"none":"block"           //通过隐藏前面的项次,将当前的show的tab摆到视野中
                ,inner:item.closable?[
                    item.title || "&nbsp;"
                    ,{
                        "-y-tab-close":true
                        ," s-overClass":"y-tab-close-over"
                        ,"-icon":true
                        ,"-icon-blue":true
                        ,"-icon-remove":true
                        ," s-click":"tabClose"
                        ," title":"close this"
                    }
                ]:item.title || "&nbsp;"
                ," class":this.tabIndex == tabIndex?"y-tab-head-item-current":null
            };
        }

        ,innerHtml:function(html){
            var inner = this.inner;     //不能用舊的inner，因為會有問題
            this._tabSeed = inner.length;
            this._tabs = {};

            //this._tabQueue = [this.tabIndex];       //记录单击顺序,以便在close后,可以找到上一个显示(算了,先不这么复杂)

            var headInner = [];
            for(var i=0;i<inner.length;i++){
                headInner.push(this._getTabHeadItem(inner[i],i));
            }
            headInner.push("<div class='y-tab-clearfix'></div>");

            for(var i=0;i<inner.length;i++){
                this._tabs[i] = inner[i];
                inner[i].addClass && inner[i].addClass("y-tab-body-item");
                this.tabIndex == i ? inner[i].show() : inner[i].hide();
            }


            var renderInner = [
                {
                    "-y-tab-body":true
                    ,inner:inner
                }
                ,{
                    "-y-tab-head":true
                    ,inner:{
                        "-y-tab-head-con":true
                        ,inner:headInner
                    }
                }
                ,{
                    "-y-tab-down":true
                    ,"-icon":true
                    ,"-icon-chevron-down":true
                    ," s-overClass":"y-tab-down-over"
                    ," s-click":"tabShowAll"
                    ," title":"show all tabs' title"

                    ,";display":"none"

                }
            ];
            renderInner[1]["-head-" + this._domId] = true;
            html.push(tag.itemHtml(renderInner,this));
        }

        ,_setTabIndex:function(tabIndex,change,oldTabIndex){
            if(change && this.isRender()){
                oldTabIndex!=-1 && this.jq(".head-" + this._domId + " [s-tab-index='" + this._objId + "_" + oldTabIndex + "']").removeClass("y-tab-head-item-current");
                tabIndex != -1 && this.jq(".head-" + this._domId + " [s-tab-index='" + this._objId + "_" + tabIndex + "']").addClass("y-tab-head-item-current");

                oldTabIndex!=-1 && this._tabs[oldTabIndex] && this._tabs[oldTabIndex].hide();
                tabIndex != -1 && this._tabs[tabIndex] && this._tabs[tabIndex].show();

                this._checkTabMustShow();
            }
            this.tabSwitchEvt && this.report(this.tabSwitchEvt,this._tabs[tabIndex],tabIndex);

        }

        ," s-mouseover":"resize"
        ,onResize:function(){
            this._resize();
        }
        
        ,_resize:function(forceResize){
            var jqWidth = this.jq().width();
            var jqHeight = this.jq().height();
            if (forceResize || (jqWidth != this._jqWidth || jqHeight != this._jqHeight)) {
                this._jqWidth = jqWidth;
                this._jqHeight = jqHeight;
                return this._doResize(jqWidth,jqHeight);
            }
        }

        ,_doResize:function(jqWidth,jqHeight){
            this._checkTabMustShow();
            this._checkDownIconShow();

        }

        ,onVisibleChange:function(visible){
            visible && this.isRender() && this._resize(true);
        }


        ,_render:function(){
            this.$base(); 
            var oThis = this;   
            window.setTimeout(function(){
                oThis && oThis._doResize && oThis._doResize();
            },500);     //样式还没载入完成
        }


        ,_checkDownIconShow:function(){
            
            //var lastChild = this.jq(".head-" + this._domId + " .y-tab-head-con div:last-child").prev();     //最后一个是clear-fix
            var lastChild = this.jq(".head-" + this._domId + " .y-tab-clearfix").prev();
            if(lastChild.length){
                var thisTop =  this.jq(".head-" + this._domId + " .y-tab-head-con").offset().top;
                var lastTop = lastChild.offset().top - thisTop;
                var conHeight = this.jq(".head-" + this._domId + " .y-tab-head-con").height();//.outerHeight(true);       //height();更多一些,保险
                if(lastTop >= conHeight || this.jq(".head-" + this._domId + " .y-tab-head-con > div:hidden").size()){
                    this.jq("> .y-tab-down").show();
                    return;
                }
            }
            this.jq("> .y-tab-down").hide();
        }

        //小心onresize会有问题
        //将当前显示的tab show出来
        ,_checkTabMustShow:function(){
            this.jq(".head-" + this._domId + " [s-tab-index]").not("[s-tab-hide='1']").show();
            var head = this.jq(".head-" + this._domId + " [s-tab-index='" + this._objId + "_" + this.tabIndex + "']");
            if(!head.size()){
                return;
            }
            /*
            //前面display:none的算不到
            if(head.offset().top - this.jq().offset().top < 5){       //5的误差吧
                return ;
            }
            */
            //如何快速判断当前是否隐藏?
            var totalShowWidth = this.jq(".head-" + this._domId + " .y-tab-head-con").width();
            var totalWidth = head.outerWidth(true);

            //先检查下一个(优先显示下一项)
            var next = head.next().not("[s-tab-hide='1']");
            if(next.size()>0){
                var nextWidth = $(next[0]).outerWidth(true);
                if(nextWidth + totalWidth<totalShowWidth){
                    totalWidth += nextWidth;
                }
            }

            //再依次将前面的显示出来,直到totalShowWidth满了为止
            var preNodes = head.prevAll().not("[s-tab-hide='1']");
            var size = preNodes.size();
            for(var i=0;i<size;i++){
                var itemJq = $(preNodes[i]);
                totalWidth += itemJq.outerWidth(true);
                if(totalWidth> totalShowWidth){
                   for(var j=i;j<size;j++){
                        $(preNodes[j]).hide();
                   }
                   break;
                }
            }
        }

        //可能从pop过来的
        ,onTabClick:function(srcOrpop,src){
            var tabIndex = (srcOrpop._objId?src:srcOrpop).attr("s-tab-index");
            if(srcOrpop._objId){
                srcOrpop.jq(".y-tab-head-item-current").removeClass("y-tab-head-item-current");
                src.addClass("y-tab-head-item-current");
            }
            tabIndex = tabIndex.substr(this._objId.length+1);
            this.set("tabIndex",tabIndex);
            this.tabClickEvt && this.report(this.tabClickEvt,this._tabs[tabIndex],tabIndex);
        }

        //可能从pop过来
        ,onTabClose:function(srcOrpop,src){
            var tabIndex = (srcOrpop._objId?src:srcOrpop).parent().attr("s-tab-index");
            if(srcOrpop._objId){
                src.parent().remove();
            }
            tabIndex = tabIndex.substr(this._objId.length+1);
            this.removeTab(tabIndex);
        }

        ,addTab:function(cfgOrObj){
            if(this.isRender()){        //否则自己处理inner
                var tabIndex = this._tabSeed++;
                var tabHead = this._getTabHeadItem(cfgOrObj,tabIndex);
                //this.jq(".y-tab-head-con").append(tag.itemHtml(tabHead));

                //有个clear:both的div 
                $(tag.itemHtml(tabHead)).insertBefore(this.jq(".head-" + this._domId + " .y-tab-clearfix"));


                var item = this._initInnerItem(cfgOrObj,this.inner.length);
                this._tabs[tabIndex] = item;
                item.hide();
                this.renderItem(item,true,">.y-tab-body");

                this._doResize();
                return tabIndex;
                //this.set("tabIndex",tabIndex);        //自己选择show
            }
            //_initInnerItem:function(itemCfg,itemIndex){
            //renderItem: function(item,append,subExp){
        }

        //必须在render后调用(否则请自己处理inner就好)
        ,removeTab:function(tabIndex){
            if(this.isRender()){
                
                if(this.tabIndex == tabIndex){
                    var nextShowTab = -1;
                    for(var i=0;i<this._tabSeed;i++){
                        if(this._tabs[i] && i!=tabIndex){
                            nextShowTab = i;
                            break;
                        }
                    }
                    this.set("tabIndex",nextShowTab);             //返回到上一个tab(记录上一个tab按下是什么)
                }

                this.jq(".head-" + this._domId + " [s-tab-index='" + this._objId + "_" + tabIndex + "']").remove();
                this._tabs[tabIndex].dispose();
                delete this._tabs[tabIndex];

                this._doResize();

            }
        }

        ,popType:{
            $extend:component
            ,"-y-tab-menu":true
        }

        ,_getPosJq:function(){
            return this.jq("> .y-tab-down");
        }

        ,_getPop:function(popType){
            var ret = this.$base(popType);
            //ret._objId = this._objId;
            ret.jq().html(this.jq(".head-" + this._domId + " .y-tab-head-con").html());
            ret.jq("[s-tab-index]").not("[s-tab-hide='1']").show();
            return ret;
        }

        ,onTabShowAll:function(){
            this.showPop();
        }

        ,_getTabIndex:function(tabItem){
            var tabs = this._tabs;
            for(var tabIndex in tabs){
                if(tabs[tabIndex] == tabItem){
                    return tabIndex;
                }
            }
            return null;
        }

        //隱藏某個Tab(title)
        ,hideTabTitle:function(tabItemId){
            var oldTabIndex = this._getTabIndex(this[tabItemId]);
            if(oldTabIndex==this.tabIndex){
                //如果當前顯示的就是當前要隱藏的，則先隨便找出一個來設置
                var nextShowTabIndex = -1;
                var tabs = this._tabs;
                for(var tabIndex in tabs){
                    if(!tabs[tabIndex]._tabHide && tabs[tabIndex] != this[tabItemId]){
                        nextShowTabIndex = tabIndex;
                        break;
                    }
                }
                this.set("tabIndex",nextShowTabIndex);
            }
            //再隱藏tab的title即可
            this[tabItemId]._tabHide = true;
            this.jq(".head-" + this._domId + " [s-tab-index='" + this._objId + "_" + oldTabIndex + "']").attr("s-tab-hide","1").hide();
        }

        ,showTabTitle:function(tabItemId){
            var oldTabIndex = this._getTabIndex(this[tabItemId]);
            delete this[tabItemId]._tabHide;
            this.jq(".head-" + this._domId + " [s-tab-index='" + this._objId + "_" + oldTabIndex + "']").removeAttr("s-tab-hide").show();
            if(this.tabIndex==-1){
                this.set("tabIndex",oldTabIndex);
            }
        }
        /*
        ,onTabAdd:function(){
            this.addTab({
                $extend:component
                ,title:"动态新加项"
                ,inner:"Hello <br> i'm dynamic add"
                ,closable:true
            });
        }
        */
        /*
        ,inner:[
            {
                $extend:component
                ,title:"第一项"
                ,inner:"Hello World!"
                ,closable:true

            }
            ,{
                $extend:component
                ,title:"第二项(不可关闭)"
                ,inner:"Hello World1!<b style='cursor:pointer;color:blue' s-click='tabAdd'>add tab test</b>"
                ,closable:true
           }
            ,{
                $extend:component
                ,title:"第三项 dffdasfdsa"
                ,inner:"Hello World2!"
                ,closable:true
            }
            ,{
                $extend:component
                ,title:"第四项 English"
                ,inner:"Hello World3!"
                ,closable:true
            }
            ,{
                $extend:component
                ,title:"fdasf sdfda 11"
                ,inner:"Hello World3 11!"
                ,closable:true
            }
            ,{
                $extend:component
                ,title:"fdasf sdfdasf dasfdasf dasfdsf dsafdsfdalish 22"
                ,inner:"Hello World3 33!<div s-click='testShow' style='cursor:pointer;color:green'>test show TabTitle</div>"
                ,closable:true

            }
            ,{
                $extend:component
                ,title:"fdasf sdfdasf dasfdasf dasfdsf dsafdsfda ish 33"
                ,inner:"Hello World3 22!<div s-click='testHide' style='cursor:pointer;color:red'>test hide TabTitle</div>"
                ,closable:true
            }
            ,{
                $extend:component
                ,title:"fdasf sdfdasf dasfdasf dasfdsf dsafdsfdish 44"
                ,inner:"Hello World3 44!<div s-click='testHide' style='cursor:pointer;color:red'>test hide TabTitle</div>"
                ,closable:true
                ,id:"demoTab"
            }
        ]

        ,onTestHide:function(){
            this.hideTabTitle("demoTab");
        }

        ,onTestShow:function(){
            this.showTabTitle("demoTab");
        }
        */

    };
});