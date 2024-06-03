sjs.loadCss("Common.FlowSet")
.using("Core5.Container")
.using("Core5.Layout.AutoFit")
.using("Common.Users")
.using("Core5.ListContainer")
.using("Core5.Util.DataFn")
.define(function(container,autoFitLayout,users,listContainer,dataFn){
	return {
		$extend:container
		,$mixin:[autoFitLayout]
		,inner:[
			{
				$extend:users
				,selectEvt:"select"
				,rowKeyFields:"user_id"
				,bottom:70
			}
			,{
				$extend:listContainer
				,id:"flowList"
				,"-flowset":true
				,bottom:5
				,height:60
				,left:5
				,right:5
				,_getItemCfg:function(item,itemIndex){
		            return {
		            	data:item
		            	,regUIObj:true
		                ,inner:[
		                	{
		                		inner:item.Name
		                		,"-flowset-item-name":true
		                	}
		                	,{
		                		"-icon":true
		                		,"-icon-user":true
		                		,"-icon-blue":true
		                	}
		                	,{
		                		"-icon":true
		                		,"-icon-remove":true
				                ," s-overClass":"flowset-icon-over"
				                ," s-click":"removeItem"
		                	}
		                	,{
		                		"-icon":true
		                		,"-icon-arrow-left":true
				                ," s-overClass":"flowset-icon-over"
				                ," s-click":"leftItem"
		                	},{
		                		"-icon":true
		                		,"-icon-arrow-right":true
				                ," s-overClass":"flowset-icon-over"
				                ," s-click":"rightItem"
		                	}
		                ]
		                ," title":item.Email + '(' + item.user_id + ')'
		                ," s-overClass":"flowset-item-over"
		                ,displayBlock:"inline-block"
		                ,"-flowset-item":true
		            };
		        }
			}
		]

		,onSelect:function(table,selected,row){
			this.flowList.add("items",row);
			table.setSelected(null);
		}

		,onRemoveItem:function(itemUI){
			this.flowList.remove("items",itemUI.data);
		}

		,onLeftItem:function(itemUI){
			var items = this.flowList.items;
			var item = itemUI.data;
			var currentIndex = dataFn.indexOf(items,item);
			if(currentIndex>0){
				this.flowList.remove("items",item);
				this.flowList.add("items",item,currentIndex-1);
			}
		}

		,onRightItem:function(itemUI){
			var items = this.flowList.items;
			var item = itemUI.data;
			var currentIndex = dataFn.indexOf(items,item);
			if(currentIndex<items.length-1){
				this.flowList.remove("items",item);
				this.flowList.add("items",item,currentIndex+1);
			}
		}

		,getFlow:function(){
			var users_id = [];
			var users = [];
			var items = this.flowList.items;
			for(var i=0;i<items.length;i++){
				users.push(items[i].Name);
				users_id.push(items[i].user_id + ".00");
			}
			return {
				users_id:users_id.join(",")
				,users:users.join(" -> ")
			}
		}

	}
})