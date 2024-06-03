//pgd的鏈接皆指向eip.pci.co.id就好
sjs//.setHost("eip.pci.co.id")
.using("Core5.YT.Panel")
.using("Core5.Widget.Toolbar")
.using(".Task")
//.callOther("eip.pci.co.id","ClientTool.User")
.call("ClientTool.User")
.call("PCI.Menu.IndexService.LoginPath")
.define(function(panel,toolbar,task,user,loginPath){
    return {
        $extend:panel
        ,init:function(){
            if(!user){
                location.href = loginPath.replace("PCI.Menu.Index","Common.Tasks.Main");
                this.inner = "Transfer to SSO Login,please wait...";
            }
            this.$base();
        }
        ,docTitle:"我的待辦(Web Pcc Messenger)"
        ,title:"<i en='Web Pcc Messenger'>我的待辦</i>&nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;" + (user?"<i en='Welcome'>歡迎您</i>," + user.Name:"<a style='color:yellow' href=\"/PCIService/View/UI.aspx?js=UI.LoginPage&returnJs=Core5.RunCore%2526js2%3D" + qs.JS2 + "\"><i en='Please login first!'>您還未登錄!</i></a>")
        ,inner: {
            $extend:task
            ,onLinkTask:function(src){
                    var linkID = src.attr("linkID");
                    var parentLevel = src.attr("parentLevel");
                    var index = parseInt(parentLevel.split(".")[0]) - 1;
                    var key = this.dataInner.data[index].Key;
                    this.openTask(key,linkID);
            }
//            ,openTask:function(key,linkID){
//                window.open("http://eip.pci.co.id/RIAService/MessageLink.aspx?MsgKind=" + key + "&MsgID=" + linkID);
//            }

        }
        
    };
    
});