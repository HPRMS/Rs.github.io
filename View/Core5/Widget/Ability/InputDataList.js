/*邊輸入，邊提示*/
sjs.using("Core5.App.DataList")
.using("Core5.Widget.Ability.Pop")
.using("Core5.Widget.Ability.DragResize")
.define(function(dataList,pop,dragResize){

    return {
        " s-keyup":"keyup"
        //,queryMillSeconds:500      //default 500
        ,onKeyup:function(src){
            this.showListPop();
        }

        ,showListPop:function(){
            //500毫秒之后訪問資料庫，抓出資料出來
            window.clearTimeout(this._inputPromptID);
            var oThis = this;
            this._inputPromptID = window.setTimeout(function(){
                oThis.queryListPop();
            },this.queryMillSeconds || 500);
        }

        ,onIptFocus:function(){
            this.$base();
            !this.isDisabled() && this.showListPop();
        }
        ,textArgField:"input"
        ,listQuerySql:""        //if listService default(ClientTool),must listQuerySql
        ,listSortField:""       //must
        ,listKeyField:""        //must
        ,listFields:""          //must

        ,popCreater:function(){
            return this;
        }
        
        ,queryListPop:function(){
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
                if(this.conditionItemFields){
                    for(var p in this.conditionItemFields){
                        creater.inputDataList.set("condition." + this.conditionItemFields[p],this.parent.item[p]);
                    }
                }
                creater.inputDataList.set("condition." + this.textArgField,val);
                creater.inputDataList.doQuery();
            }
        }

        //,showTextField:""
        //,conditionItemFields:{}
        //,parentItemFields:{}
        ,onSelectList:function(table,selected,selectedRow){
            //this.setValue(selectedRow[this.showTextField]);
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