//對象的一個綁定mixin
/*
 this.set("user.Name","Andrie");
 this.set("user.Books.1",{Name:"js實戰",Price:45.2});
 this.get("user.Books.2.Price");
 this.add("user.Books",{Name:"鋒利的jQuery",Price:88});
 this.remove("user.Books",0);
*/
//TODO:可綁定items.@index(),items.length
sjs.using("Core5.Html.Tag")
.define(function(tag){
    return {
        init:function(){
            this._binds = {};
            //old.log("bindSource init初始化",this.id);
            this.$base();
        }
        
        /*
        _binds:{
            "items":[
                {
                    //參數有順序,依綁定字符串來
                    args:["data.start_time","data.end_time","this.total"]
                    ,bindKind:"set"             //setClass,css,attr,inner,set
                    ,jq:".textLbl"
                    ,key:"value"
                    ,target:目標對象
                }
            ]
            ,"items.2.purd_no":[
                {
                    args:"purd_no"
                    ,bindKind:"set"
                    ,key:"value"
                    ,target:input對象
                }
                ,{
                    args:"purd_no"
                    ,bindKind:"set"
                    ,key:"text"
                    ,target:label對象
                }
            ]
        }
        */
        
        ,_addBind:function(fields,bind){
            //2013.4.20 Andrie 如果綁定層數太多，會讓性能有所變緩，因此在這里增加一個判斷
            //如果被綁定的東東仍然在綁定，就往上層送
            //考慮到還有動態變更綁定的可能，因此暫時停止
            //停掉console.log看是否是這個引起的慢
            //移除后發現好像是不慢
            /*
            if(fields.length==1){
                var bindsBack = this._bindsBack;
                var thisField = fields[0].split(".")[0];
                if(bindsBack && bindsBack[thisField]){      //如果被綁定的本身也在綁定，那就往上送
                    
                }
            }
            */
            var bindsSet = this._binds;
            for(var i=0;i<fields.length;i++){
                var field = fields[i];
                var fieldBinds = bindsSet[field];
                if(!fieldBinds){
                    fieldBinds = bindsSet[field] = [];
                }
                if(!bind.id){           //加一個唯一ID，以免在一次set中，應用綁定兩次，浪費性能
                    this._bindID = this._bindID || 0;
                    bind.id = "BIND_" + (++this._bindID);
                }
                //old.log("bindSource加入bind",this.id , bind.id,field,bind.args.join(","));
                fieldBinds.push(bind);
            }
        }
        
        //解除绑定
        ,_removeBind:function(bind,noRemoveBindBack){
            var bindsSet = this._binds;
            for(var bindField in bindsSet){
                var binds = bindsSet[bindField];
                for(var i=binds.length-1;i>=0;i--){
                    if(binds[i]==bind){
                        //old.log("移除綁定:",bindField,bind.key);
                        !noRemoveBindBack && bind.target._removeBindBack(bind);
                        binds.splice(i,1);
                    }
                }
                if(binds.length==0){
                    //TODO:檢查for each過程中可以直接刪除嗎?
                    delete bindsSet[bindField];     
                }
            }  
        }
     
        ,_dispose:function(noRemoveJq){
            this.$base(noRemoveJq);
            //解除綁定
            var bindsSet = this._binds;
            for(var bindField in bindsSet){
                var binds = bindsSet[bindField];
                for(var i=binds.length-1;i>=0;i--){
                    var bind = binds[i];
                    bind.target._removeBindBack && bind.target._removeBindBack(bind);
                }
            }  
            this._binds = null;
        }
        
        
        //如果一個屬性綁定到多個源，那么任何一個有更新時都會應用綁定
        //如果這多個源有關係，如datepicker的yymm和day屬性，day變化時，yymm一定變化，yymm也可以單獨變化。因此在_setDay時，再this.yymm = day.substr(0,6)，再應用綁定
        //而如果某個屬性綁定到多源時，這多個源總是同時更新，則只綁定一個即可，另一個在bindFrom函數中直接取
        
        //开始绑定
        ,_afterSet:function(key,value,change,oldValue,notifyFrom){
            this.$base(key,value,change,oldValue,notifyFrom);
            //綁定我的請更新
            //if(this.package)
            //    //debugger;
            //if(key == "item.SIZE_LIST")
            //    //debugger
            // if(!change)
            //     return;
            var binds = this._binds;
            var applyedBinds = {};
            var noticeBinds = {};
            for(var bindField in binds){
                var fieldBinds = binds[bindField];

                //bindField以key開頭，或者key和bindField相等
                //設定:send_item.purd_items.0
                //綁定:send_item.purd_items.0.send_qty
                //應用綁定
                if(key==bindField || (bindField + ".") .indexOf(key + ".")==0){     //完全匹配，直接應用綁定
                    for(var i=0;i<fieldBinds.length;i++){
                        var target = fieldBinds[i].target;
                        var bind = fieldBinds[i];                        
                        //其它綁定類型因為沒有回寫，所以可以綁定
                        //即同一個對象，不能業務數據綁定業務數據
                        //只能view綁定業務數據或UI數據
                        if(!applyedBinds[bind.id] && (!notifyFrom || (notifyFrom.kind=="bind" && target != notifyFrom.source) || bind.bindKind!="set")){
                            applyedBinds[bind.id] = 1;       
                            ///if(target.id == "text_PACKAGES-1-UNIT_QTY")
                            //    //debugger;
                            //new.log("【source更新->target.set】",this.fieldNo || this.id , "的", key ,"改變，所以" ,target.fieldNo || target.id,"的",bind.key,"也要綁定更新.","原始來源:",notifyFrom?notifyFrom.id:"");                    
                            //if(!target._applyBind)
                            //    //debugger;
                            target._applyBind(bind,{kind:"bind",type:"set_applyBind",fromKey:key,source:this,bind:bind,bindField:bindField,fromArgs:Array.prototype.slice.call(arguments)});
                        }
                    }
                }
                
                //key以bindField開頭的
                //設定:send_item.purd_items.0.send_qty
                //綁定:send_item.purd_items.0
                //用_set通知即可
                //加點防止send_item.purd_items.11與send_item.purd_items.1匹配
                else if((key + ".") .indexOf(bindField + ".")==0){      //部份匹配只用_set通知      
                    for(var i=0;i<fieldBinds.length;i++){
                        //bindField是哪個?
                        var target = fieldBinds[i].target;
                        if(!notifyFrom || notifyFrom.kind=="bind" && target != notifyFrom.source){
                            var bind = fieldBinds[i];
                            //如當前我是送貨單項次form，有一個send_item:{purd_items:[...]}數據，而底下有一個grid，用它的items綁定了send_item.purd_items
                            //現在_set("send_item.purd_items.0.send_qty",800)
                            //那么grid則要_set(items.0.send_qty",800)，即用items代替send_item.purd_items
                            if(!noticeBinds[bind.id]){
                                noticeBinds[bind.id] = 1;
                                var targetKey = bind.key + "." + key.substr(bindField.length + 1);
                                //是直接調用set方法，還是用_afterSet呢?
                                if(bind.bindKind=="set" && !target[bind.key + "_BIND_DIRECTLY"]){
                                    //new.log("【source通知->target._set】",this.fieldNo || this.id , "的", key ,"改變，所以" ,target.fieldNo || target.id,"的",targetKey ,"也要通知有變化(",bind.key + "綁定了" + bindField + ")","原始來源:",notifyFrom?notifyFrom.id:"");                    
                                    target._afterSet(targetKey,value,change,oldValue,{kind:"bind",type:"set_afterSet",fromKey:key,source:this,bind:bind,bindField:bindField,fromArgs:Array.prototype.slice.call(arguments)});       //change為true，因為對于當前對象來說，數據確實有改變
                                }
                                else{
                                    //new.log("【source通知->target.set】",this.fieldNo || this.id , "的", key ,"改變，所以" ,target.fieldNo || target.id,"的",targetKey ,"也要通知有變化(直接應用綁定)(",bind.key + "綁定了" + bindField + ")","原始來源:",notifyFrom?notifyFrom.id:"");                    
                                    target._applyBind(bind,{kind:"bind",type:"set_applyBind",fromKey:key,source:this,bind:bind,bindField:bindField,fromArgs:Array.prototype.slice.call(arguments)});
                                }
                            }
                        }
                    }
                }       
                
                //bindField以key開頭的，通知          
            }
        }
        
        //暫時只刪除，不通知
        //TODO:像背景色是根據index來，雙索引用一個背景色，這樣好看。如果是中間刪除了，索引有調，但背景色沒調
        //暫時沒影響，一是有刪除的grid不放這樣的背景色，另一個就是就算放了，沒改后面調整過索引的背景色，也沒關係。
        ,_adjustBindsIndex:function(key,index,addOrRemove){
            var tmpOldKeys = [];        //要調整的key值(其中含有索引)
            var tmpNewKeyBinds = {};    //新的key值和真正的binds數組
            var tmpRemoveBinds = [];    //這些綁定要解除
            var binds = this._binds;
            for(var bindField in binds){
                var fieldBinds = binds[bindField];
                //bindField以key開頭，并且key和bindField不相等
                
                //新增:send_item.purd_items 1
                //綁定:send_item                        -> 通知_add
                //綁定:send_item.purd_items             -> 通知_add(items綁定)
                //綁定:send_item.purd_items.0.send_qty  == 不變
                //綁定:send_item.purd_items.1           => send_item.purd_items.2(實際items已經插入了項，所以現在他們綁定的要+1)     
                //綁定:send_item.purd_items.1.send_qty  => send_item.purd_items.2.send_qty
                //綁定:send_item.purd_items.2           => send_item.purd_items.3   
                //綁定:send_item.purd_items.2.send_qty  => send_item.purd_items.3.send_qty


                //綁定items:send_item.purd_items     
                //移除items 1
                //綁定purd_item:send_item.purd_items.1
                //綁定value:send_item.purd_items.1.purd_qty
                
                //移除:send_item.purd_items 1
                //綁定:send_item                        -> 通知_remove
                //綁定:send_item.purd_items             -> 通知_remove(items綁定)
                //綁定:send_item.purd_items.0.send_qty  == 不變
                //綁定:send_item.purd_items.1           == 解除綁定
                //綁定:send_item.purd_items.1.send_qty  == 解除綁定
                //綁定:send_item.purd_items.2           => send_item.purd_items.1(實際items已經減掉了第一項，所以現在他們綁定的要-1)  
                //綁定:send_item.purd_items.2.send_qty  => send_item.purd_items.1.send_qty
                
                if((bindField + ".").indexOf(key + ".")==0 ){            
                    var fields = bindField.split(".");
                    var fieldIndex = key.split(".").length;             //當前數組的索引在key中的索引
                    var curBindIndex = parseInt(fields[fieldIndex]);
                    if(curBindIndex >= index){   //移除一行時，要找>當前索引的，每個減1。相等的那個，已經移除了。所以那些綁定都要刪除？ 
                        if(curBindIndex == index && addOrRemove =="remove"){    //解除綁定
                            for(var i=0;i<fieldBinds.length;i++){
                                var bind = fieldBinds[i];
                                tmpRemoveBinds.push(bind);
                                //new.log("【source通知->target解除綁定】",this.fieldNo || this.id , "的", key,"刪除項次",index ,"所以",bind.key,":" ,bindField,"要解除綁定");                                                
                            }                             
                        }
                        else{
                            fields[fieldIndex] = addOrRemove=="add"?curBindIndex + 1:curBindIndex-1;
                            var newKey = fields.join(".");                  //新的綁定key
                            for(var i=0;i<fieldBinds.length;i++){
                                var bind = fieldBinds[i];     
                                if(bind.backField){                   
                                    //old.log("【source通知->target變更綁定索引(回寫)】",bind.backField ,"->",newKey);                                                
                                    bind.backField = newKey;
                                    for(var j=0;j<bind.args.length;j++){
                                        if(bind.args[j] == bindField){
                                            bind.args[j] = newKey;
                                            break;
                                        }
                                    }
                                }
                            } 
                            //new.log("【source通知->target變更綁定索引】",this.fieldNo || this.id , "的", key,addOrRemove=="add"?"增加":"刪除","項次",index ,"所以" ,bindField,"->",newKey);                                                
                            tmpNewKeyBinds[newKey] = fieldBinds;    //最后統一換          
                        }
                        //等下統一先刪后加，因為舊key也可能存在于new key中，如items.2->items.3,items.3->items.4，這樣items.3同時存在，所以只能先備份
                        tmpOldKeys.push(bindField);
                    }
                }                 
            }       
            //if(tmpRemoveBinds.length)
            //    //debugger
            //下面這三個順序不能搞錯
            for(var i=0;i<tmpRemoveBinds.length;i++){
                this._removeBind(tmpRemoveBinds[i]);
            }
            for(var i=0;i<tmpOldKeys.length;i++){
                delete this._binds[tmpOldKeys[i]];
            } 
            for(var p in tmpNewKeyBinds){
                this._binds[p] = tmpNewKeyBinds[p];
            }
        }
        
        ,_afterAdd:function(key,items,index,item,notifyFrom){
            this._adjustBindsIndex(key,index,"add");        //先調整索引，再真正new一個新項，再綁定items.index
            this.$base(key,items,index,item,notifyFrom);
            
            //綁定我的請更新
            var binds = this._binds;
            for(var bindField in binds){
                var fieldBinds = binds[bindField];
                //key以bindField開頭的
                //設定:send_item.purd_items.0.send_qty
                //綁定:send_item.purd_items.0
                //用_set通知即可
                //加點防止send_item.purd_items.11與send_item.purd_items.1匹配
                if(key==bindField || (key + ".") .indexOf(bindField + ".")==0){      //部份匹配只用_set通知      
                    for(var i=0;i<fieldBinds.length;i++){
                        //bindField是哪個?
                        var target = fieldBinds[i].target;
                        if(!notifyFrom || notifyFrom.kind=="bind" && target != notifyFrom.source){
                            var bind = fieldBinds[i];
                            //如當前我是送貨單項次form，有一個send_item:{purd_items:[...]}數據，而底下有一個grid，用它的items綁定了send_item.purd_items
                            //現在_set("send_item.purd_items.0.send_qty",800)
                            //那么grid則要_set(items.0.send_qty",800)，即用items代替send_item.purd_items
                            
                            
                            
                                if(bind.bindKind=="set" && !target[bind.key + "_BIND_DIRECTLY"]){
                                    var targetKey = bind.key + (key==bindField?"":"." + key.substr(bindField.length + 1));
                                    //new.log("【source通知->target._add】",this.fieldNo || this.id , "的", key ,"有增加項次",index,"，所以" ,target.fieldNo || target.id,"的",targetKey ,"也要通知有變化(",bind.key + "綁定了" + bindField + ")","原始來源:",notifyFrom?notifyFrom.id:"");                                                
                                    target._afterAdd(targetKey,items,index,item,{kind:"bind",type:"add_afterAdd",fromKey:key,source:this,bind:bind,bindField:bindField,fromArgs:Array.prototype.slice.call(arguments)});
                                }
                                else{
                                    //new.log("【source通知->target.set】",this.fieldNo || this.id , "的", key ,"有增加項次",index,"，所以" ,target.fieldNo || target.id,"的",targetKey ,"也要通知有變化(直接應用綁定)(",bind.key + "綁定了" + bindField + ")","原始來源:",notifyFrom?notifyFrom.id:"");                    
                                    target._applyBind(bind,{kind:"bind",type:"add_applyBind",fromKey:key,source:this,bind:bind,bindField:bindField,fromArgs:Array.prototype.slice.call(arguments)});
                                }
                            
                            
                        }
                    }
                }       
                
                //bindField以key開頭的，通知          
            }            
        }
                
        ,_afterRemove:function(key,items,index,oldItem,notifyFrom){
            this._adjustBindsIndex(key,index,"remove");        //先調整索引，再真正new一個新項，再綁定items.index
            this.$base(key,items,index,oldItem,notifyFrom);
            
            //綁定我的請更新
            var binds = this._binds;
            for(var bindField in binds){
                var fieldBinds = binds[bindField];
                //key以bindField開頭的
                //設定:send_item.purd_items.0.send_qty
                //綁定:send_item.purd_items 0
                //用_set通知即可
                //加點防止send_item.purd_items.11與send_item.purd_items.1匹配
                if(key==bindField || (key + ".") .indexOf(bindField + ".")==0){      //部份匹配只用_set通知      
                    for(var i=0;i<fieldBinds.length;i++){
                        //bindField是哪個?
                        var target = fieldBinds[i].target;
                        if(!notifyFrom || notifyFrom.kind=="bind" && target != notifyFrom.source){
                            var bind = fieldBinds[i];
                            //如當前我是送貨單項次form，有一個send_item:{purd_items:[...]}數據，而底下有一個grid，用它的items綁定了send_item.purd_items
                            //現在_set("send_item.purd_items.0.send_qty",800)
                            //那么grid則要_set(items.0.send_qty",800)，即用items代替send_item.purd_items
                        
                                if(bind.bindKind=="set" && !target[bind.key + "_BIND_DIRECTLY"]){
                                    var targetKey = bind.key + (key==bindField?"":"." + key.substr(bindField.length + 1));
                                    //new.log("【source通知->target._remove】",this.fieldNo || this.id , "的", key ,"有移除項次",index,"，所以" ,target.fieldNo || target.id,"的",targetKey ,"也要通知有變化(",bind.key + "綁定了" + bindField + ")","原始來源:",notifyFrom?notifyFrom.id:"");                                                
                                    target._afterRemove(targetKey,items,index,oldItem,{kind:"bind",type:"remove_afterRemove",fromKey:key,source:this,bind:bind,bindField:bindField,fromArgs:Array.prototype.slice.call(arguments)});
                                }
                                else{
                                    //new.log("【source通知->target.set】",this.fieldNo || this.id , "的", key ,"有移除項次",index,"，所以" ,target.fieldNo || target.id,"的",targetKey ,"也要通知有變化(直接應用綁定)(",bind.key + "綁定了" + bindField + ")","原始來源:",notifyFrom?notifyFrom.id:"");                    
                                    target._applyBind(bind,{kind:"bind",type:"remove_applyBind",fromKey:key,source:this,bind:bind,bindField:bindField,fromArgs:Array.prototype.slice.call(arguments)});
                                }
                        
                        
                        }
                    }
                }       
                
                //bindField以key開頭的，通知          
            }  
        }

    };
});