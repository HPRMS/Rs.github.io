sjs.define(function(){
    return function(items,columnCount) {
        var rows = [];                          //return tr list
        var rows_cells_minus = [];              //must minus cell count in row
        
        //init the first row
        var currentRowIndex = 0;                //current row index
        var currentRowCellsTotal = columnCount; //current row remain cells count
        rows[0] = [];
        
        var len = items.length;
        for(var i=0;i<len;i++){
            var item = items[i];
            var colspan = item.colspan || 1;
            //keep right colspan
            if(colspan > currentRowCellsTotal){
                colspan = currentRowCellsTotal;
            }
            var rowspan = item.rowspan || 1;
            //注意：如果某個rowspan，如同行沒有其它元素，則rowspan無用，反而影響下面的程式
            if(rowspan>1){
                for(var j=1;j<rowspan;j++){     //add minus cells for the next rows
                    if(!rows_cells_minus[currentRowIndex+j]){
                        rows_cells_minus[currentRowIndex+j] = 0;
                    }
                    rows_cells_minus[currentRowIndex+j] += colspan;     //not 1,extjs bug here
                }
            }
            rows[currentRowIndex].push({index:i,rowspan:rowspan,colspan:colspan,item:item});
            currentRowCellsTotal -= colspan;
            if(currentRowCellsTotal == 0 && i<len-1){
                currentRowIndex++;
                rows[currentRowIndex] = [];
                currentRowCellsTotal = columnCount - (rows_cells_minus[currentRowIndex] || 0);
                if(currentRowCellsTotal <= 0){
                    alert('有不需要的rowspan設定，請檢查');
                    throw new Error("有不需要的rowspan設定，請檢查");
                }
            }
        }
        return rows;
    };
        
});