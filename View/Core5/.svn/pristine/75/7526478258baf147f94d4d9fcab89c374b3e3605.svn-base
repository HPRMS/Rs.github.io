//以平面數據定義tree，減少treeNode對象實例，簡化tree開發難度。主要是tree狀結構遞迴麻煩
sjs.using("Core5.Widget.Tree2")
.using("Core5.Util.Service")
.using("Core5.Util.DataFn")
.define(function(tree2,sc,dataFn){
    return {
        $extend:tree2

        ,loadSubItems:function(nodeKey){
            this.isRender() && this.doExpand(nodeKey,true);
        }

        ,_setItems:function(){
            this.setInner(this.treeInner);
        }
        ,inner:function(){
            return this.treeInner();
        }

        ,treeInner:function(){
            var ret = [];

            var items = this.getSubItems(this.rootID);
            if(typeof(items)=="string"){
                ret.push(items);
            }
            else if(items){
                for(var i=0;i<items.length;i++){
                    this.nodeInner(ret,items[i]);
                }
            }
            return ret;

        }

        ,getSubItems:function(nodeKey){
            var condition = {};
            condition[this.refKeyField] = nodeKey;
            var ret= dataFn.select(this.items,condition);
            return ret && ret.length?ret:null;
        }

        ,nodeInner:function(ret,item){
            var subItems = this.getSubItems(item[this.keyField]);

            //[]顯示，null不顯示
            var showSubItems = !!subItems;
            if(!showSubItems && this.leafField){
                showSubItems = typeof(this.leafField)=="function"?this.leafField.call(this,item)
                                            :typepof(this.leafValue)=="undefined"?
                                                item[this.leafField] 
                                                : item[this.leafField] !== this.leafValue;
            }


            var expand = true;
            if(typeof(this.expand)!='undefined'){
                expand = this.expand;
            }
            else if(this.expandField){
                expand = typeof(this.expandField)=="function"?this.expandField.call(this,item)
                                            :typepof(this.expandValue)=="undefined"?item[this.expandField] : item[this.expandField] !== this.expandValue;
            }

            ret.push(this.getNode(item,showSubItems,expand));
            showSubItems && ret.push(this.getNodeBody(item[this.keyField],subItems,expand));
        }

        ,getNode:function(item,showSubItems,expand){
            var nodeKey = item[this.keyField];
            this._data[nodeKey] = item;
            var ret= {
                " s-node-key":nodeKey
                ,"-s-tree-title":true
                ,"-s-tree-selected":typeof(this.selected)!="undefined" && item[this.keyField]==this.selected
                ,"-s-tree-title-noplus":this.noPlusIcon
                ,inner:[
                    !this.noPlusIcon && showSubItems?this._getPlusIcon(expand) :""             //plus,minus圖標
                    ,this._getIcon(item)                 //節點自身圖標
                    ,{
                        "-s-tree-title-text":true
                        ," s-click":"clickTitle"
                        ,inner:typeof(this.textField)=="function"?this.textField.call(this,item):item[this.textField]
                    }    
                ]
            };
            showSubItems && (ret[" s-node-expand"] = expand?"1":"0");
            return ret;
        }

        ,getNodeBody:function(nodeKey,subItems,expand){
            var nodes = [];
            if(typeof(subItems)=="string"){
                ret.push(subItems);
            }
            else if(subItems){
                for(var i=0;i<subItems.length;i++){
                    this.nodeInner(nodes,subItems[i]);
                    //nodes.push(this.getNode(subItems[i]));
                }
            }
            return {
                "-s-tree-body":true
                ," s-body-key":nodeKey
                ,inner:nodes
                ,";display":expand?"block":"none"
            };
        }

        ,_getPlusIcon:function(expand){
            var iconTag = {
                "-icon":true
                ,"-s-tree-plus-icon":true
                ," s-click":"clickPlusIcon"
                ,inner:"&nbsp"
            };

            iconTag["-icon-" + (expand=="1"?"minus":"plus")] = true;
            return iconTag;
        }
        
        ,_getIcon:function(item){
            if(this.icon || this.iconField){
                var iconTag = {
                    "-icon":true
                    ,"-s-tree-icon":true
                    ," s-click":"clickIcon"
                    ,inner:"&nbsp"
                }
                iconTag["-icon-" + (this.iconField?
                        typeof(this.iconField)=="function"?this.iconField.call(this,item)
                        :item[this.iconField]:this.icon)
                ] = true;
                return iconTag;
            }
            return "";
        }
        /*
        ,refKeyField:"up_id"
        ,keyField:"id"
        ,rootID:0
        ,selectEvt:"aaa"
        ,items:[
            {
                id:1
                ,up_id:0
                ,text:"node 1"
            }    
            ,{
                id:2
                ,up_id:0
                ,text:"node 2"
            }    
            ,{
                id:3
                ,up_id:0
                ,text:"node 3"
            }    
            ,{
                id:4
                ,up_id:0
                ,text:"node 4"
            }    
            ,{
                id:5
                ,up_id:1
                ,text:"node 1.1"
            }
            ,{
                id:8
                ,up_id:5
                ,text:"node 1.1.1"
            }
            ,{
                id:9
                ,up_id:5
                ,text:"node 1.1.2"
            }
            ,{
                id:6
                ,up_id:1
                ,text:"node 1.2"
            }
            ,{
                id:7
                ,up_id:1
                ,text:"node 1.3"
            }
            ,{
                id:10
                ,up_id:6
                ,text:"node 1.2.1"
            }
            ,{
                id:11
                ,up_id:2
                ,text:"node 2.1"
            }
        ]

        */
        ,loadService:"ClientTool"      //sql  or service name
        ,loadMethod:"QueryRows"
        ,loadSql:""
        ,loadArgs:function(){
           return this.loadSql?[this.loadSql,{}]:[];
        }
        ,doLoad:function(){
            this.setInner("loading...");
            sc.callService(this.loadService,this.loadMethod,this.loadArgs(),this,function(ret){
                ret = ret || [];
                if(this.addRootID){
                    var rootNode = {};
                    rootNode[this.refKeyField] = this.rootID;
                    rootNode[this.textField] = this.addRootName;
                    rootNode[this.keyField] = this.addRootID;
                    ret.push(rootNode);
                }
                this.set("items",ret);
            },function(result){
                this.setInner("<font title='expand to try again' color='red'>" + result.Message + "</font>");
            });
        }
        /*
        ,rootID:"-1"
        ,loadSql:"Select_fms_food_kind@PYV.FMS.DB"
        ,refKeyField:"up_kind_id"
        ,keyField:"kind_id"
        ,textField:"kind_name"
        ,addRootID:"0"
        ,addRootName:"All Kinds"
        ,loadArgs:function(){
           return [this.loadSql,{food_mk:0}];
        }
        */
        ,init:function(){
            this.$base();
            this.initStart && this.doLoad();
        }
        
    }
});