sjs.loadCss(".TreeList")
.using("Core5.Html.Tag")
.using("Core5.Util.DataFn")
.define(function(tag,dataFn){
    return {
        tag:"ul"
        ,"-s-tree-list":true
        
        ,getHtml:function(html){
            this._initInner();
            return tag.html(this);
        }
        
        //,idField:"MENU_ID"
        //,upField:"UP_MENU_ID"
        
        //,getKind:"render"
        
        //,dataQuerySql:"Site/Menus"
                        
        ,_initInner:function(){
            this.inner = [];
            var treeRows = this.data;
            dataFn.loopDic(treeRows,"Detail",this,this._loop);          
            //dataFn.loopTree(treeRows,this.idField,this.upField,this,this._loop); 
        }
        
        ,_loop:function(rows,xxx,item,level,seq,parentLevel,parentLength,isLeaf,isLevelEnd){            //leafFn
            if(isLevelEnd){
                return;
            }
            var ret = this.inner;
            var items = dataFn.getParent(ret,parentLevel,"_getTreeItems");
            var row = rows[item.rowIndex];
            if(isLevelEnd){
                this._itemsEnd(items[seq-1],row,level,seq,parentLevel,parentLength,isLeaf,items,rows);
            }
            else{
                //首先是一個項次
                items.push(this._item(row,level,seq,parentLevel,parentLength,isLeaf,items,rows));
            }
        }
        
        ,_items:function(row,level,seq,parentLevel,parentLength,items,rows){
            //var title = "<div>level:" + (parentLevel) + "." + seq + "</div>";
            return {
                tag:"ul"
                ,"-s-tree-list":true
                ,inner:[]
            };
        }
        
        ,_itemsEnd:function(thisItem,row,level,seq,parentLevel,parentLength,isLeaf,items,rows){
        
        }
        
        ,_item:function(row,level,seq,parentLevel,parentLength,isLeaf,items,rows){
            return {
                tag:"li"
                ,"-s-tree-list-item":true
                ,inner:[
                    this._itemInner(row,level,seq,parentLevel,parentLength,isLeaf,items,rows)
                    ,!isLeaf?this._items(row,level,seq,parentLevel,parentLength,items,rows):""
                ]
                ,_getTreeItems:function(){
                    return this.inner[1].inner;
                }
            };
        }
        
        ,_itemInner:function(row,level,seq,parentLevel,parentLength,isLeaf,items,rows){
            return "row:" + (parentLevel) + "." + seq + "(level:" + level + ")";
            //return row.Name;
        }
    };
});