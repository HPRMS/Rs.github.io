sjs.loadCss("Core5.Widget.Tree")
.using("Core5.Component")
.using("Core5.Html.Tag")
.using("Core5.Util.Service")
.using("Core5.Util.DataFn")
.define(function(component,tag,sc,dataFn){
    return {
        $extend:component

        ,firstUpValue:0        //first level up value(no support json,please change)
        ,inner:function(){
            var items= this._getSubItems(this.firstUpValue);
            return this.itemsInner(items || []);
        }

        ,itemsInner:function(items){
            var ret = [];
            if(items){
                for(var i=0;i<items.length;i++){
                    this.itemInner(ret,items[i]);
                }
            }
            return ret;
        }

        //動態設定items，用于動態載入。相當于table的行也可以動態update

        //默認json遞歸格式，可override這個東東作各種處理
        //,itemsField:"items"
        //如果返回值為null或undefined表示永遠是葉子節點
        //否則動態載入或可轉換成上層節點的，可返回[]
        ,upField:"up_value"   //up field
        ,_getSubItems:function(upValue){
            var condition = {};
            condition[this.upField] = upValue;
            var ret= dataFn.select(this.items,condition);
            return ret && ret.length?ret:null;
        }

        ,_setSubItems:function(upValue,subItems){
            this.items = this.items || [];
            this.items = this.items.concat(subItems)
        }

        ,getItemByValue:function(value,items,parentNodes){
            items = items || this.items;
            if(items){
                for(var i=0;i<items.length;i++){
                    var itemValue = items[i][this.valueField];
                    if(itemValue==value){
                        return items[i];    
                    }
                    else{
                        var subItems = this._getSubItems(items[i]);
                        if(subItems){
                            parentNodes.push(itemValue);
                            var ret = this.getItemByValue(value,subItems,parentNodes);
                            if(ret){
                                return ret;
                            }
                            parentNodes.pop();
                        }
                    }
                }
            }
            return null;
        }

        //可設置展開到第幾層(不作，太復雜了，因為可能會動態更新節點層次)，或者特定節點才展開
        //默認只要有subItems就展開
        ,nodeExpand:function(item){
            //可通過expand設定全部展開或全部不展開
            if(this.expandField){
                return !!item[this.expandField];
            }
            else{
                return typeof(this.expand)!="undefined"?this.expand:true;
            }
        }

        ,valueField:"value"
        ,itemInner:function(ret,item){
            var subItems = this._getSubItems(item);
            var expand = subItems?this.nodeExpand(item):false;
            ret.push(this.nodeTitle(item,expand,subItems));
            subItems && ret.push(this.nodeBody(item,expand,subItems));
        }

        //是否展開分三種：葉子節點（永不展開），非葉子節點（已有資料展開，已有資料默認不展開，暫無資料動態展開）
        //override這個節點，可加入如checkbox等擴展
        ,nodeTitle:function(item,expand,subItems){
            var nodeValue = item[this.valueField];
            return {
                " s-title-value":nodeValue
                ," s-title-expand":expand ? "1":"0"
                ,"-s-tree-title":true
                ,"-s-tree-selected" : nodeValue == this.selected
                ,"-s-tree-title-noplus":this.noPlusIcon
                ,inner:[
                    this.nodePlusIcon(item,expand,subItems)
                    ,this.nodeIcon(item)            //節點自身圖標
                    ,this.nodeText(item)
                ]
            };
        }

        ,nodePlusIcon:function(item,expand,subItems){
            return !this.noPlusIcon && subItems ? {
                "-icon":true
                ,"-s-tree-plus-icon":true
                ," s-click":"clickPlusIcon"
                ," class":!expand?"-icon-plus":"-icon-minus"
                ,inner:""
            } :"";                           //plus,minus圖標
        }
        
        ,icon:"list-alt"
        ,nodeIcon:function(item){
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
            return "";      //也可以沒有icon
        }

        ,textField:"text"
        ,nodeText:function(item){
            return {
                "-s-tree-title-text":true
                ," s-click":"clickTitle"
                ,inner:typeof(this.textField)=="function"?this.textField.call(this,item):item[this.textField]
            }  
        }
        
        //如何延遲加載
        ,nodeBody:function(item,expand,subItems){
            //完全動態載入(就算有資料，也要點擊時才生成節點)
            //還是不要這樣，因為有可能不要人單擊也要定位到目標節點，簡單點吧
            return {
                "-s-tree-body":true
                ," s-body-value":item[this.valueField]
                ," s-body-render":subItems.length ? expand:true
                ,inner:!subItems.length || expand ? this.itemsInner(subItems):""
                ,";display":expand?"":"none"
            }
        }


        ,regUIObj:true

        ,onClickIcon:function(src){
            this.onClickTitle(src);
        }
        
        ,onClickTitle:function(src){
            !this.noPlusIcon ? this.clickTitle(src) : this.onClickPlusIcon(src);
        }

        ,clickTitle:function(src){
            var nodeValue = src.parent().attr("s-title-value");
            //層級數據，要如何拿到值???
            var nodeData = this.getItemByValue(nodeValue);
            if(this.selectEvt){
                var oldSelected = this.selected;
                this.set("selected",nodeValue);
                this.report(this.selectEvt,nodeValue,oldSelected,nodeData,src);
            }
            else if(this.clickEvt){
                this.report(this.clickEvt,nodeValue,nodeData,src);
            }
        }

        ,onClickPlusIcon:function(src){
            var nodeSrc = src.parent();
            var nodeValue = nodeSrc.attr("s-title-value");
            var expand = nodeSrc.attr("s-title-expand")=="1";
            this.doExpand(nodeValue,!expand);
            /*
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
            */
        }

        ,nodeTitleJq:function(nodeKey){
            return this.jq("[s-title-value='" + nodeKey + "']");
        }

        ,nodeBodyJq:function(nodeKey){
            return this.jq("[s-body-value='" + nodeKey + "']");
        }
        
        ,doExpand:function(nodeKey,expand){
            var titleJq = this.nodeTitleJq(nodeKey);
            titleJq.attr("s-title-expand",expand?"1":"0")
            if(!this.noPlusIcon){
                var oldIcon = expand?"plus":"minus";
                var icon = expand?"minus":"plus";
                titleJq.find(".s-tree-plus-icon")
                    .removeClass("icon-" + oldIcon)
                    .addClass("icon-" + icon);
            }
            this.nodeBodyJq(nodeKey).css("display",expand?"":"none");
        }

        ,_setSelected:function(selected,change,oldSelected){
            if(this.isRender()){
                this.jq("[s-title-value='" + oldSelected + "']").removeClass("s-tree-selected");
                this.jq("[s-title-value='" + selected + "']").addClass("s-tree-selected");
            }
        }      
        
        ,setSubItems:function(nodeValue,subItems){
            var nodeData = this.getItemByValue(nodeValue);
            if(nodeData){
                this._setSubItems(nodeData,subItems);
                this.isRender() && this.nodeBodyJq(nodeKey).html(tag.itemHtml(this.itemsInner(subItems)));
            }
        }
        
        ,getParentKey:function(nodeKey){
            var parentNodes = [];
            this.getItemByValue(nodeKey,this.items,parentNodes);
            return parentNodes.length?parentNodes[parentNodes.length-1]:null;
        }

        ,getChildrenKey:function(nodeKey,ret){
            var item = this.getItemByValue(nodeKey);
            var subItems =  item?this._getSubItems(item):null;
            if(!ret){
                ret = [];
            }
            if(subItems){
                for(var i=0;i<subItems.length;i++){
                    ret.push(subItems[i][this.valueField]);    
                }
            }
            return ret;
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
            var parentNodes = [];
            this.getItemByValue(nodeKey,this.items,parentNodes);
            return parentNodes;
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

        /*
        ,isShowSubItems:function(item){
            var ret = true;
            if(this.leafField){
                ret = typeof(this.leafField)=="function"?this.leafField.call(this,item)
                                :typeof(this.leafValue)=="undefined"?item[this.leafField] 
                                : item[this.leafField] !== this.leafValue;
            }
            return ret;
        }
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