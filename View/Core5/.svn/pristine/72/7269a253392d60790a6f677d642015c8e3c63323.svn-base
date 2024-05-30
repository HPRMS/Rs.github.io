sjs.using("Core5.Util.DataFn")
.define(function(dataFn){
    return {
        _grid:function(fields,rows){
            //rows请先排好序
            this._cellMergeTmpData = {};
            if(rows && rows.length){
                for(var i=0;i<fields.length;i++){
                    var field = fields[i];
                    if(field.mergeByFields && typeof(field.mergeByFields)!="string"){
                        var mergeId = field.mergeId || field.fieldNo;
                        if(mergeId){
                            var levels = dataFn.levelRows(rows,[field.mergeByFields]);
                            var mergeInfo = {};
                            for(var j=0;j<levels.length;j++){
                                mergeInfo[levels[j].rowIndex] = levels[j].items.length;
                            }
                            this._cellMergeTmpData[mergeId] = mergeInfo;
                        }
                    }
                }
            }
            return this.$base(fields,rows);
        }

        ,rightScrollHideTr:false
        ,noTrOver:true

        ,_fillFormMixin:function(ret){
            this.$base(ret);
            ret.push({
                _td:function(field,fieldIndex,row,rowIndex,fields,rows){
                    var ret = this.$base(field,fieldIndex,row,rowIndex,fields,rows);
                    //不能直接用field来记住mergeId,因为每一个field在每一行的form中都是不同的个体了
                    var mergeId;
                    if(typeof(field.mergeByFields)=="string"){
                        mergeId = field.mergeByFields;
                    }
                    else if(field.mergeByFields){
                        mergeId = field.mergeId || field.fieldNo;
                    }

                    if(mergeId && this.parent._cellMergeTmpData[mergeId]){//mergeByFields){        //欄位數組或字串
                        var rowspan = this.parent._cellMergeTmpData[mergeId][rowIndex];
                        if(rowspan){
                            rowspan>1 && (ret[" rowspan"] = rowspan);
                        }
                        else{
                            ret = "";       //不輸出
                        }
                    }
                    return ret;
                }     
            });
        }

        
    };
});