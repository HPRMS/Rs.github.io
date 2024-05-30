sjs.loadCss("Core5.Widget.Input")
.using("Core5.Component")
.using("Core5.Html.TableLayout")
.define(function(component, tableLayout) {
    return {
        $extend:component
        ,$mixin:[tableLayout]
        ,regUIObj:true
        ,"-s-radiobox":true

        ,init:function(){
            this.$base();
            this._initData("items",[]);
            this._initData("value");          
        }

        ,valueField:"value"
        ,textField:"text"

        ,columnCount: 0         //all items in one line

        ,getItemsInner:function(){
            var ret = [];
            var disabled = this.isDisabled();
            this._radio_seed_id = this._radio_seed_id || 0;
            this._radio_seed_id++;
            //in table one radio object will render repeat in many rows
            this.radioName = this._objId + "_radio_" + this._radio_seed_id;            //in table _domId will remove

            for(var i=0;i<this.items.length;i++){
                var checked = this.value == this.items[i][this.valueField];
                var itemText = this.items[i][this.textField];
                var labelId = this.radioName + "_" + (i+1);
                ret.push({
                    //";display":"block"
                    "-s-radiobox-item":true
                    ,"-s-radiobox-item-checked": checked
                    ,tdStyle : this.items[i].tdStyle
                    ,colspan: this.items[i].colspan
                    ,rowspan: this.items[i].rowspan
                    ," title": itemText
                    ,inner:[
                        {
                            tag:"input"
                            ,tagNoInner:true 
                            ,"-s-radiobox-input":true
                            ," type":"radio"
                            ," disabled":disabled || null
                            ," name": this.radioName
                            ," value":this.items[i][this.valueField]
                            ," checked":checked?"true":null
                            ," s-click":"click"
                            ," id": labelId
                        }
                        ,{
                            tag:"label"
                            ,inner: itemText
                            ,"-s-radiobox-label":true
                            ," for":labelId
                            ," disabled":disabled || null
                            
                        }
                    ]
                })
            }
            return ret;
        }

        ,layoutInner:function(){
            ////debugger
            var itemsInner = this.getItemsInner();
            if(itemsInner && itemsInner.length){
                this._layoutRows = this._getLayoutRows(itemsInner,this.columnCount || itemsInner.length);     //直接用table.,而不是this. 可以單獨調用getHtml，不用擔心context問題
                return this._table(this._layoutRows,this.columnCount);       
            }
            return "";
        }

        ,inner:function(){
            return this.layoutInner();
        }
        
        //默认不报事件，需要手动config后，才会报事件，防止上层误响应（因为默认bubbleResponse:true）
        //,evt:""

        ,onClick:function(){
            var checked = this.jq("input:checked").val();
            var oldValue = this.get("value");
            this.set("value",checked);
            this.evt && this.report(this.evt,checked,oldValue);
        }


        
        ,onDisabledChange:function(){
            var disabled = this.isDisabled();
            if(this.isRender()){
                this.jq("input").prop("disabled",disabled);
            }
        }
        
        ,_setValue:function(checked,change,oldValue,key,notifyFrom){    
            if(this.isRender()){
                var checked = this.jq("input:checked").val();
                var inputJq = this.jq("input[value='" + this.value + "']");
                if(checked != this.value){
                    inputJq.prop("checked",true);
                }
                this.jq(".s-radiobox-item-checked").removeClass("s-radiobox-item-checked");
                inputJq.parent().addClass("s-radiobox-item-checked");
            }        
        }
        
        ,_setItems:function(items,change){
            this.setInner(this.layoutInner);
        }

        
        //,columnCount: 0         //all items in one line
        //,cellsWidth:[100,0]
        //, items:[
        //    {value:"aaa", text:"First Value"}//,colspan:2}    
        //    ,{value:"bbb", text:"2nd Value", tdStyle:"color:blue"}    
        //    ,{value:"ccc", text:"Third(第三) Value"}    
        //]

        //,value:"bbb"
        //,disabled:true
        //,x_render:function(){
        //    this.$base();
        //    this.set("items",[{value:"ddd", text:"4th Value"},   {value:"eee", text:"第五 Value"}  ]);
        //    //this.set("value", "ccc");
        //    //this.disable();
        //}
        
    }
});