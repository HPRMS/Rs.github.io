sjs.define(function(){
    return {
        decimalCount:0                 //小數點位數

        ,checkInput:function(input){
            input = input.replace(/\,/g,"");
            if(isNaN(input)){
                //return {error:input + "不是數字"};
                return {error:input + " not a number"};
            }
            else{
                input = 1 * input;
                var decimalCount = 0;
                var tmp = ("" + input).split(".");
                if(tmp.length==2){
                    decimalCount = tmp[1].length;
                }
                if(decimalCount > this.decimalCount){
                    //也可以自动四舍五入
                    //return {error:this.decimalCount?"最多" + this.decimalCount  + "位小數":"只能輸入整數"};
                    return {error:this.decimalCount?"up to " + this.decimalCount  + " decimal":"must be integer"};
                }
                return {value:input};
            }
        }
    };  
});