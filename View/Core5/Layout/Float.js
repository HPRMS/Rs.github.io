sjs.define(function(){
    return {
        _initInnerItem:function(itemCfg,itemIndex){
            //如果這個放在最后面，則所有的返回對象都可以被addClass到
            //但是如果這個沒有用$plugin放在最后，而被放到中間，而子類的_initInnerItem又不是通過this.$base返回對象
            //則有可能用不到
            var ret= this.$base(itemCfg,itemIndex);
            ret.css && ret.css("float",itemCfg.floatRight?"right":"left");
            return ret;
        }
              
        ,innerHtml:function(html){
            this.$base(html);
            html.push("<div style='clear:both'></div>");
        }
        
    }
});