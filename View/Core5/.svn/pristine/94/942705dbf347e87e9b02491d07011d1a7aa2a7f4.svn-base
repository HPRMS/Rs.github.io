//for command can add Checker mixin
sjs.using("Core5.Util.StrFn")
.define(function(strFn){
    return {
        setValue:function(input){
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
                //this.set("text",input + "");       //還原顯示輸錯的，免得重新輸入 
                this._innerSetText(input);
            }
            else{
                ret.error && this.report("msg",ret.error);
                this._innerSetValue(ret.error?this.value:ret.value);
            }
            return this;
        }
        
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
            this.set("value",value);
            //this.evt && this.report(this.evt,this.value,this._text);
        }

        ,_setError:function(error,change){
            if(change){
                this.setClass("s-input-error",error);
                this.attr("title",error || null);
            }
        }
    }
});