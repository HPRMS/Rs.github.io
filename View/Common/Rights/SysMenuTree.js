sjs.using("Core5.Widget.Tree")
.define(function(tree){
    var menuDynamicLoad = {
        onClickPlusIcon:function(){
            //動態載入資料
            if(!this.expand && !this._subNodesLoad){
                this.loadTree();
            }
            else{
                this.setExpand(!this.expand);
            }
        }

        ,loadTree:function(){
            this._subNodesLoad = true;
            this.setExpand(true).setItems([{text:"loading..."}]);
            callService(this.menuService,"MenuList",this.key?[this.key]:[],this,this._queryOK);
        }

        //,noPlusIcon:true

        ,_queryOK:function(ret){
            var items = [];
            if(ret && ret.length){
                var rows = ret;
                for(var i=0;i<rows.length;i++){
                    var key = rows[i].MENU_ID;
                    items.push({
                        text:rows[i].MENU_NM + (rows[i].MENU_NM_EN==rows[i].MENU_NM?"":"(" + rows[i].MENU_NM_EN + ")")
                        ,key:key
                        ,";color":rows[i].LINK_KIND!="Core5"?null:"#000084"
                        ,items:[]
                        ,menuService:this.menuService
                        ,evt:this.evt
                    });
                }
            }
            this.setItems(items);
            if(!items.length){
                this.jq(".s-tree-plus-icon").hide();
            }
        }

        ,onClickTitle:function(){
            this.evt && this.key && this.report(this.evt,this.key);
        }
    };

    return {
        $extend:tree
        ,nodeMixin:[menuDynamicLoad]
        ,menuService:"prjSysRoleService"
        //,evt:
        ,items:[
            {
                text:"Menus"
                ,icon:"home"
                ,items:[]
            }
        ]
        ,_render:function(){
            this.$base();
            this._items[0].menuService = this.menuService;
            this._items[0].evt = this.evt;
            this._items[0].loadTree();
        }
    };
});