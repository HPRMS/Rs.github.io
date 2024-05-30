sjs.using("Core5.Widget.Grid")
.define(function(grid){
	return {
		$extend:grid
		,xinit:function(){
            this.initFields();
			this.$base();
        }

        ,initFields:function(fields){
            ////debugger
			var titleButton = {
				"-icon":true
				,"-icon-plus":true
				,";margin-left":"8px"
                ," class":this._domId + "-grid-add-btn"
                ,";display":this.disableAddRemove?"none":""
			};
            var btnField = {
                prompt:titleButton
                ,thStyle:"cursor:pointer"
				,thAttr:"s-overClass='s-btn-over' s-click='addItem'"
				,noGridPrompt:true
				,type:"button"
				,icon:"minus"
				,evt:"remove"
				,width:30
                ," class":this._domId + "-grid-remove-btn"
                ,";display":this.disableAddRemove?"none":""
            }

            return [btnField].concat(fields || []);
        }

        ,setFields:function(fields,noRefresh){
            fields = this.initFields(fields);
            this.$base(fields,noRefresh)
        }

		
		//,items:[{}]

        ,_setDisableAddRemove:function(){
            this._showHideBtnForDisabled();
        }
        ,_showHideBtnForDisabled:function(){
            //TODO:disable button
            ////debugger
            if(this.isRender()){
                //maybe items set clear again
                var oThis = this;
                window.setTimeout(function(){
                    if(oThis && oThis.jq){
                        if(oThis.disableAddRemove){
                            oThis.jq("." + oThis._domId + "-grid-add-btn").hide();
                            oThis.jq("." + oThis._domId + "-grid-remove-btn").hide();
                        }
                        else{
                            oThis.jq("." + oThis._domId + "-grid-add-btn").show();
                            oThis.jq("." + oThis._domId + "-grid-remove-btn").show();
                        }
                    }
                });
            }
        }

        ,_setItems:function(items,change){
            this.$base(items,change);
            this._showHideBtnForDisabled();
        }
    
	    ,onRemove:function(btn){
          if(this.disableAddRemove){
            return;
          }
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
          if(this.disableAddRemove){
            return;
          }
	      this.add("items",this.defaultAddItem());
	    }    

        ,_fillFormMixin:function(ret){
            ret.push({
                noTdTag:true
            });
        }

	};
});