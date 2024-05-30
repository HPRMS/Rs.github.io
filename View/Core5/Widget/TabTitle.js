sjs.loadCss("Core5.Widget.Tab")
.using("Core5.Html.Tag")
.define(function(tag){
    return {
        "-s-tab-title":true
        ,selectedIndex:0
        ,getHtml:function(){
            this._initInner();
            return tag.html(this);
        }
        
        ,_initInner:function(){
            var inner = [];
            for(var i=0;i<this.items.length;i++){
                inner.push(this._getTitleText(this.items[i],i));
                inner.push(this._getToolbar(this.items[i],i));
            }
            this.inner = inner;
        }
        
        ,_getTitleText:function(item,index){
            var ret= {
                "-s-tab-title-text":true
                ,inner:item.title                  //title中也可以有click，然後在inner中回應，因為再上層的title有將事件傳走
                ," s-index":index
                ," s-click":"tabClick"
            };
            ret["-s-tab-title-text-" + index] = true;
            if(this.selectedIndex == index){
                ret["-s-tab-title-text-selected"] = true;
            }            
            return ret;
        }
        
        //如果要在toolbar位置上放一些文字，則直接override這個方法，因為放置文字在toolbar位置上和當前這種panel密切相關，所以不在inner中實現，也和inner無關
        ,_getToolbar:function(item,index){
            if(item.toolbar){
                var ret = {
                    "-s-tab-title-toolbar":true                    
                    ,inner:item.toolbar
                };
                ret["-s-tab-title-toolbar-" + index] = true;
                if(this.selectedIndex == index){
                    ret["-s-tab-title-toolbar-selected"] = true;
                }                
                return ret;
            }
            return "";
        }
        /*
        ,items:[
            {
                title:"aaaddd"
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
                title:"ccc"
                ,inner:"ddd"
                ,selected:true                
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
                title:"另一個tab標籤"
                ,inner:"最后一個<br>..."
                
            }
        ]
        */
    };
});