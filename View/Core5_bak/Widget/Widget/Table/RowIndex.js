/*提供grid checkbox多選*/
sjs.define(function(){
    return {
        setFields:function(fields,noRefresh){
            var newFields = [{
                prompt:"&nbsp;"
                ,thClass:"s-grid-th-seq"
                ,"-s-grid-td-seq":true
                ,noResize:true
                ,type:"cmp"
                ,inner:function(){
                    var form = this.parent;
                    var grid = form.parent;
                    if(form.item._NEW){
                        return "<b style='color:blue' title='new item(新項次)'>+</b>";
                    }
                    var rowIndex = form.rowIndex;
                    if(grid && grid.parent && grid.parent.pageSize){
                        var dataList = grid.parent;
                        return dataList.pageSize * (dataList.page-1) + rowIndex + 1;
                    }
                    return rowIndex + 1;
                }
                ,width:38
                ,paddingLeft:2
                ,paddingRight:2
                ,gridIndexField:true
                ,minWidth:30
                ,maxWidth:45
            }].concat(fields || []);
            this.$base(newFields,noRefresh);
        }               
    };
});     