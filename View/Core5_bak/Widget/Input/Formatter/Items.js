sjs.define(function(){
    return {
        fieldValueSplit:","         //如果為null，表示傳入的是數組
        ,showSpliter:""
        ,showAllWhenAll:false       //選中全部是是否顯示all
        ,valueField:"value"
        ,textField:"text"
        ,format:function(value){
            if(this.items && value!==null && value && value.length>0){
                var valueText = value;
                var spliter = this.fieldValueSplit;
                if(!spliter){      //數組
                    spliter = ",";
                    valueText = value.join(spliter);
                }
                var valueMatch = spliter + valueText + spliter;
                var items = this.items;
                var ret = [];
                var valueField = this.valueField;
                var showField = this.textField;
                for(var i=0;i<items.length;i++){
                    var itemValue = spliter + items[i][valueField] + spliter;
                    if(valueMatch.indexOf(itemValue)>=0){
                        ret.push(items[i][showField]);
                    }
                }
                if(items.length == ret.length && this.showAllWhenAll){
                    return "all";
                }
                return ret.join(this.showSpliter || spliter);
            }
            return "";
        }
    }
});