﻿sjs.using("Core5.Widget.Grid")
.define(function(grid){
	return {
		$extend:grid
		,xinit:function(){
            this.initFields();
			this.$base();
        }

        ,initFields:function(fields){
			return [{
				prompt:{
				  "-icon":true
				  ,"-icon-plus":true
				  ,";margin-left":"8px"
				}
				,thStyle:"cursor:pointer"
				,thAttr:"s-overClass='s-btn-over' s-click='addItem'"
				,noGridPrompt:true
				,type:"button"
				,icon:"minus"
				,evt:"remove"
				,width:30
			}].concat(fields || []);
        }

        ,setFields:function(fields,noRefresh){
            fields = this.initFields(fields);
            this.$base(fields,noRefresh)
        }

		
		//,items:[{}]
    
	    ,onRemove:function(btn){
          var item = btn.parent.item;
          if(this.keyFields){
            var fields = this.keyFields.split(",");
            var hasKey = true;
            var keys = {};
            for(var i=0;i<fields.length;i++){
                if(!item[fields[i]]){
                    hasKey = false;
                    break;
                }
                else{
                    keys[fields[i]] = item[fields[i]];
                }
            }
            if(hasKey){
                if(!this.deleteItems)
                    this.deleteItems = [];
                this.deleteItems.push(keys);
            }
          }
	      this.remove("items",btn.parent.item);
	    }
	    
	    ,defaultAddItem:function(){
	      return {};
	    }
	    
	    ,onAddItem:function(){
	      this.add("items",this.defaultAddItem());
	    }    

        ,_fillFormMixin:function(ret){
            ret.push({
                noTdTag:true
            });
        }

	};
});