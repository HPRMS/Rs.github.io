/*提供grid checkbox多選*/
sjs.using("Core5.Widget.Button")
.define(function(button){
    return {
        regUIObj:true

        ,setFields:function(fields,noRefresh){
            var newFields = [{
                prompt:{
                    $extend:button
                    ,icon:"plus"
                    ,regUIObj:false //因为不会render，所以不要注册，否则s-click传不上去
                    ," title":"add one item"
                    ," s-click":"addItem"
                }
                ,noGridPrompt:true
                ,noResize:true
                ,$extend:button
                ,icon:"minus"
                ," title":"remove this item"
                ,evt:"removeItem"
                ,width:30
            }].concat(fields);
            this.$base(newFields,noRefresh);
        }    
        
        ,onRemoveItem:function(btn){
            this.remove("items",btn.parent.item);
            this._resize(true);
        }
            
        ,defaultAddItem:function(){
            return {};
        }
            
        ,onAddItem:function(){
            this.add("items",this.defaultAddItem());
            this._resize(true);
        }
                   
        //,clickLineEvt:""
        ,clickLastAutoAdd:false
        //單擊自動加一行
        ,onClickLineForm:function(form){
            var itemIndex = form._bindsBack.item.backField.split('.')[1];
            if(this.clickLastAutoAdd && itemIndex ==  this.items.length-1){
                this.add("items",this.defaultAddItem());       //單擊最后一行時，自動加一行
            }
            this.clickLineEvt && this.report(this.clickLineEvt,itemIndex);
        }      
        
        ,_fillFormMixin:function(ret){
            this.$base(ret);
            ret.push({
                regUIObj:true
                ," s-click":"clickLineForm"
            });
        }
          
    };
});     