//redefine tree data stucture
sjs.loadCss("Core5.Widget.Tree")
.using("Core5.Component")
.using("Core5.Util.DataFn")
.using("Core5.Html.Tag")
.using("Core5.Util.Service")
.using("jQuery")
.define(function(component,dataFn,tag,sc,$){
    return {
        $extend:component

        ,nodeIdField:"_NODE_ID"
        ,textField:"text"
        ,iconField:"icon"
        ,icon:"list-alt"
        //,noPlusIcon:true

        //for select(no want mixin,just add here)
        ,valueField:"value"       
        ,selected:"1.2.2"
        ,items:[
            {
                text:"1:text1"
                //,value:"1"
                ,items:[
                    {
                        text:"1.1:text2"
                        ,value:"10"
                        ,collapse:true
                        ,items:[]         //wait loading(need value)
                    }    
                    ,{
                        text:"1.2:text3"
                        //,value:"1.2"
                        ,items:[
                            {
                                text:"1.2.1:text4"
                                ,value:"1.2.1"
                            }    
                            ,{
                                text:"1.2.2:text5"
                                ,value:"1.2.2"
                            }   
                        ]
                    }    
                ]
            }    
            ,{
                text:"2:text6"
                ,collapse:true
                ,items:[
                    {
                        text:"2.1:text7"
                        ,value:"2.1"
                    }    
                    ,{
                        text:"2.2:text8"
                        ,value:"2.2"
                    }   
                ]
            }
        ]


        ,init:function(){
            if(this.noPlusIcon && !this.icon){
                this.icon = "list-alt";     //icon或plus至少要有一個
            }
            (this.noPlusIcon || !this.icon) && this.addClass("s-tree-title-noplus");
            this.$base();
        }

        ,inner:function(){
            return this.nodesInner(this.items);
        }

        ,nodesInner:function(items){
            var ret = [];
            if(items && items.length){
                for(var i=0;i<items.length;i++){
                    var item = items[i];
                    var nodeId = item[this.nodeIdField];
                    if(!nodeId){
                        this._node_id_seed = this._node_id_seed || 1;
                        nodeId = item[this.nodeIdField] = this._objId + "-" + this._node_id_seed++;
                    }
                    //if(item.items===null){          //for dynamic loading
                    //    item.collapse = true;
                    //}
                    var hasChildren = typeof(item.items)!="undefined";
                    ret.push(this.node(item,nodeId,hasChildren));
                    hasChildren && ret.push(this.nodeChildren(item,nodeId));
                }
            }
            return ret;
        }

        //override這個節點，放一些有用的值在這里
        ,node:function(item,nodeId,hasChildren){
            return {
                " s-node-id":nodeId
                ,"-s-tree-title":true
                ,inner:[
                    !this.noPlusIcon && hasChildren ? {
                        "-icon":true
                        ,"-s-tree-plus-icon":true
                        ," s-click":"clickPlusIcon"
                        ," class":!item.collapse ? "icon-minus" : "icon-plus"
                        ,inner:""
                    } :""                                   //plus,minus圖標
                    ,this.icon ? {
                        "-icon":true
                        ,"-s-tree-icon":true
                        ," s-click":"clickIcon"
                        ," class":"icon-" + this.nodeIcon(item)
                        ,inner:""
                    } : ""                                   //節點自身圖標
                    ,{
                        "-s-tree-title-text":true
                        ," s-click":"clickTitle"
                        ,inner:this.nodeText(item)
                    }   
                ]

                ,"-s-tree-selected":this.valueField && this.selected == item[this.valueField]
                ," s-node-key":this.valueField && typeof(item[this.valueField])!="undefined"? "" + item[this.valueField]:false
            };
        }

        //can override
        ,nodeIcon:function(item){
            return this.iconField && item[this.iconField] ? item[this.iconField] : this.icon;
        }

        //can override
        ,nodeText:function(item){
            return item[this.textField];
        }

        ,nodeChildren:function(node,nodeId){
            return {
                "-s-tree-body":true
                ," s-body-id":nodeId
                ,inner:this.nodesInner(node.items)
                ,";display":!node.collapse?"block":"none"
            }
        }

        ,getItemByNodeId:function(nodeId){
            return this._getItemByField(nodeId,this.items,this.nodeIdField);
        }

        ,getItemByNodeKey:function(nodeKey){
            return this._getItemByField(nodeKey,this.items,this.valueField);
        }

        ,_getItemByField:function(nodeId,items,field){
            if(items && items.length){
                for(var i=0;i<items.length;i++){
                    if(items[i][field] == nodeId){
                        return items[i];
                    }
                    else if(items[i].items && items[i].items.length){
                        var ret= this._getItemByField(nodeId,items[i].items,field);
                        if(ret){
                            return ret;
                        }
                    }
                }
            }
            return null;
        }

        ,regUIObj:true
        
        ,onClickIcon:function(src){
            this.onClickTitle(src);
        }
        
        ,onClickTitle:function(src){
            !this.noPlusIcon ? this.clickTitle(src) : this.onClickPlusIcon(src);
        }

        ,onClickPlusIcon:function(src){
            this.clickPlusIcon(src);
        }

        ,clickTitle:function(src){
            var nodeId = src.parent().attr("s-node-id");
            var item = this.getItemByNodeId(nodeId);
            if(typeof(item[this.valueField])!="undefined"){
                var oldSelected = this.selected;
                this.set("selected",item[this.valueField]);
                this.selectEvt && this.report(this.selectEvt,selected,oldSelected,item,src);
            }
            this.clickEvt && this.report(this.clickEvt,item,src);
        }

        ,clickPlusIcon:function(src){
            var nodeId = src.parent().attr("s-node-id");
            var item = this.getItemByNodeId(nodeId);
            item.collapse?this.doExpand(nodeId):this.doCollapse(nodeId);
            this.plusIconEvt && this.report(this.plusIconEvt,item.collapse,item,nodeId);
            //item.items===null && this.doLoadSubItems(item[this.valueField]);
        }

        ,doExpand:function(nodeId){
            var item = this.getItemByNodeId(nodeId);
            item.collapse = false;
            if(this.isRender()){
                var titleJq = this.jq("[s-node-id='" + nodeId + "']");
                !this.noPlusIcon && titleJq.find(".s-tree-plus-icon").removeClass("icon-plus").addClass("icon-minus");
                this.jq("[s-body-id='" + nodeId + "']").css("display","block");
            }
        }
        
        ,doCollapse:function(nodeId){
            var item = this.getItemByNodeId(nodeId);
            item.collapse = true;
            if(this.isRender()){
                var titleJq = this.jq("[s-node-id='" + nodeId + "']");
                !this.noPlusIcon && titleJq.find(".s-tree-plus-icon").removeClass("icon-minus").addClass("icon-plus");
                this.jq("[s-body-id='" + nodeId + "']").css("display","none");
            }
        }

        ,_setSelected:function(selected,change,oldSelected){
            if(this.isRender()){
                this.jq("[s-node-key='" + oldSelected + "']").removeClass("s-tree-selected");
                this.jq("[s-node-key='" + selected + "']").addClass("s-tree-selected");
            }
        }  
        /*
        ,loadService:"ClientTool"      //sql  or service name
        ,loadMethod:"QueryRows"
        ,loadSql:""

        ,loadArgs:function(nodeKey){
            var args = [this.loadSql || nodeKey];
            this.loadSql && args.push({key:nodeKey});
            return args;
        }
        
        ,doLoadSubItems:function(nodeKey){
            var item = this.getItemByNodeKey(nodeKey);
            var nodeId = item[this.nodeIdField];
            this.jq("[s-body-id='" + nodeId + "']").html("<font title='please wait' color='gray'>[loading...]</font>");
            sc.callService(this.loadService,this.loadMethod,this.loadArgs(nodeKey),this
                ,function(ret){
                    this.setSubItems && this.setSubItems(nodeKey,ret || []);
                }
                ,function(result){
                    this.jq && this.jq("[s-body-id='" + nodeId + "']").html("<font title='expand to try again' color='red'>" + result.Message + "</font>");
                }
            );
        }
        */

        ,setSubItems:function(nodeKey,subItems){
            var item = this.getItemByNodeKey(nodeKey);
            if(item){
                item.items = subItems;
                if(this.isRender()){
                    var nodeId = item[this.nodeIdField];
                    this.jq("[s-body-id='" + nodeId + "']").html(tag.itemHtml(this.nodesInner(subItems)));
                    this.jq("[s-node-id='" + nodeId + "'] .s-tree-plus-icon").css("visibility",subItems && subItems.length?"visible":"hidden");
                }
            }
            else{
                alert(nodeKey + " not exist!");
            }
        }

        ,_setItems:function(){
            this.jq().html(tag.itemHtml(this.nodesInner(this.items)));
        }

        /*
		,loadService: "PYV.FMS._ui.Food"
		,loadMethod: "Load"
        */

        /*



        //add Items

        ,icon:"list-alt"
        //,iconField:"icon" or function(item){return "xxx"}
        ,textField:"text"  // or function(item){return "xxx"}
        
        //是否不顯示plus icon
        //,noPlusIcon:true

        //默認如果沒有， 則抓到就有，沒抓到就沒有
        //,leafField:""   //是否為葉子結點，可為函數
        //,leafValue:"1"

        //,expandField:""
        //,expandValue:"1"
        
        
        ,keyField:"value"
        //,rootID:"0"
        / *
        ,selected:5
        ,selectEvt:"aaa"
       // ,noPlusIcon:true
       * /
        
        ,loadSubItems:function(nodeKey){
            this._loaded[nodeKey] = true;
            this.doExpand(nodeKey,true);
            if(nodeKey==this.rootID && this.addRootID){
                var rootNode = {};
                rootNode[this.textField] = this.addRootName;
                rootNode[this.keyField] = this.addRootID;
                this && this.setSubItems && this && this.setSubItems(nodeKey,[rootNode]);
                this.loadSubItems(this.addRootID);
            }
            else{
                this.setSubItems(nodeKey,"loading...");
                sc.callService(this.loadService,this.loadMethod,this.loadArgs(nodeKey),this,function(ret){
                    this && this.setSubItems && this && this.setSubItems(nodeKey,ret);
                },function(result){
                    if(this && this.setSubItems){
                        delete this._loaded[nodeKey]; 
                        this && this.setSubItems && this.setSubItems(nodeKey,"<font title='expand to try again' color='red'>" + result.Message + "</font>");
                    }
                });
            }
        }

        ,getData:function(nodeKey){
            return this._data[nodeKey];
        }

        ,refreshNode:function(nodeKey){
            if(this._loaded){
                var allChildren=this.getAllChildrenKeys(nodeKey);
                for(var i=0;i<allChildren.length;i++){
                    delete this._loaded[allChildren[i]];
                    delete this._data[allChildren[i]];
                }
                delete this._loaded[nodeKey];
                delete this._data[nodeKey];
            }
            this.loadSubItems(nodeKey);
        }

        ,getParentKey:function(nodeKey){
            return this.nodeJq(nodeKey).parent().attr("s-body-key");
        }

        ,getChildrenKey:function(nodeKey,ret){
            var children = this.nodeBodyJq(nodeKey).children("[s-node-key]").map(function(){
                return $(this).attr("s-node-key");
            }).get();
            for(var i=0;i<children.length;i++){
                ret.push(children[i]);
            }
            return children;
        }

        ,getAllChildrenKeys:function(nodeKey,ret){
            if(!ret){
                ret = [];
            }
            var children = this.getChildrenKey(nodeKey,ret);
            for(var i=0;i<children.length;i++){
                this.getAllChildrenKeys(children[i],ret);
            }
            return ret;
        }

        ,getAllParentKeys:function(nodeKey,ret){
            if(!ret){
                ret = [];
            }
            var parentKey = this.getParentKey(nodeKey);
            if(parentKey){
                ret.push(parentKey);
                this.getAllParentKeys(parentKey,ret);
            }
            return ret;
        }
        /*
        ,iconField:"icon"
        ,leafField:"Type"
        ,leafValue:"File"
        ,keyField:"Name"
        
        ,clickEvt:"aaa"*/
    }
});