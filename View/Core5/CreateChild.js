/*
AComponent的Mixin
由子對象，引出parent，引出report方法，引出response方法
任何一個對象可以report,也可以response
*/
sjs.using("Core5.Cls")
.define(function(cls){
    return {    

        init:function(){
            if(this.parent && !this.parent.createChild){        //非sjs component的parent，只回應事件和用id捉取數據
                if(this.id){
                    this.parent[this.id] = this;
                }
                if(!this.responser){
                    this.setResponser(this.parent);
                }
            }
            this.$base();
        }

        //提供給子類或本身調用的方法---------------------------------------------------------------------------
        //如果沒有$type，將會報錯，因此子控件要注意完善itemCfg的$type信息
        ,createChild:function(extend,arg1,arg2,argN,lastIschildCfg){
            var args = Array.prototype.slice.call(arguments);
            var childCfg = args[args.length-1];
            if(this.layoutOnly && !childCfg.ignoreParentLayoutOnly){
                return this.parent.createChild.apply(this.parent,args);
            }
            var children = this._children = this._children || [];
            //是否需要統一把this["id.XXX"]='BBB'，加入到itemCfg.XXX='BBB'，子類好override，暫不需要
            //var args = Array.prototype.slice.call(arguments);
            args.splice(1,0,{parent:this,responser:this});
            this.response(this, "CHILDCREATING",args);
            var ret = cls.create.apply(null,args);      //是否需要統一把this["id.XXX"]='BBB'，加入到itemCfg.XXX='BBB'，子類好override，暫不需要
            this.response(this, "CHILDCREATED",ret,args);
            //ret.parent = this;                  //因為是在外面訪問parent,所以不用_開頭    
            ret.setResponser && ret.setResponser(this);      
            if(ret.id){                         //可以無名氏，如不需要引用，但是可向上報告事件
                if(this[ret.id]){
                    throw new Error("id already exists:" + ret.id);
                }
                this[ret.id] = ret;
            }
            children.push(ret);
            return ret;
        }

        ,setResponser:function(responser){
            this.responser = responser;
            return this;
        }
        
        //有向上報告方法,并不是因為有children而才有
        //而是因為parent屬性在這個mixin中出現,所以才加一個這樣的方法,表示任何AComponent對象,如果有parent,就可以report事件
        //只能在自己或子類內部調用,工具方法,最好也不用_開頭,免得寫起麻煩
        ,report:function(evt){
            if(this.responser){
                var args = Array.prototype.slice.call(arguments,0);                 
                args.unshift(this);
                if(this.responser.response){
                    this.responser.response.apply(this.responser,args);
                }
                else{
                    var evtName = evt.substr(0,1).toUpperCase() + evt.substr(1);
                    var fnName = "on" + evtName
                    var fn = this.responser[fnName];
                    if(typeof(fn)=="function"){
                        fn.apply(this.responser,args);
                    }
                }
            }
            return this;
        }
        
        //override方法---------------------------------------------------------------------------------------   
        ,isDisabled:function(){
            var ret = this.$base();
            if(!ret){
                var cur = this.responser;
                return cur && typeof(cur.isDisabled)=="function"?cur.isDisabled():false;
            }
            return true;
        }

        //view(响应model事件)-----------------------------------------------------
        ,_setDisabled:function(disabled,change){
            this.$base(disabled,change);
            if(!change){
                return;
            }
            //凡是有改變則通知children disabled有改變了
            this.onDisabledChange(disabled);
        }
        
        //通知children 父disabled有變化了
        ,onDisabledChange:function(disabled){
            var children = this._children;
            if(children){
                for(var i=0;i<children.length;i++){
                    //只是通知我有變化，但是child是否真正有變化，還要通過isDisabled再計算一次
                    //已經影響到了
                    //var childDisabledChange = children[i].isDisabled() !== disabled;
                    //childDisabledChange && 
                    children[i] && children[i].onDisabledChange && children[i].onDisabledChange(disabled);
                }
            }
        }

        
        ,bubbleResponse:true
        
        ,response:function(reporter,evt,arg1,arg2,argN){
            //disabled時依舊有效
            var evtActiveOnDisabled = this[evt + "ActiveDisabled"] === true;
            if(evtActiveOnDisabled || !this.isDisabled()){
                var args = Array.prototype.slice.call(arguments,2);
                var evtName = evt.substr(0,1).toUpperCase() + evt.substr(1);
                var fnName = "on" + evtName
                var fn = this[fnName];
                var ret = true;
                if(typeof(fn)=="function"){
                    //if return true, bubble event
                    ret = fn.apply(this,[reporter].concat(args));
                }
                //不冒泡，parent為邏輯關係，必須唯一，誰的事件交給誰處理要明確
                //至于view，則可通過items()函數實例化后同再塞
                if(ret === true && this.responser){            //冒泡響應report事件
                    var args1 = [reporter,evt].concat(args);
                    if(this.responser.response){
                        this.responser.response.apply(this.responser,args1);
                    }
                    else{
                        var fn = this.responser[fnName];
                        if(typeof(fn)=="function"){
                            fn.apply(this.responser,[reporter].concat(args));
                        }
                    }
                }
            }
        }
        
        ,_dispose:function(noRemoveJq){
            if(this.parent){
                var children = this.parent._children;       
                //有parent,則parent一定有_children
                if(children){
                    var len = children.length;
                    for(var i=0;i<len;i++){
                        if(children[i] == this){
                            children.splice(i,1);
                            break;
                        }
                    }
                }
                if(this.id){
                    delete this.parent[this.id];
                }
                //delete this.parent;           //container也沒有delete，所以不用，不相信這樣會內存洩露
            }
            //var thisChildren = [].concat(this._children);
            if(this._children){
                var len = this._children.length;
                for(var i=0;i<len;i++){
                    var child = this._children[i];
                    if(child && child.dispose){
                        child.parent = null; //不讓下面的disposeChild還往上面找parent的_children刪除，提高性能，節省時間
                        this._disposeChild(child);
                    }
                    //沒必要，因為自己都要移掉了，存在于childrend里的東西，移不移掉都無所謂，提高性能
                    //else if(child.id){
                    //    delete this[child.id];
                    //}
                }
            }
            //移除jq或一些其它的自定義移除
            this.$base(noRemoveJq);     //節約child在dispose時，要往上層找id
            //delete this._children;
        }
        
        ,_disposeChild:function(child){
            //不是每一個child都要dispose,如簡單的tag對象就不需要
            child.dispose();      //誰創建，誰負責銷毀   
        }
    };
});