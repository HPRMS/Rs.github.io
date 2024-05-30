/*資料查詢*/
sjs.using("Core5.Widget.Mixin.QueryGen")
.using("Core5.Util.DataFn")
.using("Core5.Util.StrFn")
.using("Core5.Util.Service")
.define(function(queryGen,dataFn,strFn,sc){
    function sortRows(rows,sortField,sortOrder){
        if(rows && sortField){
            rows.sort(function(a,b){
                //try{
                    var x = a==null?"":a[sortField] || "";
                    var y = b==null?"":b[sortField] || "";
                    if(x<y)
                        return sortOrder=="desc"?1:-1;
                    else if(x==y)
                        return 0;
                    else
                        return sortOrder=="desc"?-1:1;
                //}
                //catch(ex){
                //    alert(JsonHelper.encode([a,b]));
                //}
            });   
        }
        return rows;
    }

    function filterRows(rows,filterFields){
        return clientFilter(rows,filterFields);
    }

    function isFilter(filterObj){
        if(filterObj){
            for(var p in filterObj){
                if(filterObj[p]!=="" && filterObj[p]!==null && typeof(filterObj[p]) != "undefined"){
                    return true;
                }
            }
        }
        return false;
    }
    
    function clientFilter(orgRows,filterObject){
        var ret = [];//.concat(this.queryRet.Rows);
        for(var i=0;i<orgRows.length;i++){
            var row = orgRows[i];
            var isMatch = true;
            for(var key in filterObject){
                var param = filterObject[key];
                var flag = "E";
                var field = key;
                var index = key.indexOf("__");
                if (index > 0)
                {
                    //G,GE,L,LE,NE,LIKE,START,END
                    flag = strFn.trim(key.substr(index + 2).toUpperCase());//.trim();
                    field = key.substr(0, key.length - flag.length - 2);    // 欄位名:如:User_ID,User_Desc
                }
                var value = row?row[field]:"";
                                            
                //無條件
                if(typeof(param)==="undefined" || param===null  || ("" + param).length==0)
                    continue;
                else if((typeof(value)==="undefined" || value===null || ("" + value).length==0 ) && flag=="NE")
                    continue;
                else{
                    if (flag == "LIKE" &&
                        ("" + value).toLowerCase().indexOf(("" + param).toLowerCase())>=0)
                            continue;
                    else if (flag == "START" && 
                        ("" + value).toLowerCase().indexOf(("" + param).toLowerCase())==0)
                            continue;
                    else if (flag == "END" &&
                        ("" + value).toLowerCase().lastIndexOf(("" + param).toLowerCase())==("" + value).length-("" + param).length)
                            continue;
                    else if (flag == "G" && value > param)
                            continue;
                    else if (flag == "GE" && value >= param)
                            continue;
                    else if (flag == "L" && value < param)
                            continue;
                    else if (flag == "LE" && value <= param)
                            continue;
                    else if (flag == "NE" && value != param)
                            continue;
                    else if(flag == "E" && value == param)
                            continue;
                }
                isMatch = false;
                break;
            }
            if(isMatch)
                ret.push(row);
        }
        return ret;
    }

    //TODO:group分組等?//多一個分組訊息(直接關聯到row比較好，因為可能會有重新排序?,不需要再分組)
    //page后重新分組
    //純粹數據模型
    var dataModel =  {
        //,sortFields:""          //整體改變的對象(可以單個，也可以多個）
        sortField:""              
        ,sortSeq:"desc"           //sortField和sortSeq可以直接綁定，但是需要外部叫用sort方法
        ,pageSize:10
        ,page:1

        ,init:function(){
            this.$base();
            //if(this.pageSize !== null){
                this._initData("pageSize",this.pageSize);      //防止null時不初始化,導致view會出現混亂
                this._initData("page");
                this._initData("totalPage",0);
                this._initData("totalCount",0);
            //}
            if(this.sortField){
                this._initData("sortField");
                this._initData("sortSeq");
            }
            this._initData("rows",[]);
        }

        ,source:null            //原始行（可以外部給定，也可以通過本身query出來）
        ,_filterRows:null       //經過篩選后的行
        ,_sortRows:null         //經過篩選，排序后的行
        ,rows:null              //經過篩選，排序，分頁后的行

        //子類override，只作_doFilter，不再設定totalCount(單獨設定)
        ,_setSource:function(source){
            this._setCountBySource && this.set("totalCount",source?source.length:0);
            this._doFilter();
        }

        ,_setCountBySource:true

        /*
        ,filterByField:true     //單獨設定filter的某個欄位時，立即filter
        ,_afterSet:function(key,value,change,oldValue,notifyFrom){
            //用這種方法，省行到時DataUI2的參數有變化
            var baseFn = this.$base("$ONLY_GET");
            baseFn.apply(this,Array.prototype.slice.call(arguments,0));

            //默認欄位改變時，不馬上query(通過button綁定query方法)
            if(this.filterByField && key.indexOf("filter.")==0){
                this._doFilter();
            }
        }
        */

        //不是外部設定，但是內部會發兩個，所以分函數進行
        ,_setTotalCount:function(totalCount){
            this._calTotalPage();
        }

        ,_setPageSize:function(pageSize){
            this._calTotalPage();
        }

        ,_calTotalPage:function(){
            var totalPage = this.pageSize ? Math.ceil(this.totalCount / this.pageSize):0;
            this.set("totalPage",totalPage);
            if(this.page > this.totalPage){
                this.set("page",this.totalPage || 1);       //保證page>1
            }
        }

        //可通過setFilter方法整個綁定，但應該沒有這樣的東東(filter直接綁定到哪個對象)
        //請手動在set("filter",filterObj)后，再call,this.doFilter，或者也可以不call,等用戶查詢后直接套用filter條件過濾
        //,_setFilter:function(){
        //    this._doFilter();
        //}

        ,doFilter:function(){
            this._doFilter();
        }

        //先測試mvvm雙向綁定
        ,doSort:function(){
            this._doSort();
        }

        ,doPage:function(){
            this._doPage();
        }

//        ,_setPage:function(value,change,oldValue,key,notifyFrom){
//            //照常處理，在資料查詢出來后，會重新處理
//            //if(this.page > this.totalPage){         //UI端發過來的page大于totalpage
//            //    this.set("page",this.totalPage);    //考慮mvvm過來的page，要在這里進行管控(非數字要不要管控)
//            //}
//            //else{
//                //如果這個page的改變是因為page > totalPage，則不要再進行，否則會死循環。只需要UI作變更即可
//                if(notifyFrom != "NOTICE_VIEW"){
//                    this._noticePage();
//                }
//            //}
//        }

//        ,_setPagesize:function(value,change,oldValue,key,notifyFrom){
//            if(notifyFrom != "NOTICE_VIEW"){
//                this._noticePage();
//            }
//        }

//        ,_noticePage:function(){
//            this._doPage();
//        }

        ,_doFilter:function(){
            this._filterRows = this._needFilter()
                ?filterRows(this.source,this.filter)
                :this.source;
            this._doSort();
        }

        ,_needFilter:function(){
            return this.source && this.filter && isFilter(this.filter);
        }

        ,_doSort:function(){
            this._sortRows = this._needSort()
                ?sortRows([].concat(this._filterRows),this.sortField,this.sortSeq)
                :this._filterRows;
            this._doPage();
        }

        ,_needSort:function(){
            return this._filterRows && this.sortField;
        }

        ,_doPage:function(){
            //這里的page不會等于0，因為等于0是因為pageSize等于0或者totalCount為0
            this.set("rows",this._needPage()
                ?this._sortRows.slice(this.pageSize * (this.page-1),this.pageSize * this.page)
                :this._sortRows);
        }

        ,_needPage:function(){
            return this._sortRows && this.totalCount && this.pageSize;
        }
    };

    return {
        $extend:dataModel
        ,$mixin:[queryGen("list")]
        //,pageClient:false       //是否分頁在client進行
        //,sortClient:false

        /*
        //如果一個查詢service.method
        //請將參數設定為這個
        listQuerySql類型，null則無這個參數
        ,Dictionary<string,object>(queryObj返回null則沒有)
        ,string(sortField為null或空則沒有)
        ,int(pagesize),int(pagesize)(pageSize ==0則沒有)
        */



        ,initQuery:false
        ,init:function(){
            this.$base();
            this._setCountBySource = !this._pageServer();
            this.set("condition",this._initQueryCondition());
            this.set("filter",this._initFilter());
            this._initData("condition");
            this._initData("queryStatus",0);
            this._initData("queryError",null);
            this.initQuery && this.doQuery();
        }

        //因為直接用condition當配置，那么這個DataList在繼承使用時，condition會在多個UI中共用，造成很大的問題，因此改用initCondition加deepCopy處理
        ,_initQueryCondition:function(){
            return typeof(this.initCondition) != "undefined" ? (this.initCondition ? dataFn.deepCopy(this.initCondition):null) : {};          //默認有這個參數，如果沒有，請用null代替
        }

        ,_initFilter:function(){
            return typeof(this.initFilter) != "undefined" ? (this.initFilter ? dataFn.deepCopy(this.initFilter):null) : null;          //默認有這個參數，如果沒有，請用null代替
        }

        //不使用這queryByField，field變更后，不進行查詢，要顯示調用query。這樣就不要在查詢出錯時恢復，因為恢復又要user
        //重新輸入條件，很麻煩
        /*
        //,queryByField:true     //單獨設定filter的某個欄位時，立即filter
        ,_afterSet:function(key,value,change,oldValue,notifyFrom){
            //用這種方法，省行到時DataUI2的參數有變化
            var baseFn = this.$base("$ONLY_GET");
            baseFn.apply(this,Array.prototype.slice.call(arguments,0));

            //默認欄位改變時，不馬上query(通過button綁定query方法)
            if(this.queryByField && key.indexOf("condition.")==0){
                this.query();
            }
        }
        */
        ,checkQuery:function(condition){
            return null;
        }

        ,doQuery:function(){
            this._initQuery = true;
            var error = this.checkQuery ? this.checkQuery(this.condition) :null;     //查詢前端條件稍微管控，后臺應該也要有管控
            this.set("conError",error);
            if(!error){
                this.set("queryStatus",1);
                this.listQuery();
            }
            else{
                //nowTranReport is for tran excel, no write here,but many report program has this bug already(if tran excel checkQuery fail,then click query button will download)
                //Andrie 2016.3.11
                this.nowTranReport = false;
            }
        }

        ,doExcel:function(){
            var error = this.checkQuery ? this.checkQuery(this.condition) :null;     //查詢前端條件稍微管控，后臺應該也要有管控
            this.set("conError",error);
            !error && this.listExcel();
        }

        ,listQueryArgs : function(args,sort,pagesize,page,excel){
            var ret = [];
            typeof(this.listQuerySql) != "undefined" && this.listQuerySql !== null && ret.push(this.listQuerySql);       //可以設定第一個參數
            this.condition && ret.push(this.condition);
            !this.sortClient && this.sortField && ret.push(this.sortField + " " + this.sortSeq);
            if(this._pageServer()){      
                ret.push(excel?0:this.pageSize);
                ret.push(this.page);
            }
            if(excel){
                var service = this.listQueryService + "." + this.listQueryMethod;
                var uiService = sc.isUIService(service,ret);
                if(uiService && uiService.indexOf("PCI.Eng.")<0){
                    ret.push(this);
                }
            }

            return ret;
        }

        ,_pageServer:function(){
            //0也可以傳過去，因為服務端要參數，但是會自己處理pageSize 0的情況
            //如果既不要pageClient，也不要pageSever，則pageClient:false,pageSize:null
            return !this.pageClient && typeof(this.pageSize) =="number";
        }

        //,refreshEvt:""

        //如果需要對ret進行改造，請直接override這個方法，修改后再調用進來
        ,listQueryResult:function(ret){
            this.set("queryStatus",0);
            this.set("queryError",null);
            var pageServer = this._pageServer();
            //放在前面,因為rows中的rowIndex要用到page.除非那邊要回應_setTotalCount事件手動改
            pageServer && this.set("totalCount",ret.Count);
            this.set("source",pageServer?ret.Rows:ret);
            this.refreshEvt && this.report(this.refreshEvt,ret);
        }
        
        //查詢出錯
        ,listQueryError:function(result){
            this.set("queryStatus",0);
            this.set("queryError",result.Message);          
            //如果出錯，則現在的source,和pageSize,page,sortField,sortSeq可能不一致
            //但是這里不管，則UI決定顯示這種不一致（如彈出一個夾層，只有一個重試按鈕），還是不作任何處理，不一致就不一致
        }

        //override functions
        ,doSort:function(){
            this.sortClient ? this.$base() : (this._initQuery?this.doQuery():"");
        }

        ,doPage:function(){
            this.pageClient ? this.$base() : (this._initQuery?this.doQuery():"");
        }

        ,_needSort:function(){
            return this.sortClient && this.$base();
        }

        ,_needPage:function(){
            return this.pageClient && this.$base();
        }
    };
});
