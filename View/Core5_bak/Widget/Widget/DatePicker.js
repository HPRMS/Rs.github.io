sjs.loadCss("Core5.Widget.DatePicker")
.using("Core5.Container")
.using("Core5.Widget.Button")
.using("Core5.Util.DateFn")
.using("Core5.Util.StrFn")
.using("Core5.Html.DatePicker")
.using("Core5.Layout.TableLayout")
.using("Core5.Widget.MonthPicker")
.using("Core5.Widget.Panel")
.using("Core5.Widget.Ability.Pop")
.using("Core5.Cls")
.using("Core5.Html.Tag")
.define(function(container,btn,dateFn,strFn,dp,tableLayout,monthPicker,panel,pop,cls,tag){
    //所有datePicker共用一個，其實全部都可以共用一個，算了，不復雜化了，儘量減少全局變量
    //var mp = monthPicker.create();      //單例類
    var mp = null;      //暂不考虑释放，1是小，二是通过实例类全部没有的方式释放，有可能翻下一页又需要了，反复创建和销毁还不如不销毁
    return {
        $extend:container
        ,regUIObj:true
        ,$mixin:[tableLayout,dp]
        ,columnCount:6          //分幾欄顯        
        ,cellsWidth:[26,26,0,18,26,26]
    //-----------------------------------初始選項--------------------------------------//
        //,day:""
        ,"-s-dp":true
    //-----------------------------------初始化--------------------------------------//
        /*
        _overTag:"td",
        _currentText:"Today",
        */
        
        ,init:function(){
            this.$base();        
            this._initData("day");
        }
       /*         
        ,_formatShow:function(){
            return dateFn.formatDate(this._day);
        }
        
        ,_getShowText:function(){
            var day = this._formatShow();
            return '<div title="' + (day?"current select:" + day:"please click to select") + '">' + (day || "&nbsp;") + '</div>';
        }    
        */
    //---------------------------------View相關-------------------------------------//
        //,showWeek:true
        
        ,_datePageHtml:function(){
            var ret= this._dp(this._yymm);
            return tag.html(ret);
        }
        
        //直接mixin到一起來，是為了實例化時還可以override dp中的函數，雖然對于這個日曆選擇器來說很少
        ,_dpTd:function(dayStr,dayInMonth,weekEnd,today,notThisMonth){
            var ret = this.$base(dayStr,dayInMonth,weekEnd,today,notThisMonth);
            ret[" s-overClass"] = "s-dp-over";
            ret["-s-dp-select"] = dayStr == this.day;
            ret[" s-click"] = "setDay";
            ret[" day"] = dayStr;
            return ret;
        }    
        
        ,inner:function(){
            var yymm = this._yymm;
            var day = this._day;
            return [
                {
                    $extend:btn
                    ,icon:"backward"
                    ,size:"small"
                    ,evt:"addMonth"
                    ,months:-12
                }
                ,{
                    $extend:btn
                    ,icon:"chevron-left"
                    ,size:"small"
                    ,evt:"addMonth"
                    ,months:-1
                }
                ,{
                    $extend:btn
                    ,id:"yymmBtn"
                    ,text:"&nbsp;"         //button初始化時text必須有值，除非以后也不賦值
                    ,size:"small"
                    ,evt:"yymm"
                    ,colspan:2
                }
                ,{
                    $extend:btn
                    ,icon:"chevron-right"
                    ,size:"small"
                    ,evt:"addMonth"
                    ,months:1
                }
                ,{
                    $extend:btn
                    ,icon:"forward"
                    ,size:"small"
                    ,evt:"addMonth"
                    ,months:12
                }
                ,{
                    tdClass:"s-dp-con"   
                    ,colspan:6
                    ,getHtml:function(oThis){
                        return oThis._datePageHtml();
                    }                    
                }
                ,{
                    $extend:btn
                    ,size:"small"
                    ,evt:"clear"
                    ,colspan:2                  
                    ,text:"<i zh='清空'>Clear</i>"
                }
                ,{
                    tdClass:"s-dp-show"   
                    ,getHtml:function(oThis){
                        return dateFn.formatDate(oThis.day) || "&nbsp;";
                    }                    
                }
                ,{
                    $extend:btn
                    ,size:"small"
                    ,evt:"setToday"
                    ,colspan:3                    
                    ,text:"<i zh='今天'>Today</i>"
                }
            ];
        }
        
        
        /*
        updateUI:function(){
            ////debugger
            this.yymmBtn.setText(dateFn.formatDate(this._yymm));
            if(this.isRender()){
                this.jq(".s-dp-show").html(this._getShowText());
                this.jq(".s-dp-con").html(dpHtml(this._yymm,this._day,this.showWeek,this.dpClass,this._overTag));
            }
        },*/
    //----------------------------------私有方法-------------------------------------//
        ,_setDay:function(day,change){
            var yymm = day && strFn.trim(day)?day.substr(0,6):dateFn.getThisMonth();
            this.isRender() && change && this.jq(".s-dp-show").html(dateFn.formatDate(day) || "&nbsp;");
            if(yymm != this._yymm){
                this.set("_yymm",yymm);
            }
            else if(change && this.isRender()){
                this.jq(".s-dp-select").removeClass("s-dp-select");
                this.jq("[day='" + day + "']").addClass("s-dp-select");
            }
        }
        
        ,_set_yymm: function(yymm,change) {
            if(change){
                this.yymmBtn.setText(dateFn.formatDate(yymm));
                this.isRender() && this.jq(".s-dp-con").html(this._datePageHtml());
            }
        }    
    
        ,setDay:function(day){
            this.set("day",day);
            return this;
        }
    
    //---------------------------------事件處理-------------------------------------//
        
        ,evt:""

        ,onAddMonth:function(btn){ 
            var month = btn.months;
            this.set("_yymm",dateFn.addMonths(this._yymm,month));
        }
        
        ,_reportDayEvt:function(){
            this.evt && this.report(this.evt,this.day);
        }
        
        ,onSetDay:function(src){
            this.set("day",src.attr("day"));
            this._reportDayEvt();
        }
         
        ,onSetToday:function(){
            var today = dateFn.getToday();
            this.set("day",today);
            this._reportDayEvt();
        }
        
        ,onClear:function(){
            this.set("day","");
            this._reportDayEvt();
        }
        
        ,onYymm:function(){
            if(!mp){
                mp = cls.create(panel,pop,{
                    inner:{
                        $extend:monthPicker
                        ,";border-width":"1px 0 0 0"
                        ,";border-color":"#D0D0D0"
                        ,";border-style":"solid"
                        ,evt:"setYymm"
                        ,id:"picker"
                        //,";width":"100%"
                        //,mbpWidth:0         //因為本身有setWidth，所以會自動傳遞，mpbWidth 0 override默認有border1的樣式
                        //,width:this.getWidth()
                        //因为是pop，选年的时候不要当作选择
                        ,onSet:function(yp,year){
                            this._month = "";
                            this._year = year;
                            this.updateUI();
                        }
                    }
                    ,title:"<i zh='請選擇年月...'>please select month...</i>"
                    ,icon:"th"
                }).renderTo("body",true);
            }
            mp.picker.setResponser(this).set("month",this._yymm);
            var thisJq = this.jq();
            var offset = thisJq.offset();
            mp.css("width", thisJq.width() + "px").move(offset.left,offset.top).show();
        }

        ,onSetYymm:function(monthPicker,yymm){
            if(yymm){               //clear不要回應
                this.set("_yymm",yymm);
                mp.hide();         //這些地方不用，因為是從子控件的report，或自身事件的click過來的調用
            }
        }

        //,day:"20130205"       //測試使用
    };
    
});