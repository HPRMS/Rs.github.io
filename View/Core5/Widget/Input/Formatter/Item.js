sjs.define(function(){
    return {
        valueField:"value"
        ,textField:"text"
        //,noForceMatchItem:false       //value是否強制要按items輸出，如果沒有就輸出空(匹配之前
        ,format:function(value){
            if(this.items && value!==null){
                var items = this.items;     //沒有就出錯吧
                var valueField = this.valueField;
                var textField = this.textField;
                for(var i=0;i<items.length;i++){
                    var item = items[i];
                    if(item[valueField] === value){
                        return typeof(textField)=="function" ? textField.call(this,item):item[textField || valueField];
                        //return item[textField];
                    }
                }
            }
            return this.noForceMatchItem?value:"";           //combox可用
        }

        ,formatNull:true

    }
});