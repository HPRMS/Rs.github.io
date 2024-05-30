﻿/*表頭單擊排序*/
sjs.loadCss("Core5.Shp.icon")
.define(function(){
    return {
        regUIObj:true
        ,sortField:""
        ,sortSeq:"desc"
        ,defaultSeq:"desc"      //單擊一個新欄位排序時，默認降序排
        
        ,_th:function(field,titleRowIndex,fieldIndex,fields,titleRows){
            var ret = this.$base(field,titleRowIndex,fieldIndex,fields,titleRows);
            if(ret &&(field.sort || field.sortField)){    
                ret[" s-overclass"] = "s-grid-th-over";
            }
            return ret;            
        }
        
        ,_thInner:function(field,titleRowIndex,fieldIndex,fields){
            var ret = this.$base(field,titleRowIndex,fieldIndex,fields);
            if(field.sort || field.sortField){
                var sortField = field.sortField || field.fieldNo;
                if(sortField){
                    ret["-s-grid-field-sort"] = true;
                    ret[" s-click"] = "sort";
                    ret[" sort-field"] = sortField;
                    ret.inner = [
                        ret.inner
                        ,"<font " + (this.sortField==sortField?"":"style='display:none'")  
                        + " class='icon icon-blue" 
                        + (sortField==this.sortField?" "+(this.sortSeq=="desc"?"icon-arrow-down":"icon-arrow-up"):"")  
                        + "'>&nbsp;&nbsp;&nbsp;&nbsp;</font>"
                    ];
                }
            }
            return ret;
        }
        
        //,sortEvt:""
        
        ,onSort:function(src){
            ////debugger
            if(!this.sortDisabled){
                var sortField = src.attr("sort-field");
                var seq = this.defaultSeq;
                if(this.sortField == sortField){
                    seq = this.sortSeq == "asc"?"desc":"asc";
                }
                this.setSort(sortField,seq);
                //alert('排序:' + sortField + " " + this.sortSeq);
                this.sortEvt && this.report(this.sortEvt,sortField,this.sortSeq);
            }
        }
        
        ,setSort:function(sortField,seq){
            if(this.sortField != sortField || this.sortSeq !=seq){
                this.set("sortSeq",seq);
                this.set("sortField",sortField);
                this.jq(".s-grid-field-sort .icon").hide();
                this.jq("[sort-field='" + sortField + "'] .icon")
                    .removeClass(this.sortSeq=="asc"?"icon-arrow-down":"icon-arrow-up")
                    .addClass(this.sortSeq=="asc"?"icon-arrow-up":"icon-arrow-down")
                    .show();
            }
        }
    };
});