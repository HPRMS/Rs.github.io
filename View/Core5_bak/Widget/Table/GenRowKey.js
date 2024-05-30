/*
將row的一個或多個欄位值，以attr方式加入到tr的tag中
*/
sjs.define(function(){
    //fieldsStr是以逗號分隔的欄位名組成的字符串
    function getRowKey(keyFields,keyJoin,row){
        var fields = keyFields.split(",");
        var ret= "";
        for(var i=0;i<fields.length;i++){
            ret += (ret.length>0?keyJoin:"") + row[fields[i]];
        }
        return ret;
    }

    function getRowByKey(keyFields,keyJoin,rows,key){
        if(rows){
            for(var i=0;i<rows.length;i++){
                if(getRowKey(keyFields,keyJoin,rows[i]) == key){
                    return rows[i];
                }
            }
        }
        return null;
    }

    return function(prefix){
        var keyFields = prefix + "KeyFields";
        var keyJoin = prefix + "KeyJoin";
        var keyName = "s-" + prefix + "-key";
        var ret = {
            _fillFormMixin:function(ret){
                this.$base(ret);
                if(!this[keyFields]){
                    throw new Error("請設定" + keyFields + "的欄位名(多個時逗號分隔)!");
                }
                //alert('execute');       //相同的函數在apply時，不會加入到override鏈條中，因此只會執行一次
                this[keyJoin] = this[keyJoin] || ",";
                var oThis = this;
                ret.push({
                    _setItem:function(item){
                        this.$base(item);
                        var key = getRowKey(oThis[keyFields],oThis[keyJoin],item);
                        this.attr(keyName, key);
                    }
                });
            }
        };
        ret[prefix + "Jq"] = function(key,subExp){
            return this.jq("[" + keyName + "='" + key + "']" + (subExp?" " + subExp:""));
        }
        var prefixMidStr = prefix.substr(0,1).toUpperCase() + prefix.substr(1);
        ret["get" + prefixMidStr + "Key"] = function(row){
            return getRowKey(this[keyFields],this[keyJoin],row);
        }
        //Grid2用rows作為外部接口，當然本質上還是寫items，兩個是等同概念。不過不要動items
        ret["get" + prefixMidStr + "ByKey"] = function(key){
            return getRowByKey(this[keyFields],this[keyJoin],this.items,key);
        }
        return ret;
    };
});     