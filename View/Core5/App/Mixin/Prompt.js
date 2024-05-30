sjs.using("Core5.YT.Model")
.using("Core5.Widget.Form")
.define(function(model,form){
	return {
		prompt:function(title,okEvt,prompt,noClickHide){
			if(!this._promptModel){
				this.createChild(model,{
					id:"_promptModel"
					,inner:{
						$extend:form
						,id:"form"
						,inner:[
							{
								type:"text"
								,fieldNo:"prompt"
							}
						]
					}
					,title:title
					,footer:[
						{
						  text:"OK"
						  ,icon:"ok"
						  ,floatRight:true
						  ,evt:"OK"
						}
						,{
						  text:"Close"
						  ,icon:"remove"
						  ,evt:"close"
						}
					]
					,onOK:function(){
						var prompt = this.form.item.prompt;
						prompt && this.okEvt && this.report(this.okEvt,prompt);
					}
					,height:95
                    ,noClickHide:typeof(noClickHide)=="undefined"?true:noClickHide
				});
			}
			this._promptModel.form.set("item.prompt",prompt || "");
			this._promptModel.set("okEvt",okEvt).set("title",title).show();
			return this._promptModel;
		}

		,hidePrompt:function(){
			this._promptModel && this._promptModel.hide();
		}

		,customPrompt:function(modelId,okEvt,title,inner,cfg){
			if(!this[modelId]){
				this.createChild(model,cfg,{
					id:modelId
					,inner:inner
					,footer:[
						{
						  text:"OK"
						  ,icon:"ok"
						  ,floatRight:true
						  ,evt:okEvt
						}
						,{
						  text:"Close"
						  ,icon:"remove"
						  ,evt:"close"
						}
					]
                    ,noClickHide:typeof(cfg.noClickHide)=="undefined"?true:cfg.noClickHide
				});
			}
			this[modelId].set("title",title).show();
			return this[modelId];
		}
	};
});