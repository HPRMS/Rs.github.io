﻿sjs.loadCss("Core5.YT.Panel")
.using("Core5.Container")
.using("Core5.Html.Tag")
.using("Core5.DomEvent.onmouseclass")

.define(function(container,tag){

    return {
    
        $extend:container
        
        ,regUIObj:true
        
        ,title:"標題..."
        
        ,"-yt-panel":true

        //,collapsed:true

        ,innerHtml:function(html){
            var inner = this.inner;     //不能用舊的inner，因為會有問題

            var toolsInner = this._getTitleToolsInner();
            var renderInner = [
                {
                    "-yt-panel-title":true
                    ,inner:[
                        {
                            "-yt-panel-title-icon":true
                        }
                        ,this._getTitleText(toolsInner)
                        ,{
                            "-yt-panel-title-tools":true
                            ,inner:toolsInner
                            ,";width":toolsInner.length * 20 + "px"
                        }
                    ]
                }
                ,{
                    "-yt-panel-body":true
                    ,";display":this.collapsed?"none":"block"
                    ,inner:inner
                }
            ];

            if(this.bodyAbsolute){
                renderInner[1][";position"] = "absolute";
                renderInner[1][";top"] = "25px";
                renderInner[1][";left"] = "0";
                renderInner[1][";right"] = "0";
                renderInner[1][";bottom"] = "0";
                renderInner[1][";overflow"] = "auto";
            }
            html.push(tag.itemHtml(renderInner,this));

        }

        ,_getTitleText:function(toolsInner){
            return {
                "-yt-panel-title-text":true
                ,inner:this.title
                ,";right":toolsInner.length * 20 + 5 + "px"
            };
        }

        ,_getTitleToolsInner:function(){
            var ret = [];
            if(typeof(this.collapsed) != "undefined"){
                var cls = this.collapsed?"up":"down";
                ret.push(this._getTitleToolItem(cls,"upDown"));
            }
            return ret;
        }

        ,_getTitleToolItem:function(cls,evt){
            var ret = {
                "-yt-panel-btn":true
                ," class":"yt-panel-title-" + cls
                ," s-overClass":"yt-panel-title-" + cls + "-over"
            };
            if(evt){
                ret[" s-click"] = evt;
            }
            return ret;
        }
        
        ,onUpDown:function(){
            this.set("collapsed",!this.collapsed);
        }

        ,_setCollapsed:function(exp){
            if(this.isRender()){
                var oldCls = "yt-panel-title-" + (!exp?"up":"down");
                var newCls = "yt-panel-title-" + (!exp?"down":"up");
                this.jq("." + oldCls).addClass(newCls).removeClass(oldCls).removeClass(oldCls + "-over").attr("s-overClass",newCls + "-over");
                this.jq(".yt-panel-body").css("display",!exp?"block":"none");
            }
        }
        
        ,_setTitle:function(title){
            if(this.isRender()){
                this.jq(".yt-panel-title-text").html(title);
            }
        }

        ,setTitle:function(title){
            this.set("title",title);
            return this;
        }

    };
});