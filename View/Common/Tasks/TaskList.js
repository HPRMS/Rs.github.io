sjs.loadCss(".TaskList")
.using(".TreeList")
.define(function(treeList){
    return {
        $extend:treeList
            
        ,_items:function(row,level,seq,parentLevel,parentLength,items,rows){
            if(row.Detail.length){
                var ret = this.$base(row,level,seq,parentLevel,parentLength,items,rows);
                //找到link，底下的就停住
                if(row.LinkID){
                    ret["-task-detail-list"] = true;
                }
                return ret;
            }
            return "";
        }
            
            
        ,_item:function(row,level,seq,parentLevel,parentLength,isLeaf,items,rows){
            var ret = this.$base(row,level,seq,parentLevel,parentLength,isLeaf,items,rows);
            if(level==1){
                ret["-task-item-1"] = true;
            }
            return ret;
        }
            
        ,_hasDetail:function(row){
            var detail = row.Detail;
            for(var i=0;i<detail.length;i++){
                if(detail[i].Detail.length){
                    return true;
                }
            }
            return false;
        }
            

        ,_itemInner:function(row,level,seq,parentLevel,parentLength,isLeaf,items,rows){
            if(level==1){
                var retInner = [
                    {
                        inner:"<i en='source'>來源</i>:" + row.Name
                        ,"-task-source":true
                    }
                ];
                if(this._hasDetail(row)){
                    retInner.unshift({
                        inner:" + <i en='Detail'>明細</i>"
                        ,"-task-expand":true
                        ," s-click":"expand"
                    });
                }
                return {inner:retInner};
            }
            var text = " - " + row.Name + (row.Count?"<font class='task-count'>(" + row.Count + ")</font>":"");
            var ret = [];
            if(row.LinkID){
                var newRet = {};
                newRet[" s-click"] = "linkTask";
                newRet["-task-link"] = true;
                newRet[" s-overClass"] = "task-link-over";
                newRet[" linkID"] = row.LinkID;
                newRet[" parentLevel"] = parentLevel.split(".")[0];
                newRet.tag = "font";
                row.Info && (newRet[" core5"] = row.Info.Core5);
                newRet.inner = text;
                return newRet;
            }
            return text;
        }
        
    };
    
});