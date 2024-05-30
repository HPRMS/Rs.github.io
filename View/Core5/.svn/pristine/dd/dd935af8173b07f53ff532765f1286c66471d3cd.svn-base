sjs.loadCss("Core5.Widget.Ability.ActionInfoWin")
.using("Core5.Component")
.using("Core5.Util.DateFn")
.define(function(component,dateFn){
    
    return {
        $extend:component
        ,"-s-prompt-con":true
        ,iconPath:"./Core5/Widget/Ability/ActionInfoWin/"
        ,inner:function(){
            return [
                "<div class='s-prompt-img'><img src='" + this.iconPath + "warn.gif' class='s-prompt-icon'></div>"
                ,"<div class='s-prompt-main'>"
                ,"<div class='s-prompt-line1'></div>"
                ,"<div class='s-prompt-con-msg'></div>"
                //,"<div class='s-prompt-line3'></div>"
                //,"<a href='#' s-click='start'>start</a>&nbsp;&nbsp;<a href='#' s-click='ok'>ok</a>&nbsp;&nbsp;<a href='#' s-click='error'>error</a>"
                ,"</div>"
            ];
        }

        ,msgs:{
            "start":"正在執行，請稍候(如果系統長時間無反應，請聯繫系統人員)<font class='time-font'></font><font class='dot-font'></font><br>Please wait and do not exit program(If system has no response for a long time,please contact system manager)"
            ,"ok":"執行成功(Successfully)，共花費時間(Time Spend)：<font class='time-font2'></font>"
            ,"error":"很抱歉，發生了一些問題，請重試或稍候再試，如果問題仍然存在，請聯繫系統人員<br>Please try again or refresh this page,if error come up again,pls contact IT department(3070)!"
        }

        
        ,_updateTime:function(){
            this._seconds++;
            var s =this._seconds;
            var dotStr =  s % 3==1?".":(s%3==2?"..":"...");
            if(s==1 || s % 2 == 0){
                var timeStr = this._getTimeStr(s); 
                this.jq(".time-font").html(timeStr);
            }
            this.jq(".dot-font").html(dotStr);
            if(this._updateTime && this.status=="start"){
                var oThis = this;
                window.setTimeout(function(){
                    oThis._updateTime();
                    oThis = null;
                },500);
            }
        }

        ,_getTimeStr:function(s){
            var ts = dateFn.getTimeSpan(s * 500);
            var timeStr = 
                (ts.day?"&nbsp;" + ts.day + "Day":"")
                + (ts.day || ts.hour?"&nbsp;" + ts.hour + ":":"")
                + ( (ts.minute<10?"0":"") + ts.minute + ":" + (ts.second<10?"0":"") + ts.second);
            return timeStr;
        }

        ,_setStatus:function(status,change,oldStatus){
            oldStatus && this.removeClass("status-" + oldStatus);
            this.addClass("status-" + status);
            if(this.isRender()){
                if(status=="start"){
                    this._seconds = 0;
                    this._updateTime();
                }
                this.jq(".s-prompt-icon").attr("src",this.iconPath + (status=="ok"?"success.gif":(status=="error"?"fail.gif":"info.gif")));
                this.jq(".s-prompt-line1").html(this.msgs[status]);
                //this.jq(".s-prompt-line3").html(this.msgs[status][1]);
                if(status=="ok"){
                    this.jq(".time-font2").html(this._getTimeStr(this._seconds));
                }
            }
        }

        ,_setMsg:function(msg){
            this.isRender() && this.jq(".s-prompt-con-msg").html(msg);
        }

        ,regUIObj:true

        ,onStart:function(){
            this.set("status","start");
        }

        ,onOk:function(){
            this.set("status","ok");
        }

        ,onError:function(){
            this.set("status","error");
        }
    };
});