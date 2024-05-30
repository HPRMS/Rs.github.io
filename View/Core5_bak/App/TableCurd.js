sjs.using("Core5.Container")
.using("Core5.Layout.AutoFit")
.using("Core5.Widget.Toolbar")
.using("Core5.Widget.Form")
.using("Core5.Layout.Form")
.using("Core5.App.DataList")
.using("Core5.Util.Service")
.using("Core5.Util.DataFn")
.using("Core5.YT.Msg")
.define(function(container,autoFitLayout,toolbar,form,formLayout,dataList,sc,dataFn,msg){
    return {
        $extend:container
        ,$mixin:[autoFitLayout]

        //config
        ,defaultItem:{}
        ,keyField:"TITLE_ID"
        //,sortField:"TITLE_ID"
        ,service:"ClientTool"
        //,queryService:"ClientTool"
        //,deleteService:"ClientTool"
        //,insertService:"ClientTool"
        //,updateService:"ClientTool"
        ,queryMethod:"QueryPage"
        ,deleteMethod:"Execute"
        ,insertMethod:"Execute"
        ,updateMethod:"Execute"
        ,table:"TRAIN_OPTIONS"
        ,database:"PCI.Train.DB"
        //,querySql:"Select_TRAIN_OPTIONS@PCI.Train.DB"
        //,insertSql:"Insert_TRAIN_OPTIONS@PCI.Train.DB"
        //,updateSql:"Update_TRAIN_OPTIONS@PCI.Train.DB"
        //,deleteSql:"Delete_TRAIN_OPTIONS@PCI.Train.DB"


        ,formHeight:225
        ,editFormColumnCount:2
        ,editFormPromptWidth:120
        //,editFormCellsWidth:[120,0,120,0]
        /*,queryFields:[
            {
                prompt:"Title"
                ,fieldNo:"TITLE__LIKE"
            }
        ]*/

        ,fields:[
            {
                prompt:"Title"
                ,fieldNo:"TITLE"
                ,width:480
                ,paddingLeft:5
                ,align:"left"
                ,sort:true
            }
            ,{
                prompt:"Item1"
                ,fieldNo:"ITEM1"
                ,width:190
                ,paddingLeft:5
                ,align:"left"
                ,sort:true
            }
            ,{
                prompt:"Item2"
                ,fieldNo:"ITEM2"
                ,width:190
                ,paddingLeft:5
                ,align:"left"
                ,sort:true
            }
            ,{
                prompt:"Item3"
                ,fieldNo:"ITEM3"
                ,width:190
                ,paddingLeft:5
                ,align:"left"
                ,sort:true
            }
            ,{
                prompt:"Item4"
                ,fieldNo:"ITEM4"
                ,width:190
                ,paddingLeft:5
                ,align:"left"
                ,sort:true
            }
        ]

        ,formFields:[
            {
                prompt:"Title"
                ,fieldNo:"TITLE"
                ,type:"textarea"
                ,";height":"62px"
                ,colspan:2
            }
            ,{
                prompt:"Item1"
                ,fieldNo:"ITEM1"
                ,type:"textarea"
                ,";height":"62px"
            }
            ,{
                prompt:"Item2"
                ,fieldNo:"ITEM2"
                ,type:"textarea"
                ,";height":"62px"
            }
            ,{
                prompt:"Item3"
                ,fieldNo:"ITEM3"
                ,type:"textarea"
                ,";height":"62px"
            }
            ,{
                prompt:"Item4"
                ,fieldNo:"ITEM4"
                ,type:"textarea"
                ,";height":"62px"
            }
        ]

        ,getToolbarInner:function(){
            var ret = [
                {
                    text:"<i en='Refresh'>刷新</i>"
                    ,icon:"refresh"
                    ,evt:"refresh"
                    ,id:"refreshBtn"
                }
                ,{
                    text:"<i en='Show Query'>顯示查詢欄</i>"
                    ,icon:"search"
                    ,evt:"toggleQuery"
                    ,showQuery:false
                }
                ,{
                    text:"<i en='Delete Selected'>批次刪除</i>"
                    ,icon:"trash"
                    ,evt:"deleteSelected"
                }
                ,{
                    text:"<i en='Add'>新增</i>"
                    ,icon:"plus"
                    ,evt:"add"
                    ,id:"addBtn"
                    ,floatRight:true
                }
            ];
            if(!this.queryFields || !this.queryFields.length){
                ret.splice(1,1);
            }
            return ret;
        }

        ,getList:function(){
            return {
                $extend:dataList
                ,id:"list"
                ,top:37//103
                ,bottom:0//193

                //有其它自定義時，直接override getList來寫，不再用config override方式
                ,listQuerySql:this.querySql  || "Select_" + this.table + "@" + this.database
                ,listQueryMethod:this.queryMethod   //"QueryPage"
                ,listQueryService:this.queryService || this.service
                ,sortField:this.sortField || this.keyField
                ,rowKeyFields:this.keyField
                ,selectEvt:"select"
                ,checkEvt:"check"


                ,initQuery:true
                ,queryVisible:false
                ,queryFields:this.queryFields
                ,queryColumnCount:this.queryColumnCount || 4
                ,fields:[{
                    prompt:""
                    ,type:"button"
                    ,icon:"trash"
                    //,text:"Delete"
                    ,rowEvt:"delete"
                    ," title":"delete this data"
                    ,width:32
                    ,noResize:true
                    ,noTdTag:true
                }].concat(this.fields)
            };
        }

        ,getEditForm:function(){
            var cellsWidth = this.editFormCellsWidth;
            if(!cellsWidth){
                cellsWidth = [];
                for(var i=0;i<this.editFormColumnCount;i++){
                    cellsWidth.push(this.editFormPromptWidth);
                    cellsWidth.push(0);
                }
            }
            return {
                $extend:form
                ,$mixin:[formLayout]
                ,columnCount:this.editFormColumnCount
                ,visible:false
                ,id:"editForm"
                ,cellsWidth:cellsWidth
                ,noTdTag:true
                //,thStyle:"width:120px"        //如果第一行剛好有colspan，則后面的width用不上
                ,inner:this.formFields.concat({
                    type:"con"
                    ,colspan:2
                    ,noTdTag:true
                    ,tdStyle:"text-align:center;padding-top:2px;"
                    ,displayBlock:"inline-block"
                    ,inner:[
                        {
                            type:"button"
                            ,text:"<i en='Cancel'>取消</i>"
                            ,icon:"remove"
                            ,";padding":"0 10px"
                            ,size:"small"
                            ,evt:"cancel"
                            ,displayBlock:"inline-block"
                        }
                        ,{
                            type:"button"
                            ,text:"<i en='Save'>保存</i>"
                            ,icon:"hdd"
                            ,";margin-left":"30px"
                            ,";padding":"0 25px"
                            ,size:"small"
                            ,evt:"save"
                            ,id:"saveBtn"
                            ,displayBlock:"inline-block"
                        }
                    ]
                })
                ,bottom:0
                ,height:this.formHeight
            };
        }

        ,inner:function(){
            return [
                {
                    $extend:toolbar
                    ,id:"toolbar"
                    ,inner:this.getToolbarInner()
                    ,height:32
                }
                ,this.getList()
                ,this.getEditForm()
            ];
        }

        ,_setEditStatus:function(){
            if(this.editStatus){
                this.editForm.show();
                this.list.css("bottom",this.formHeight + 2 + "px");
                this.list.table._initScroll();      
                //鼠標在一個地方，所以不會自動scroll
            }
            else{
                this.editForm.hide();
                this.list.css("bottom","0");
                this.set("editKey",null);
                this.list.table._initScroll();      

            }
        }

        ,_setEditKey:function(key){
            this.editForm.saveBtn.set("text",key?"<i en='Save'>保存</i>":"<i en='Save New Item'>保存新項目</i>");
            this.editForm.saveBtn.css("color",key?"white":"yellow");
        }

        ,onRefresh:function(){
            this.set("editStatus",false);
            this.list.table.set("selected",null);
            this.list.doQuery();
        }

        ,onToggleQuery:function(btn){
            if(!btn.showQuery){
                btn.set("text","<i en='Hide Search Area'>隱藏查詢欄</i>");
                this.list.showQueryForm();
            }
            else{
                btn.set("text","<i en='Show Search Area'>顯示查詢欄</i>");
                this.list.hideQueryForm();
            }
            btn.showQuery = !btn.showQuery;
        }

        ,getDefaultItem:function(){
            return dataFn.deepCopy(this.defaultItem);
        }

        ,onAdd:function(){
            if(this.editStatus && !this.editKey){
                this.onCancel();
                return;
            }
            this.set("editStatus",true);
            this.set("editKey",null);
            this.editForm.set("item",this.getDefaultItem());
            this.list.table.set("selected",null);
        }

        ,onCancel:function(){
            this.set("editStatus",false);
            this.list.table.set("selected",null);
        }

        ,onSelect:function(grid,rowKey,row){
            this.set("editStatus",true);
            this.set("editKey",rowKey);
            this.editForm.set("item",row);
        }

        ,onDeleteSelected:function(){
            var checked = this.list.table.checked;
            if(!checked || !checked.length){
                msg.error("<i en='please select row first(checkbox)'>請先勾選您要刪除的行!</i>");
                return;
            }
            this._deletingCount = checked.length;
            var deleteFn = function(){
                for(var i=0;i<checked.length;i++){
                    var rowKey = checked[i];
                    var row = this.list.table.getRowByKey(rowKey);
                    //if(i>=1)
                    //    this.deleteService = "test";
                    this.deleteRow(row,rowKey);
                }
            }
            if(this.deleteConfirm){
                msg.ask(this.deleteConfirm + "<br><b style='color:red'><i en='Total Count'>總筆數</i>:" + checked.length + "</b>",deleteFn,[],this);
            }
            else{       
                deleteFn.call(this);
            }
            this.list.table.set("checked",[]);
        }

        ,deleteConfirm:"<i en='Are you sure to delete this row?'>您確定要刪除這筆資料嗎?</i>"

        ,onDelete:function(grid,row,rowKey){
            this._deletingCount = 1;
            if(this.deleteConfirm){
                msg.ask(this.deleteConfirm,this.deleteRow,[row,rowKey],this);
            }
            else{       
                this.deleteRow(row,rowKey);
            }
        }

        ,onSave:function(){
            var editItem = this.editForm.item;
            !this.editKey ? this.insertRow(editItem):this.updateRow(editItem);
        }

        ,getDeleteArgs:function(row,rowKey){
            var deleteArgs = {};
            deleteArgs[this.keyField] = rowKey;
            return [this.deleteSql || ("Delete_" + this.table + "@" + this.database),deleteArgs];
        }

        ,deleteRow:function(row,rowKey){
            if(this.list.table.selected == rowKey){
                this.set("editStatus",false);
                this.list.table.set("selected",null);
            }
            sc.callService(this.deleteService || this.service,this.deleteMethod,this.getDeleteArgs(row,rowKey),this,this.onDeleteOK,this.onDeleteOK);
        }

        ,onDeleteOK:function(){
            this._deletingCount--;
            !this._deletingCount && this.list.doQuery();
            this.editEvt && this.report(this.editEvt,"delete");
        }

        ,getInsertArgs:function(editItem){
            return [this.insertSql || ("Insert_" + this.table + "@" + this.database),editItem];
        }

        ,insertRow:function(editItem){
            sc.callService(this.insertService || this.service,this.insertMethod,this.getInsertArgs(editItem),this,this.onInsertOK);
        }

        ,onInsertOK:function(){
            this.editForm.set("item",{});
            this.list.doQuery();
            this.editEvt && this.report(this.editEvt,"insert");

        }

        ,getUpdateArgs:function(editItem){
            delete editItem.ROWNUMBER;
            editItem[this.keyField + "__W"] = this.editKey;
            //delete editItem[this.keyField];
            return [this.updateSql || ("Update_" + this.table + "@" + this.database),editItem];
        }

        ,updateRow:function(editItem){
            sc.callService(this.updateService || this.service,this.updateMethod,this.getUpdateArgs(editItem),this,this.onUpdateOK);
        }

        ,onUpdateOK:function(){
            this.list.doQuery();
            this.editEvt && this.report(this.editEvt,"update");

        }
    }
});