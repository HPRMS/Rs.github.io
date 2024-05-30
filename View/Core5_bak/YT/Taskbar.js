sjs.loadCss("Core5.Shp.Icon")
.loadCss("Core5.YT.Taskbar")
.using("Core5.Component")
.using("Core5.ListContainer")
.using("Core5.Html.Tag")
.using("jQuery")
.using("Core5.Widget.Mixin.Pop")
.using("Core5.DomEvent.onmouseclass")
.using("Core5.DomEvent.onmouseover")
.define(function(component,listContainer,tag,$,pop){
    var itemType = {
        $extend:component
        ,"-yt-taskbar-item":true
        ," s-overClass":"yt-taskbar-item-over"
        ," s-downClass":"yt-taskbar-item-down"
        ," s-click":"clickItem"

        ,innerHtml:function(html){
            if(this.closable){
                var inner = this.inner;     //不能用舊的inner，因為會有問題
                var renderInner = [this.inner,{
                    "-yt-taskbar-close":true
                    ," s-overClass":"yt-taskbar-close-over"
                    ,"-icon":true
                    ,"-icon-blue":true
                    ,"-icon-remove":true
                    ," s-click":"tabClose"
                    ," title":"close this"
                }];
                html.push(tag.itemHtml(renderInner,this));
            }
            else{
                this.$base(html);
            }
        }
    };

    return {
        $extend:listContainer
        ,$mixin:[pop]
        ,itemType:itemType
        ,regUIObj:true
        ,"-yt-taskbar":true

        ,innerHtml:function(html){
            var inner = this.inner;     //不能用舊的inner，因為會有問題
            inner.push("<div class='yt-taskbar-clearfix'></div>");
            var renderInner = [
                {
                    "-yt-taskbar-con":true
                    ,inner:inner
                }
                ,{
                    "-yt-taskbar-down":true
                    ," s-overClass":"yt-taskbar-down-over"
                    ," s-click":"tabShowAll"
                    ," title":"show all tabs' title"
                    ,inner:{
                        "-icon":true
                        ,"-icon-chevron-down":true
                    }
                    ,";display":"none"
                }
            ];
            html.push(tag.itemHtml(renderInner,this));
        }

        ,_dyRenderItem:function(innerItem,index){
            this.renderItem(innerItem
                ,this.INSERT_BEFORE
                ,".yt-taskbar-clearfix"
            );
        }

        ,_getItemCfg:function(item,itemIndex){
            return item;
        }

        ,_initItem:function(item,itemIndex){
            var ret = this.$base(item,itemIndex);
            var itemID = ret.taskItemIndex;
            ret.attr("s-taskitem-index", itemID);
            this._taskItems = this._taskItems || {};
            this._taskItems[itemID] = ret;
            return ret;
        }

        ,activeItem:function(itemID){
            this._taskItems[itemID] && this._taskItems[itemID].addClass && this._taskItems[itemID].addClass("yt-taskbar-current");
            this.pop && this.pop.jq("[s-taskitem-index='" + itemID + "']").addClass("yt-taskbar-current");
            this._doResize();
        }

        ,deActiveItem:function(itemID){
            //可能已被dispose掉
            this._taskItems[itemID] && this._taskItems[itemID].removeClass && this._taskItems[itemID].removeClass("yt-taskbar-current");
            this.pop && this.pop.jq("[s-taskitem-index='" + itemID + "']").removeClass("yt-taskbar-current");
        }

        ,addItem:function(item){
            this._itemSeed = this._itemSeed || 0;
            item.taskItemIndex = typeof(item.taskItemIndex)!="undefined" && item.taskItemIndex !== null? item.taskItemIndex : this._itemSeed++;
            this.add("items",item);
            this._doResize();
            return item.taskItemIndex;
        }

        ,removeItem:function(itemID){
            var index = -1;
            for(var i=0;i<this.items.length;i++){
                if(this.items[i].taskItemIndex == itemID){
                    index = i;
                    break;
                }
            }
            if(index >=0){
                this.removeAt("items",index);
                this._doResize();
                this.pop && this.pop.jq("[s-taskitem-index='" + itemID + "']").remove();
            }
            return index >=0;
        }

        //可能从pop过来
        ,onTabClose:function(srcOrpop,src){
            if(this.closeEvt){
                var tabIndex = (srcOrpop._objId?src:srcOrpop).parent().attr("s-taskitem-index");
                this.report(this.closeEvt,tabIndex);
            }
            srcOrpop._objId && this.pop.show();     //如果是從pop來的,則再顯示一下,放在最上面
        }

        ,onClickItem:function(srcOrpop,src){
            if(this.clickEvt){
                var tabIndex = (srcOrpop._objId?src:srcOrpop).attr("s-taskitem-index");
                this.report(this.clickEvt,tabIndex);
            }
            srcOrpop._objId && this.pop.show();     //如果是從pop來的,則再顯示一下,放在最上面
        }

        ,popType:{
            $extend:component
            ,"-yt-taskbar-menu":true
        }

        ,_getPosJq:function(){
            return this.jq(".yt-taskbar-down");
        }

        ,_getPop:function(popType){
            var ret = this.$base(popType);
            ret.jq().html(this.jq(".yt-taskbar-con").html());
            ret.jq("[s-taskitem-index]").show();
            return ret;
        }

        ,onTabShowAll:function(){
            this.showPop();
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
                return this._doResize();
            }
        }

        ,_doResize:function(){
            this._checkTabMustShow();
            this._checkDownIconShow();

        }

        ,_render:function(){
            this.$base();  
            var oThis = this; 
            window.setTimeout(function(){
                oThis._doResize();
            },500);     //样式还没载入完成
        }

        ,_checkDownIconShow:function(){
            var conJq = this.jq(".yt-taskbar-con");
            //var lastChild = conJq.find("div:last-child").prev();     //最后一个是clear-fix
            var lastChild = conJq.find(".yt-taskbar-clearfix").prev();     //最后一个是clear-fix
            if(lastChild.length){
                var thisTop =  conJq.offset().top;
                var lastTop = lastChild.offset().top - thisTop;
                var conHeight = conJq.height();//.outerHeight(true);       //height();更多一些,保险
                if(lastTop >= conHeight || this.jq(".yt-taskbar-con > div:hidden").size()){
                    this.jq(".yt-taskbar-down").show();
                    return;
                }
            }
            this.jq(".yt-taskbar-down").hide();
        }

        //小心onresize会有问题
        //将当前显示的tab show出来
        ,_checkTabMustShow:function(){
            this.jq(".yt-taskbar-item").show();
            var head = this.jq(".yt-taskbar-con .yt-taskbar-current");
            if(!head.size()){
                return;
            }

            //如何快速判断当前是否隐藏?
            var totalShowWidth = this.jq(".yt-taskbar-con").width();
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


        ,xitems:[
            {
                inner:"Hello1"
            }
            ,{
                inner:"Hello2"
                //,"-yt-taskbar-current":true
            }
            ,{
                inner:"补料单签核"
            }
            ,{
                inner:"中英文混合(Test)"
            }
            ,{
                inner:"中英文混合(Test)2"
            }
            ,{
                inner:"中英文混合(Test)3"
            }
            ,{
                inner:"中英文混合(Test)4"
            }
            ,{
                inner:"中英文混合(Test)5"
            }
            ,{
                inner:"中英文混合(Test)6"
            }
            ,{
                inner:"中英文混合(Test)7"
            }
            ,{
                inner:"中英文混合(Test)8"
            }
        ]
    };
});