﻿var sjsObj = qs.JS2.indexOf("@")==0?sjs.call(qs.JS2.substr(1)):sjs.using(qs.JS2);
sjsObj.using("Core5.Widget.Loading");
    if(qs.$MIXIN){
        var mixins = qs.$MIXIN.split(",");
        for(var i=0;i<mixins.length;i++){
            var mixin = mixins[i];
            mixin.indexOf("@")==0?sjsObj.call(mixin.substr(1)):sjsObj.using(mixin);
        }
    }
    sjsObj.define(function(typeCfg,loading){
    //这个loadJs Core5.pending会让上面的qs.js2中的css全部加载完毕才会执行，所以保证js执行时的css已到位
    //console.log(qs.JS2 + " load finish!");
    return function(){
        //console.log('run ' + qs.JS2 + ' when loaded ok');
        var innerSjsObj = sjs.using("jQuery").using("Core5.Cls").using("Core5.Util.EventManager");
        if(typeof(typeCfg.$extend)=="string"){
            innerSjsObj.using(typeCfg.$extend);
        }
        innerSjsObj.run(function($,cls,eventManager,typeCls){
            typeCfg.$extend = typeCls || typeCfg.$extend;
            //console.log('run ' + qs.JS2);
            /*
            alert("分辨率高\nscreen.height:" + screen.height + "\n" +
                "可视区域高度\nscreen.availHeight:" + screen.availHeight + "\n" +            
                "浏览器当前窗口可视区域高度\n$(window).height():" + $(window).height() + "\n" +            
                "浏览器当前窗口文档的高度\n$(document).height():" + $(document).height() + "\n" +
                "浏览器当前窗口文档的高度\n$(document.documentElement).height():" + $(document.documentElement).height() + "\n" +
                "浏览器当前窗口文档body的高度\n$(document.body).height():" + $(document.body).height() + "\n" +
                "浏览器当前窗口文档body的总高度 包括border padding margin\n$(document.body).outerHeight(true)" + $(document.body).outerHeight(true) + "\n" +
                "分辨率寬\nscreen.width:" + screen.width + "\n" +                
                "可视区域宽度\nscreen.availWidth:" + screen.availWidth + "\n" +            
                "浏览器当前窗口可视区域宽度\n$(window).width():" + $(window).width() + "\n" +
                "浏览器当前窗口文档对象宽度\n$(document).width():" + $(document).width() + "\n" +
                "浏览器当前窗口文档的高度\n$(document.documentElement).width():" + $(document.documentElement).width() + "\n" +
                "浏览器当前窗口文档body的寬度$(document.body).width():" + $(document.body).width() + "\n" +
                "浏览器当前窗口文档body的总宽度 包括border padding margin\n$(document.body).outerWidth(true)：" + $(document.body).outerWidth(true));
            */
            //UI.aspx中有please wait,program init...，最短195px，所以用$(document.body).width()算出來的距離不對
            //不知道為什么chrome body初始化時夠長，可以render后，body的寬度卻減少了
            //因為初始化時夠長，然後將innerHTML替換掉后，卻沒這么長了
            //豎滾動條的出現，會讓width失真
            
            //2012.10.28注:必须全部加载完才可以run，因为css的不完全加载，会让js resize时，抓不准width等
            //还有一种方法，就是将width,height,margin,border,padding全部封装在程式内部，而不能用css去设定，这样可以不用
            //js去运行时找width，就能计算出各个width出来。以后可以考虑，因为反正是排版
            //$(function(){
            //alert(document.compatMode);
            //BackCompat : quirks mode
            //BackCompat : content-width = width - (margin-left  +  margin-right  +  padding-left  +  padding-right  +  border-left-width  +  border-right-width)
            //CSS1Compat : strict mode **current(all browser,contains IE6,7,8,9,ff,chrome,opera)**
            //CSS1Compat : real-width =  margin-left  +  border-left-width  +  padding-left  + width  +  padding-right  +  border-right-width  +  margin-right
                
            var serviceConfig = qs.JS2.split("$")[1];
            var ui = cls.create(typeCfg,{
                initStart:true
                ,CORE5_ARGS:qs.CORE5_ARGS
                ,MENU_JS:qs.MENU_JS?qs.MENU_JS+ (serviceConfig?"$"+serviceConfig:"") : qs.JS2
                ,onMsg:function(reorter,msg,kind){
                    msg && eventManager.publish(this,"displayLoadingMsg",kind || "err",msg);      //ok,err,warn,common
                }
                ,$mixin:Array.prototype.slice.call(arguments,2)
            });
            if(ui.renderTo){
                ui.renderTo("body");
            }
            else if(ui.getHtml){
                $("body").html(ui.getHtml());
            }

            document.title = "PCC -" + (ui.docTitle || ui.title || qs.JS2);
            loading.renderTo("body",true);
            //window.setTimeout(function(){
                //var screenWidth = $(document.body).width();// screen.width - ($("body").outerWidth(true) - $("body").width()) - 30;// - 30;// 
                ////debugger;
                //ui.resize("width",screenWidth);
            //},2000);
            //});
           // $(document.body).width(orgWidth);
           // //debugger;
        });
    }
});