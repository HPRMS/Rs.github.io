﻿//再次改版，key可以用xxx.xxx这样的方式进行
//type名在編譯時自動帶入
/**
 @type
 component的核心mixin，用于屬性的操作
 js object對象本身是一個多層的json結構數據，因此get和set都可以用.語法讀下去，數組元素直接使用索引
 如:
 <code>
 this.set("day","20130402");
 this.set("selected",["css","html"]);
 //datagrid的單行資料更新
 this.set("items.2",{id:555,name:"Andrie",age:30});
 this.add("selected","js",1);
 this.remove("selected",0);
  </code>
 
 component本質上是數據的呈現，如label是一個text字符串數據的呈現，datepicker顯示一個day(8碼日期字符串)
 component根據這些數據決定如何呈現view視圖
 這些數據有變化時，component會有所反應
 而這個mixin就是component的數據統一調用set更新，然後統一使用_setXxx函數回應這個數據更新，變更和這個數據有關的其它數據，以及更新view視圖
 _add,_remove方法也和_set方法一樣，只不過是操作某個集合
 
 至于get，實際上直接讀取數據和調用get方法沒有區別，推薦外部直接讀取數據，直觀，簡單，高效
 而set,add,remove等就必須通過方法來用，否則會造成數據與View不一致的嚴重問題
 */
