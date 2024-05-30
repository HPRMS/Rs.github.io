sjs.using("jQuery")
.using("Core5.DomEvent.GetHelper")
.using("Core5.DomEvent.PopManager")        //暫時先這樣,讓那邊的那個mousedown事件先執行(以后考慮統一一個入口的事件處理函數,可以選擇插入)
.define(function($, getHelper,popManager) {
    function onEvt(evt,src,e){
        var sjsObj = getHelper.getSjsObj(src);
        //Cannot read property 'onclick' of null 
        //這里報錯，可能是button或其它元素不能在uiManager中找到
        sjsObj && sjsObj._onDomEvent && sjsObj._onDomEvent(evt,src,e);
        //if return false,2 s-rightclick in parent-child dom will only raise the child event
        if(sjsObj){
            e.preventDefault();
        }
        //return !sjsObj;
    }

    function onclick(e){
        return onEvt("rightclick", $(this),e);
    }
    $(document).delegate("[s-rightclick]","contextmenu",onclick)
    ;
});    
