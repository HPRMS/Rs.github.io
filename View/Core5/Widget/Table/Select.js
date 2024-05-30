/*提供grid checkbox多選*/
sjs.using("Core5.Widget.Table.RowKey")
.define(function(rowKey){
    return {
        $extend:rowKey
        ,regUIObj:true
        ,"-s-grid-select":true
        //,selected:null        //數組形式的主key
        
        ,init:function(){
            this.$base();
            this._initData("selected");
        }

        //,clickNoSelect:false
        ,selectTrClass:"s-grid-tr-selected"
                
        ,_fillFormMixin:function(ret){
            this.$base(ret);
            var oThis = this;
            ret.push({
                " s-click":this.clickNoSelect?null:"select"
                ,_setItem:function(item){
                    this.$base(item);
                    var thisKey = oThis.getRowKey(item);
                    this.setClass(oThis.selectTrClass,oThis.selected == thisKey && thisKey);
                }
            });
        }

        ,_setSelected:function(selected,change,oldSelected){
            if(this.isRender() && change){
                oldSelected && this.rowJq(oldSelected).removeClass(this.selectTrClass);
                selected && this.rowJq(selected).addClass(this.selectTrClass);
            }
        }     
  
        //,selectEvt:"select"
        //,onSelect:function(src,e){
        //,noRepeatSelect:true
        ,onSelect:function(btnOrSrc,srcOrE,e){
            var src = btnOrSrc.jq?srcOrE:btnOrSrc;
            var selected = btnOrSrc.jq?src.parents("tr[s-row-key]")[0].getAttribute("s-row-key"):src.attr("s-row-key");
            if(!this.noRepeatSelect || selected != this.selected){
                if(selected){
                    this.setSelected(selected);
                    this.selectEvt && this.report(this.selectEvt,selected,this.getRowByKey(selected));
                }
            }
        }
        
        ,setSelected:function(selected){
            this.set("selected",selected);
        }
    };
});     