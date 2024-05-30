sjs.loadCss("Core5.Widget.MonthPicker")
.using("Core5.Container")
.using("Core5.Widget.Button")
.using("Core5.Util.DateFn")
.using("Core5.Util.StrFn")
.using("Core5.Layout.TableLayout")
.using("Core5.Widget.YearPicker")
.using("Core5.Html.Tag")
.define(function(container,btn,dateFn,strFn,tableLayout,yearPicker,tag){   
    return {
        $extend:container
        ,regUIObj:true
        ,$mixin:[tableLayout]
        ,columnCount:3          //分幾欄  
        ,cellsWidth:[47,0,90]
        
        
    //-----------------------------------初始選項--------------------------------------//
        //,month:""
        ,"-s-mp":true   
    //-----------------------------------初始化--------------------------------------//
    
        ,init:function(){
            this.$base();        
            this._initData("month");
        }
        
    //---------------------------------View相關-------------------------------------//

        ,_monthPageHtml:function(){
            var curMm = this._mm;
            var thisMm = dateFn.getThisMonth().substr(4,2);
            
            var trs = [];
            for(var i=0;i<3;i++){
                var tds = [];
                for(var j=0;j<4;j++){
                    var mm = i * 4 + j + 1;
                    if(mm<10){
                        mm = "0" + mm;        //对齐
                    }
                    tds.push({
                        tag:"td"
                        ,"-s-mp-td":true
                        ," s-overClass":"s-mp-td-over"
                        ,"-s-mp-thismonth":mm==thisMm
                        ,"-s-mp-select":mm==curMm
                        ," s-click":"setMm"
                        ," mm":mm
                        ,inner:mm
                    });
                }
                trs.push({
                    tag:"tr"
                    ,inner:tds                
                });
            }            
            var ret = {
                tag:"table"
                ," cellpadding":0
                ," cellspacing":0
                ,"-s-mp-table":true
                ,inner:trs
            };
            return tag.html(ret);
        }

        ,inner:function(){
            var yp = {
                $extend:yearPicker
                ,id:"yp"
                ,evt:"setYear"
                ,colspan:3
                ,showBottom:false
                ,yearRows:3             //有幾行
                ,thisYearAfterCount: 2   //今年的話,默認要顯示未來1年
            }
            return [
                yp
                ,{
                    tdClass:"s-mp-con"   
                    ,colspan:3
                    ,getHtml:function(oThis){
                        return oThis._monthPageHtml();
                    }                    
                }
                ,{
                    $extend:btn
                    ,size:"small"
                    ,evt:"clear"
                    ,text:"Clear"
                }
                ,{
                    tdClass:"s-mp-show"   
                    ,getHtml : function(oThis){
                        return dateFn.formatDate(oThis._month)||"&nbsp;";
                    }
                }
                ,{
                    $extend:btn
                    ,size:"small"
                    ,evt:"setThisMonth"
                    ,text:"This Month"
                }
            ];
        }
        
    //----------------------------------私有方法-------------------------------------//
        ,_setMonth:function(month,change){
            this.yp.set("year",month && strFn.trim(month) ? month.substr(0,4):dateFn.getThisYear());
            var mm = month && strFn.trim(month) ? month.substr(4,2):"";
            this.set("_mm",mm);
            //有沒有另外的地方會改變.s-mp-show，則不判斷change
            this.isRender() && this.jq(".s-mp-show").html(dateFn.formatDate(month)||"&nbsp;");
        }
        
        ,_set_mm: function(mm,change) {
            if(this.isRender() && change){
                this.jq(".s-mp-select").removeClass("s-mp-select");
                mm && this.jq("[mm='" + mm + "']").addClass("s-mp-select");
            }
        }  
    
        ,setMonth:function(month){
            this.set("month",month);
            return this;
        }

    //---------------------------------事件處理-------------------------------------//
        
        //,evt:""
        
        ,onSetMm:function(src){
            var year = this.yp.year;
            //TODO:是否如果翻過頁了，則不在這邊
            //if(year){           //年不存在時，選月無效
                var mm = src.attr("mm");
                this.set("month","" + year + mm);
                this.evt && this.report(this.evt,this.month);
            //}
        }

        ,onSetYear:function(yp,year){
            //this.set("month",year); 
            //數據完全控制UI失敗，有的時候，view就是一種狀態,即一個數據(month)可以對應多個視圖。但是當數據重新設定時，要重新恢復視圖
            this.set("_mm","");
            this.isRender() && this.jq(".s-mp-show").html("please click month...");        //沒有清空month，只是暫時將值空一下
            /*
            if(this._mm){           //因為沒有clear按鈕，所以year應該永遠不為空，這里只是一個提醒
                this.set("month","" + year + this._mm);
                this.evt && this.report(this.evt,this.month);
            }
            */
        }

        ,onSetThisMonth:function(){
            this.set("month",dateFn.getThisMonth());            
            this.evt && this.report(this.evt,this.month);
        }
        
        ,onClear:function(){
            this.set("month","");
            this.evt && this.report(this.evt,this.month);
        }     
        
       // ,month:"201304"         
    };
    
});