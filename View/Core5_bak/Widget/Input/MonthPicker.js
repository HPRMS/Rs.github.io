sjs.using("Core5.Widget.Input.Command")
.using("Core5.Widget.MonthPicker")
.using("Core5.Widget.Input.Formatter.DateTime")
.using("Core5.Widget.Ability.Pop")
.using("Core5.Cls")
.define(function(command,monthPicker,dateTimeFormatter,pop,cls){
    var dp;
    return {
        $extend:command
        ,$mixin:[dateTimeFormatter]
        ,rightIcon:"calendar"
        

        ,showPop:function(){
            if(!dp){
                dp = cls.create(monthPicker,pop,{
                        posKind:this.showPos=="top"?"lb":"lt"
                    },this._getPopConfig()).renderTo("body",true);
            }
            this.pop = dp;

            var pos = this._getShowPos();
            this.pop.setMonth(this.value).setResponser(this).show().move(pos.left ,pos.top);
        }

        
        ,_getPopConfig:function(){
            return { 
                textField:this.textField
                ,valueField:this.valueField
                ,";width":"200px"
                ,";overflow-y":"auto"    
                ,evt:"popSelect" 
            };
        }
        
        //可override此方法,提供一個享元pop,避免浪費
        ,_getPop:function(popType){
            var ret = this.$base(popType);
            //alert(this.value);
            ret.setDay(this.value);
            return ret;
        } 
        
        //,evt:"select"
        
        ,onPopSelect:function(group,v,item,itemIndex){
            this.pop.hide();
            this.setValue(v);
            this.evt && this.report(this.evt,v,item,itemIndex);
        }
        
        /*
        ,value:"20130520"
        */
    }
});