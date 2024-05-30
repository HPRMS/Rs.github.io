sjs.loadCss("Core5.Shp.Icon")
.loadCss("Core5.Widget.Tree")
.using("Core5.Component")
.using("Core5.ListContainer")
.define(function(component,listContainer){
    var treeNode = {
        $extend:component
        ,regUIObj:true
        ,"-s-tree-title":true
        ,text:"Title Text"
        ,icon:"list-alt"
        //,expand:true        //展開          //默認不展開?

        ,init:function(){
            this.$base();
            this.noPlusIcon && this.addClass("s-tree-title-noplus");
            if(this.items && this.expand){     //如果是動態的，請先將items設定為[]，這樣才有treeBody對象，等下才可以動態setItems進來
                this.createChild(tree,this.treeMixin,this._getTreeBodyCfg());
                //不在自身輸出的child component(節約一層包裝?)
                //this.setExpand(this.expand);
            }
        }
        
        ,_getTreeBodyCfg:function(){
            return {
                //$extend:tree
                //,$mixin:this.treeMixin
                treeMixin:this.treeMixin
                ,nodeMixin:this.nodeMixin
                ,id:"treeBody"
                ,"-s-tree-body":true
               ,items:this.items
            }        
        }
                
        ,inner:function(){
            return [
                this.items && !this.noPlusIcon? this._getPlusIcon():""         //plus,minus圖標
                ,this._getIcon()                                //節點自身圖標
                ,{
                    "-s-tree-title-text":true
                    ," s-click":"clickTitle"
                    ,inner:this.text
                }    
            ];
        }
        
        ,_getPlusIcon:function(){
            var iconTag = {
                "-icon":true
                ,"-s-tree-plus-icon":true
                ," s-click":"clickPlusIcon"
                ,inner:"&nbsp"
            }
            iconTag["-icon-" + (this.expand?"minus":"plus")] = true;
            return iconTag;
        }
        
        ,_getIcon:function(){
            if(this.icon){
                var iconTag = {
                    "-icon":true
                    ,"-s-tree-icon":true
                    ," s-click":"clickIcon"
                    ,inner:"&nbsp"
                }
                iconTag["-icon-" + (this.icon)] = true;
                return iconTag;
            }
            return "";
        }
        
        ,onClickPlusIcon:function(){
            this.setExpand(!this.expand);
        }
        
        ,onClickIcon:function(){
            this.onClickTitle();
        }
        
        ,onClickTitle:function(){
            this.onClickPlusIcon();
        }
        
        ,_setExpand:function(expand){
            if(!this.treeBody){
                this.createChild(tree,this.treeMixin,this._getTreeBodyCfg());
                this.treeBody.renderTo("#" + this._domId,this.INSERT_AFTER);
            }
            //if(this.treeBody){
                if(this.isRender() && !this.noPlusIcon){
                    var oldIcon = expand?"plus":"minus";
                    var icon = expand?"minus":"plus";
                    this.jq(".s-tree-plus-icon").removeClass("icon-" + oldIcon).addClass("icon-" + icon);
                }
                this.treeBody.setVisible(expand);
            //}
        }

        ,setExpand:function(expand){
            this.set("expand",expand);
            return this;
        }
        
        //在_render時renderItem要好些嗎?想一次抓出html來,不依賴事件
        ,getHtml:function(){
            var ret = this.$base();
            return ret + (this.treeBody?this.treeBody.getHtml():"");
        }
        
        ,_render:function(){
            this.$base();       //放在前面，是因為主對象可能這個時候還會操作子對象，如setDay，但因為子對象還沒render，所以不會造成重複調用dom（只改變值）低性能
            this.treeBody && this.treeBody.render();
        }  
        
        ,setItems:function(items){
            this.set("items",items);
            return this;
        }  
        
        ,_setItems:function(items){
            this.treeBody && this.treeBody.setItems(items);
        }    

        ,_setText:function(text){
            if(this.isRender()){
                this.jq(".s-tree-title-text").html(text);
            }
        }

        ,setText:function(text){
            this.set("text",text);
        }

        ,_setIcon:function(icon,change,oldIcon){
            if(change && this.isRender()){
                this.jq(".s-tree-icon").removeClass("icon-" + oldIcon).addClass("icon-" + icon);
            }
        }

        ,setIcon:function(icon){
            this.set("icon",icon);
        }
    }
    
    
    var tree =  {
        $extend:listContainer
        ,itemType:treeNode
        ,_getItemCfg:function(item,itemIndex){
            if(this.nodeMixin){
                item.$mixin = item.nodeMixin = this.nodeMixin;
            }
            if(this.treeMixin){
                item.treeMixin = this.treeMixin;
            }
            return item;
        }
    }

    return tree;
});