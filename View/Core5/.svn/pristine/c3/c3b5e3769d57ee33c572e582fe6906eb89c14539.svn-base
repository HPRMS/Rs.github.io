sjs.loadCss("Core5.YT.Model")
.using("Core5.YT.Panel")
.using("Core5.Container")
.using("Core5.Widget.Ability.Pop")
.using("Core5.Widget.Ability.DragMove")
.using("Core5.Widget.Ability.Resizable")
.using("Core5.Widget.Ability.TransformShowHide")
.using("Core5.Layout.AutoFit")
.using("Core5.Layout.Float")
.using("jQuery")
.using("Core5.Html.Base")
.using("Core5.YT.Button")
.define(function(panel,container,pop,dragMove,resizable,transformShowHide,autoFitLayout,floatLayout,$,htmlBase,button){
    return {
        $extend:panel
        ,$mixin:[pop,dragMove,resizable,autoFitLayout]//,transformShowHide
        //,displayMode:"visible"
        //,visible:false      //默認不顯示(show的時候再顯示)

        ,dragDom:">.yt-panel-title>.yt-panel-title-text,>.yt-panel-body>.yt-model-header"//,>.yt-panel-body>.yt-model-footer"//,.s-toolbar"   //會阻擋button的動作，因為
        //,orgLeft:20
        //,orgTop:20
        ,noClickHide:false//true       //不要click hide
        ,mask:true              //默認顯示遮罩層(其實因為沒有最小化）
        ,maskOpacity:0.8
        ,autoAdjustPos:false

        ,"-yt-model":true

        ,width:400
        ,height:250
               
        ,top:-1
        ,left:-1

        ,init:function(){
            this.$base();
            this._adjustCenterMiddle();
            //model應該始終在上面
            //this.topShowWhenActive && this.attr("s-mousedown","activateWin");
        }

        //,topShowWhenActive:false
        ," s-mousedown":"activateWin"

        ,onActivateWin:function(){
            this.setOnTopLevel();
            this.activeEvt && this.report(this.activeEvt);      
        }


        //不要自己調用renderTo方法，直接調用show方法

        //,renderJq:"body"
        ,show:function(){
            if(!this.isRender()){
                //居中顯示(第一次)
                this.renderTo(this.renderJq || "body",true);
            }

            this._adjustScrollPosWhenShow && this._adjustScrollPos();
            return this.$base();
        }

        ,_adjustScrollPosWhenShow:true

        ,_adjustCenterMiddle:function(){
            if(this.top < 0){       //小于0表示不居中，而是使用固定值
                var popHeight=this.height;//popJq.outerHeight();
                var winHeight=$(window).height();
                this.setTop(winHeight > popHeight ? (winHeight - popHeight) /2:0);
            }

            if(this.left < 0){
                var popWidth=this.width;//popJq.outerWidth();
                var winWidth=$(window).width();
                this.setLeft(winWidth > popWidth ? (winWidth - popWidth) /2:0);
            }
        }

        ,_adjustScrollPos:function(){
            var scollLeft =  $("html").scrollLeft() || $("body").scrollLeft();
            var scrollTop = $("html").scrollTop() || $("body").scrollTop();              //TODO:firefox是html的scrollLeft,scrollWidth,而chrome则是body的scrollLeft,scrollWidth;这里没有考虑浏览器兼容性
            this.setLeft(this.left + scollLeft - (this._scrollLeft || 0));
            this.setTop(this.top + scrollTop - (this._scrollTop || 0) );
            this._scrollLeft = scollLeft;
            this._scrollTop = scrollTop;
        }

        ,_setHeader:function(header){
            if(this.isRender()){
                this.jq(".yt-model-header").html(header);
            }
            else if(this.inner[0] && this.inner[0]["-yt-model-header"]){
                this.inner[0].inner = header;
            }
        }

        ,setHeader:function(header){
            this.set("header",header);
            return this;
        }

        ,_initInner:function(inner){
            var orgInner = inner[0];
            if(this.header){
                inner.unshift({
                    "-yt-model-logo":true
                });
                inner.unshift({
                    $extend:htmlBase
                    ,"-yt-model-header":true
                    ,inner:this.header
                    ,";line-height":"36px"
                    ,height:36

                });
                //orgInner.top = 37;
            }
            //else{
                //orgInner.top = 0;
            //}
            if(this.footer){
                inner.push(this._modelFoolter());
                //orgInner.bottom = 35 + (this.showBottomBorder?1:0);
            }
            //else{
                //orgInner.bottom = (this.showBottomBorder?1:0);
            //}
            this.$base(inner);
        }

        ,_initInnerItem:function(itemCfg,itemIndex){
            var ret= this.$base(itemCfg,itemIndex);
            if(this.header && itemIndex==2){
                ret.css("top","37px");
            }
            if(this.footer && itemIndex==(this.header?2:0)){
                ret.css("bottom",35 + (this.showBottomBorder?1:0) + "px");
            }
            return ret;
        }

        ,_modelFoolter:function(){
            var footer = this.footer;
            for(var i=0;i<footer.length;i++){
                footer[i].$extend = footer[i].$extend || button;
            }
            return {
                $extend:container
                ,"-yt-model-footer":true
                ,$mixin:[floatLayout]
                ,id:"footerCon"
                ,ignoreParentLayoutOnly:this.footerIgnoreLayoutOnly
                ,bottom:0
                ,left:0
                ,height:35
                ,right:0
                ,overflow:"hidden"

                ,";border-top":this.showBottomBorder?"1px solid #C6C6C6":"0"
                ,inner:footer
            };
        }

        ,showBottomBorder:true

        //,closeDestroy:false       //關閉按鈕是否殺掉窗口

        ,_getTitleToolsInner:function(){
            var ret = [];
            ret.push(this._getTitleToolItem("close",this.closeDestroy?"destroy":"close"));
            return ret;
        }


        ,onDestroy:function(){
            this.destroyEvt && this.report(this.destroyEvt);
            this.dispose && this.dispose();
        }

        ,onClose:function(){
            this.hide();
            this.hideEvt && this.report(this.hideEvt);
        }

    };
});