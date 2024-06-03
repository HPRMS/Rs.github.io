sjs.using("Core5.Container")
.using("Core5.Layout.AutoFit")
.using("Core5.Widget.Toolbar")
.using("Core5.App.DataList")
.using("Core5.YT.Window")
.using("Core5.YT.Msg")
.using("Common.Users.Fields")
.using("Common.Users")
.define(function(container,autoFitLayout,toolbar,dataList,window,msg,userFields,usersList){
    return {
        $extend:container
        ,$mixin:[autoFitLayout]

        //data
        ,roleID:123

        //config
        ,roleService:"prjSysRoleService"
        ,edit:true
        
        ,inner:function(){
            var fields = userFields();

            var toolbarInner = [
                {
                    text:"Refresh"
                    ,icon:"refresh"
                    ,evt:"refresh"
                }
            ];

            if(this.edit){
                fields.splice(0,0,{
                    prompt:"&nbsp;"
                    ,type:"button"
                    ,icon:"minus"
                    ," title":"delete this row"
                    ,width:30
                    ,noResize:true

                    ,evt:"rowEvt"
                    ,rowEvt:"delete"
                });

                toolbarInner.push({
                    text:"Add Users"
                    ,icon:"plus"
                    ,evt:"add"
                })
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

                    ,rowKeyFields:"UserID"

                    ,sortField:"Name"
                    ,sortSeq:"asc"
                    ,sortClient:true
                    ,pageClient:true

                    ,listQueryService:this.roleService
                    ,listQueryMethod:"RoleMemberList"
                    ,_initQueryCondition:function(){
                        return null;
                    }

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
            var detailWindowID = "usersWindow";
            var cardWindow = this[detailWindowID];
            if(!cardWindow){
                cardWindow = this.createChild(window,{
                    inner:{
                        $extend:usersList
                        ,id:"view"
                        ,selectEvt:"addRightUser"
                    }
                    ,id:detailWindowID
                    ,title:"Select User"
                    ,minWidth:820
                    ,minHeight:450
                    ,width:950
                    ,height:477//512         //24(title高，25-1,top:24) + 318[2(border) + 35(toolbar 高) + 281[31*10 + 1]]
                    ,showBottomBorder:false
                    ,mask:true
                });
            }
            cardWindow.show();
        }

        ,onAddRightUser:function(grid,userID,row){
            //有主key管控了
            callService(this.roleService,"AddRoleUser",[this.roleID,userID +".00"],this,this.onRefresh);
            grid.setSelected(null);
            this.usersWindow.hide();
        }

        ,onDelete:function(btn,row,rowKey){
            callService(this.roleService,"RemoveRoleUser",[this.roleID,rowKey],this,this.onRefresh);
        }

        ,onRefresh:function(){
            this.grid.doQuery();
        }
    };
});