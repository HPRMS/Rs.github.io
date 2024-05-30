sjs.define(function(){
    var currencyReg=/(\d{1,3})(?=(\d{3})+(?:$|\D))/g ;

    return {
        currency:""    
        ,formatNull:true
        ,";font-family":"consolas"
        //,";font-size":"11px"
        ,";padding-right":"2px"
        ,";padding-left":"0"
        , rightFixed:0           //if not 0, add 0
        , zeroFixed:false
        ,format:function(value){
            if(value){       //db中是數字
                if(this.rightFixed){ 
                    value = (1 * value).toFixed(this.rightFixed);
                }
                var tmp = ("" + value).split('.');    //小數點
                var n1=tmp[0].replace(currencyReg,"$1,");
                return this.currency + n1 + (tmp.length>1?"." + tmp[1]:'');
            }
            else if(this.zeroFixed && this.rightFixed){
                value = (0).toFixed(this.rightFixed);
                return this.currency + value;
            }
            else{
                return this.currency + "0";
            }
        }
    };
});