sjs.using("Core5.Container")
.using("Core5.Layout.AutoFit")

.using("Core5.Bind.BindSource")
.using("Core5.Bind.BindTarget")

.using("Common.Rights.Role")
.using("Common.Rights.Member")
.define(function(container,autoFitLayout,bindSource,bindTarget,roleSet,memberSet){
    return {

        $extend:container
        ,$mixin:[autoFitLayout,bindSource]

        //,roleCanFromFlow:true
        ,roleService:"prjSysRoleService"

        ,init:function(){
            this.$base();
            this._initData("roleID");       //当前选取的roleID(默认为null,开始绑定)
        }

        ,onRoleSelect:function(rolePanel,roleID){
            this.set("roleID",1 * roleID);
        }

        ,onActionOK:function(rolePanel,cfg,row,rowKey){
            if(cfg.actionID=="deleteAction" && rowKey == this.roleID){
                this.set("roleID",null);
            }
            else{
                //手动刷新吧
            }
        }

        ,inner:function(){
            
            return [
                {
                    $extend:roleSet
                    ,height:250
                    ,actionOKEvt:"actionOK"
                    ,selectEvt:"roleSelect"
                    ,roleService:this.roleService
                    ,edit:false
                }
                ,{
                    $extend:memberSet
                    ,$mixin:[bindTarget]
                    ,"@visible":"roleID"
                    ,"@roleID":"roleID"
                    ,roleService:this.roleService
                    ,edit:true
                    ,top:255
                }
            ];
        }
    };
});