sjs.using("Core5.Util.DateFn")
.define(function(dateFn){
    //TODO:還可以加上剛才(三分鐘前),五分鐘前(5-10分鐘),周X,上周X,明天,下周五,明年等
    return {
        times:100
        ,decimalCount:2
        ,format:function(value){
            if(value){       //db中是數字
                var roundTimes = Math.pow(10,this.decimalCount);
                var text = '' + Math.round(value * this.times * roundTimes);
                return text.substr(0,text.length-this.decimalCount) + (this.decimalCount?".":"") + text.substr(text.length-this.decimalCount) + "%";
            }
            return "0";
        }

        ,formatNull:true

    };
    
});