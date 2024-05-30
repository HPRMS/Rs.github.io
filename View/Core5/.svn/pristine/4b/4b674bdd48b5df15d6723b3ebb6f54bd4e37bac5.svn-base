//以平面數據定義tree，減少treeNode對象實例，簡化tree開發難度。主要是tree狀結構遞迴麻煩
sjs.loadCss("Core5.Widget.Tree")
.using("Core5.Component")
.using("Core5.Util.DataFn")
.using("Core5.Html.Tag")
.using("Core5.Util.Service")
.using("jQuery")
.define(function(component,dataFn,tag,sc,$){
    return {
        $extend:component
        ,init:function(){
            this.$base();
            this.rootID = typeof(this.rootID)=="undefined"?"0":this.rootID;       //用0作為默認的root值
            this._loaded = {};
            this._data = {};        //記錄tree的數據值，方便要用時可以取
        }

        ,_render:function(){
            this.$base();
            this.initStart && this.loadSubItems(this.rootID);
        }

        ,inner:"<i zh='載入中'>Loading</i>..."

        ,nodeInner:function(ret,item){
            var showSubItems = true;
            if(this.leafField){
                showSubItems = typeof(this.leafField)=="function"?this.leafField.call(this,item)
                                            :typeof(this.leafValue)=="undefined"?
                                                item[this.leafField] 
                                                : item[this.leafField] !== this.leafValue;
            }

            ret.push(this.getNode(item,showSubItems));
            showSubItems && ret.push(this.getNodeBody(item[this.keyField]));
        }

        //override這個節點，放一些有用的值在這里
        ,getNode:function(item,showSubItems){
            var nodeKey = item[this.keyField];
            this._data[nodeKey] = item;
            return {
                " s-node-key":nodeKey
                ," s-node-expand":showSubItems?"0":"-1"
                ,"-s-tree-title":true
                ,"-s-tree-selected":typeof(this.selected)!="undefined" && item[this.keyField]==this.selected
                ,"-s-tree-title-noplus":this.noPlusIcon
                ,inner:[
                    !this.noPlusIcon && showSubItems?this._getPlusIcon() :""             //plus,minus圖標
                    ,this._getIcon(item)                 //節點自身圖標
                    ,{
                        "-s-tree-title-text":true
                        ," s-click":"clickTitle"
                        ,inner:typeof(this.textField)=="function"?this.textField.call(this,item):item[this.textField]
                    }    
                ]
            };
        }

        ,getNodeBody:function(nodeKey){
            return {
                "-s-tree-body":true
                ," s-body-key":nodeKey
                ,inner:""
                ,";display":"none"
            }
        }

        ,_getPlusIcon:function(){
            return {
                "-icon":true
                ,"-s-tree-plus-icon":true
                ," s-click":"clickPlusIcon"
                ,"-icon-plus":true
                ,inner:""
            };
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
        
        ,onClickIcon:function(src){
            this.onClickTitle(src);
        }
        
        ,onClickTitle:function(src){
            !this.noPlusIcon ? this.clickTitle(src) : this.onClickPlusIcon(src);
        }

        ,clickTitle:function(src){
            if(this.selectEvt){
                var selected = src.parent().attr("s-node-key");
                var oldSelected = this.selected;
                this.set("selected",selected);
                this.report(this.selectEvt,selected,oldSelected,this.getData(selected),src);
            }
            else if(this.clickEvt){
                this.report(this.clickEvt,selected,this.getData(selected),src);
            }
        }

        ,regUIObj:true
        ,onClickPlusIcon:function(src){
            var nodeSrc = src.parent();
            var nodeKey = nodeSrc.attr("s-node-key");
            var expandValue = nodeSrc.attr("s-node-expand");
            if(expandValue=="-1"){
                this.clickTitle(src);
            }
            else{
                var expand = expandValue=="1";

                if(expand){
                    this.doExpand(nodeKey,false);
                }
                else{
                    if(!this._loaded[nodeKey]){
                        this.loadSubItems(nodeKey);
                    }
                    else{
                        this.doExpand(nodeKey,true);
                    }
                }
            }
        }

        ,nodeJq:function(nodeKey){
            return this.jq("[s-node-key='" + nodeKey + "']");
        }

        ,nodeBodyJq:function(nodeKey){
            return nodeKey==this.rootID ?this.jq():this.jq("[s-body-key='" + nodeKey + "']");
        
        }
        
        ,doExpand:function(nodeKey,expand){
            var titleJq = this.jq("[s-node-key='" + nodeKey + "']")
                .attr("s-node-expand",expand?"1":"0")
            if(!this.noPlusIcon){
                var oldIcon = expand?"plus":"minus";
                var icon = expand?"minus":"plus";
                titleJq.find(".s-tree-plus-icon")
                    .removeClass("icon-" + oldIcon)
                    .addClass("icon-" + icon);
            }
            this.jq("[s-body-key='" + nodeKey + "']").css("display",expand?"block":"none");
            return this;
        }

        ,_setSelected:function(selected,change,oldSelected){
            if(this.isRender()){
                this.jq("[s-node-key='" + oldSelected + "']").removeClass("s-tree-selected");
                this.jq("[s-node-key='" + selected + "']").addClass("s-tree-selected");
            }
        }      

        ,setSubItems:function(nodeKey,subItems){
            if(typeof(subItems)=="string"){
                this.nodeBodyJq(nodeKey).html(subItems);
                this.nodeJq(nodeKey).find(".s-tree-plus-icon").css("visibility","visible");
            }
            else if(subItems && subItems.length){
                var subNodes = [];
                for(var i=0;i<subItems.length;i++){
                    this.nodeInner(subNodes,subItems[i]);
                }
                this.nodeBodyJq(nodeKey).html(tag.itemHtml(subNodes));
                this.nodeJq(nodeKey).find(".s-tree-plus-icon").css("visibility","visible");
            }
            else{
                this.nodeBodyJq(nodeKey).html("");
                this.nodeJq(nodeKey).find(".s-tree-plus-icon").css("visibility","hidden");
            }
        }

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
        /*
        ,selected:5
        ,selectEvt:"aaa"
       // ,noPlusIcon:true
       */
        

        ,loadService:"ClientTool"      //sql  or service name
        ,loadMethod:"QueryRows"
        ,loadSql:""

        ,loadArgs:function(nodeKey){
            var args = [this.loadSql || nodeKey];
            if(this.loadSql){
                args.push({key:nodeKey});
            }
            return args;
        }

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
        ,loadService:"PCI.SDK.Test"
        ,loadMethod:"GetFolderFiles"
        ,loadArgs:function(nodeKey){
            return ["PYV.FMS",nodeKey];
        }
        ,iconField:"icon"
        ,leafField:"Type"
        ,leafValue:"File"
        ,keyField:"Name"
        
        ,clickEvt:"aaa"*/
    }
});