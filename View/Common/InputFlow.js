sjs.using("Core5.Widget.Input.Command")
.using("Core5.YT.Model")
.using("Common.FlowSet")
.define(function(command,model,flowSet){
	return {
		$extend:command
		,textFromValue:false     //text和value獨立設定
         
        ,rightIcon:"user"
        
        ,onPopClick:function(){
            if(!this.popWindow){
            	this.createChild(model,{
            		inner:{
            			$extend:flowSet
            			,id:"flow"
            		}
            		,id:"popWindow"
            		,footer:[
            			{text:"OK",evt:"OK",floatRight:true}
            			,{text:"Close",evt:"close"}
            		]
            		,width:800
            		,height:500
            		,noClickHide:true
            		,title:"please query and click user to set flow..."
            	})	
            }
            this.popWindow.show();
        }
        
        ,onOK:function(model){
        	var flow = this.popWindow.flow.getFlow();
        	this.set("value",flow.users_id);
        	this.set("text",flow.users);
        	this.popWindow.hide();
        }
	}
})