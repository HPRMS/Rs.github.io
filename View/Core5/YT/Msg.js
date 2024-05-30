sjs.loadCss("Core5.YT.Msg")
.using("Core5.YT.Model")
.using("Core5.YT.Button")
.using("Core5.Html.Base")
.using("Core5.Cls")
.using("Core5.Widget.Input.Textarea")
.using("Core5.Widget.Ability.DragResize")
.define(function(model,button,htmlBase,cls,textarea,dragResize){
    var msg = {
        $extend:model
        ,$mixin:[dragResize.rb,dragResize.right,dragResize.bottom]
        ,width:300
        ,height:150
        ,minWidth:300
        ,minHeight:150

        //,visible:true
        ,noClickHide:true

        ,footer:[
            {
                $extend:button
                ,id:"cancelBtn"
                ,floatRight:true
                ,text:"Cancel"
                ,evt:"close"
                ,";width":"50px"
            }
            ,{
                $extend:button
                ,id:"noBtn"
                ,floatRight:true
                ,text:"No"
                ,evt:"close"
                ,";width":"50px"
            }
            ,{
                $extend:button
                ,id:"yesBtn"
                ,floatRight:true
                ,text:"Yes"
                ,evt:"yes"
                ,";width":"50px"
            }
        ]

        //,kind:"done"            //done,warn,error,question
        //,info:"Hello World fdas fdf dasf dsafds af dasfdsaf dsf dsaf dsa fdsaf dasfdsa fdsa fdsaf ds af dsf dsa dfas 這是一個行測試，好長好長<br>hello 自行換行嗎....fdasfdasfdasfds dfasfdasdsaa aaaab bbbbb ccccc dddddddd eeeeeeeeeeeeeeeeeeeeeeeeeee"

        ,inner:function(){
            return {
                $extend:htmlBase
                ,inner:[
                    {
                        "-yt-msg-icon":true
                        ," class":"yt-msg-icon-" + this.kind
                    }
                    ,{
                        "-yt-msg-info":true
                        ,inner:this.info
                    }
                ]
            };
        }

        ,_setKind:function(kind,change,oldKind){
            if(this.isRender()){
                this.jq(".yt-msg-icon").removeClass("yt-msg-icon-" + oldKind).addClass("yt-msg-icon-" + kind.toLowerCase());
            }

            this.footerCon.cancelBtn.setText(kind == "Question" || kind=="Warn"?"Cancel":"Close");
            this.footerCon.yesBtn.setVisible(kind == "Question" || kind=="Warn");
            this.footerCon.noBtn.setVisible(false);//kind == "question" || kind=="warn");
        }

        ,_setInfo:function(info){
            if(this.isRender()){
                this.jq(".yt-msg-info").html(info);
            }
        }

        ,onYes:function(){
            this.hide();
            this.fn && this.fn.apply(this.context,this.args || []);
        }

    };

    var msgModel;
    var promptModel;
    var cfg;
    function showMsg(kind,info,title,fn,args,context){
        if(!msgModel){
            msgModel = cls.create(msg,{
                width:cfg.width || 300
                ,height:cfg.height || 150
            }).show();
        }
        msgModel.set("kind",kind).set("Info",info).setTitle(title || kind);
        msgModel.fn = fn;
        msgModel.args = args;
        msgModel.context = context;
        msgModel.show();
    }

    cfg = {
        warn:function(info,fn,args,context,title){
            showMsg("Warn",info,title,fn,args,context);
        }

        ,info:function(info,title){
            showMsg("Done",info,title);
        }

        ,error:function(info,title){
            showMsg("Error",info,title);
        }

        //args是一個數組[]
        ,ask:function(info,fn,args,context,title){
            showMsg("Question",info,title,fn,args,context);
        }

        ,prompt:function(prompt,context,okEvt,required,defaultValue){//,noClickHide){
			if(!promptModel){
				promptModel = cls.create(model,{
					inner:{
						$extend:textarea
                        ,";height":"62px"
                        ,id:"input"
					}
					//,title:"please input"
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
						var prompt = this.input.value;
                        if(this.required && !prompt){
                            alert('can not empty!');
                            return;
                        }
						this.okEvt && this.report(this.okEvt,prompt);
                        this.hide();
					}
					,height:126
                    ,showBottomBorder:false
                    //因為會清空輸入的內容，所以還是不要點擊空白處自動關閉，以免輸入的內容跑掉
                    //,noClickHide:typeof(noClickHide)=="undefined"?true:noClickHide
				});
			}
            promptModel.input.set("value",defaultValue || null);
			promptModel.setResponser(context).set("required",required).set("okEvt",okEvt).set("title",prompt + (required?"<b style='color:yellow'>(Required)</b>":"")).show();
		}
    }

    return cfg;
});