/*動態select，即items是在單擊command后才開始抓的，且text是由上層傳入，而不是根據items計算得出的*/
sjs.using("Core5.Widget.Input.Command")
.using("Core5.App.DataList")
.using("Core5.Widget.Ability.Pop")
.using("Core5.Widget.Ability.DragResize")
.define(function(command,dataList,pop,dragResize){
    return {
        $extend:command
        ,textFromValue:false     //text和value獨立設定
        
        ,rightIcon:"chevron-down"
        
        //,queryEveryTime:false
        ,onPopClick:function(){
            this.showListPop();
        }

        ,listQuerySql:""        //if listService default(ClientTool),must listQuerySql
        ,listSortField:""       //must
        ,listKeyField:""        //must
        ,listFields:""          //must

        ,popCreater:function(){
            return this;
        }
        
        ,showListPop:function(){
            var val = this.jq(".s-text-input").val();
            val = strFn.trim(val);
            if(val.length>0){
                var creater = this.popCreater();
                if(!creater.inputDataList){
                    creater.createChild(dataList,pop,dragResize.rb,dragResize.right,dragResize.bottom,this.listSetting,{
                        id:"inputDataList"
                        ,$mixin:[this.listSetting]
                        ,width:this.listWidth || 500
                        ,height:this.listHeight || 300

                        ,rowKeyFields:this.listKeyField
                        ,selectEvt:"selectList"
                        ,queryFields:this.listQueryFields
                        ,fields:this.listFields
                        ,listQueryService:this.listService || "ClientTool"
                        ,listQueryMethod:this.listMethod || "Query"
                        ,listQuerySql:this.listQuerySql || null
                        ,sortField:this.listSortField
                        ,sortSeq:"asc"
                        ,pageSize:this.listPageSize || 20
                    }).renderTo("body",true);
                }
                var thisJq = this.jq();
                var offset = thisJq.offset();
                var left =  offset.left;
                var top =  offset.top;
                top = offset.top + thisJq.outerHeight();
                creater.inputDataList.setResponser(this);
                creater.inputDataList.show().move(left ,top);

                this.setCondition(creater.inputDataList);
                creater.inputDataList.doQuery();
            }
        }

        //,conditionFields:"fact_no,comp_no"

        ,setCondition:function(list){
            if(this.conditionFields && this.parent && this.parent.item){
                var fields = this.conditionFields.split(",");
                var item = this.parent.item;
                for(var i=0;i<fields.length;i++){
                    list.set("condition." + fields[i],item[fields[i]]);
                }
            }
        
        }

        ,parentItemFields:{}
        ,onSelectList:function(table,selected,selectedRow){
            table.set("selected",null);
            if(this.parentItemFields){
                for(var p in this.parentItemFields){
                    this.parent.set("item." + p,selectedRow[this.parentItemFields[p]]);
                }
            }
            this.selectEvt && this.report(this.selectEvt,selected,selectedRow);
            var creater = this.popCreater();
            creater.inputDataList.hide();
        }
    }
});