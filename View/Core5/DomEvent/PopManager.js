﻿sjs.using("jQuery")
.using("Core5.DomEvent.GetHelper")
.define(function($,getHelper){
    //IE6的select無法隱藏(新的UI不用select標籤來做下拉列表)

    var popManager = {
        _pops : []
        //,_noBodyPops:{}         //非頂層的pop，以parent的id為準
        //,_isBind:false          //動態bind，因為服務器端要用
        ,add:function(sjsObj){
            this._pops.push(sjsObj);
            //if(!this._isBind){
            //    $(document).bind("mousedown",whenBodyClick);
            //    this._isBind = true;
            //}
        }
        
        ,find:function(sjsObj){
            for(var i=0;i<this._pops.length;i++){
                if(this._pops[i] == sjsObj){
                    return i;
                }
            }
            return -1;
        }
        
        ,remove:function(sjsObj){
            var pos = this.find(sjsObj);
            if(pos!=-1){
                this._pops.splice(pos,1);
            }
        }        
        
        ,hideByLevel:function(popUpLevel){
            var startHideIndex = popUpLevel + 1;
            if(startHideIndex>=0){
                for(var i=this._pops.length-1;i>=startHideIndex;i--){       //因为会移除，所以length一直在变
                    if(this._pops[i].noClickHide){
                        continue;
                    }
                    this._pops[i].hide();                                   //hide中會調用remove方法
                }
            }
        }
        
        //,length:function(){
        //    return this._pops.length;
        //}


        ,getTopZIndex:function(){
            var lastPop = this._pops.length;           //從1開始
            return (lastPop > 0 ? this._pops[lastPop-1].zIndex : 100);          //100只放在這里
        }

    }
    /*
    function whenBodyClick(e) {
        var popUpLevel =  -1;
        var sjsObj = getHelper.getSjsObj($(e.target));
        while(sjsObj){
            var pos = popManager.find(sjsObj);
            if(pos==-1){
                //不通過container來找，因為UI object有時候是自定義輸出，如tree的body的parent雖然是node，但其上層可能是上層的treeBody或tree，所以container找不科學
                sjsObj = sjsObj.container;      //找上一層的sjs是pop
            }
            else{
                popUpLevel = pos;
                break;
            }
        }
        popManager.hideByLevel(popUpLevel);
    }

    */    
    function whenBodyClick(e) {
    //console.log("popmanger2 mousedown");
        if(e._hasPopDown){
            return;
        }
        var popUpLevel =  -1;
        var popSjsObj = null;
        var maskObjId;
        target = getHelper.getHasAttr($(e.target),"pop-obj");
        if(target){
            popSjsObj = getHelper.getSjsObj(target);
        }
        else{
            maskObjId = $(e.target).attr("s-mask-target-objId");
            if(maskObjId){
                popSjsObj = getHelper.getSjsObj($(e.target),"s-mask-target-objId");
            }
        }
        //target的上層不是body是要一直往上送事件
        if(popSjsObj){
            var pos = popManager.find(popSjsObj);
            popUpLevel = pos;
            if(maskObjId){
                popUpLevel--;       //if click mask, hide this level
            }
        }
        popManager.hideByLevel(popUpLevel);
    }

      //  //debugger
    //搶先進行
    $(document).bind("mousedown",whenBodyClick);            //搶不到最開始進行
    popManager.whenBodyClick = whenBodyClick;
    return popManager;
});