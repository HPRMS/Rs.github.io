sjs.using("Core5.Util.Service")
.define(function(sc){
    return function(queryName){
        var retMixin = {};
        retMixin[queryName + "QueryService"] = "ClientTool";
        retMixin[queryName + "QueryMethod"] = "Query";
        retMixin[queryName + "QuerySql"] = null;                 //這個填上sql名稱        
        retMixin[queryName + "QueryArgs"] = function(args,sort,pagesize,page,excel){
            var ret = [];
            var sql = this[queryName + "QuerySql"];
            sql && ret.push(sql);
            args && ret.push(args);
            sort && ret.push(sort);
            if(pagesize !=null && typeof(pagesize)!="undefined"){
                ret.push(excel?0:pagesize);
                ret.push(page || 1);
            }
            if(excel){
                var service = this[queryName + "QueryService"] + "." + this[queryName + "QueryMethod"];
                var uiService = sc.isUIService(service,ret);
                if(uiService && uiService.indexOf("PCI.Eng.")<0){
                    ret.push(this);
                }
            }
            return ret;
        };
        retMixin[queryName + "Query"] = function(args,sort,pagesize,page){
            this.set("_dataListQueryStartTime",new Date());
            sc.callService(this[queryName + "QueryService"],this[queryName + "QueryMethod"],this[queryName + "QueryArgs"](args,sort,pagesize,page) || []
                ,this,this[queryName + "QueryResult"],this[queryName + "QueryError"]
                ,this[queryName + "QueryAddParam"],this[queryName + "QueryHost"]);
        };        
        
        retMixin[queryName + "ExcelViewUrl"] = "View/ExcelView.aspx";

        //service,params,view,args,serviceKind,noOpen,host
        retMixin[queryName + "Excel"] = function(args,sort,pagesize,page){
            this.set("_dataListQueryStartTime",new Date());
            sc.cusCallService(this[queryName + "QueryService"] + "." + this[queryName + "QueryMethod"]
                ,this[queryName + "QueryArgs"](args,sort,pagesize===null?null:0,1,true) || []
                ,this[queryName + "ExcelViewUrl"]
                ,null,null,false,this[queryName + "QueryHost"]);
        };        
        
        
        retMixin[queryName + "QueryResult"] = function(ret,addParam,result){}     //這個執行結果
        retMixin[queryName + "QueryError"] = function(result,addParam){     //這個執行結果
            alert(result.Message);
        };
        retMixin[queryName + "QueryAddParam"] = null;
        retMixin[queryName + "QueryHost"] = null;                 //這個填上sql名稱
        return retMixin;
    }
});        
