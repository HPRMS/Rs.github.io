/*
實現js小數的加減乘除精確計算
方法：將小數轉成整數計算，再用除以10次方的方式返回成小數
例外：如果小數和整數一共的位數超過16位，可能會溢出，暫時不處理這種問題
*/
sjs.define(function(){
    //獲取小數的位數
    function getDecCount(num){
        var numText = "" + num;
        var decIndex = numText.indexOf(".");
        return decIndex > -1 ? numText.length - decIndex - 1 : 0;
    }
    
    function accAdd(d1,d2){
        d1 = d1 === null?"xxx":d1;      //讓它isNaN時返回true，因為isNaN(null)為false
        d2 = d2 === null?"xxx":d2;  
        if(isNaN(d1) && isNaN(d2)){
            return 0;
        }
        else if(isNaN(d1)){
            return d2;
        }
        else if(isNaN(d2)){
            return d1;
        }
        
        var dec1 = getDecCount(d1);
        var dec2 = getDecCount(d2);
        if(!dec1 && !dec2){
            return d1 + d2;
        }
        else{
            var times = Math.pow(10,Math.max(dec1,dec2));
            d1 = Math.round(d1 * times);
            d2 = Math.round(d2 * times);
            return (d1 + d2) / times;
        }
    }
    
    function accSub(d1,d2){
        d1 = d1 === null?"xxx":d1;      //讓它isNaN時返回true，因為isNaN(null)為false
        d2 = d2 === null?"xxx":d2;  
        if(isNaN(d1) && isNaN(d2)){
            return 0;
        }
        else if(isNaN(d1)){
            return -1 * d2;
        }
        else if(isNaN(d2)){
            return d1;
        }
        
        var dec1 = getDecCount(d1);
        var dec2 = getDecCount(d2);
        if(!dec1 && !dec2){
            return d1 - d2;
        }
        else{
            var times = Math.pow(10,Math.max(dec1,dec2));
            d1 = Math.round(d1 * times);
            d2 = Math.round(d2 * times);
            return (d1 - d2)/times;
        }
    }
    
    function accMul(d1,d2){
        d1 = d1 === null?"xxx":d1;      //讓它isNaN時返回true，因為isNaN(null)為false
        d2 = d2 === null?"xxx":d2;  
        if(isNaN(d1) && isNaN(d2)){
            return 0;
        }
        else if(isNaN(d1)){
            return 0;
        }
        else if(isNaN(d2)){
            return 0;
        }
        
        var dec1 = getDecCount(d1);
        var dec2 = getDecCount(d2);
        if(!dec1 && !dec2){
            return d1 * d2;
        }
        else{
            var times1 = Math.pow(10,dec1);
            var times2 = Math.pow(10,dec2);
            var times3 = Math.pow(10,dec1 + dec2);
            d1 = Math.round(d1 * times1);
            d2 = Math.round(d2 * times2);
            return (d1 * d2)/times3;
        }
    }
    
    return {
        add:accAdd
        ,sub:accSub
        ,mul:accMul
    }
    
    //除的話就自己round吧，知道要保留幾位小數

    //下面注釋的是假設整數除以10的方，也不準。才考慮以下通過手動點小數點方式來實現乘和除10的方
    /*
    // 5.9011/1000 = 0.005901099999999999
    // 59011/1000 = 59.011(但是如果是整數除以10的乘方，不會出現精度不準)
    // 590110.011/1000 = 590.1100110000001
    function setDecimal(num,dCount){
        var isMinus = false;
        if(num<0){
            isMinus = true;
            num *= -1;
        }
        var str = "" + num;
        //點小數點
        var dIndex = str.length-dCount;
        if(dIndex<0){
            var count = Math.abs(dIndex);
            for(var i=0;i<count;i++){
                str = "0" + str;
            }
            str = "0." + str;
        }
        else{
            str = (dIndex==0?"0":str.substr(0,dIndex)) + "." + str.substr(dIndex);
        }
        return Number(str) * (isMinus?-1:1);
    }

    //右邊補0，乘以10，因為乘以10都會有問題 1.09 * 100
    function setZero(num,dCount){
        var isMinus = false;
        if(num<0){
            isMinus = true;
            num *= -1;
        }
        var str = "" + num;
        //小數點位置
        var dIndex = str.indexOf(".");
        if(dIndex<0){
            for(var i=0;i<dCount;i++){
                str = str + "0";
            }
        }
        else{
            str = str.replace(".","");
            var addZero = dIndex + dCount - str.length;
            if(addZero<0){
                str = str.substr(0,dIndex + dCount) + "." + str.substr(dIndex + dCount);
            }
            else{
                for(var i=0;i<addZero;i++){
                    str = str + "0";
                }
            }
        }
        return Number(str) * (isMinus?-1:1);    
    }

    //精確除
    //dCount保留小數個數
    function accDiv(num1,num2,dCount){ 
        //去小數點
        return setDecimal(Math.floor(num1 / num2 * Math.pow(10,dCount)),dCount);
    } 

    //精確減
    function accSub(num1,num2){
        //去小數點
        var numDecCount1 = getDecimalCount(num1);
        var numDecCount2 = getDecimalCount(num2);
        var maxDecCount = Math.max(numDecCount1,numDecCount2);
        if(maxDecCount>0){
            num1 = setZero(num1, maxDecCount);
            num2 = setZero(num2, maxDecCount);
        }
        return setDecimal(num1-num2,maxDecCount);
    }

    */
});