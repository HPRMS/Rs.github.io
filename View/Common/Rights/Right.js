sjs.using("Core5.Container")
.using("Core5.Layout.AutoFit")
.using("Core5.Widget.Toolbar")
.using("Core5.App.DataList")
.using("Core5.Widget.Ability.Action")
.define(function(container,autoFitLayout,toolbar,dataList,actionAbility){
    return {
        $extend:container
        ,$mixin:[autoFitLayout,actionAbility]

        //data
        ,roleID:123

        //config
        ,edit:true
        ,roleService:"prjSysRoleService"

        ,inner:function(){
            var roleService = this.roleService;

            var toolbarInner = [
                {
                    text:"Refresh"
                    ,icon:"refresh"
                    ,evt:"refresh"
                }
            ];

            var fields = [
                {
                    prompt:"Right Object"
                    ,fieldNo:"ObjectID"
                    ,width:200
                }
                ,{
                    prompt:"Remark"
                    ,fieldNo:"Description"
                    ,width:300
                }
            ];

            if(this.edit){
                var editAction = {
                    actionID:"insertAction"
                    ,command:"AddRight"
                    ,params:function(row,rowKey,input,panel){
                        return [panel.roleID,input];     //静态不会变,如果rightKind会变就需要panel.rightKind这种抓法了
                    }

                    ,formMixin:{
                        _setRow:function(){
                            this.set("item",{});
                        }
                    }
                    ,actionInner:[
                        {prompt:"Right Object",fieldNo:"ObjectID",required:true}
                        ,{prompt:"Remark",fieldNo:"Description"}
                    ]
                    ,inputHeight:124    //24(title高，25-1,top:24) + 100[2(border) + 35(toolbar 高) + 63[31*2 + 1]]
                    ,promptTitle:"Add New Right"
                    ,noShowTotalInTitle:true
                };

                toolbarInner.push({
                    text:"Add New Right"
                    ,icon:"plus"
                    ,evt:"add"
                    ,$mixin:[editAction]
                    ,service:roleService
                });
                
                fields.unshift({
                    prompt:"&nbsp;"
                    ,type:"button"
                    ,icon:"minus"
                    ," title":"delete this row"
                    ,width:30
                    ,noResize:true

                    ,evt:"rowEvt"
                    ,rowEvt:"actionDoing"
                    ,actionID:"deleteAction"
                    ,needConfirm:true
                    ,service:roleService
                    ,command:"RemoveRight"
                    ,params:function(row,rowKey){   
                        return [1 * rowKey];
                    }
                    ,promptTitle:"are you sure to delete this right?"
                    ,noShowTotalInTitle:true
                });
            }

            return [
                {
                    $extend:toolbar
                    ,height:32
                    ,inner:toolbarInner
                }
                ,{
                    $extend:dataList
                    ,id:"grid"
                    ,top:35
                    ,bottom:0

                    ,rowKeyFields:"RightID"

                    ,sortField:"RoleRights"
                    ,sortSeq:"asc"

                    ,listQuerySql:null
                    ,listQueryService:roleService
                    ,listQueryMethod:"RoleRights"
                    ,_initQueryCondition:function(){
                        return null;
                    }

                    //不分頁
                    ,sortClient:true
                    ,pageClient:true
                    //,pageSize:null
                    //,pageVisible:false

                    ,fields:fields

                    ,_setRoleID:function(roleID){
                        this.listQuerySql = this.roleID;
                        this.roleID && this.doQuery();
                    }
                }
            ];
        }
        ,init:function(){
            this.$base();
            this._initData("roleID");
        }

        ,_setRoleID:function(roleID){
            this.grid.set("roleID",roleID);
        }

        ,onAdd:function(btn){
            this.onActionDoing(btn,{},"");
        }

        ,onRefresh:function(){
            this.grid.doQuery();
        }

        ,onActionFinish:function(){
            this.grid.doQuery();
        }
    };
});