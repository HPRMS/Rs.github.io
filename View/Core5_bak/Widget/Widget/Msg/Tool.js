sjs.using("Core5.Cls")
.using("Core5.Widget.Msg.Confirm")
.define(function(cls,confirmWin){
    var confirmObj;         //全局變量，可以不銷毀
    return {
        confirm:function(msg,context,okFn,fnArgs){
            if(!confirmObj){
                confirmObj = cls.create(confirmWin);
                //confirmObj.renderTo("body",true);
            }
            confirmObj.context = context;
            confirmObj.contextFn = okFn;
            confirmObj.contextArgs = fnArgs;
            confirmObj.showMsg(msg);
        }
    };
});