/*
彈出window控件
*/
sjs.using("Core5.YT.Model")
.using("Core5.Widget.Ability.DragResize")
.using("jQuery")

.define(function(model,dragResize,$){
    return {
        $extend:model
        ,$mixin:[dragResize.right,dragResize.bottom,dragResize.rb
            ,dragResize.left,dragResize.top
            ,dragResize.lb,dragResize.lt//,dragResize.rt  //有close在，導致不容易close
        ]//,transformShowHide
        ,minWidth:300
        ,minHeight:200
        ,noClickHide:true       //不要click hide
        ,mask:false      //默認顯示遮罩層(其實因為沒有最小化）

        ,init:function(){
            this.$base();
            this._initData("windowMax");
        }

        //,topShowWhenActive:true

        ,_getTitleToolsInner:function(){
            var ret = this.$base();
            ret.unshift(this._getTitleToolItem(this.windowMax?"resize":"max","max"));
            ret.unshift(this._getTitleToolItem("min","close"));
            return ret;
        }

        ,onMax:function(){
            this.set("windowMax",!this.windowMax);
            this.maxWindowEvt && this.report("maxWindow",this.windowMax);
        }

        ,_getTitleText:function(toolsInner){
            var ret = this.$base(toolsInner);
            ret[" s-dblclick"] = "max";
            return ret;
        }

        ,_adjustScrollPosWhenShow:false

        //,dragResizeDisabled:true

        ,maxTop:0
        ,maxHideTitleAndHead:false
        ,_setWindowMax:function(max,change){
            if(change){
                var scollLeft =  $("html").scrollLeft() || $("body").scrollLeft();
                var scrollTop = $("html").scrollTop() || $("body").scrollTop();
                if(max){
                    //var winHeight=$(window).height();
                    //var winWidth=$(window).width();
                    this._beforeMaxWidth = this.width;
                    this._beforeMaxHeight = this.height;
                    //第一次max時，left和top以前沒有加上scrollLeft和scrollTop的值
                    this._beforeMaxLeft = this.left - (this._beforeMaxLeft?scollLeft:0);
                    this._beforeMaxTop= this.top - (this._beforeMaxTop?scrollTop:0);
                    //this.setWidth(winWidth);
                    //this.setHeight(winHeight);
                    this.setWidth("auto");
                    this.setHeight("auto");
                    this.css("bottom",-scollLeft);            //这里会有问题,要查看所有的滚动条宽度
                    this.css("right",-scrollTop);
                    this.setLeft(scollLeft);
                    this.setTop(scrollTop + this.maxTop);

                    this.disableDragMove();
                    !this.dragResizeDisabled && this.disableDragResize();

                    this.maxHideTitleAndHead && this.hideTitleAndHead();
                }
                else{       //normal
                    //第一次還原回來怎辦?
                    this.css("bottom","auto");
                    this.css("right","auo");

                    this._beforeMaxWidth && this.setWidth(this._beforeMaxWidth);
                    this._beforeMaxHeight && this.setHeight(this._beforeMaxHeight);
                    this._beforeMaxLeft && this.setLeft(this._beforeMaxLeft + scollLeft);
                    this._beforeMaxTop && this.setTop(this._beforeMaxTop + scrollTop);

                    this.enableDragMove();
                    this.dragResizeDisabled ? this.disableDragResize():this.enableDragResize();

                    this.maxHideTitleAndHead && this.showTitleAndHead();
                }
                if(this.isRender()){
                    var oldCls = "yt-panel-title-" + (!max?"resize":"max");
                    var newCls = "yt-panel-title-" + (!max?"max":"resize");
                    this.jq("." + oldCls).addClass(newCls).removeClass(oldCls).removeClass(oldCls + "-over").attr("s-overClass",newCls + "-over");
                }
            }
            ////debugger
            //this._adjustScrollPos();
        }

        ,hideTitleAndHead:function(){
            if(this.isRender()){
                this.jq("> .yt-panel-body > .yt-model-header").hide();
                this.jq("> .yt-panel-body > .yt-model-logo").hide();
                this.jq("> .yt-panel-title").hide();
                this.jq("> .yt-panel-body").css("top","0");
                this.header && this.inner[2].css('top','0');
            }
        }

        ,showTitleAndHead:function(){
            if(this.isRender()){
                this.jq("> .yt-panel-body > .yt-model-header").show();
                this.jq("> .yt-panel-body > .yt-model-logo").show();
                this.jq("> .yt-panel-title").show();
                this.jq("> .yt-panel-body").css("top","24px");
                this.header && this.inner[2].css('top','37px');
            }
        }

    };
});