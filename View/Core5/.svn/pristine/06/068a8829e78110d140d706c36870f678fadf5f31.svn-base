sjs.using("Core5.Container")
.using("Core5.Layout.Float")
.using("Core5.YT.Button")
.using("Core5.YT.Panel")
.using("Core5.YT.Model")
.using("Core5.Html.Base")
.using("Core5.YT.Window")
.define(function(container,floatLayout,button,panel,model,baseHtml,window){
    return {
        $extend:container


        ,inner:[
            {
                $extend:container
                ,$mixin:[floatLayout]
                ,inner:[
                    {
                        $extend:button
                        ,text:"確定"
                        ,";margin-right":'10px'
                        ,";width":"100px"
                    }
                    ,{
                        $extend:button
                        ,text:"取消"
                        ,";margin-right":'10px'
                        ,evt:"cancel"
                    }
                    ,{
                        $extend:button
                        ,text:"Open model"
                        ,evt:"openModel"
                    }
                ]
            }
            ,{
                $extend:panel
                ,collapsed:false//true//
                ,title:"just a test,go,go,go.Hello world! 還有中文，好多好多fdasfdasf dasf dsf das fsa aaa bbb"
                ,inner:[
                    {
                        ";padding":"10px"
                        ,";font-size":"12px"
                        ,";color":"#444444"
                        ,inner:"hello world"
                    }
                    ,{
                        $extend:button
                        ,text:"button in panel(open window)"
                        ,";margin":"10px"
                        ,";float":"left"
                        ,evt:"openWin"
                    }
                    ,"<div style='clear:both'></div>"
                ]
                ,';width':"500px"
                ,";margin":"10px"
            }
        ]

        ,onCancel:function(){
            alert('cancel');
        }

        ,onOpenModel:function(){
            if(!this.model1){
                this.createChild({
                    $extend:model
                    ,id:"model1"
                    ,title:"model窗口"
                    ,noClickHide:true
                    ,top:20
                    ,inner:[
                        {
                            $extend:baseHtml
                            ,";padding":"10px"
                            ,";font-size":"12px"
                            ,";color":"#444444"
                            //,";border":"1px solid red"
                            ,inner:"我是彈出窗口<br>test"
                        }
                    ]

                    ,header:"收貨單查詢"

                    ,footer:[
                        {
                            $extend:button
                            ,floatRight:true
                            ,text:"取消"
                            ,";width":"50px"
                        }
                        ,{
                            $extend:button
                            ,text:"否"
                            ,floatRight:true
                            ,";width":"50px"
                        }
                        ,{
                            $extend:button
                            ,text:"是"
                            ,floatRight:true
                            ,";width":"50px"
                        }
                    ]
                });
            }
            this.model1.show();
        }


        ,onOpenWin:function(){
            this._winId = this._winId || 0;
            var id = ++this._winId;
                this.createChild({
                    $extend:window
                    ,title:"window_" + id
                    ,closeDestroy:true
                    ,windowMax:true
                    ,width:600
                    ,height:400
                    ,inner:[
                        {
                            $extend:baseHtml
                            ,";padding":"10px"
                            ,";font-size":"12px"
                            ,";color":"#444444"
                            //,";border":"1px solid red"
                            ,inner:"我是彈出窗口<br>test"
                        }
                    ]

                    ,header:"收貨單查詢"

                    ,footer:[
                        {
                            $extend:button
                            ,floatRight:true
                            ,text:"取消"
                            ,";width":"50px"
                        }
                        ,{
                            $extend:button
                            ,text:"否"
                            ,floatRight:true
                            ,";width":"50px"
                        }
                        ,{
                            $extend:button
                            ,text:"是"
                            ,floatRight:true
                            ,";width":"50px"
                        }
                    ]
                }).show();
        }
    }
});