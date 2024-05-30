sjs.using("jQuery")
.using("Core5.DomEvent.GetHelper")
.define(function($, getHelper) {
    function onhashchange(e){
        var src = $("[s-hashchange]");
        $.each(src,function(index,item){
            var sjsObj = getHelper.getSjsObj($(item));
            sjsObj && sjsObj.onhashchange && sjsObj.onhashchange(location.hash);
        });
    }

//    if ("onhashchange" in window) {
//        alert("该浏览器支持hashchange事件!");
//    }
    window.addEventListener("hashchange", onhashchange, false);
});