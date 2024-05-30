sjs.using("Core5.Util.StrFn")
.define(function(strFn){
    return {
        format:function(value){
            //this.value在这里要保持只读，以匹配绑定来源
            value = value===null && typeof(this.isNull)!="undefined"?this.isNull:value;
            if(this.dic && value!==null){
                value = this.trimKey?strFn.trim(value):value;
                var text = this.dic[value] || value;
                return text;
            }
            return value;           //combox可用
        }
        ,formatNull:true

        ,_setValue:function(value,change,oldValue,key,notifyFrom){
            this.$base(value,change,oldValue,key,notifyFrom);
            value = value===null && typeof(this.isNull)!="undefined"?this.isNull:value;
            if(this.dicStyle && value!==null){
                value = this.trimKey?strFn.trim(value):value;
                this.css(this.dicStyle[value]);
            }
        }
        
    }
});