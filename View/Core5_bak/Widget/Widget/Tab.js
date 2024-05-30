sjs.using("Core5.Container")
.using("Core5.Widget.TabTitle")
.using("Core5.Widget.Toolbar")
.define(function(container,tabTitle,toolbar){
    return {
        $extend:container
        ,regUIObj:true
        
        ,"-s-tab":true
        
        //以下樣式可任何組合
        /*
        ,"-s-tab-bottom":true       //標題在線下面
        ,"-s-tab-right":true        //標題在右邊
        ,"-s-tab-odd":true          //顏色變另一主色
        */
        ,selectedIndex:0
        ,init:function(){
            this.$base();
            this.inner.unshift(this._titleInner(this.inner));      //inner可能有$extend,$mixin后才會有title,toolbarItems，所以放在這里進行            
            this._initData("selectedIndex");
        }
        
        ,_titleInner:function(inner){
            var oThis = this;   
            var items = [];
            for(var i=0;i<inner.length;i++){
                var item = inner[i];
                items.push({
                    title:item.title
                    ,toolbar:this._getToolbarCfg(item)
                });
            }
            //因為partTitle不是component，所以沒辦法render
            return {
                $extend:tabTitle
                ,items:items
                ,render:function(){
                    for(var i=1;i<inner.length;i++){
                        inner[i].toolbar && inner[i].toolbar.render();
                    }
                }
            };
        }
        
        ,_getToolbarCfg:function(item){
            if(item.toolbarItems){
                //什么時候render?
                return item.createChild({      //事件直接導向到inner,toolbar也歸inner直接引用
                    $extend:toolbar
                    ,id:"toolbar"
                    //,$mixin:[layout]                //所有button邏輯上也都隸屬于inner管理，可能要控制button的顯示/隱藏，disable等狀態
                    ,inner:item.toolbarItems
                })
            }
            return null;
        }
        
        ,_setSelectedIndex:function(index,change,oldIndex){
            var inner = this.inner;
            for(var i=1;i<inner.length;i++){
                inner[i].setVisible(i == (index+1));
            }
            if(this.isRender()){        //如果有render了
                this.jq(".s-tab-title-text-" + oldIndex).removeClass("s-tab-title-text-selected");
                this.jq(".s-tab-title-text-" + index).addClass("s-tab-title-text-selected");
                this.jq(".s-tab-title-toolbar-" + oldIndex).removeClass("s-tab-title-toolbar-selected");
                this.jq(".s-tab-title-toolbar-" + index).addClass("s-tab-title-toolbar-selected");
            }
            else{
                this.inner[0].selectedIndex = index;
            }
        }
        
        ,select:function(index){
            this.set("selectedIndex",index);
        }
        
        ,onTabClick:function(src){
            this.select(parseInt(src.attr("s-index")));
        }
        
        /*
        ,inner:[
            {
                $extend:component
                ,title:"aaaddd"
                ,inner:"bbb"
                ,toolbarItems:[
                    {
                        text:"aaaddd.1"
                    }
                    ,{
                        text:"aaaddd.2"
                    }
                    ,"-"
                    ,{
                        text:"aaaddd.3"
                    }
                ]
            }
            ,{
                $extend:component                
                ,title:"ccc"
                ,inner:"ddd"
                ,toolbarItems:[
                    {
                        text:"ccc.1"
                    }
                    ,"-"
                    ,{
                        text:"ccc.2"
                    }
                    ,"-"
                    ,{
                        text:"ccc.3"
                    }
                    ,"-"
                    ,{
                        text:"ccc.444"
                    }
                ]
            }
            ,{
                $extend:component                
                ,title:"另一個tab標籤"
                ,inner:"最后一個<br>..."
                
            }
        ]
        */

    };
});