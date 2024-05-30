sjs.using("jQuery")
.using("Core5.DomEvent.GetHelper")
.using("Core5.DomEvent.PopManager")        //暫時先這樣,讓那邊的那個mousedown事件先執行(以后考慮統一一個入口的事件處理函數,可以選擇插入)
.define(function($, getHelper,popManager) {
    function onEvt(evt,src,e){
        var sjsObj = getHelper.getSjsObj(src);
        //Cannot read property 'onclick' of null 
        //這里報錯，可能是button或其它元素不能在uiManager中找到
        sjs.__currentPressAlt = e.altKey;        //for alt debug
        sjsObj && sjsObj._onDomEvent && sjsObj._onDomEvent(evt,src,e);
        delete sjs.__currentPressAlt;
    }

    function onclick(e){
        onEvt("click", $(this),e);
    }

    function ondblclick(e){
        onEvt("dblclick", $(this),e);
    }

    function onmousedown(e){
        popManager.whenBodyClick(e);            //先關掉,只有這樣,因為沒辦法保證delegate一定比bind(document)先執行
        e._hasPopDown = true;
        //console.log("onclick2 mousedown");    //只有重複執行一下,應該沒關係
        onEvt("mousedown", $(this),e);
    }

   function onmouseup(e){
        onEvt("mouseup", $(this),e);
    }

    $(document).delegate("[s-click]","click",onclick)
        .delegate("[s-dblclick]","dblclick",ondblclick)
        .delegate("[s-mousedown]","mousedown",onmousedown)
        .delegate("[s-mouseup]","mouseup",onmouseup);
      //  .delegate("[s-click]","mousedown", mouseDown)
    ;
});    
