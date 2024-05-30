//對象的一個綁定mixin
/*
 this.set("user.Name","Andrie");
 this.set("user.Books.1",{Name:"js實戰",Price:45.2});
 this.get("user.Books.2.Price");
 this.add("user.Books",{Name:"鋒利的jQuery",Price:88});
 this.remove("user.Books",0);
*/
sjs//.using("Core5.Html.Tag")
.define(function(UNDEF){
    //如果绑定表达式中有@，则判断为自定义表达式（回写的问题以后再考虑啦）
    var expVarReg = /@[a-zA-Z_][\w.]*/g;      //以_或字母开头，后面是单词，不可以$
   
    function getBindFnFromExp(bindExp){
//        if(bindExp.indexOf(".length")>0)
//            //debugger
        var fields = {};
        var str = bindExp.replace(expVarReg,function(rep){
            var field = rep.substr(1);
            fields[field] = 1;
            return field.indexOf("this.")>=0?"this.get('" + field.substr(5) + "')":"this.parent.get('" + field + "')";
        });

        //if still have @, maybe is @;color @ title @.cls-aaa, no return
        var fn;
        try{
            fn = new Function("try{return " + (str.indexOf("@") >=0 ?str.replace(".@","['@") + "']":str) + "}catch(ex){return ex;}");
        }
        catch(ex){
            console.error("bind error",str,ex);
            fn = new Function("return '';");
        }
        //if(str.indexOf("@")>=0)
            //fn = new Function("//debugger;\nreturn " + (str.indexOf("@") >=0 ?str.replace(".@","['@") + "']":str));

        var retFields = [];
        for(var p in fields){
            retFields.push(p);
        }
        return {
            fn:fn
            ,fields:retFields.join(",")
        };
    }

    return {
        init:function(){
            ////debugger
            //上面有set方法，會判斷bind back
            this.$base();
            this._bindsBack = {};       //绑定回写(key:bind}
            this._renderJqBinds = [];   //有jq的绑定，要在render后才进行
            this._scanToSetBinds();
        }
        
        ,_initData:function(key,defaultValue){
            var bindSet = this["@" + key];
            if(!(bindSet && typeof(bindSet)=="string")){      //如果某個屬性有綁定，那就不要初始化它，等上層一起來初始化
                this.$base(key,defaultValue);
            }
        }
        
        //初始化扫描整个对象，检测出绑定属性后，加入绑定设置
        ,_scanToSetBinds:function(){
            //TODO：像一些數據屬性有依賴的，其初始化的先后順序有關，而綁定則因為foreach原因，沒辦法定序
            //TODO：數據值必須嚴格使用，如error，要么用null，不能有的地方是null，有的地方是空字符串，有的是false，這樣很容易造成回寫
            for(var p in this){
                var pValue = this[p];
                var pType = typeof(pValue);
                //"@value":"data.start_time,data.end_time"
                if(p.substr(0,1)=="@" && (pType=="string" || pType=="object" && pValue.push)){
                    var pName = p.substr(1);
                    this[pName] = UNDEF;         //清空資料，等待綁定
                    this._scanBind(pName,pValue);
                }
            }
        }
        
        ,_render:function(){
            this.$base();
            this._applyRenderJqBinds();
        }     
        
        ,_setInner:function(inner){
            this.$base(inner);
            this.isRender() && this._applyRenderJqBinds();
        }  
        
        //可重复调用，因为在html简单的refresh之后
        ,_applyRenderJqBinds:function(){
            for(var i=0;i<this._renderJqBinds.length;i++){
                this._applyBind(this._renderJqBinds[i]);
            }
            //this._renderJqBinds = null;
        } 
        
        //key可以是数据，如visible,disabled,value,text,items,data,rows,row,selected....
        //还可以是样式，属性，如;red, title,-s-markable
        //bind:@@data.start_time,data.end_time|.timeShow
        //"@value":"data.UNIT_QTY"
        //"@data":"data.0"
        //"@data":"data.PACKAGES"
        
        //this一般綁定UI數據，當然也綁定業務數據。但是綁定this的key是style,class或attribute（因為一定是view）,不會有本身的數據再去綁定另一個值了
        //關于view的綁定，可參考flex。那是以后版本升級可能要考慮的
        //"@ title":"this.error"
        //"@-s-error=>.s-text-ipt":"this.error"
        //_scanBind会产出下面这个对象
        //也可以是对象
        /*
        {
            //參數有順序,依綁定字符串來
            args:["data.start_time","data.end_time","this.total"]
            ,bindKind:"set"             //setClass,css,attr,inner,set
            ,jq:".textLbl"
            ,key:"value"
            ,target:目標對象
            ,source:源對象
        }
        ,valueNoBindBack:true       //表示value不回写(默认全部回写)
        
        ,"bind;html=>.timeShowFrom":function(field1,field2){
            return field1+"~"+field2 + "(" + context1.加班日期 + ")";
        }

        ,bindValueTo:function(value){
        
        }
        
        */
        
        ,bind:function(key,fieldStr){
            //this["@" + key] = fieldStr;       //無意義，因為remove,add時會變化
            this.unBind(key);      //先除除key
            
            this._scanBind(key,fieldStr);
        }

        ,getBindFnFromExpAsTool:getBindFnFromExp
        
        ,_scanBind:function(key,fieldStr){
            //用=>,是因為有的直接用tagName作為選擇器時,就需要分隔符了
            var keys_jq = key.split("=>");
            //if(keys_jq.length==2)
            //    //debugger
            var key = keys_jq[0];
            var bindKind = key=="inner"?"inner":({";":"css"," ":"attr","-":"setClass"}[key.substr(0,1)] || "set");
            var jq = null;
            if(bindKind != "set"){
                key = key=="inner"?key:key.substr(1);        //綁定css等view的真正key，而set本身就是key了
                jq = keys_jq[1] || "";
            }
            var bindParentFields = [];      //绑定到了哪些父栏位
            var bindSelfFields = [];        //绑定到了本身哪些栏位

            //支援表达式写法
            if(fieldStr.indexOf("@")>=0 || this[key + "_FORCE_PARSE_BIND_EXP"]){
                var parseRet = getBindFnFromExp(fieldStr);

                var keyName = {css:";",attr:" ",setClass:"-",set:"",inner:""}[bindKind]
                    + (bindKind=="set" || bindKind=="inner"?
                        key.substr(0,1).toUpperCase() + key.substr(1)
                        :key + (jq?"=>" + jq:""));
                this["bind" + keyName + "From"] = parseRet.fn;
                fieldStr = parseRet.fields;
            }


            var fields = typeof(fieldStr)=="object" && fieldStr.push?fieldStr:fieldStr.split(",");   
            for(var i=0;i<fields.length;i++){
                var path = fields[i].split(".");
                //默认绑定到parent
                var target = "parent";
                if(path[0] == "this" || path[0] == "parent"){
                    target = path.shift();
                }
                var bindFields = bindParentFields;
                if(target == "this"){
                    bindFields = bindSelfFields;
                }
                bindFields.push(path.join("."));
            }
//            if(this.id=="detailGrid")
//                //debugger;
//            //绑定到parent
            if(bindParentFields.length){
                var bindParent = {key:key,bindKind:bindKind,args:fields,target:this};
                //回寫parent
                if(bindKind == "set" && fields.length==1){      //不是判斷bindParentFields，而是要全部判斷，只有總共才有一個field才符合回寫
                    //bindParent.backTarget = "parent";
                    bindParent.backField = fields[0];
                    this._bindsBack[key] = bindParent;
                }
                else{
                    this._bindsBack[key] = bindParent;          //用于準確移除綁定，而不是回寫
                }
                if(jq!==null){      //空也寫進去
                    bindParent.jq = jq;
                }
                //if(!this.parent)
                //    //debugger;
                this.parent && this.parent._addBind && this.parent._addBind(bindParentFields,bindParent);
                //parent和this只要应用绑定一次
                //綁定到的數據，無論是items(UI數據)，還是send_item(業務數據)都會初始化一次，那里就一定會綁定
                //TODO:初始化時不要，浪費，因為最后會從最上面開始設定數據下來
                //但是像那些中間臨時加一項，減一項的，如果不應用綁定，就會有問題
                
                //如果上面有render了，則應用綁定，否則parent一定會初始數據
                if(this.parent && (this.parent.isRender() && !bindSelfFields.length)){// || this[key + "_INIT_BIND_DIRECTLY"])){
                //2013.4.12:初始化綁定時，不再立即應用綁定。因為有些被綁定者本身還在綁定。
                //因此所有被綁定的屬性，都應該手動初始化，激發綁定計算
                //if(!bindSelfFields.length){
                    //old.log("bindTarget _applyBind調用(掃描初始綁定)",this.id,key,fieldStr);
                    this._applyBind(bindParent,{kind:"bind",type:"scan_applyBind",fromKey:"",source:this.parent,bind:bindParent,bindField:"",fromArgs:Array.prototype.slice.call(arguments)});
                }
            }
            
            //绑定到this
            if(bindSelfFields.length){
                //綁定到自身的key是view屬性（如day）或者view指令(css,setClass,attr,inner)
                var bindSelf = {key:key,bindKind:bindKind,args:fields,target:this};
                if(jq!==null){
                    bindSelf.jq = jq;
                }
                this._addBind(bindSelfFields,bindSelf);
                //old.log("bindTarget _applyBind調用(掃描初始綁定for自身)",this.id,key,fieldStr);                                                            
                this.parent && this.parent.isRender() && this._applyBind(bindSelf,{kind:"bind",type:"scan_applyBind",fromKey:"",source:this,bind:bindSelf,bindField:"",fromArgs:Array.prototype.slice.call(arguments)});
                //this._applyBind(bindSelf);
            }
        }
               
        //应用绑定
        ,_applyBind:function(bind,bindFrom){
            //if(bind.key == "error" && bind.args.length==2 && bind.args[0] == "item.error.SIZE_REPEAT"){
            //    //debugger
            //}
//            if(bind.jq == ".clear-btn"){
//            //debugger
//            }
            var bindValue = this._getBindValue(bind);
            if(bind.bindKind == "set"){
                //這個復雜，要判斷是調用_set還是set
                this.set(bind.key,bindValue,bindFrom);       //哪個元素設定下來的
            }
            else if(bind.bindKind=="inner"){
                if(!bind.jq){
                    this.setInner(bindValue);
                }
                else if(this.isRender()){
                    //this.jq(bind.jq).html(tag.html(bindValue));
                    this.jq(bind.jq).html(bindValue);       //请自己用tag.html调用
                    //console.log("apply bind",bindValue);
                }
                else{   //有jq，又沒有render時，直接加到render中，到時再一起_applyBind
                    //TODO:判斷一下，是否有重複加入的
                    this._renderJqBinds.push(bind);
                }
            }
            else if(!bind.jq){
                var fn = this[bind.bindKind];
                fn.call(this,bind.key,bindValue);
            }
            //有jq，有render
            else if(this.isRender()){
                if(bind.bindKind=="attr"){
                    this.jq(bind.jq).attr(bind.key,bindValue);
                }
                else if(bind.bindKind=="css"){
                    this.jq(bind.jq).css(bind.key,bindValue);
                }
                else if(bind.bindKind=="setClass"){
                    this.jq(bind.jq).setClass(bind.key,bindValue);
                }
            }
            else{
                this._renderJqBinds.push(bind);
            }
        }
        
        ,_getBindValue:function(bind){
            //有没有函数,有函数，构建参数，调用函数，返回值
            //没有函数，找field，多个用,相加，返回值
            //注意，要处理..的fields
            //parent和this区别
            var args = bind.args;
            var argValues = [];
            for(var i=0;i<args.length;i++){
                var arg = args[i];
                var path = arg.split(".");
                var targetStr = "parent";
                if(path[0] == "this" || path[0] == "parent"){
                    targetStr = path.shift();
                }
                var target = targetStr == "this"?this:this.parent;
                var argValue = "";
                if(target && target.get){
                    argValue = target.get(path.join("."));
                }
                argValues.push(argValue);
            }
            //if(bind.jq)
            //    //debugger
            //有没有函数
            var key = bind.key;
            var keyName = {css:";",attr:" ",setClass:"-",set:"",inner:""}[bind.bindKind]
                + (bind.bindKind=="set" || bind.bindKind=="inner"?
                    key.substr(0,1).toUpperCase() + key.substr(1)
                    :key + (bind.jq?"=>" + bind.jq:""));
            var fn = this["bind" + keyName + "From"];
            if(typeof(fn)=="function"){
                return fn.apply(this,argValues);
            }
            else if(argValues.length>1){
                return argValues.join(",");
            }
            else{
                return argValues[0];
            }
        }
        
        ,_removeBindBack:function(bind){
            var binds = this._bindsBack;
            for(var p in binds){
                if(binds[p] == bind){
                    //old.log("刪除綁寫回寫",bind.key,bind.backField);
                    delete binds[p];
                    break;
                }
            }
        }
        
        ,_dispose:function(noRemoveJq){
            this.$base(noRemoveJq);
            var bindsBack = this._bindsBack;
            if(bindsBack){
                for(var p in bindsBack){
                    this.parent && this.parent._removeBind && this.parent._removeBind(bindsBack[p],true);     //不要再remove back回來
                }
            }
        }    

        //解除綁定(指綁定parent的)
        ,unBind:function(field){
            var bindsBack = this._bindsBack;
            if(bindsBack && bindsBack[field] && this.parent){               
                this.parent._removeBind(bindsBack[field]);
            }
        }
        
        //如果一個屬性綁定到多個源，那么任何一個有更新時都會應用綁定
        //如果這多個源有關係，如datepicker的yymm和day屬性，day變化時，yymm一定變化，yymm也可以單獨變化。因此在_setDay時，再this.yymm = day.substr(0,6)，再應用綁定
        //而如果某個屬性綁定到多源時，這多個源總是同時更新，則只綁定一個即可，另一個在bindFrom函數中直接取
        
        //开始绑定
        ,_afterSet:function(key,value,change,oldValue,notifyFrom){
            this.$base(key,value,change,oldValue,notifyFrom);
            //2023/10/5 for Low-code bind use to calculate expression, and want to write this value back(must prevent dead loop self)
            if(this[key + "_SET_BACK_TO_PARENT"] && this.parent){ 
                ////debugger
                var oThis = this;
                //因為@pItem:pItem以及@item綁定的items.x，順序不一定，如果pItem先綁定並回寫了值到item，但後面items.x綁定時又會設定期初defaultAddItem的值，這時候回寫值就被清空。
                //回寫值有限使用，一般用於後續UI操作（等待用戶使用），以及回填service(service可不使用，在service中重新計算）
                //避免期初綁定時晚於@item:items.1而造成回寫到item的數據被清空。這種回寫值有限使用即可，一般用於之後的用戶查詢
                window.setTimeout(function(){
                    oThis.parent.set(oThis[key + "_SET_BACK_TO_PARENT"],value);
                });
                //console.log("parent.item",this.parent.item);
            }

            if(notifyFrom && notifyFrom.kind=="bind" && notifyFrom.source == this.parent){
                return;
            }
            // if(!change){
            //     return;
            // }
            //if(value==800)
            //    //debugger
            var bindsBack = this._bindsBack;
            if(bindsBack){
                //回寫
                var bind = bindsBack[key];
                //直接設定的就是綁定的key
                //設定:value
                //綁定:value:purd_item.PURD_QTY
                if(bind && bind.backField){           
                    if(!this[key + "_NO_BIND_BACK"]){      //如果需要回写(默认回写)
                        //TODO:數據類型是否要轉換,text輸入回來的永遠是字符串，是否轉換成number，否則可能在后續的js比較和計算中出錯?
                        //TODO:加在checkInput中完成，那里要修改，檢驗有效性和轉換輸入值為正確的值要同時進行，建議返回一個object，表示是否錯誤，錯誤訊息和真正的返回值
                        //new.log("【target回寫->source.set】",this.fieldNo || this.id , "的", key ,"改變，所以" ,this.parent.id,"的",bind.backField,"也要回寫更新." ,"原始來源:",notifyFrom?notifyFrom.id:"");                    
                        ////debugger
                        var keyName = {css:";",attr:" ",setClass:"-",set:"",inner:""}[bind.bindKind]
                            + (bind.bindKind=="set" || bind.bindKind=="inner"?
                                key.substr(0,1).toUpperCase() + key.substr(1)
                                :key + (bind.jq?"=>" + bind.jq:""));
                        var fn = this["bind" + keyName + "Back"];
                        if(typeof(fn)=="function"){
                            value = fn.call(this,value);
                        }
                        this.parent.set(bind.backField,value,{kind:"bind",back:true,type:"set_set",fromKey:key,source:this,bind:bind,backField:bind.backField,fromArgs:Array.prototype.slice.call(arguments)});        //this表示我set給你了，你等下_set不要再給我綁定更新回來，否則死循環
                    }
                }
                else{     
                    //設定:items.0.purd_item.purd_qty
                    //綁定:items:send_item.purd_items
                    //通知上層（送貨單項次）:send_item.purd_items.0.purd_item.purd_qty有變化
                    
                    //設定:purd_item.PURD_QTY
                    //回寫的綁定的key一定是一個欄位的，即只有UI數據或context可以綁定，是component的第一層，其它數據不能綁定。因此綁定回寫也只能
                    //綁定:purd_item:items.0
                    //如在送貨單項次中set("send_item.purd_items.0.send_qty,800)
                    //那么要看send_item綁定到哪個屬性上，往上回寫
                    var setKeys = key.split(".");
                    bind = bindsBack[setKeys[0]];
                    if(bind && bind.backField){       //部份匹配，就通知
                        setKeys[0] = bind.backField;
                        //new.log("【target通知->source._set】",this.fieldNo || this.id , "的", key ,"改變，所以" ,this.parent.id,"的",setKeys.join("."),"也要通知有變化(",bind.key,"綁定",bind.backField,")","原始來源:",notifyFrom?notifyFrom.id:"");                    
                        this.parent._afterSet(setKeys.join("."),value,change,oldValue
                            ,{kind:"bind"
                                ,back:true
                                ,type:"set_afterSet"
                                ,fromKey:key
                                ,source:this
                                ,bind:bind
                                ,backField:setKeys.join(".")
                                ,fromArgs:Array.prototype.slice.call(arguments)
                            });
                    }
                }
            }
        }
        
        ,_afterAdd:function(key,items,index,item,notifyFrom){
            this.$base(key,items,index,item,notifyFrom);
            //綁定我的請更新
            //notifyFrom是從parent的BindSource過來的,不要再往回通知回寫了(會有死循環)
            if(notifyFrom && notifyFrom.kind=="bind" && notifyFrom.source == this.parent){
                return;
            }
            var bindsBack = this._bindsBack;
            if(bindsBack){
                //回寫
                var bind = bindsBack[key];
                //直接設定的就是綁定的key
                //設定:value
                //綁定:value:purd_item.PURD_QTY
                if(bind && bind.backField){           
                    //new.log("【target通知->source._add】",this.fieldNo || this.id , "的", key ,"增加項次" + index + ",所以" ,this.parent.id,"的",bind.backField,"也要通知add變化." ,"原始來源:",notifyFrom?notifyFrom.id:"");                    
                    this.parent._afterAdd(bind.backField,items,index,item,{kind:"bind"
                                ,back:true
                                ,type:"add_afterAdd"
                                ,fromKey:key
                                ,source:this
                                ,bind:bind
                                ,backField:bind.backField
                                ,fromArgs:Array.prototype.slice.call(arguments)
                            });        //this表示我set給你了，你等下_set不要再給我綁定更新回來，否則死循環
                }
                else{     
                    var setKeys = key.split(".");
                    bind = bindsBack[setKeys[0]];
                    if(bind && bind.backField){       //部份匹配，就通知
                        setKeys[0] = bind.backField;
                        //new.log("【target通知->source._add】",this.fieldNo || this.id , "的", key ,"增加項次" + index + ",所以" ,this.parent.id,"的",setKeys.join("."),"也要通知add變化(",bind.key,"綁定",bind.backField,")","原始來源:",notifyFrom?notifyFrom.id:"");                    
                        this.parent._afterAdd(setKeys.join("."),items,index,item,{kind:"bind"
                                ,back:true
                                ,type:"add_afterAdd"
                                ,fromKey:key
                                ,source:this
                                ,bind:bind
                                ,backField:setKeys.join(".")
                                ,fromArgs:Array.prototype.slice.call(arguments)
                            });  
                    }
                }
            }
        }   
        
        ,_afterRemove:function(key,items,index,oldItem,notifyFrom){
            this.$base(key,items,index,oldItem,notifyFrom);
            if(notifyFrom && notifyFrom.kind=="bind" && notifyFrom.source == this.parent){
                return;
            }

            //回寫
            var bindsBack = this._bindsBack;
            if(bindsBack){
                var bind = bindsBack[key];
                //直接設定的就是綁定的key
                //設定:value
                //綁定:value:purd_item.PURD_QTY
                if(bind && bind.backField){           
                    //new.log("【target通知->source._remove】",this.fieldNo || this.id , "的", key ,"刪除項次" + index + ",所以" ,this.parent.id,"的",bind.backField,"也要通知remove變化." ,"原始來源:",notifyFrom?notifyFrom.id:"");                    
                    this.parent._afterRemove(bind.backField,items,index,oldItem,{kind:"bind"
                                ,back:true
                                ,type:"remove_afterRemove"
                                ,fromKey:key
                                ,source:this
                                ,bind:bind
                                ,backField:bind.backField
                                ,fromArgs:Array.prototype.slice.call(arguments)
                            });        //this表示我set給你了，你等下_set不要再給我綁定更新回來，否則死循環
                }
                else{     
                    var setKeys = key.split(".");
                    bind = bindsBack[setKeys[0]];
                    if(bind && bind.backField){       //部份匹配，就通知
                        setKeys[0] = bind.backField;
                        //new.log("【target通知->source._remove】",this.fieldNo || this.id , "的", key ,"刪除項次" + index + ",所以" ,this.parent.id,"的",setKeys.join("."),"也要通知remove變化(",bind.key,"綁定",bind.backField,")","原始來源:",notifyFrom?notifyFrom.id:"");                    
                        this.parent._afterRemove(setKeys.join("."),items,index,oldItem,{kind:"bind"
                                ,back:true
                                ,type:"remove_afterRemove"
                                ,fromKey:key
                                ,source:this
                                ,bind:bind
                                ,backField:setKeys.join(".")
                                ,fromArgs:Array.prototype.slice.call(arguments)
                            });  
                    }
                }
            }
        }             

    };
});