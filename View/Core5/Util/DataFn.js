/*數據類函數*/
sjs.using("Core5.Util.NumberCal")
.define(function(cal){
    //將字符串描述的排序方式，轉為數組方式
    //如"VEND_NO,IMPUR_DATE desc,PURD_NO desc,PURD_SEQ"表示按供應商，訂購日期(倒序)，訂單號(倒序)，項次排
    //相同的供應商時，訂購日期越新的越在前面，日期相同時，單號越大的在前面(訂單越新),最后同張訂單內按項次排
    function sortAryFromStr(sortStr){
        if(sortStr){
            var sortStrs = sortStr.split(",");
            var sortFields = [];
            var sortOrders = [];
            for(var i=0;i<sortStrs.length;i++){
                var sortFieldExp = sortStrs[i].split(" ");
                var sortField = sortFieldExp[0];
                var sortOrder = "asc";
                if(sortFieldExp.length>1)
                    sortOrder = sortFieldExp[1];
                sortFields.push(sortField);                        
                sortOrders.push(sortOrder);   
            }      
            return [sortFields,sortOrders];
        }   
        return null;   
    }
    
    //DB存儲類型:char,varchar,number(decimal),即js的string和number類型
    //兩者都可能存在null值
    //null和number比較時，null轉成0
    //null和string比較時，null轉成""(空字符串)
    //char類型不去空格比較
    //除了DB外，其它服務端或客戶端產生的數據也是這兩種類型，但是row有可能為null，以及field在row中不存在，即為undefined值
    function cmpFieldValue(row1,row2,field,order){
        var x = row1 && row1[field];
        var y = row2 && row2[field];
        if(typeof(x)=="undefined" || x === null)
            x = typeof(y)=="string"?"":0;
        if(typeof(y)=="undefined" || y === null)
            y = typeof(x)=="string"?"":0;
            
        if(x==y)
            return 0;
        else if(x<y)
            return order=="desc"?1:-1;
        else// if(x>y)      //如果兩者數據類型不一致，如出現一個1和"a"這樣的數據，則隨便給一個不同的值
            return order=="desc"?-1:1;
    }
     
    function deepCopy(o,noMeta) {
        if(typeof(o)!="undefined" && o!==null && typeof(o)=="object"){
            if(!o.push){
                var ret = {};
                for(var p in o){
                    if(noMeta && p[0] == "$"){
                        ret[p] = o[p];
                    }
                    else{
                        ret[p] = deepCopy(o[p],noMeta);
                    }
                }
                return ret;    
            }
            else{
                var ret = [];
                for(var i=0;i<o.length;i++)
                    ret.push(deepCopy(o[i],noMeta));
                return ret;
            }
        }
        return o;
    };
        
    //用c override ret,c不變，ret變
    function apply(ret,c) {
        if(c){
            for(var p in c) {
                ret[p]=c[p];
            }
        }
        var args=Array.prototype.slice.call(arguments,2);
        if(args.length>0) {
            for(var i=0;i<args.length;i++){
                apply(ret,args[i]);
            }
        }
        return ret;
    }
    
    function mixin(o,c) {
        var ret={};
        for(var p in o) {
            ret[p]=o[p];
        }
        var args=Array.prototype.slice.call(arguments,1);
        if(args.length>0){
            args.unshift(ret);
            apply.apply(null,args);
        }
        return ret;
    }    


    function rowKey(row,fields,fieldSpliter){
        var ret = "";
        for(var i=0;i<fields.length;i++){
            ret += (i?fieldSpliter || ",":"") + (row[fields[i]] || "");
        }
        return ret;
    }

    function _sumRows(rows,fieldNo){
        var ret = 0;
        if(rows){
            for(var i=0;i<rows.length;i++){
                ret = cal.add(ret,rows[i][fieldNo]);
            }
        }
        return ret;
    }

    function groupSumRows(rows,calField,groupRow){
        var calFieldNo = calField.calFieldNo || calField.fieldNo;
        return _sumRows(rows,calFieldNo);
    }

    function groupCountRows(rows,calField,groupRow){
        return rows.length;
    }

    function groupAvgRows(rows,calField,groupRow){
        var calFieldNo = calField.calFieldNo || calField.fieldNo;
        var total =  _sumRows(rows,calFieldNo);
        var power = Math.pow(10,typeof(calField.decimalCount)=="undefined"?2:calField.decimalCount || 0);
        return Math.round(power * total / rows.length) / power;       //保留小數點
    }

    function groupRateRows(rows,calField,groupRow){
        var numerator = 0;          //分子
        var denominator = 0;        //分母

        if(calField.caledFieldNo1){
            numerator = groupRow[calField.caledFieldNo1];
        }
        else{
            numerator = _sumRows(rows,calField.calFieldNo1);
        }

        if(calField.caledFieldNo2){
            denominator = groupRow[calField.caledFieldNo2];
        }
        else{
            denominator = _sumRows(rows,calField.caledFieldNo2);
        }

        if(denominator){
            var power = Math.pow(10,(typeof(calField.decimalCount)=="undefined"?2:calField.decimalCount || 0));// + (calField.noRate ?2:0));     //noRate，百分比用89%表示，所以值是89，而不是0.89
            return Math.round(power * (calField.noRate ?100:1) * numerator / denominator) / power;       //保留小數點
        }
        return 0;
    }

    var _groupFn = {
        "sum":groupSumRows
        ,"count":groupCountRows
        ,"count distinct":null
        ,"average":groupAvgRows     //如果表達式，可以自定義計算。如兩個欄位相除
        ,"rate":groupRateRows       //放在最后面計算，這樣可以直接利用groupRow中算好的值
    };

        
    return {
        deepCopy:deepCopy
        
        ,apply:apply
        
        ,mixin:mixin
        
        ,select:function(rows,matchFields){
            if(rows){
                var ret = [];
                for(var i=0;i<rows.length;i++){
                    var isMatch = true;
                    for(var p in matchFields){
                        if(rows[i][p] !== matchFields[p]){
                            isMatch = false;
                            break;
                        }
                    }
                    if(isMatch){
                        ret.push(rows[i]);
                    }                    
                }
                //if(ret.length>0){
                    return ret;
                //}
            }
            return null;
        },

        pager:function(rows,pagesize,page){
            return rows?rows.slice(pagesize * (page-1),pagesize * page):rows;
        },

        distinctValues:function(rows,field){
            var ret = [];
            if(rows){
                var keyDic = {};
                for(var i=0;i<rows.length;i++){
                    var row = rows[i];
                    var key = row[field];
                    if(!keyDic[key]){
                        keyDic[key] = 1;
                        ret.push(key);
                    }
                }
            }
            return ret;
        },
        
        distinct:function(rows,fields,splitChar,keyDic){
            if(rows){
                var ret = [];
                keyDic = keyDic || {};
                for(var i=0;i<rows.length;i++){
                    var row = rows[i];
                    var key = "";
                    for(var j=0;j<fields.length;j++){
                        key += (key?splitChar || ",":"") + row[fields[j]];
                    }
                    if(!keyDic[key]){
                        var addRow = rows[i];
                        keyDic[key] = addRow;
                        ret.push(addRow);
                    }
                }
                return ret;
            }
            return null;
        },
        
        getRowByField:function(rows,field,value){
            if(rows){
                for(var i=0;i<rows.length;i++){
                    if(rows[i][field] == value){
                        return rows[i];
                    }
                }
            }
            return null;
        },
    
        getRowByFields:function(rows,fields){
            if(rows){
                for(var i=0;i<rows.length;i++){
                    var isMatch = true;
                    for(var p in fields){
                        if(rows[i][p] !== fields[p]){
                            isMatch = false;
                            break;
                        }
                    }
                    if(isMatch){
                        return rows[i];
                    }
                }
            }
            return null;
        },
        
        indexOf:function(ary,item,field){
            if(ary){
                for(var i=0;i<ary.length;i++){
                    if((field?ary[i][field]:ary[i]) == item){
                        return i;
                    }
                }
            }
            return -1;
        },
        
        lastIndexOf:function(ary,item,field){
            if(ary){
                for(var i=ary.length-1;i>=0;i--){
                    if((field?ary[i][field]:ary[i]) == item){
                        return i;
                    }
                }
            }
            return -1;
        },

        remove:function(ary,item,field){
            if(ary){
                var index = this.indexOf(ary,item,field);
                if(index>=0){
                    ary.splice(index,1);
                    return index;
                }
            }
            return -1;
        },
        
        compareAry:function(ary1,ary2){
            if(ary1 && ary2){
                if(ary1.length != ary2.length){
                    return false;
                }
                for(var i=0;i<ary1.length;i++){
                    if(this.indexOf(ary2,ary1[i])==-1){
                        return false;
                    }
                }                
                return true;
            }
            else if(!ary1 && !ary2){
                return true;
            }
            else if(!ary1 && ary2.length==0){
                return true;
            }
            else if(!ary2 && ary1.length==0){
                return true;
            }
            return false;
        },
        
        //sort是sort，group是group，要不要sort由客戶端程式定，但一般都在服務端完成sort(sql中排序簡單又高效)
        sort:function(rows,sortFields,sortOrders){
            if(typeof(sortFields)=="string"){
                var ary = sortAryFromStr(sortFields);
                if(ary){
                    sortFields = ary[0];
                    sortOrders = ary[1];
                }
            }
            
            if(rows && sortFields && sortFields.length){
                var sortFn = function(a,b,i){
                    i = i || 0;
                    if(i>=sortFields.length)
                        return 0;
                    var sortField = sortFields[i];
                    var sortOrder = sortOrders && sortOrders[i]?sortOrders[i]:"asc";
                    
                    var ret = cmpFieldValue(a,b,sortField,sortOrder);
                    if(ret==0)
                        return sortFn(a,b,i+1);
                    return ret;
                }                    
                rows.sort(sortFn);   
            }
        }, 
        
        rowsToDic:function(rows,keyFields,splitChar){
            var ret = {};
            if(rows){
                for(var i=0;i<rows.length;i++){
                    var key = "";
                    for(var j=0;j<keyFields.length;j++){
                        key += (key.length>0?(splitChar || "|"):"") + rows[i][keyFields[j]];
                    }
                    ret[key] = rows[i];
                }
            }
            return ret;
        },
        
        //資料直接以json格式長成，為統一循環方式，將這個數據重新轉換成統一格式
        loopDic:function(dicRows,itemsField,context,leafFn,levelFn){
            if(dicRows){
                //轉成統一的格式
                var allRows = [];
                var levels = [];
                for(var i=0;i<dicRows.length;i++){
                    this._fillDicLevel(allRows,itemsField,levels,dicRows[i]);
                }
                
                this._loopLevelItems(allRows,"",levels,1,"",0,context,leafFn,levelFn);                
            }
        },
        
        _fillDicLevel:function(allRows,itemsField,levels,row){
            var rowIndex = allRows.length;
            allRows.push(row);
            var level = {rowIndex:rowIndex};
            levels.push(level);
            var rowItems = row[itemsField];
            if(rowItems){
                var subLevels = [];
                level.items = subLevels;
                for(var i=0;i<rowItems.length;i++){
                    this._fillDicLevel(allRows,itemsField,subLevels,rowItems[i]);
                }
            }
        },
        
        _loopLevelItems:function(rows,levelFields,items,level,parentLevel,parentLength,context,leafFn,levelFn){
            for(var i=0;i<items.length;i++){
                var item = items[i];
                var seq = i+1;
                if(item.items){
                    levelFn = levelFn || leafFn;
                    levelFn.call(context,rows,levelFields,item,level,seq,parentLevel,parentLength,false);
                    var nextLevel = parentLevel + (parentLevel?".":"") + seq;
                    this._loopLevelItems(rows,levelFields,item.items,level+1,nextLevel,item.items.length,context,leafFn,levelFn);
                    levelFn.call(context,rows,levelFields,item,level,seq,parentLevel,parentLength,false,true);
                }
                else{
                    leafFn.call(context,rows,levelFields,item,level,seq,parentLevel,parentLength,true);
                }
            }
        },
        
        loopLevel:function(rows,levelFieldsStr,context,leafFn,levelFn,cmpRowFn){
            var levelFields = this.initLevelFields(levelFieldsStr)
            var levels = this.levelRows(rows,levelFields,cmpRowFn);
            if(levels){
                this._loopLevelItems(rows,levelFields,levels,1,"",0,context,leafFn,levelFn);
            }
        },
    
        //rows已經排好序，已調用sort方法或服務器查回來的資料已排序
        //levelFields:格式如VEND_NO+IMPUR_DATE,PURD_NO,表示先按vend_no和impur_date分組，再按purd_no分組
        //可以多層group，每個層可以依一個欄位或者多個欄位分組(一般描述性欄位不在這里做,如SEC_NO分組就好了,SEC_NAME沒必要再分，只是顯示即可)
        //返回的格式為[{rowIndex:0,items:[]},{rowIndex:5,items:[]}]，items中的數據遞迴
        //注：像這種純數據程式，最好由服務端完成，但其它客戶端，好像用到這種分層的方式比較少，因此此程式暫時提供在js類型客戶端(winform,flex,silverlight暫不共享)
        levelRows:function(rows,levelFields,cmpRowFn){
            if(rows){
                cmpRowFn = cmpRowFn || this.compareRow;
                var ret = [];
                var lastRow = null;
                //var levelFields = levelFieldStr.split(",");
                for(var i=0;i<rows.length;i++){
                    var row = rows[i];
                    var curItems = ret;         //從最頂層開始匹配，是否有新的分組進來
                    for(var j=0;j<levelFields.length;j++){
                        //if(typeof(levelFields[j])=="string"){
                        //    levelFields[j] = levelFields[j].split("+")
                        //}
                        var cmpFields = levelFields[j];
                        if(!cmpRowFn(lastRow,row,cmpFields)){            //如果和上面一行不一樣，則表示新的分組出來了
                            curItems.push({rowIndex:i,items:[]});
                            curItems = curItems[curItems.length-1].items;
                            
                            //要補齊底下分組，并且進行下一行比對
                            for(var k=j+1;k<levelFields.length;k++){
                                curItems.push({rowIndex:i,items:[]});
                                curItems = curItems[curItems.length-1].items;
                            }
                            break;      //不要再比較下去了，已經不一樣了
                        }
                        else{
                            curItems = curItems[curItems.length-1].items;           //遞迴往下迭代items陣列
                        }
                    }
                    curItems.push({rowIndex:i});           //最后一個的items直接入最底層，沒有items了
                    lastRow = row;
                }
                return ret;
            }
            return null;
        }
        
        ,compareRow:function(row1,row2,fields){
            for(var i=0;i<fields.length;i++){
                var field = fields[i];
                var row1Value = row1?row1[field]:null;
                if(typeof(row1Value)=="undefined"){
                    row1Value = null;
                }
                var row2Value = row2?row2[field]:null;
                if(typeof(row2Value)=="undefined"){
                    row2Value = null;
                }
                if(row1Value !== row2Value){
                    return false;
                }
            }
            return true;
        } 
        
        ,initLevelFields:function(groupFields){
            var retLevelFields = [];
            var levelFields = groupFields.split(",");
            for(var i=0;i<levelFields.length;i++){
                var sortFields = levelFields[i].split("+");
                var oneLevelFields = [];
                for(var j=0;j<sortFields.length;j++){
                    var field = sortFields[j];
                    oneLevelFields.push(field);
                }  
                retLevelFields.push(oneLevelFields);
            } 
            return retLevelFields;    
        }        
        
        //按rows轉成tree
        //rows已排好序(同一層級項次的順序)
        ,loopTree:function(rows,idField,upField,context,leafFn,levelFn){
            var levels = this.treeRows(rows,idField,upField);
            if(levels){
                this._loopLevelItems(rows,"",levels,1,"",0,context,leafFn,levelFn);
            }
        }
        
        //返回的格式為[{rowIndex:0,items:[]},{rowIndex:5,items:[]}]，items中的數據遞迴
        ,treeRows:function(rows,idField,upField){
            if(rows){
                var ret = [];               //根節點
                var rowsById = {};
                for(var i=0;i<rows.length;i++){
                    var row = rows[i];
                    var id = row[idField];
                    var upId = row[upField];
                    if(!rowsById[id]){
                        rowsById[id] = {rowIndex:i};
                    }
                    else{
                        if(rowsById[id].rowIndex>=0){
                            throw new Error(id + "主key(" + idField + ":" + id + ")不唯一");
                        }
                        else{
                            rowsById[id].rowIndex = i;
                        }
                    }
                    if(!rowsById[upId]){
                        rowsById[upId] =  {rowIndex:-1,items:[rowsById[id]]};
                        ret.push(rowsById[upId]);
                    }
                    else{
                        if(!rowsById[upId].items){
                            rowsById[upId].items = [];
                        }
                        rowsById[upId].items.push(rowsById[id]);
                    }
                }
                var realRet = [];
                for(var i=0;i<ret.length;i++){
                    if(ret[i].rowIndex < 0){
                        realRet = realRet.concat(ret[i].items);
                    };
                }
                return realRet;         //請不要遞歸(即所有根節點又關聯到自身或某個下層的結點，這樣其實不是tree結構了)
            }
            return null;
        }        
        
        ,getParent:function(ret,parentLevel,itemsField){
            if(!parentLevel){
                return ret;
            }
            else{
                var levels = parentLevel.split(".");
                for(var i=0;i<levels.length;i++){
                    var obj = ret[parseInt(levels[i])-1];
                    
                    ret = obj[itemsField];
                    if(typeof(ret)=="function"){
                        ret = ret.call(obj);
                    }
                }
                return ret;
            }
        }

        //取得某個group所含的其中一個葉子row
        ,getGroupRow:function(rows,levelDic){
            if(levelDic.push){
                return rows[levelDic[0]] || null;
            }
            else{
                for(var p in curDic){
                    return this.getGroupRow(levelDic[p]);
                }
            }
        }
        
        //取得某個group所含葉子級的筆數total
        ,getGroupCount:function(levelDic){
            if(levelDic.push){
                return levelDic.length;
            }
            else{
                var ret = 0;
                for(var p in curDic){
                    ret += this.getGroupCount(curDic[p]);
                }
                return ret;
            }
        }
        
        ,sum:function(rows,field){
            var ret = 0;
            if(rows){
                for(var i=0;i<rows.length;i++){
                    ret = cal.add(ret,rows[i][field]);
                }
            }
            return ret;
        }
        
        //橫表轉豎表
        //keyFields:哪些欄位轉是主key（訂單號碼）
        //valueFields:哪個欄位是橫表，可以用[]表示多個（size）
        //dataFields:哪個欄位是值，可以有多個，表示轉多筆資料出來（底配套，面配套，面底配套）
        ,tranDataToField:function(rows,keyFields,valueFields,dataFields){
            if(rows){
                keyFields = keyFields.split(",");       //轉成數組統一處理
                valueFields = valueFields.split(",");       //轉成數組統一處理
                dataFields = dataFields.split(",");       //轉成數組統一處理
                var ret = [];
                ret.NEW_FIELDS = {};
                var keyRow = {};        //key是keyFields的值
                for(var i=0;i<rows.length;i++){
                    var row = rows[i];
                    //找到key，key相同的合并成一個新行
                    var key = "";
                    for(var j=0;j<keyFields.length;j++){
                        key += (key?",":"") + (row[keyFields[j]] || "-");
                    }
                    if(!keyRow[key]){
                        keyRow[key] = [];
                        //dataFields有多個時，每個key生成多個新行
                        for(var j=0;j<dataFields.length;j++){
                            var newRow = keyRow[key][j] = {NEW_ROW_INDEX:j};
                            ret.push(newRow);
                            //設定主key值到新行中
                            //for(var k=0;k<keyFields.length;k++){
                            //    newRow[keyFields[k]] = row[keyFields[k]];
                            //}
                            //所有值copy到新行中(方便各種排序，篩選等二次應用)
                            for(var p in row){
                                newRow[p] = row[p];
                            }
                        }
                    }
                    //找到每一行要轉到新行的field的名稱
                    var newFieldName = "";
                    for(var j=0;j<valueFields.length;j++){
                        newFieldName += (newFieldName?"_":"") + row[valueFields[j]];
                    }
                    ret.NEW_FIELDS[newFieldName] = 1;
                    //對新行的新field賦值(多個)
                    for(var j=0;j<dataFields.length;j++){
                        keyRow[key][j][newFieldName] = row[dataFields[j]];
                    }
                }
                return ret;
            }
            return null;
        }

        ,groupCalRow:function(groupRow,rows,calFields){//,insertRows,orgCalFields,orgCalFieldIndex){
            groupRow = groupRow || {};
            for(var j=0;j<calFields.length;j++){
                var calField = calFields[j];
                var fieldNo = calField.fieldNo;
                if(calField.text){       //以某個欄位名作為計算欄位值
                    groupRow[fieldNo] = calField.text;
                }
                else if(calField.textFieldNo){       //以某個欄位名作為計算欄位值
                    var firstRow;
                    if(calField.filter){
                        var calRows = this.select(rows,calField.filter);
                        if(calRows && calRows.length>0){
                            firstRow = calRows[0];
                        }
                    }
                    else{
                        firstRow = rows[0];
                    }
                    groupRow[fieldNo] = firstRow?firstRow[calField.textFieldNo]:"";
                }
                else{
                    var calFn = calField.calFn || _groupFn[calField.calKind] || groupSumRows;
                    if(calFn){
                        var calRows = rows;
                        if(calField.filter){
                            calRows = this.select(rows,calField.filter);
                        }
                        groupRow[fieldNo] = calFn(calRows,calField,groupRow);//,insertRows,orgCalField,j);以后有需要再說吧
                    }
                }
            }    
            return groupRow;
        }


        //分組合并計算
        //rows:已排好序
        //calFields:[{keyFields:["aaa","bbb"],calFields:[{fieldNo:"qty",kind:"sum",args:"xxx"}]}]      //count,average,function自定義
        ,groupCalRows:function(rows,calFields,fieldSpliter){
            if(rows && rows.length){
                var insertRows = [];        //要insert進去的行
                var tmpRecordByFields = [];          //上一個key值和rows
                for(var i=0;i<rows.length;i++){
                    var row = rows[i];
                    for(var j=0;j<calFields.length;j++){
                        var calField = calFields[j];
                        if(calField.keyFields){     //沒有keyFields表示是對所有資料匯總
                            var key = rowKey(row,calField.keyFields,fieldSpliter);
                            if(i==0){
                                tmpRecordByFields[j] = {key:key,rows:[row]};
                            }
                            else{
                                var tmpRecord = tmpRecordByFields[j];
                                if(key != tmpRecord.key){
                                    //開始計算
                                    var groupRow = {_ROW_INDEX:i,_FIELDS_INDEX:j,_KEY:tmpRecord.key};
                                    //var calFieldsFn = calField.calFn || this.groupCalRow;
                                    this.groupCalRow(groupRow,tmpRecord.rows,calField.calFields);//,insertRows,calFields,j);
                                    insertRows[i] = insertRows[i] || [];
                                    insertRows[i].push(groupRow);

                                    tmpRecord.key = key;
                                    tmpRecord.rows = [row];
                                }
                                else{
                                    tmpRecord.rows.push(row);
                                }
                            }    
                        }
                    }
                }


                //最后一行
                var lastInsertRows = [];
                for(var j=0;j<calFields.length;j++){
                    var calField = calFields[j];
                    var tmpRecord = tmpRecordByFields[j] || {key:"",rows:rows};
                    //開始計算
                    var groupRow = {_ROW_INDEX:i,_FIELDS_INDEX:j,_KEY:tmpRecord.key};
                    //var calFieldsFn = calField.calFn || this.groupCalRow;
                    this.groupCalRow(groupRow,tmpRecord.rows,calField.calFields);//,insertRows,calFields,j);
                    lastInsertRows.push(groupRow);
                }

                insertRows[rows.length] = lastInsertRows;
                //從后面開始插入起
                for(var i=insertRows.length-1;i>=0;i--){
                    var insertSubRows = insertRows[i];
                    if(insertSubRows){
                        for(var j=0;j<insertSubRows.length;j++){
                            rows.splice(i,0,insertSubRows[j]);
                        }
                    }
                }                

            }   //if rows
        }   //function groupCalRows

        ,getSaveItems:function(items,keyField,detailFields){
            return this._getSaveItems(this.deepCopy(items),keyField,detailFields,0);
        }

        ,_getDetailSaveItems:function(item,detailFields,level){
            var saveItem;
            if(detailFields){
                var currentLevelFields = detailFields[level];
                for(var detailKey in currentLevelFields){
                    if(item[detailKey]){
                        var detailSaveItems = this._getSaveItems(item[detailKey]
                                                        ,currentLevelFields[detailKey]
                                                        ,detailFields
                                                        ,level+1
                                                    );
                        if(detailSaveItems.length){
                            if(!saveItem){
                                saveItem = {};
                            }
                            saveItem[detailKey] = item[detailKey] = detailSaveItems;
                        }
                        else{
                            delete item[detailKey];     //update key
                        }
                    }
                }
            }
            return saveItem;
        }

        ,_getSaveItems:function(items,keyField,detailFields,level){
            var ret = [];
            for(var i=0;i<items.length;i++){
                var item = items[i];
                if(!item._NEW){     //data from database
                    if(item._DELETED){      //delete data
                        var saveItem = {_DELETED:true};
                        saveItem[keyField] = item[keyField];
                        ret.push(saveItem);
                    }
                    else if(item._UPDATED){ //update data
                        ret.push(item);
                        delete item._ORG;
                        this._getDetailSaveItems(item,detailFields,level);
                    }
                    else{  //only modify detail
                        
                        var itemWithModifiedDetail = this._getDetailSaveItems(item,detailFields,level);
                        if(itemWithModifiedDetail){
                            itemWithModifiedDetail[keyField] = item[keyField];
                            ret.push(itemWithModifiedDetail);
                        }
                    }
                }
                else{       //insert
                    ret.push(item);
                    delete item._ORG;
                    delete item._NEW;
                    delete item[keyField];
                    this._getDetailSaveItems(item,detailFields,level);
                }
            }
            return ret;
        }
    }   //return object

});