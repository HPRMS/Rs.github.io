sjs.using("Core5.Container")
.using("Core5.Layout.AutoFit")
.using("Core5.Widget.Toolbar")
.using("Core5.App.DataList")
.using("Core5.YT.Window")
.using("Core5.YT.Msg")
.using("Common.Rights.SysMenuTree")
.define(function(container,autoFitLayout,toolbar,dataList,window,msg,sysMenus){
    return {
        $extend:container
        ,$mixin:[autoFitLayout]

        //data
        ,roleID:123

        //config
        ,roleService:"prjSysRoleService"
        ,edit:true
        
        ,inner:function(){
            var fields = [
                {
                    prompt:"Right Object"
                    ,fieldNo:"MENU_ID"
                    ,width:200
                }
                ,{
                    prompt:"Remark"
                    ,fieldNo:"MENU_NM"
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
                    text:"Add Menu"
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

                    ,rowKeyFields:"MENU_ID"

                    ,sortField:"MENU_ID"
                    ,sortSeq:"asc"
                    ,sortClient:true
                    ,pageClient:true

                    ,listQueryService:this.roleService
                    ,listQueryMethod:"RoleRights"
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
                        $extend:sysMenus
                        ,id:"view"
                        ,evt:"addRight"
                    }
                    ,id:detailWindowID
                    ,title:"Select User"
                    ,minWidth:400
                    ,minHeight:500
                    ,width:400
                    ,height:500//512         //24(title高，25-1,top:24) + 318[2(border) + 35(toolbar 高) + 281[31*10 + 1]]
                    ,showBottomBorder:false
                    ,mask:true
                });
            }
            cardWindow.show();
        }

        ,onAddRight:function(grid,menuID,row){
            //有主key管控了
            callService(this.roleService,"AddRight",[this.roleID,menuID],this,this.onRefresh);
            this.usersWindow.hide();
        }

        ,onDelete:function(btn,row,rowKey){
            callService(this.roleService,"RemoveRight",[this.roleID,1 * rowKey],this,this.onRefresh);
        }

        ,onRefresh:function(){
            this.grid.doQuery();
        }
    };
});