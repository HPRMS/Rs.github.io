sjs.using("Core5.Container")
.using("Core5.Layout.AutoFit")
.using("Core5.Widget.Toolbar")
.using("Core5.App.DataList")
.using("Core5.Widget.Ability.Action")
.define(function(container,autoFitLayout,toolbar,dataList,actionAbility){
    return {
        $extend:container
        ,$mixin:[autoFitLayout,actionAbility]


        //config
        ,roleService:"prjSysRoleService"
//        ,selectEvt:"roleSelect"

        ,edit:true
//        ,roleCanFromFlow:true

        ,inner:function(){
            var roleService = this.roleService;
            var fields = [
                {
                    prompt:"ID"
                    ,fieldNo:"RoleID"
                    ,width:80
                }
                ,{
                    prompt:"Name"
                    ,fieldNo:"RoleName"
                    ,width:200
                }
                ,{
                    prompt:"Remark"
                    ,fieldNo:"Description"
                    ,width:300
                }
            ];

            var toolbarInner = [
                {
                    text:"Refresh"
                    ,icon:"refresh"
                    ,evt:"refresh"
                }
            ];

            if(this.edit){
                var actionInner = [
                        {prompt:"Name",fieldNo:"RoleName",required:true}
                        ,{prompt:"Remark",fieldNo:"Description"}
                ];
                var inputHeight = 124; //24(title高，25-1,top:24) + 100[2(border) + 35(toolbar 高) + 63[31*2 + 1]]

                if(this.roleCanFromFlow){
                    actionInner = actionInner.concat(
                        {prompt:"Flow Right Kind",fieldNo:"FlowRightKind"}
                        ,{prompt:"Flow Object ID",fieldNo:"FlowObjectID"}
                    );
                    inputHeight += 31 * 2;
                }

                var editAction = {
                    actionID:"insertAction"
                    ,command:"AddRole"
                    ,params:function(row,rowKey,input){
                        return [input];
                    }

                    ,formMixin:{
                        _setRow:function(){
                            this.set("item",{});
                        }
                    }
                    ,actionInner:actionInner
                    ,inputHeight:inputHeight    //24(title高，25-1,top:24) + 100[2(border) + 35(toolbar 高) + 63[31*2 + 1]]
                    ,promptTitle:"Add New Role"
                    ,noShowTotalInTitle:true
                };

                fields = [
                    {
                        prompt:"&nbsp;"
                        ,type:"button"
                        ,icon:"edit"
                        ,evt:"edit"
                        ," title":"modify this row"
                        ,width:30
                        ,noResize:true

                        ,evt:"rowEvt"
                        ,rowEvt:"actionDoing"
                        ,$mixin:[editAction]
                        ,service:roleService
                        ,command:"ModifyRole"
                        ,actionID:"updateAction"        //不能和上面一個id，因為會使用同一個actionID作為對象，然後就在insert時設定row，杯具了(死循環)
                        ,formMixin:{
                            _setRow:function(row){
                                this.set("item",row);
                            }
                        }
                        ,promptTitle:"Modify Role"
                    }
                    ,{
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
                        ,command:"RemoveRole"
                        ,params:function(row,rowKey){   
                            return [1 * rowKey];
                        }
                        ,promptTitle:"are you sure to delete this role?"
                        ,noShowTotalInTitle:true
                    }
                ].concat(fields);

                toolbarInner.push({
                    text:"Add New Role"
                    ,icon:"plus"
                    ,evt:"add"
                    ,$mixin:[editAction]
                    ,service:roleService
                });

            }

            if(this.roleCanFromFlow){
                fields = fields.concat(
                    {
                        prompt:"Flow Right Kind"
                        ,fieldNo:"FlowRightKind"
                    }
                    ,{
                        prompt:"Flow Object ID"
                        ,fieldNo:"FlowObjectID"
                    }
                );
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

                    ,sortField:"RoleName"
                    ,sortSeq:"asc"

                    ,listQueryService:roleService
                    ,listQueryMethod:"RoleList"
                    ,_initQueryCondition:function(){
                        return null;
                    }

                    ,sortClient:true
                    ,pageClient:true
                    ,initQuery:true

                    ,rowKeyFields:"RoleID"
                    ,selectEvt:this.selectEvt

                    ,fields:fields
                }
            ];
        }

        ,onRefresh:function(){
            this.grid.doQuery();
        }

        ,onAdd:function(btn){
            this.onActionDoing(btn,{},"");
        }

        ,onActionFinish:function(){
            this.grid.doQuery();
        }
    };
});