sjs.using("Core5.Util.DataFn")
.define(function(dataFn,UNDEF){

    var numKeyRe = /\.\d+(\.|$)/g;            //把數字去掉，作通用的key
    var notEqualValue = {
        "number":[0,1]      //true,false -> false,true      ,如果當前值是number，且是有值的number，如1,2,3，則要改成0
        ,"string":["","1"]
        ,"boolean":[false,true]
    }

    return {   
        /*
        */
        //初始化config中的數據
        //請在init中調用
        _initData:function(key,defaultValue){
            var initValue = this[key];
            if(typeof(initValue)=="undefined"){
                initValue = defaultValue;
            }
            this[key] = UNDEF;          //這行很重要，因為初始化時，肯定是no change，這樣會造成很多地方初始化不了
            this.set(key,initValue);//,this.parent);        //初始化時不要往外擴散?
        }

        //刷新數據，以便所有方法皆執行
        ,refreshData:function(key){
            var currentValue = this[key];
            var curType = typeof(currentValue);
            var valueToBool = !!currentValue;
            var tmpNotEqualValue;
            if(notEqualValue[curType]){
                tmpNotEqualValue = notEqualValue[curType][valueToBool?0:1];     //轉成bool為true，則換成第1個，否則換成第2個
            }
            else if(currentValue){
                tmpNotEqualValue = currentValue.push?[]:{};
            }
            else{
                tmpNotEqualValue = "1";     //undefined,null 只能用"1"去碰碰運氣了
            }
            //這里的主要問題不是更新自己，而是很多依賴這個數據的，可能會判斷是否相等，如果值還是相等，可能設定會無效
            this.set(key,tmpNotEqualValue);
            this.set(key,currentValue);
        }
        /**
         @method set
         [public]
         
         設定屬性值時會初始化一次，統一將undefined轉成nul
         也可以使用_beforeXxxSet這樣的方法將value先行處理
         比如label的text屬性,因為要顯示在div中，不能是空字符串，否則div不正常，因此判斷為空或null時要變成&nbsp;
         又如checkGroup的selected屬性，不能是null或undefined，至少要初始化成[]
         
         如果不要比較當前值，也不要經過_beforeXxxSet處理，而只是想要set后的效果，則請直接調用下面的_set方法
         @param {string} key 屬性名
         @param {any} value 屬性值
         @param {bool} [optional] ignoreCompare 設定時是否忽略與當前值的比較，為true表示直接設定，否則要與當前值不同才會set，一般用于在init時初始化屬性會調用此方法，目的是要調用_setXxx這樣的函數(綁定一般會在初始化數據后才會設定，因此初始化時還沒有綁定，因此不會應用綁定)
         @return {this}
         */
         
         /*
        ,set:function(key,value,ignoreCompare,setFrom){
            var uKey = key.substr(0,1).toUpperCase() + key.substr(1); 
            var setFn = this["set" + uKey];         //用于格式化數據，一般控件開發時用到
            if(setFn){
                //优先调有这个
                //TODO:判断在setDay这样的函数中不要再次调用这个set方法，否则会死循环
                //那里面应该调用_set
                setFn.call(this,value,ignoreCompare,setFrom);
            }
            else{
                this._set(key,value,ignoreCompare,setFrom);
            }
            return this;
        }
        
        */
        
        //如果有自己的邏輯，請override set，判斷key進行
        //一般不在這里改變數據，否則會造成外部數據與這里的數據不一致，而產生view衝突
        //這里set的數據是公共數據，應該和外面的數據一致，而不是在這里面單獨變化
        ,set:function(key,value,notifyFrom){
            //值做轉換
            //不能由這個函數作動作，否則外部數據和內部數據永遠對不上
            //這里只用來將數據類型格式化，如果需要另一個數據，請再提供出來          
            //var uKey = key.substr(0,1).toUpperCase() + key.substr(1); 
            //var getFn = this["_before" + uKey + "Set"];         //用于格式化數據，一般控件開發時用到
            //if(getFn){
            //    value = getFn.call(this,value);
            //}
            //var checkedValue = this._initValue(key,value);
            var checkedValue = !this.undefNotToNull && typeof(value)=="undefined"?null:value;      //清除undefined值
            //只有初始化的時候要把值設定好，提醒程式員，而不是作管控
            /*
            if(checkedValue===null && typeof(this["NULL-" + key]) != "undefined"){
                checkedValue = this["NULL-" + key];
            }
            */
            /*
            //還是要自行控制null值如何處理才好
            if(this[key + "NotAllowedNull"] && checkedValue===null){
                this.report("msg",key + " is not allowed null!");
                return;
                //不在這里加默認值,是因為雙向綁定的原因.因為加了后,雙向綁定的另一端沒有接收到反饋,造成數據不同步,綁定失效
                //或者直接調用this.set(key,defaultValue)回去?
            }
            */

            var oldValue = this.get(key);
            var change = oldValue !== checkedValue;
            change && this._doSet(key,checkedValue,notifyFrom);
            //很多時候，這個數據沒變化時，后面的數據也要有變化
            this._afterSet(key,checkedValue,change,oldValue,notifyFrom);
            /*
            //如datepicker的yymm依賴day,day沒改時，yymm可能已改變，但這時候，沒有同步yymm和day的view，所以需要override這里進行
            else{
                var fnKey = key.replace(numKeyRe,"..");            //把數字去掉，作通用的key
                var uKey = fnKey.substr(0,1).toUpperCase() + fnKey.substr(1);        
                var byFn = this["_set" + uKey + "NoChange"];
                byFn && byFn.call(this,value,key,notifyFrom);
            }
            */
            return this;
        }
        //在具体程式中实现，如label会加一个_show变量。全体程式都不会管数据类型，必须保证传入的数据类型正确
        /*
        //items_NO_NULL:true       //默認false，表示某個key不能是null，直接異常出來，否則報錯
        //items_TYPE:number                 //數據類型為number        
        ,_initValue:function(key,value){
            var checkedValue = typeof(value)=="undefined"?null:value;      //清除undefined值
            var noNull = this[key + "_NO_NULL"];   //是否不能為null
            var type = this[key + "_TYPE"];     
            //對于在控件開發時就明確知道類型的，如ListContainer的items，一定是[]，所以請自己注意初始化
            //而對于那些也是提供各種類型使用的，如label的text,可以放number，也可以放string，所以需要這里統一保證一下
            if(type=="number"){
                checkedValue = checkedValue===null && noNull?0:(checkedValue !== null?1 * checkedValue:null);
            }
            else if(type == "string"){
                checkedValue = checkedValue===null && noNull?'':(checkedValue !== null?'' + checkedValue:null);
            }
            else if(type=="bool"){
                checkedValue = checkedValue===null && noNull?false:(checkedValue !== null?!!checkedValue:null);
            }
            else if(type == "array"){
                checkedValue = checkedValue===null && noNull?[]:checkedValue;
            }
            else if(type=="object"){
                checkedValue = checkedValue===null && noNull?{}:checkedValue;
            }
            return checkedValue;
        }
        */

        //,keySetReplaceDot:true      //如果key中剛好有.符號，造成賦值錯誤，那它寫過來會將.替換成this.keyDotReplacer，在這里再繼續替換掉 
        ,_doSet:function(key,value,notifyFrom){
            var paths = key.split(".");
            if(paths.length==1){
                this[this.keySetReplaceDot?('' + key).replace(/`/g,"."):key] = value;      
            }
            else{
                //遞歸實現很漂亮，但性能肯定不好。手動寫吧
                var ret = this;
                for(var i=0;i<paths.length;i++){ 
                    var path = !isNaN(paths[i])?parseInt(paths[i]):paths[i];
                    var pathKey = this.keySetReplaceDot?('' + path).replace(/`/g,"."):path;
                    if(i==paths.length-1){
                        ret[pathKey] = value;
                    }
                    else{
                        //中間層自然賦值
                        if(ret[pathKey] === null || typeof(ret[pathKey])=="undefined"){
                            var curIsArray = !isNaN(paths[i+1]);           //當前是否
                            ret[pathKey] = curIsArray?[]:{};
                            var curKey = paths.slice(0,i+1).join(".");
                            this._afterSet(curKey,ret[pathKey],true,null,notifyFrom);
                        }
                        ret = ret[pathKey];
                     }
                }
            }        
        }
        
        /**
         @method:_set
         @protected
         set后續處理的響應方法，一般被override后做一些統一的與數據有關的處理動作
         默認會調用一個_setXxx方法，這個方法一般被view使用，并且用于更新UI和其它相關的UI數據
         更新其它UI數據時，可選擇帶事件更新set(key)，也可以只要其后果_set(key)，也可以只更新數據，不做其它動作this.xxx="yyy"或this._doSet("xxx","yyy");
         */
        ,_afterSet:function(key,value,change,oldValue,notifyFrom){
            var fnKey = key.replace(numKeyRe,"..");            //把數字去掉，作通用的key
            var uKey = fnKey.substr(0,1).toUpperCase() + fnKey.substr(1);    
            //if(uKey=="Item.SEND_ITEMS..PURD_ITEMS..PURD_NO")
            //    //debugger;
            var byFn = this["_set" + uKey];
            //if(byFn){
                //受这个数据影响的其它数据(綁定可以減輕一部分)
                //如果是UI，还会有UI的响应操作(綁定可以減輕一部分)(原子控件開發，一般不用綁定，效率不好，代碼不通用，綁定是一種能力，加在后期使用)
                //uKey.substr(0,1)!="_" && console.log("dataUI的_set調用(byFn)",this.id,key,oldValue,'->',value,notifyFrom?notifyFrom.id:"無");        
            byFn && byFn.call(this,value,change,oldValue,key,notifyFrom);
            //}
            //暫時不做，等到具體有例子時再來實現
            change && this._afterSetAddRemove(fnKey,"set");

            var dataSetEvt = fnKey + "SetEvt";
            this[dataSetEvt] && this.report(this[dataSetEvt],value, change, oldValue, key, notifyFrom);
            //暫時還是不做，因為這是通用的，除了底層，暫時想不到用處
            //this.dataSetEvt && this.report(this.dataSetEvt, fnKey, value, change, oldValue, key, notifyFrom);
        
        }        
                
        /**
         @method:get
         @public
         直接this.xx.yy比this.get("xx.yy")要高效和簡單，但如果key是一個變量，則可以通過this.get()方法來取得數據
         */
        ,get:function(key){
            var ret = this._doGet(key);
            return ret;
            //全面取消get函數自動執行
            //清查了View中所有代碼，只有bind有get，而bind中的get不要取函數
            //return typeof(ret)=="function"?ret.call(this):ret;
        }

        ,_doGet:function(key){
            var paths = key.split(".");
            var ret = this[paths[0]];       //第一個一定不是數字索引,因為this是{}，不是[]
            for(var i=1;i<paths.length;i++){ 
                if(!ret){
                    ret = !this.undefNotToNull?null:UNDEF;
                    break;
                }
                var path = !isNaN(paths[i])?parseInt(paths[i]):paths[i];
                ret = ret[path];
            }
            return ret;
        }

        //操作的数据是数组，項次赋值可以通过set进行，但是集合的操作只能通过add和remove方法
        ,add:function(key,item,index){
            var items = this.get(key);
            if(!items){
                this.set(key,[item]);
            }
            else{
                if(typeof(index)=="number" && index>=0 && index < items.length){
                    items.splice(index,0,item);
                }
                else{
                    index = items.length;
                    items.push(item);
                }
                this._afterAdd(key,items,index,item);       //取消this,不是綁定源發出
            }
            return this;            
        }
        
        ,_afterAdd:function(key,items,index,item,notifyFrom){
            var fnKey = key.replace(numKeyRe,"..");            //把數字去掉，作通用的key
            var uKey = fnKey.substr(0,1).toUpperCase() + fnKey.substr(1);        
            var byFn = this["_add" + uKey];
            byFn && byFn.call(this,items,index,item,key);
            this._afterSetAddRemove(fnKey,"add");    
            
            var dataAddEvt = fnKey + "AddEvt";
            this[dataAddEvt] && this.report(this[dataAddEvt],items, index, item, key);
                    
        }
                
        ,remove:function(key,item){
            var items = this.get(key);
            if(items){
                var index = dataFn.indexOf(items,item);
                this.removeAt(key,index);
            }
            return this;
        }

        ,removeAt:function(key,index){
            var items = this.get(key);
            if(items){
                if(index>=0 && index<items.length){
                    var oldItem = items[index];
                    items.splice(index,1);
                    this._afterRemove(key,items,index,oldItem);
                }
            }
            return this;
        }
        
        ,_afterRemove:function(key,items,index,oldItem,notifyFrom){
            var fnKey = key.replace(numKeyRe,"..");            //把數字去掉，作通用的key
            var uKey = fnKey.substr(0,1).toUpperCase() + fnKey.substr(1);        
            var byFn = this["_remove" + uKey];
            byFn && byFn.call(this,items,index,oldItem,key);
            this._afterSetAddRemove(fnKey,"remove");    
            
            var dataRemoveEvt = fnKey + "RemoveEvt";
            this[dataRemoveEvt] && this.report(this[dataRemoveEvt],items, index, oldItem, key);
                                            
        }
        
        /**
         @method:_onChange
         @protected
         set,add,remove后統一會調用的方法，方便對key有變更時的統一回應
         @param{string} key:有變化的key
         @param{string} kind:set,add,remove
         */
        ,_afterSetAddRemove:function(key,kind){}
        
    };

});