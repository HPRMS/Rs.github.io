sjs.using("Core5.Widget.Window")
.using("Core5.Component")
.define(function(window,component){
    return {
        $extend:window
        ,title:"您確定(Are you sure)..."
        ,icon:"question-sign"
        ,inner:{
            $extend:component
            ,";text-align":"center"
            //,";font-weight":"bold"
            ,";padding":"20px 5px"
            //,";font-size":"12px"
            //,";font-family":"verdana"
            ,";color":"#444444"
            //,inner:"Are you sure to delete?<br><br><br>xfdasfdsa dfas fdasf dasf dasf dsaf das fs fdsa fds fds af sdf asfdas<br>fdasfdas fdsa fas fd<br>aaaa<br>bbb<br>ccc"
            ,inner:"some text here..."
        }
        ,width:320
        ,height:150
       // ,left:120
        ,toolbarPos:"bottom"
        ,toolbarItems:[
            {
                text:"確定(Yes)"
                ,icon:"ok"
                ,floatRight:true
                ,";font-weight":"bold"
                ,evt:"confirm"
            }
            ,"-|"
            ,{
                text:"取消(No)"
                ,icon:"remove"
                ,floatRight:true
                ,";color":'gray'
                ,evt:"close"
            }
        ]

        ,showMsg:function(msg){
            if(this.isRender()){
                this.inner[0].jq().html(msg);
            }
            else{
                this.inner[0].inner = msg;
            }
            this.show();
        }

        ,onConfirm:function(){
            this.hide();
            if(this.context && this.contextFn){
                this.contextFn.apply(this.context,this.contextArgs || []);
            }
        }
    }
});