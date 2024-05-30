﻿sjs.loadCss("Core5.Widget.Input")
.loadCss("Core5.Shp.Icon")
.using("Core5.Component")
.using("jQuery")
.using("Core5.DomEvent.oninput")
.define(function(component,$){
    return {
        $extend:component
        ,regUIObj:true
        ,rightIcon:"upload"        //配置項,未提供動態變更chevron-down
        ,"-s-upload":true

        ,init:function(){
            this.$base();
            this._initData("file");
            this.iptFileId = this._domId + "_input_file";
        }

        ,set:function(key,value,notifyFrom){
            if(notifyFrom != "SELF_SET" && key=="fileID"){
                if(value!=this.iptFileId){
                    this.set("fileID",this.iptFileId,"SELF_SET");       //要將值更新回去，這是單向綁定的一個特徵，或者讓item.SO_FILE_ID bind 子元素id.fileID?
                }
                return;
            }
            this.$base(key,value,notifyFrom);
        }

        ,inner:function(){
            return [
                {
                    "-s-upload-text":true
                    ,inner:this.text
                    
                }
                ,{
                    "-s-upload-label":true
                    ,tag:"label"
                    ," for":this.isDisabled()?null:this.iptFileId
                   // ," disabled":this.isDisabled()?true:null
                }
                ,{
                    tag:"label"
                    ," for":this.isDisabled()?null:this.iptFileId
                    ,"-s-upload-icon":true
                    ,"-icon":true
                    ," class":"icon-" + this.rightIcon
                    ,inner:"&nbsp;"
                   // ," disabled":this.isDisabled()?true:null

                }
            ];
        } 

        ,onDisabledChange:function(){
            var disabled = this.isDisabled();
            this.setClass("s-readonly",disabled);
            if(this.isRender()){
                this.jq(".s-upload-label").attr("for",disabled?"":this.iptFileId);
                this.jq(".s-upload-icon").attr("for",disabled?"":this.iptFileId);
            }
        }

        ,getUrlFromFile:function(file){
            return "/RIAService/Upload/Files/" + this.fileKind + "/" + file;
        }

        ,modifyShowText:function(file){
            return file;
        }

        ,_setFile:function(file,change,oldValue,key,notifyFrom){
            if(notifyFrom == "USER_SELECT_OK" && file){
                this.set("text",file);
            }
            else{
                if(file){
                    var url = this.getUrlFromFile(file);
                    this.set("_org_file",file);
                    this.set("text",'<a rel="external" target="_blank" href="' + url.replace("\"","&quot;") + '">' + this.modifyShowText(file) + '</a>&nbsp;&nbsp;<font style="cursor:pointer;color:red" title="delete file" s-click="removeFile">[delete]</font>');
                }
                else{
                    this.set("text","");
                }
                if(this.isRender()){
                    $("#" + this.iptFileId).remove();
                    $("#SERVICE_UPLOAD_FORM").append("<input s-objId='" + this._objId + "' type='file' s-change='input' name='" + this.iptFileId + "' id='" + this.iptFileId + "'>");
                }
            }
        }
        
        ,_setText:function(text){
            if(this.isRender()){
                this.jq(".s-upload-text").html(text || "&nbsp;");
            }
        }   

        ,onRemoveFile:function(){
            this.set("_org_file",null);     //只要remove一次，就再也回不來了
            this.set("file",null);
            this.removeEvt && this.report(this.removeEvt);
        }
        
        //動態創建input file
        ,_render:function(){
            this.$base();
            if($("#SERVICE_UPLOAD_IFRAME").size()==0){
                var html = [];
                //不能用display:none;因為safari安全考量，用戶看不到input file,則不會觸發其click()方法
                html.push('<form style="width:0;height:0;overflow:hidden;" id="SERVICE_UPLOAD_FORM" enctype="multipart/form-data" accept-charset="UTF-8" target="SERVICE_UPLOAD_IFRAME" method="post">');
                html.push('<input type="hidden" name="JsonService">');
                html.push("</form>");
                html.push('<iframe style="display:none;width:120px;height:120px" id="SERVICE_UPLOAD_IFRAME" name="SERVICE_UPLOAD_IFRAME"></iframe>');
                $("body").append(html.join(""));
                /*
                var iframe = $("#SERVICE_UPLOAD_IFRAME")[0];
                if (iframe.attachEvent){
                    iframe.attachEvent("onload", function(){
                        //debugger
                        //alert('attachEvent onload\n' + iframe.src);
                    });
                } else {
                    iframe.onload = function(){
                        alert('onload\n' + iframe.src);
                    };
                }
                */

            }
            $("#SERVICE_UPLOAD_FORM").append("<input s-objId='" + this._objId + "' type='file' s-change='input' name='" + this.iptFileId + "' id='" + this.iptFileId + "'>");
        }

        //提交一次就拿掉一次
        ,_dispose:function(noRemoveJq){
            this.isRender() && $("#" + this.iptFileId).remove();
            this.$base(noRemoveJq);
        }    
        

        ,types:"*"           //逗號分隔的后綴，如gif,jpg,jpeg,png等

        ,_checkType:function(path){
            var types = this.types.split(",");
            var ext = path.substr(path.lastIndexOf(".")+1).toLowerCase();
            for(var i=0;i<types.length;i++){
                if(types[i] == "*" || types[i].toLowerCase()==ext){
                    return true;
                }
            }
            return false;
        }

        ,onInput:function(){
            if(this.isDisabled()){  
                return ;
            }
            var val= $("#" + this.iptFileId).val();
            if(val && this._checkType(val)){
                this.set("file",val,"USER_SELECT_OK");
            }
            else{
                //只要用戶選了，不符合文件類型，就要清空input upload，并還原當前的原始file(update或null)
                this.set("file",this._org_file || null);        
                //chrome cancel時會清空input upload，但是esc和右上角X不會，其它流覽器cancel同esc，不會有動作觸發
                val && alert('file type must be:' + this.types);
            }
        }

    };
});