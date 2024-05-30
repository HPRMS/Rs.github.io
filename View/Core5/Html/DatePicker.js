/*一個通用的日曆html產生器*/
sjs.loadCss("Core5.Html.DatePicker")
.using("Core5.Util.DateFn")
.using("Core5.Util.StrFn")
//.using("$LANG")
.define(function(dateFn,strFn){//,LANG){
    var monthsTotalDays = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var LANG = {
         DAYS:[
            '<i zh="日">Sun</i>',
            '<i zh="一">Mon</i>',
            '<i zh="二">Tue</i>',
            '<i zh="三">Wed</i>',
            '<i zh="四">Thu</i>',
            '<i zh="五">Fri</i>',
            '<i zh="六">Sat</i>'
        ]
    };

    return {
        //yymm:6碼年月，如201304
        _dp:function(yymm){
            return {
                tag:"table"
                ," cellpadding":0
                ," cellspacing":0
                ,"-s-dp-table":true
                ,inner:[
                    this._dpThsTr()
                    ,this._dpTrs(yymm)
                ]
            };
        }
        
        ,_dpThsTr:function(){
            return {
                tag:"tr"
                ,inner:this._dpThs()
            }
        }
        
        ,_dpThs:function(){
            var ret = [];
            this.showWeek && ret.push(this._dpWeekTh());
            for (var i = 0; i < 7; i++) {
                ret.push(this._dpTh(i));
            }
            return ret;
        }
        
        ,_dpWeekTh:function(){
            return {
                tag:"th"
                ,"-s-dp-th":true
                ,"-s-dp-th-week":true
                ,inner:"W"
                ," title":"week"
            };
        }
        
        ,_dpTh:function(index){
            return {
                tag:"th"
                ,inner:LANG.DAYS[index]
                ,"-s-dp-th":true
                ,"-s-dp-th-weekend":index == 0 || index == 6
            };
        }
        
        ,_dpTrs:function(yymm){
            var year = Number(yymm.substr(0, 4));
            var month = yymm.substr(4,2);
            var iMonth = Number(month) - 1;
            //TODO:日曆如果設定從星期一開始顯示一周，則可能要修改這里的算法，暫時沒有這樣的需求，不做通用控件
            var firstDayInMonth = new Date(year, iMonth, 1).getDay() + 1;    //星期天開始1,2,3,4,5,6,7
            var monthTotalDays = monthsTotalDays[iMonth];                    //28,29,30,31
            //February
            if(iMonth==1)       
                monthTotalDays = ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) ? 29 : 28;     //Feb days count
            var weeks = Math.ceil((monthTotalDays - (7 - firstDayInMonth + 1)) / 7) + 1;                     //幾周(7-firstDayInMonth表示第一周要除去幾天，7 - firstDayInMonth +1，因為星期天從1開始，因此7-1還要+1才等于7（如果當月1號從星期天開始，則要減掉一周，即7天），作為後面的+1周)
            var today = dateFn.getToday();
            var thisWeekIndex = Math.ceil((Number(today.substr(6,2)) - (7 - firstDayInMonth + 1))/7);       //不用加1，weekIndex從0開始
            var firstWeekInYear = dateFn.getYearWeek(yymm + '01');
            var ret = [];
            for (var i = 0; i < weeks; i++) {
                ret.push(this._dpTr(i,firstDayInMonth,monthTotalDays,yymm,today,today.substr(0,6) == yymm && thisWeekIndex==i,firstWeekInYear+i));
            }
            return ret;
        }
        
        ,_dpTr:function(weekIndex,firstDayInMonth,monthTotalDays,yymm,today,thisWeek,weekInYear){
            return {
                tag:"tr"
                ,"-s-dp-thisweek":thisWeek
                ,inner:this._dpTds(weekIndex,firstDayInMonth,monthTotalDays,yymm,today,weekInYear)
            }
        }
        
        ,_dpTds:function(weekIndex,firstDayInMonth,monthTotalDays,yymm,today,weekInYear){
            var ret = [];
            
            this.showWeek && ret.push(this._dpWeekTd(weekIndex,firstDayInMonth,monthTotalDays,yymm,today,weekInYear));
            
            for (var i = 0; i < 7; i++) {
                var dayInMonth = weekIndex * 7 + i + 1 - firstDayInMonth + 1;
                var ym = yymm;
                if(dayInMonth<=0){
                    dayInMonth = Number(dateFn.addDays(yymm + "01",dayInMonth-1).substr(6));
                    ym = dateFn.addMonths(yymm,-1);
                }
                else if(dayInMonth > monthTotalDays){
                    ym = dateFn.addMonths(yymm,1);
                    dayInMonth = dayInMonth - monthTotalDays;
                }
                var dayStr = "" + ym + (dayInMonth < 10 ? "0" + dayInMonth : dayInMonth);
                //var daySelected = dayStr == curDay;
                ret.push(this._dpTd(dayStr,dayInMonth,i == 0 || i == 6,dayStr == today,yymm != ym));
            }
            return ret;
        }
        
        ,_dpWeekTd:function(weekIndex,firstDayInMonth,monthTotalDays,yymm,today,weekInYear){
            return {
                tag:"td"
                ,"-s-dp-td":true
                ,"-s-dp-week":true
                ,inner:weekInYear
                ," title":"the " + weekInYear + " week"
            };
        }
        
        ,_dpTd:function(dayStr,dayInMonth,weekEnd,today,notThisMonth){
            return {
                tag:"td"
                ,inner:this._dpTdInner(dayInMonth,dayStr)
                ,"-s-dp-td":true
                ,"-s-dp-weekend":weekEnd
                ,"-s-dp-today":today
                //,"s-dp-selected":selected
                ,"-s-dp-notthismonth":notThisMonth
            }
        }
        
        ,_dpTdInner:function(dayInMonth,dayStr){
            return dayInMonth;
        }
        
    };        
});