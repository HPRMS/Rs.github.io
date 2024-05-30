//dom事件處理
sjs.using("jQuery")
.using("Core5.DomEvent.UIManager")
.define(function($, uiManager) {
    function getHasAttr(src, attr) {
        if(typeof(src)=="string"){
            src = $(src);
        }
        var attrValue = src.attr(attr);
        if (attrValue) {        //要找的attribute中的值,必須是不為空的字符串
            return src;
        }
        var parents = src.parents("[" + attr.toLowerCase() + "]");
        if (parents.length) {
            var des = $(parents[0]);
            return des;
        }
        return null;
    }

    function getSjsObj(src,attr) {
        var attr = attr || "s-objId";
        var des = getHasAttr(src,attr);
        if(des){
            return uiManager.get(des.attr(attr));
        }
        return null;
    }
    
    return {
        getHasAttr:getHasAttr
        ,getSjsObj:getSjsObj
    };
});