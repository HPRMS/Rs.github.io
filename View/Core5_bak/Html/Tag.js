/*
分離html字符串產生和UI對象
*/
sjs.using("Core5.Cls")
.define(function(cls){
    function getTagHtml(cfg,context,noJoin){
        var tag = cfg.tag || "div";
        var html= [];
        html.push("<");
        html.push(tag);
        var styleHtml = [];
        var classes = [];
        //可直接定義這些(優先權低)
        if(cfg.attribute){
            html.push(" " + (typeof(cfg.attribute)=="function"?cfg.attribute():cfg.attribute));
        }
        var styleStr = typeof(cfg[" style"])=="function"?cfg[" style"]():"";          //可直接定義 style
        var classStr = typeof(cfg[" class"])=="function"?cfg[" class"]():"";        //可直接定義 class
        for(var p in cfg) {
            var pType = typeof(cfg[p]);
            if(pType != "function" && pType != "object" && pType != "undefined" && cfg[p] !== null){
                if(p.indexOf(";")==0) {
                    styleHtml.push(p + ":" + cfg[p]);        //自己保證里面不要有双引號
                }
                else if(p.indexOf("-")==0 && cfg[p]){
                    classes.push(p.substr(1));       
                }
                else if(p.indexOf(" ")==0) {
                    if(p==" style"){
                        styleStr = cfg[p];
                    }
                    else if(p == " class"){
                        classStr = cfg[p];
                    }
                    else{
                        html.push(p + '="' + ("" + cfg[p]).replace(/\"/g,"&quot;")  + '"');      
                    }
                }
            }
        }
        if(styleStr || styleHtml.length>0){
            html.push(" style='" + styleStr + (styleStr && styleHtml.length?";":"") + (styleHtml.length?styleHtml.join("").substr(1):"") + "'");
        }
        if(classStr || classes.length>0){
            html.push(" class='" + classStr + (classStr && classes.length?" ":"") + classes.join(" ") + "'");
        }
        html.push(">");
        if(!cfg.tagNoInner){     //沒有閉合標籤。如input,img等
            if(typeof(cfg.innerHtml)=="function"){      //完全自定義innerHtml，如table，由rows循環組成html
                cfg.innerHtml(html);
            }
            else{
                var inner = cfg.inner;
                html.push(getItemHtml(cfg.inner,context || cfg));
            }
            html.push("</" + tag + ">");   
        }
        return noJoin?html:html.join("");
    }
           
    function getItemHtml(item,context){
        if(item===null || typeof(item)=="undefined"){
            return "";
        }
        var itemType = typeof(item);
        if(itemType=="object"){
            if(item.push){
                var html = [];
                for(var i=0;i<item.length;i++){
                    html.push(getItemHtml(item[i],context));
                }
                return html.join("");
            }
            else if(item.$extend){
                var obj = cls.create(item.$extend,item.$mixin,item)
                var ret = obj.getHtml(context);
                //將component當作普通對象用,不推薦這種作法,但是防止內存洩露,所以還是dispose掉
                obj.dispose && obj.dispose();
                return ret;
            }
            else if(item.getHtml){                   //普通component對象或者帶有getHtml函數的靜態對象
                return typeof(item.getHtml)=="function"?item.getHtml(context):item.getHtml;   //context以參數傳入(方便靜態函數對象獲取上一級，或者component獲取container)
            }
            else{
                return getTagHtml(item,context);
            }
        }
        else if(itemType == "function"){
            return getItemHtml(item.call(context),context);
        }
        else{                                   //字符串，數字，bool等...
            return item;
        }
    }
    
    return {
        html:getTagHtml
        ,itemHtml:getItemHtml
    };
});