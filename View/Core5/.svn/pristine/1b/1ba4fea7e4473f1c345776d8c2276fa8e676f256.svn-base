/*日期時間類的工具函數*/
sjs.define(function(){
    
    return strFn = {
        trimRe : /^\s+|\s+$/g
        
        ,trim:function(text){
            text = text + "";
            if(typeof(text.trim) == "function")
                return text.trim();
            else
                return text.replace(strFn.trimRe,"");
        }
        

        
/*
var ret = format("abc {{0} no format({{4} no format also),and index format is: {2} and {{4}{3},name format{2} is {name}(default 0) and {name:1}"
,{name:"kevin"}
,{name:"james"}
,"aaa"
,123
,456);
*/
        
        ,format:function(format){
            var args = Array.prototype.slice.call(arguments,1);
            return (" " + format).replace(/([^{])\{(\d+|\w+(:\d+)?)\}/g, function(match,prefix,exp){
                var text = "";
                if(isNaN(exp)){
                     var index = exp.indexOf(":");
                     var field = index==-1?exp:exp.substr(0,index);
                     var arg = args[0];
                     if(index>0)
                         arg = args[parseInt(exp.substr(index+1))];
                     text = arg[field];
                     if(typeof(text)=="function")
                        text = text.call(arg);
                }
                else
                    text = args[exp];
                return prefix + text ;
               // return "*[*" + i + "," + j + "," + k + "*]*";
            }).replace(/{{/g,"{").substr(1);        
        }
                
    }
   
});