//如果bsom,qip日記等之前的程式如果改動后有問題，可能是jQuery升級到1.8.3的原因，可以先改回來，compile后再改回去即可
//sjs.loadJs("./ref/jQuery-1.4.2.min.js")
//sjs.loadJs("./ref/jquery-1.8.3.min.js")
window._no_jquery_module = true;        //指示jQuery不要用module.exports導出
sjs.loadJs(!window.qs || !qs.JS || qs.JS.toLowerCase().indexOf(".run")>0 || qs.JS=="Bonding.NewTest"|| qs.JS=="QIPDayReport.Default" || qs.JS.indexOf("UI.")>=0 || qs.JS.indexOf("Core2.")>=0?"./Ref/jquery-1.11.1.min.js":"./Ref/jQuery-1.4.2.min.js")
.loadJs("./Ref/jquery.mousewheel.js")
.define(function(serviceConfig){
    if(!window._org_jquery && jQuery)
        window._org_jquery = jQuery;//.noConflict(true);
    return window._org_jquery;
});