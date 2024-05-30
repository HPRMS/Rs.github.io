sjs.using("Core5.Widget.Label")
.using("Core5.Widget.Input.Formatter.DateTime")
.using("Core5.Widget.Input.Formatter.Percent")
.using("Core5.Widget.Input.Formatter.Currency")
.using("Core5.Widget.Input.Formatter.Item")
.using("Core5.Widget.Input.Formatter.Dic")

.using("Core5.Widget.Input.Text")
.using("Core5.Widget.Input.Checker.Number")
.using("Core5.Widget.Input.Checker.Range")

.using("Core5.Widget.Input.Textarea")
.using("Core5.Widget.Input.Toggle")
.using("Core5.Widget.Input.CheckBox")
.using("Core5.Widget.Input.RadioBox")
.using("Core5.Widget.Input.Select")
.using("Core5.Widget.Input.DSelect")
.using("Core5.Widget.Input.DatePicker")
.using("Core5.Widget.Input.MonthPicker")
.using("Core5.Widget.Button")
.using("Core5.Widget.Input.Command")
.using("Core5.Widget.Input.Combox")
.using("Core5.Widget.Input.Upload2")

.using("Core5.Container")
.using("Core5.Bind.BindSource")
.using("Core5.Bind.BindTarget")

.using("Core5.Component")

.using("Core5.Layout.Layout")
.using("Core5.Layout.Float")
.using("Core5.Util.EventManager")

.define(function(label,dateTimeFormatter,percentFormatter,currencyFormatter,itemFormatter,dicFormatter
,text,numberChecker,rangeChecker
,textarea,toggle,checkbox,radiobox,select,dSelect,datePicker,monthPicker,button,command,combox,upload
,container,source,target,component,layout,floatLayout,eventManager){
    //只設定type,fieldNo以及prompt基本就完成欄位
    var types = {
        //TODO:顯示數字(金額)的千分位，日期，時間，百分比等
        label:{
            $extend:label
            ,$mixin:[target]          //根據BIND_FIELD統一添加
            ,valueNoBindBack:true           //不要回寫(只讀欄位)
        }
        
        ,dateTime:{
            $extend:label
            ,$mixin:[target,dateTimeFormatter]
        }
        
        ,percent:{
            $extend:label
            ,$mixin:[target,percentFormatter]
        }
        
        ,currency:{
            $extend:label
            ,$mixin:[target,currencyFormatter]
        }
        
        ,item:{
            $extend:label
            ,$mixin:[target,itemFormatter]
        }
        
        ,dic:{
            $extend:label
            ,$mixin:[target,dicFormatter]
        }
        
        ,text:{
            $extend:text
            ,$mixin:[target]
        }
        
        ,"int":{                //只能輸入大于0的整數
            $extend:text
            ,$mixin:[target,numberChecker,rangeChecker,currencyFormatter]
            ,allowMinValueEqual:false                   //不可等于最小數（0）
            ,equalMax:false                             //不檢查大的
            ,inner:function(){
                var ret = this.$base();
                ret[";text-align"] = "right";
                ret[";font-family"] = "consolas";
                return ret;
            }
            ,formatNull:false
        }
        
        ,"float":{              //只能輸入大于0，且最多兩位小數
            $extend:text 
            ,$mixin:[target,numberChecker,rangeChecker,currencyFormatter]
            ,decimalCount:2
            ,allowMinValueEqual:false                  
            ,equalMax:false   
            ,inner:function(){
                var ret = this.$base();
                ret[";text-align"] = "right";
                ret[";font-family"] = "consolas";
                return ret;
            }
            ,formatNull:false
        }
        
        ,textarea:{
            $extend:textarea
            ,$mixin:[target]
        }
        
        ,toggle:{
            $extend:toggle
            ,$mixin:[target]
        }
        
        ,checkbox:{
            $extend:checkbox
            ,$mixin:[target]
        }
        
        ,radiobox:{
            $extend:radiobox
            ,$mixin:[target]
        }
        
        ,select:{
            $extend:select
            ,$mixin:[target]
            ,_getPopCreater:function(){
                return this.parent.parent && this.parent.parent["-s-edit-grid"]?this.parent.parent : this;        //可以override此方法，提供單一pop的要求，如傳回this.parent.parent
            }
        }
        
        ,dSelect:{                //動態select(items動態產生)
            $extend:dSelect
            ,$mixin:[target]
        }
        
        ,datePicker:{
            $extend:datePicker
            ,$mixin:[target]
        }
        
        ,monthPicker:{
            $extend:monthPicker
            ,$mixin:[target]
        }

        ,command:{
            $extend:command
            ,$mixin:[target]
        }

        ,combox:{
            $extend:combox
            ,$mixin:[target]
        }

        ,upload:{
            $extend:upload
            ,$mixin:[target]
        }
        
        //TODO: dropdown textarea, radiobox

        ,con:{
            $extend:container
            ,$mixin:[layout,floatLayout,target]
            ,_initInnerItem:function(itemCfg,itemIndex){
                itemCfg.$extend = itemCfg.$extend || types[itemCfg.type || this.defaultItemType];
                if(itemCfg.fieldNo){
                    itemCfg["@value"] = "item." + itemCfg.fieldNo;
                }
                return this.$base(itemCfg,itemIndex);
            }
        }

        ,cmp:component

        
        ,button:{
            $extend:button
            ,$mixin:[target]
            ,evt:"rowEvt"
        }

    };  
    
    return { 
        $extend:container
        ,$mixin:[source]
        ,noTdTag:true
        ,init:function(){
            this.$base();
            this._initData("item",{});
        }

        ,setItem:function(item){
            this.set("item",item);
            return this;
        }
        
        ,defaultItemType:"text"     //可以設為label，只讀表單
        ,bindFieldError:true
        ,__registerTypes:function(extraTypes){
            for(var p in extraTypes){
                types[p] = types[p] || extraTypes[p];
            }
        }
        ,_initInnerItem:function(itemCfg,itemIndex){
            itemCfg.$extend = itemCfg.$extend || types[itemCfg.type || this.defaultItemType];
            if(itemCfg.fieldNo){
                itemCfg["@value"] = itemCfg.fieldNo=="."?"item":"item." + itemCfg.fieldNo;
                if(this.bindFieldError){
                    itemCfg["@error"] = "error." + itemCfg.fieldNo;
                }
            }
            return this.$base(itemCfg,itemIndex);
        }

        ,checkError:function(){
            var ret = [];
            this._checkRequiredEmpty(ret);
            this._checkFormErr(ret);
            return ret;
        }

        ,doCheckError:function(){
            var itemsError = this.checkError();
            if(itemsError.length){
                eventManager.publish(this,"displayLoadingMsg","err",itemsError.join("<br>"));
                return false;
            }
            return true;
        }


        ,_checkRequiredEmpty:function(ret){
            var fields = this.inner;
            for(var i=0;i<fields.length;i++){
                var fieldNo = fields[i].fieldNo;
                var fieldValue = this.item[fieldNo];
                if(fieldNo && fields[i].required && (fieldValue===null || typeof(fieldValue)=="undefined" || fieldValue==="")){
                    ret.push((fields[i].prompt || "") + " required!");
                }
            }
        }

        ,_checkFormErr:function(ret){
            var error = this.error;
            if(error){
                for(var p in error){
                    if(error[p]){
                        ret.push(error[p] + "(" + p + ")");
                    }
                }
            }
        }

    };
});
    