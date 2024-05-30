sjs.using("Core5.Html.TableLayout")
.define(function(tableLayout){
    return {
        $extend:tableLayout
        ,columnCount:2           //分幾欄顯示
        ,init:function(){
            this.$base();
            this._initTableLayout();
        }

        ,_initTableLayout:function(){
            this._columnCount = this._getColumnCount(this.inner,this.columnCount);
            this._layoutRows = this._getLayoutRows(this.inner,this._columnCount);     //直接用table.,而不是this. 可以單獨調用getHtml，不用擔心context問題
        }

        ,_itemsHtml:function(html,items){
            var table = this._table(this._layoutRows,this._columnCount);
            this._itemHtml(html,table);
        }
    };
});