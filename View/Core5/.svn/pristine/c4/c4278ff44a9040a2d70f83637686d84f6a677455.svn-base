//這里面只處理數據,不處理view
//data -> view
sjs.using("Core5.Util.StrFn")
.define(function(strFn){
    return {
        //show按value產生,如果show和value同時可以賦值,則是另一個類型
        init:function(){
            this.$base();
            this._initData("value");
            //this._initData("error");            //error不是可配置屬性
        }
        
        ,format:function(value){
            return value;
        }
        
        //外部同時控制value和error，所以error不要以value來變化
        ,_setValue:function(value,change){
            this.renderInputText();
        }

        
        ,renderInputText:function(noFormat){
            //因為有可能用戶修改了text，但是現在上面又重新設置了value值，所以不要判斷change值
            var text = this.value;
            var textIsNull = text === null || typeof(text)=="undefined";
            if(!noFormat && (!textIsNull || this.formatNull)){
                //format不用去管null或undefined的情形了
                text = this.format(text);
            } 
            var show = text === null || typeof(text)=="undefined" ?(typeof(this.textWhenNull)=="function"?this.textWhenNull():(this.textWhenNull || "")):text;
            this.set("_text",show + "");
        }

        ,trimInput:true         //輸入后需要去掉輸入的空格嗎，從資料庫抓出的訂單號，線別等可能不需要去空格，直接Insert到資料庫中
        
        //提供给onchange或onkeypress事件直接綁定
        //input不需要有数据存储
        ,setInput:function(input){
            if(this.trimInput){
                input = strFn.trim(input);
            }
            if(this.upperCase){
                input = input.toUpperCase();
            }
            var ret;
            if(input.length==0){
                ret = this.required ? {error:"required"} : {value:this.emptyInput};
            }
            else{
                if(typeof(this.checkInput)=="object" && this.checkInput.reg){
                    ret = this.checkInput.reg.test(input)?{value:input}:{error:this.checkInput.msg || "not match:" + this.checkInput.reg.toString()};
                }
                else{
                    ret = this.checkInput(input);
                }
            }
            if(ret.error && !this.errorBack){
                this._innerSetError(ret.error);
                this.set("_text",input + "");       //還原顯示輸錯的，免得重新輸入 
            }
            else{
                ret.error && this.report("msg",ret.error);
                this._innerSetValue(ret.error?this.value:ret.value);
            }
        }
        
        //除配置外，还可以直接在外面动态改变，以便即时修正checkInput方法是否需要验证
        //只是一个开关而已，不影响数据，不影响逻辑(error是否就影响了?不会，因为肯定要清空value,input等数据)
        ,required:false
        
        ,checkInput:function(input){
            return {value:input};
        }
        
        ,emptyInput:null        //如果不是required，又輸入空值時，可以轉換為這個值
        //,errorBack:true       //出錯時直接還原上一次的value值
        
        //,errEvt:""
        
        //這些事件是由這個控件原生產生的.不是通過外部出來的
        ,_innerSetError:function(error){
            this.set("error",error);
            this.set("value",null);
            this.errEvt && this.report(this.errEvt,this.error);                
        }
        
        //,evt:""
        
        //上層應該onValue清空error，否則value正確時，error錯誤無法清除
        //除了本身輸入的外,還可以通過彈出pop給的值
        ,_innerSetValue:function(value){
            this.set("error",null);     
            var oldValue = this.get("value");            
            this.set("value",value);
            this.evt && this.report(this.evt,this.value,this._text,oldValue);
        }

        //数据栏位:value,error,show
        ,setValue:function(value){
            this.set("value",value);
            return this;
        }          
    }
});