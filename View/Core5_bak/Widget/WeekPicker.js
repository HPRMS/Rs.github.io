sjs.loadCss("Core5.Widget.WeekPicker")
.using("Core5.Widget.DatePicker")
.using("Core5.Util.DateFn")
.define(function(datePicker,dateFn){
    return {
        $extend:datePicker
        
        ,showWeek:true

        ,_dpTd:function(dayStr,dayInMonth,weekEnd,today,notThisMonth){
            var ret = this.$base(dayStr,dayInMonth,weekEnd,today,notThisMonth);
            ret[" s-overClass"] = null;
            ret["-s-dp-select"] = null; 
            //統一用day來作外部接口 
            ret[" s-click"] = null;  
            ret[" day"] = null;  
            
            return ret;
        }    

        ,_dpTr:function(weekIndex,firstDayInMonth,monthTotalDays,yymm,today,thisWeek,weekInYear){
            var ret = this.$base(weekIndex,firstDayInMonth,monthTotalDays,yymm,today,thisWeek,weekInYear)
            ret[" s-overClass"] = "s-wp-tr-over";
            
            var day = weekIndex * 7 + 1 - firstDayInMonth + 1;      //那一周的第一天
            day = day<=0 ? 1:day;                                   //有可能第一天不是當前月
            day = day < 10 ? "0" + day:"" + day;
            var weekDays = dateFn.getWeek(yymm + day);
            var week = weekDays.join(",");
            
            ret["-s-wp-tr-select"] = this._week == week;
            ret[" week"] = week;        //這個是jQuery在動態select時所用
            
            //統一用day來做設定接口
            ret[" day"] = yymm + day;
            ret[" s-click"] = "setDay";//"setWeek";
            return ret;
        }
        
        ,set:function(key,value,setFrom){
            if(key=="day"){     //外部接口
                var week = "";
                if(value){
                    var weekDays = dateFn.getWeek(value);
                    week = weekDays.join(",");
                }
                this.set("_week",week);
            }
            //week相等時，會優先從該周的第一天那個月顯示起
            //和day一樣，選擇日期時，會遵從那一天所在的月，雖然可能在下月初也會顯示或者在上月底也可能顯示
            else{
                this.$base(key,value,setFrom);
            }
        }
        
        ,_set_week:function(week,change){
            var yymm = week?week.substr(0,6):dateFn.getThisMonth();
            change && this.isRender() && this.jq(".s-dp-show").html(this._week || "&nbsp;");
            if(yymm != this._yymm){
                this.set("_yymm",yymm);
            }
            else if(this.isRender() && change){
                this.jq(".s-wp-tr-select").removeClass("s-wp-tr-select");
                this.jq("[week='" + week + "']").addClass("s-wp-tr-select");
            }
        }
        
        ,_reportDayEvt:function(){
            //alert(this._week);
            this.evt && this.report(this.evt,this._week);
        }
        
        /*
        ,onSetWeek:function(src){
            this.set("_week",src.attr("week"));
            //統一轉成開始和結束日期
            this.evt && this.report(this.evt,this._week);
        }
   
        ,report:function(evt,dayStr){
            if(evt == "set"){ 
                var k = dateFn.getWeek(dayStr);
                this.$base(evt,k);
            }
            else{
                var baseFn = this.$base("$ONLY_GET");
                baseFn.apply(this,Array.prototype.slice.call(arguments,0));
                //this.$base(evt);        //参数不定时的call
            }
        }   
        
        ,_formatShow:function(){
            var k = dateFn.getWeek(this._day);
            if(k != null){
                return k[0].substr(4,2) + "/" + k[0].substr(6,2) + "~" + k[1].substr(4,2) + "/" + k[1].substr(6,2);
            }
            return ""
        }     
        */
      
        
        //,day:"20130501"
    };
    
});