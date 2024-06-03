sjs.using("Core5.YT.Model")
.using("Common.MultipleUpload")
.define(function(model,uploadGrid){
  return {
    //uploadOkEvt:""
    onShowUpload:function(){
      if(!this.uploadModel){
        this.createChild(model,{
          id:"uploadModel"
          ,inner:{
            $extend:uploadGrid
            ,id:"grid"
          }
          ,title:"attachments"
          ,footer:[
            {
              text:"OK"
              ,icon:"ok"
              ,floatRight:true
              ,evt:"uploadOK"
            }
            ,{
              text:"Close"
              ,icon:"remove"
              ,evt:"close"
            }
          ]
          ,getUploadItems:function(){
            var items = this.grid._items;
            var files = [];
            for(var i=0;i<items.length;i++){
              files.push(items[i].updIpt.iptFileId);
            }
            return files;
            //alert(JsonHelper.encode(ids));
          }
          ,onUploadOK:function(){
            this.parent.uploadOKEvt && this.report(this.parent.uploadOKEvt,this.getUploadItems());
          }
        });
      }
      this.uploadModel.show();
    }
  };
});