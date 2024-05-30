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
                ," s-tab-index":tabIndex
                ," s-overClass":"y-tab-item-over"
                //,";display":tabIndex < 3?"none":"block"           //通过隐藏前面的项次,将当前的show的tab摆到视野中
                ,inner:item.closable?[
                    item.title
                    ,{
                        "-y-tab-close":true
                        ," s-overClass":"y-tab-close-over"
                        ,"-icon":true
                        ,"-icon-blue":true
                        ,"-icon-remove":true
                        ," s-click":"tabClose"
                        ," title":"close this"
                    }
                ]:item.title
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
            html.push(tag.itemHtml(renderInner,this));
        }

        ,_setTabIndex:function(tabIndex,change,oldTabIndex){
            if(change && this.isRender()){
                oldTabIndex!=-1 && this.jq("[s-tab-index='" + oldTabIndex + "']").removeClass("y-tab-head-item-current");
                tabIndex != -1 && this.jq("[s-tab-index='" + tabIndex + "']").addClass("y-tab-head-item-current");

                oldTabIndex!=-1 && this._tabs[oldTabIndex] && this._tabs[oldTabIndex].hide();
                tabIndex != -1 && this._tabs[tabIndex] && this._tabs[tabIndex].show();

                this._checkTabMustShow();
            }
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

        ,_render:function(){
            this.$base();    
            this._doResize();
        }


        ,_checkDownIconShow:function(){
            var lastChild = this.jq(".y-tab-head-con div:last-child").prev();     //最后一个是clear-fix
            if(lastChild.length){
                var thisTop =  this.jq(".y-tab-head-con").offset().top;
                var lastTop = lastChild.offset().top - thisTop;
                var conHeight = this.jq(".y-tab-head-con").height();//.outerHeight(true);       //height();更多一些,保险
                if(lastTop >= conHeight || this.jq(".y-tab-head-con > div:hidden").size()){
                    this.jq(".y-tab-down").show();
                    return;
                }
            }
            this.jq(".y-tab-down").hide();
        }

        //小心onresize会有问题
        //将当前显示的tab show出来
        ,_checkTabMustShow:function(){
            this.jq("[s-tab-index]").show();
            var head = this.jq("[s-tab-index='" + this.tabIndex + "']");
            /*
            //前面display:none的算不到
            if(head.offset().top - this.jq().offset().top < 5){       //5的误差吧
                return ;
            }
            */
            //如何快速判断当前是否隐藏?
            var totalShowWidth = this.jq(".y-tab-head-con").width();
            var totalWidth = head.outerWidth(true);

            //先检查下一个(优先显示下一项)
            var next = head.next();
            if(next.size()>0){
                var nextWidth = $(next[0]).outerWidth(true);
                if(nextWidth + totalWidth<totalShowWidth){
                    totalWidth += nextWidth;
                }
            }

            //再依次将前面的显示出来,直到totalShowWidth满了为止
            var preNodes = head.prevAll();
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

            this.set("tabIndex",tabIndex);
        }

        //可能从pop过来
        ,onTabClose:function(srcOrpop,src){
            var tabIndex = (srcOrpop._objId?src:srcOrpop).parent().attr("s-tab-index");
            if(srcOrpop._objId){
                src.parent().remove();
            }
            this.removeTab(tabIndex);
        }

        ,addTab:function(cfgOrObj){
            if(this.isRender()){        //否则自己处理inner
                var tabIndex = this._tabSeed++;
                var tabHead = this._getTabHeadItem(cfgOrObj,tabIndex);
                //this.jq(".y-tab-head-con").append(tag.itemHtml(tabHead));

                //有个clear:both的div 
                $(tag.itemHtml(tabHead)).insertBefore(this.jq(".y-tab-clearfix"));


                var item = this._initInnerItem(cfgOrObj,this.inner.length);
                this._tabs[tabIndex] = item;
                item.hide();
                this.renderItem(item,true,".y-tab-body");

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

                this.jq("[s-tab-index='" + tabIndex + "']").remove();
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
            return this.jq(".y-tab-down");
        }

        ,_getPop:function(popType){
            var ret = this.$base(popType);
            //ret._objId = this._objId;
            ret.jq().html(this.jq(".y-tab-head-con").html());
            ret.jq("[s-tab-index]").show();
            return ret;
        }

        ,onTabShowAll:function(){
            this.showPop();
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
                ,title:"fdasf sdfdasf dasfdasf dasfdsf dsafdsfda fdfd fdsaf dsaf dadfas fdf glish 11"
                ,inner:"Hello World3 11!"
                ,closable:true
            }
            ,{
                $extend:component
                ,title:"fdasf sdfdasf dasfdasf dasfdsf dsafdsfda fdfd fdsaf dsaf dadfas fdf glish 22"
                ,inner:"Hello World3 22!"
                ,closable:true

            }
            ,{
                $extend:component
                ,title:"fdasf sdfdasf dasfdasf dasfdsf dsafdsfda fdfd fdsaf dsaf dadfas fdf glish 33"
                ,inner:"Hello World3 33!"
                ,closable:true
            }
            ,{
                $extend:component
                ,title:"fdasf sdfdasf dasfdasf dasfdsf dsafdsfda fdfd fdsaf dsaf dadfas fdf glish 44"
                ,inner:"Hello World3 44!"
                ,closable:true
            }
        ]
        */
    };
});