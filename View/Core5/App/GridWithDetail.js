sjs.using("Core5.App.EditGrid")
.using("Core5.Bind.BindTarget")
.define(function(editGrid,bindTarget){
    return {
        $extend:editGrid
        /*
        ,fields:[
            {
                type:"button"
                ,width:30
                ,icon:"chevron-down"
                ,evt:"toggleDetailGrid"
            }
            ,{
                prompt:"aaa"
                ,fieldNo:"aaa"
            }    
            ,{
                prompt:"bbb"
                ,fieldNo:"bbb"
            }    
            ,{
                prompt:"ccc"
                ,fieldNo:"ccc"
            }   
        ]

        ,items:[
            {
                "DETAIL":["","","","",""]
            }    
        ]
        ,detailFields:[{},{},{}]
        */
        //,editGridHeight:300

        ,rightScrollHideTr:false
        ,detailFieldNo:"DETAIL"

        ,onToggleDetailGrid:function(btn){
            var form = btn.parent;
            btn.set("icon",form.__showDetailGrid?"chevron-down":"chevron-up");
            form.set("__showDetailGrid",!form.__showDetailGrid);
            this.jq("#" + form._detailDomId).toggle();

            if(!form._detailEditGrid){
                var ret = form.createChild(editGrid,bindTarget,{
                    fields:this.detailFields
                    ,id:"_detailEditGrid"
                    ,"@items":"item." + this.detailFieldNo
                    
                    //,";height":this.editGridHeight + "px"
                    ,";min-height":"100px"
                    ,";position":"static"
                    ,rightScrollHideTr:false
                    //,";border":"1px solid blue"
                    ,";background-color":"white"

                    ,_resize:function(forceResize){
                        this.parent.parent._resize(forceResize);
                        this.$base(forceResize);
                    }
                },this.detailMixin || {});
                ret.renderTo("#" + form._detailDomId + " td",true);
            };

            //right scroll can not automatic adjust
            //form.__showDetailGrid && form._detailEditGrid.jq()[0].scrollIntoView(true);
            
            this._resize(true);
        }

        ,detailGridTitle:"<div style='color:#000084;font-weight:bold;font-size:12px;padding:5px 10px'><i zh='明細'>Detail</i></div>"

        ,_dyRenderItem:function(innerItem,index){
            this.renderItem(innerItem
                ,index == 0?(this._items[0]?this.INSERT_BEFORE:true):this.INSERT_AFTER
                ,index == 0?(this._items[0]?"#" + this._items[0]._domId:this._itemsContainerJq()):"#" + this._items[index-1]._detailDomId
            );
        }

        ,_getInnerMixin:function(row,rowIndex){
            var ret = this.$base(ret);
            ret.getHtml = function(){
                var html = this.$base();
                this._detailDomId =  this._domId + '_detail_tr';
                return html + "<tr style='display:none' id='" + this._detailDomId + "'><td style='padding:5px;background-color:#FFFFBB' colspan='" + (this.inner.length+1) + "'>" + (this.parent.detailGridTitle || "") + "</td></tr>";          //blank td
            }
            ret._dispose = function(noRemoveJq){
                !noRemoveJq && this.isRender() && this.jq().next().remove();
                this.$base(noRemoveJq);
            }
            return ret;
        }


    };
});