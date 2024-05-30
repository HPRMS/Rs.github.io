sjs.define(function(){
    return {
        equalMin:true
        ,allowMinValue:0                 //最小數
        ,allowMinValueEqual:true        //是否可等于最小數
        ,equalMax:true
        ,allowMaxValue:65536            //最大數
        ,allowMaxValueEqual:true        //是否可等于最大數
        
        ,_getMinValue:function(){
            return this.allowMinValue;
        }
        
        ,_getMaxValue:function(){
            return this.allowMaxValue;
        }

        ,checkInput:function(input){
            var ret = this.$base(input);
            if(!ret.error){
                var value = ret.value;
                var error = "";
                var minValue = this._getMinValue();
                var maxValue = this._getMaxValue();
                if(this.equalMax && value > maxValue){
                    //return {error:"不能大于" + maxValue};
                    return {error:"can not greater than " + maxValue};
                }
                else if(this.equalMax && value === maxValue && !this.allowMaxValueEqual){
                    //return {error:"只能小于" + maxValue};
                    return {error:"must less than " + maxValue};
                }
                else if(this.equalMin && value < minValue){
                    //return {error:"不能小于" + minValue};
                    return {error:"can not less than " + minValue};
                }
                else if(this.equalMin && value === minValue && !this.allowMinValueEqual){
                    //return {error:"只能大于" + minValue};
                    return {error:"must greater than " + minValue};
                }
            }
            return ret;
        }
    };     
});