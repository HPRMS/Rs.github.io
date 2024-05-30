sjs.using("Core5.Util.DateFn")
.define(function(dateFn){
    //TODO:還可以加上剛才(三分鐘前),五分鐘前(5-10分鐘),周X,上周X,明天,下周五,明年等
    return {
        //showKind:""                       //onlyDate(只顯示日期)，暫時沒有只顯示時間的設定
        //noSecond:false                    //是否顯示秒
        todayShowText:null                  //null/undefined:不處理，其它值:當日期是今天時顯示這個字樣(可以為空，這樣今天時不顯示日期)
        ,yesterdayShowText:null              //昨天是否匹配
        ,thisYearShowText:null               //今年顯示字樣
        
        //,valueKind:"normal"               //yymm(year month),time(6碼或4碼時間)
        ,format:function(value){
            if(value){
                value += '';
                if(this.valueKind == "yymm"){     //6碼年月
                    return value.substr(0,4) + "/" + value.substr(4,2);
                }
                else if(this.valueKind == "time"){
                    return dateFn.formatTime(this.noSecond?value.substr(0,4):value);              
                }
                else{
                    var day = "";
                    if(this.showKind!="onlyTime"){
                        day = value.substr(0,8);
                        var today = dateFn.getToday();
                        if(this.todayShowText!==null && typeof(this.todayShowText)!="undefined" &&  today== day){
                            day = this.todayShowText;
                        }
                        else if(this.yesterdayShowText!==null && typeof(this.yesterdayShowText)!="undefined" && dateFn.addDays(today,-1) == day){
                            day = this.yesterdayShowText;
                        }
                        else if(this.thisYearShowText!==null && typeof(this.thisYearShowText)!="undefined" && today.substr(0,4) == day.substr(0,4)){
                            day = this.thisYearShowText + day.substr(4,2) + "/" + day.substr(6,2);
                        }
                        else{
                            day = dateFn.formatDate(day);
                        }
                        if(this.showKind == "onlyDate"){
                            return day;
                        }
                    }
                    var time = dateFn.formatTime(this.noSecond?value.substr(8,4):value.substr(8));
                    return day + (day?" ":"") + time;
                }
            }
            return "";
        }
    };
    
});