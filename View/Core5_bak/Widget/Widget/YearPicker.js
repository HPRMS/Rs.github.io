sjs.loadCss("Core5.Widget.YearPicker")
.using("Core5.Container")
.using("Core5.Widget.Button")
.using("Core5.Util.DateFn")
.using("Core5.Layout.TableLayout")
.using("Core5.DomEvent.onmouseclass",true)
.using("Core5.Html.Tag")
//.using("Core5.Bind.BindTarget")
.define(function(container,btn,dateFn,tableLayout,tag){//,bindTarget) {
    function getPageStartYear(yearRows,yearColumns,thisYearAfterCount,curYear) {
        var thisYear=dateFn.getThisYear();
        var totals=yearRows*yearColumns;
        var startYear=Number(thisYear)-totals+thisYearAfterCount+1;
        if(curYear) {
            var startPage=Math.floor((curYear-startYear)/totals);      //現在應該在哪個版面上
            return Number(startYear)+startPage*totals;
        }
        return startYear;
    }

    return {
        $extend: container
        ,regUIObj:true
        ,$mixin: [tableLayout]
        ,columnCount: 4          //分幾欄  
        ,cellsWidth:[52,0,50,52]
        
        ,showBottom: true
        ,yearRows: 5             //有幾行
        ,yearColumns: 4          //有幾列
        ,thisYearAfterCount: 5   //今年的話,默認要顯示未來5年

        //-----------------------------------初始選項--------------------------------------//
        
        //,year: ""
        ,"-s-yp": true
        
        //-----------------------------------初始化--------------------------------------//

        ,init: function() {
            this.$base();
            this._initData("year");
        }

        //---------------------------------View相關-------------------------------------//
        

        ,_yearPageHtml:function() {
            var yearRows = this.yearRows;
            var yearColumns = this.yearColumns;
            var startYear = this._startYear;
            var curYear = this.year;
            var thisYear=dateFn.getThisYear();
            
            var trs = [];
            for(var i=0;i<yearRows;i++){
                var tds = [];
                for(var j=0;j<yearColumns;j++){
                    var year=startYear+i*yearColumns+j;
                    tds.push({
                        tag:"td"
                        ,"-s-yp-td":true
                        ," s-overClass":"s-yp-td-over"
                        ,"-s-yp-thisyear":year==thisYear
                        ,"-s-yp-select":year == curYear
                        ," s-click":"setYear"
                        ," year":year
                        ,inner:year
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
                ,"-s-yp-table":true
                ,inner:trs
            };
            
            return tag.html(ret);
        }
        
        
        ,inner: function() {
            var ret =[
                {
                    $extend: btn
                    ,icon: "backward"
                    ,size: "small"
                    ,evt: "AddStartYear"
                    ,plus: -1
                }
                ,{
                    $extend: btn
                    //,$mixin:[bindTarget]
                    //,"@text":"_startYear"
                    //,bindTextFrom:function(startYear){
                    //    var p = this.parent;
                    //    return startYear+"~"+(startYear+p.yearRows*p.yearColumns-1);
                    //}
                    ,id: "yymmBtn"
                    ,text: "&nbsp;"
                    ,size: "small"
                    ,colspan: 2
                    ," s-overClass":false
                    ," s-downClass": false
                    ,";cursor":"default"
                }
                ,{
                    $extend: btn
                    ,rightIcon: "forward"
                    ,size: "small"
                    ,evt: "AddStartYear"
                    ,plus: 1
                }
                ,{
                    tdClass: "s-yp-con"
                    ,colspan: 4
                    ,getHtml : function(oThis){
                        return oThis._yearPageHtml();
                    }                    
                }
            ];

            if(this.showBottom) {
                ret=ret.concat([
                    {
                        $extend: btn
                        ,size: "small"
                        ,evt: "clear"
                        ,text: "Clear"
                    }
                    ,{
                        tdClass: "s-yp-show"
                        ,getHtml : function(oThis){
                            return oThis._year || "&nbsp;";
                        }                        
                    }
                    ,{
                        $extend: btn
                        ,size: "small"
                        ,evt: "setThisYear"
                        ,text: "This Year"
                        ,colspan: 2
                    }
                ]);
            }
            return ret;
        }
        
        //----------------------------------公開方法-------------------------------------//

        
        
        //----------------------------------私有方法-------------------------------------//
        //因為_startYear依賴于this.year，因此this.year如果沒有變化，默認情況下，也動不了_startYear，而_startYear如果有改變，就會造成數據與視圖不一致
        //因此會有下面這個方法的override，其它同datepicker中的yymm依賴于day,text中的text依賴于value一樣，都是一樣的道理，需要override此類進行
        ,_setYear:function(year,change){
            var startYear=getPageStartYear(this.yearRows,this.yearColumns,this.thisYearAfterCount,year || "");
            //只有這一個地方控制.s-yp-show,所以要判斷change
            change && this.isRender() && this.jq(".s-yp-show").html(year || "&nbsp;");
            if(this._startYear != startYear){      //如果有改變startYear，則下面的year不管有沒有變都不管了
                this.set("_startYear",startYear);
            }
            else if(change && this.isRender()){
                this.jq(".s-yp-select").removeClass("s-yp-select");
                this.jq("[year='" + year + "']").addClass("s-yp-select");
            }
        }
        
        ,_set_startYear:function(startYear,change) {
            if(change){
                this.yymmBtn.setText(startYear+"~"+(startYear+this.yearRows*this.yearColumns-1));
                this.isRender() && this.jq(".s-yp-con").html(this._yearPageHtml());
            }
        }

        //---------------------------------事件處理-------------------------------------//
        //,evt:""

        ,onAddStartYear: function(src) {
            this.set("_startYear",this._startYear+this.yearRows*this.yearColumns*Number(src.plus));
        }

        ,onSetYear: function(src) {
            this.set("year",src.attr("year"));
            this.evt && this.report(this.evt,this.year);
        }

        ,onSetThisYear: function() {
            var thisYear=dateFn.getThisYear();
            this.set("year",thisYear);
            this.evt && this.report(this.evt,this.year);
        }

        ,onClear: function() {
            this.set("year","");
            this.evt && this.report(this.evt,"");
        }
        
        //,year:"2012"
    };

});