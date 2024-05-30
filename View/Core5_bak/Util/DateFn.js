/*日期時間類的工具函數*/
sjs.using("Core5.Util.StrFn")
.define(function(strFn){
    function monthsToYearAndMonth(totalMonths){
        var plus = true;
        if(totalMonths<0){
            totalMonths = -1 * totalMonths;
            plus = false;
        }
        return {
            year:Math.floor(totalMonths / 12) * (plus?1:-1)
            ,month:totalMonths % 12 * (plus?1:-1)
        };
    }
            
    function addYear(yymm,y){
        if(y==0)
            return yymm;
        var year = yymm.substr(0, 4);
        var month = yymm.substr(4, 2);
        year = Number(year) + y;
        if(year>9999 || year<1000)
            throw new Error("暫不支援1000年之前和9999年之后");        //1000以下不想去format,9999之后破壞6碼的年月格式
        return ""+ year + month;
    }
    
    function addMonth(yymm,m){      // -12 < m < 12
        if(m==0)
            return yymm;
        var year = yymm.substr(0, 4);
        var month = yymm.substr(4, 2);
        month = Number(month) + m;
        if(month > 12){
            year = Number(year) + 1;
            month = month % 12;
        }
        else if(month<1){
            year = Number(year) - 1;
            month = 12 + month;
        }
        if(month<10)
            month = "0" + month;  
        if(year>9999 || year<1000)
            throw new Error("暫不支援1000年之前和9999年之后");
        return ""+ year + month;
    }
    
    function getDateObj(day){
        return new Date(day.substr(0,4),Number(day.substr(4,2))-1,Number(day.substr(6,2)));
    }

    function getTimeObj(day){
        return new Date(
            day.substr(0,4)
            ,Number(day.substr(4,2))-1
            ,day.length>=8?Number(day.substr(6,2)):1
            ,day.length>=10?Number(day.substr(8,2)):0
            ,day.length>=12?Number(day.substr(10,2)):0
            ,day.length>=14?Number(day.substr(12,2)):0
        );
    }

    //一分鐘的毫秒數
    var MINUTE_MILLI_SECONDS = 1000 * 60;
    var HOUR_MILLI_SECONDS = MINUTE_MILLI_SECONDS * 60;
    var DAY_MILLI_SECONDS = HOUR_MILLI_SECONDS * 24;

    
    function getStrFromDate(now){
        now = now || new Date();
        var y = now.getFullYear();

        var m = "" + (now.getMonth() + 1);
        m = m.length < 2 ? "0" + m : m;

        var d = "" + now.getDate();
        d = d.length < 2 ? "0" + d : d;

        var h ="" +  now.getHours();
        h = h.length < 2 ? "0" + h : h;

        var mi ="" + now.getMinutes();
        mi = mi.length < 2 ? "0" + mi : mi;

        var s = "" +now.getSeconds();
        s = s.length < 2 ? "0" + s : s;

        var ms = "" +now.getMilliseconds();
        ms = ms.length < 3 ? "00" + ms : (ms.length < 2 ? "0" + ms : ms);

        return "" + y + m + d + h + mi + s + ms;
    }
    
    return {
        
        addMonths:function(yymm,m){
            var ym = monthsToYearAndMonth(m);
            yymm = addYear(yymm,ym.year);
            return addMonth(yymm,ym.month);
        }
   
        ,addDays:function(day,days){
            if(days==0)
                return day;
            var myDate=getDateObj(day);
            myDate.setDate(myDate.getDate()+days);
            return getStrFromDate(myDate).substr(0,8);
        }
        
        /*
        var week = dateFn.getYearWeek("20110101");      //2011-1-1:周六 第0周
        var week = dateFn.getYearWeek("20110102");      //2011-1-2:周日 第1周
        var week = dateFn.getYearWeek("20110103");      //2011-1-3:周一 第1周
        var week = dateFn.getYearWeek("20110108");      //2011-1-8:周六 第1周
        var week = dateFn.getYearWeek("20110109");      //2011-1-9:周日 第2周
        var week = dateFn.getYearWeek("20120101");      //2012-1-1:周日 第1周
        var week = dateFn.getYearWeek("20120108");      //2012-1-8:周日 第2周
        */          
        
        //獲取日期是一年中的第幾周(以一年的第一個星期日的那一天作為當年的第一周的第一天開始計算)
        ,getYearWeek:function(dayStr) { 
            var currentDay = getDateObj(dayStr);
            var firstDayOfYear = getDateObj(dayStr.substr(0,4) + "0101");
            var weekDayOffirstDayOfYear= firstDayOfYear.getDay()
            var subDays = weekDayOffirstDayOfYear?7-weekDayOffirstDayOfYear:0;
            //1000*60*60*24*7
            return Math.floor((currentDay - firstDayOfYear - subDays * 24 * 60 * 60 * 1000) / 604800000 + 1); //+1是將0轉成1,1轉成2，同時0.99變成1.99后還是1，0-0.9999 第1周，1-1.9999 第2周
        }
        
        ,getThisYear:function(){
            return getStrFromDate().substr(0,4)        
        }
        
        ,getThisMonth:function(){
            return getStrFromDate().substr(0,6)        
        }
        
        ,getToday:function(){
            return getStrFromDate().substr(0,8);
        }    
        
        ,getNow:function(){
            return getStrFromDate().substr(8,6);
        }    
        
        ,getTimeStamp:function(){
            return getStrFromDate();
        }    
        
        ,formatDate:function(dateTime){
            var ret = dateTime;
            if(dateTime){
                ret = "";
                dateTime = strFn.trim(dateTime);
                if(dateTime.length>3)
                    ret += dateTime.substr(0,4);
                if(dateTime.length>5)
                    ret += "/" + dateTime.substr(4,2);
                if(dateTime.length>7)
                    ret += "/" + dateTime.substr(6,2);
                if(dateTime.length>9)
                    ret += " " + dateTime.substr(8,2);
                if(dateTime.length>11)
                    ret += ":" + dateTime.substr(10,2);
                if(dateTime.length>13)
                    ret += ":" + dateTime.substr(12,2);
            }
            return ret;        
        }      
    
        ,formatTime:function(time,hideSeconds){
            var ret = time;
            if(time){
                ret = "";
                time = strFn.trim(time);
                if(time.length>=4)
                    ret += time.substr(0,2) + ":" + time.substr(2,2);
                if(time.length>4 && !hideSeconds)
                    ret += ":" + time.substr(4,2);
            }
            return ret;        
        }
        
        //8碼格式(要調用getDateObj和getStrFromDate這樣的Date相關的函數，所以放在里面)
        ,isDate:function(dateStr){
            var date = getDateObj(dateStr);
            return getStrFromDate(date).substr(0,8) == dateStr;
        }    
               
        ,getWeek:function(dayStr){
            if(dayStr){
                var k = getDateObj(dayStr).getDay();
                var thisWeekStart = this.addDays(dayStr,-1 * k);
                var thisWeekEnd = this.addDays(dayStr,7-k-1);
                return [thisWeekStart,thisWeekEnd];
            }
            return null;
        }   
        
        //絕對值算法（如果要除去工作日?）
        ,getTimeDiff:function(startTimeStr,endTimeStr){
            var startTime = getTimeObj(startTimeStr);
            var endTime = endTimeStr?getTimeObj(endTimeStr):new Date();
            var timespan = endTime - startTime;
            return this.getTimeSpan(timespan);
        }

        ,getTimeSpan:function(timespan){
            var totalDays = timespan / DAY_MILLI_SECONDS;
            var totalHours = timespan / HOUR_MILLI_SECONDS;
            var totalMinutes = timespan / MINUTE_MILLI_SECONDS;
            var day = Math.floor(totalDays);
            
            var dayms = day * DAY_MILLI_SECONDS;
            var hour = Math.floor((timespan - dayms) / HOUR_MILLI_SECONDS);

            var hourms = hour * HOUR_MILLI_SECONDS;
            var minute = Math.floor((timespan - dayms - hourms) / MINUTE_MILLI_SECONDS);

            var minutems = minute * MINUTE_MILLI_SECONDS;
            var second = Math.floor((timespan - dayms - hourms - minutems) / 1000);
            
            return {
                day:day
                ,hour:hour
                ,minute:minute
                ,second:second
                ,totalDays:totalDays
                ,totalHours:totalHours
                ,totalMinutes:totalMinutes
            };
        }     
          
    /*
    ,isNew:function(dayTime,newHour){
        ////debugger;
        var day = dayTime.substr(0,8);
        var today = getToday();
        if(today==day){
            var now = getNow();
            //4個小時內算new
            ////debugger;
            var startHour = Number(now.substr(0,2))-(newHour || 4);
            var dayHour = Number(dayTime.substr(8,2));
            if(dayHour > startHour)
                return true;
        }        
        return false;
    }
    
    
    ,formatDayStr:function(day){
        if(day.length>12){       //去秒
            day = day.substr(0,12);
        }
        var orgDay = day;
        var time = "";
        if(day.length>8){
            time = day.substr(8);
            day = day.substr(0,8);
        }
        var today = getToday();
        if(today==day){
            return (time?" " + formatTime(time):"");
        }
        //else if(addDays(day,1)==today)
        //    return "昨天" + (time?" " + formatTime(time):"");
        else
            return formatDateMD(orgDay);       
    }      
    
    function formatDateMD(day){
        var ret = "";
        if(day){
            var year = getToday().substr(0,4);
            if(year==day.substr(0,4)){
                var time= "";
                if(day.length>8){
                    time = day.substr(8);
                    day = day.substr(0,8);
                }
                //day = day.substr(4);
                return day.substr(4,2) + "/" + day.substr(6,2) + (time?" " + formatTime(time):"");
            }
            return formatDate(day);
        }
        return ret;        
    }      
    */
            
        
    
    };    


});