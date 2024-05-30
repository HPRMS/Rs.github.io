/*動態select，即items是在單擊command后才開始抓的，且text是由上層傳入，而不是根據items計算得出的*/
sjs.using("Core5.Widget.Input.Command")
.using("Core5.Widget.Input.RadioGroup")
.using("Core5.Widget.Mixin.QueryGen")
.define(function(command,radioGroup,queryGen){
    return {
        $extend:command
        ,$mixin:[queryGen("items")]
        ,textFromValue:false     //text和value獨立設定
                
        ,init:function(){
            this.$base();
            this._argChange = true;     //初始化時為true，即第一次要itemsQuery一下，以后就可以自己設定_argChange了
        }
        
        ,rightIcon:"chevron-down"
        
        ,popType:radioGroup
        
        ,maxPopHeight:200
        ,minPopHeight:200
        ,minPopWidth:200
        ,_getPopConfig:function(){
            return { 
                textField:this.textField || "text"
                ,valueField:this.valueField || "value"
                ,";max-height":this.maxPopHeight + "px"
                ,";min-width":this.minPopWidth + "px"
                ,";min-height":this.minPopHeight + "px"
                ,";overflow-y":"auto"    
                ,evt:"popSelect" 
            };
        }
        
        /*
        ,"@itemArgs":"@data.PROD_BUILD"
        ,bindItemArgsFrom:function(build){
            return {BUILD_NO:build};
        }
        */
        
        //,queryEveryTime:false
        ,onPopClick:function(){
            this.showPop();
            if(this._argChange){
                !this.queryEveryTime && (this._argChange = false);
                //TODO:不要一直查
                this.pop.setInner("loading...");
                this.itemsQuery(this.initCondition,this.sort,this.pagesize,this.page);
            }
        }
        
        
        ,_getRowsFromResult:function(ret){
            return ret?ret.Rows || ret:null;
        }
        
        
        ,itemsQueryResult:function(ret){
            this.set("items",this._getRowsFromResult(ret) || []);
        }
        
        ,itemsQueryError:function(result,addParam){
            this.set("items",[]);
        }
        
        ,_setItems:function(items){
        
            if(items){
                !this.queryEveryTime && (this._argChange = false);
            }
            if(this.pop){
                items && items.length?this.pop.setItems(items).select(null).select(this.value):this.pop.setInner("No Items");
            }
        }
        
        //可override此方法,提供一個享元pop,避免浪費
        ,_getPop:function(popType){
            var ret = this.$base(popType);
            var items = this.items;
            items && items.length?ret.setItems(items).select(null).select(this.value):ret.setInner("No Items");
            ret.css("width",this.jq().outerWidth() + "px");
            return ret;
        } 
                
        ,onPopSelect:function(group,v,item,itemIndex){
            this.pop.hide();
            this.setValue(v);
            this.set("text",item[this.textField || "text"]);
            this.evt && this.report(this.evt,v,item,itemIndex);
        }
    }
});