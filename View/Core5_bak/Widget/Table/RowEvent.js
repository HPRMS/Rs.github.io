/*提供grid checkbox多選*/
sjs.using("Core5.Widget.Table.RowKey")
.define(function(rowKey){
    return {
        $extend:rowKey
        ,regUIObj:true

        ,onRowEvt:function(btnOrSrc,srcOrE,e){
            var evt = btnOrSrc.jq?btnOrSrc.rowEvt:btnOrSrc.attr("s-rowEvt");
            if(evt){
                var jq = btnOrSrc.jq?srcOrE:btnOrSrc;
                var rowKey = jq.parents("tr[s-row-key]")[0].getAttribute("s-row-key");
                var row = this.getRowByKey(rowKey);
                var realE = btnOrSrc.jq?e:srcOrE;
                this.response(btnOrSrc,evt,row,rowKey,jq,realE);
                realE.stopPropagation();
            }
            //alert(rowIndex + ":" + evt);
        }
    };
});     