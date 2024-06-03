sjs.using("Core5.Container")
.using("Core5.Widget.Button")
.using("Core5.Widget.Form")
.using("Core5.Layout.Form")
.using("Core5.Widget.Input.Textarea")
.using("Core5.Bind.BindTarget")
.define(function(container,button,form,formLayout,textarea,target){
    var arrayTextarea = {
        $extend:textarea
        ,$mixin:[target]
        ,noTdTag:true
        ,_setValue:function(value,change){
            value = value && value.push?value.join("\n"):value;
            this.$base(value,change);
        }
        
        ,onInput:function(ipt,e,text){
            text = text.split("\n");
            this.$base(ipt,e,text);
        }
    };

    return {
        $extend:container
        ,inner:function(){
            var configFields = [].concat(this.configFields);
            configFields.unshift({
                text:this.title
                ,colspan:2
                ,type:"label"
                ,";text-align":"center"
            });
            configFields.push({
                $extend:button
                ,icon:"hdd"
                ,text:"Save"
                ,evt:"save"
                ,tdStyle:"text-align:center"
                ,";width":"120px"
                ,";margin":"5px"
                ,displayBlock:"inline-block"
                ,noTdTag:true
            });
            return [
                {
                    $extend:form
                    ,$mixin:[formLayout]
                    ,_initInnerItem:function(itemCfg,itemIndex){
                        if(itemCfg.type=="arrayTextarea"){
                            itemCfg.$extend = arrayTextarea;
                        }
                        return this.$base(itemCfg,itemIndex);
                    }

                    ,columnCount:1
                    ,cellsWidth:[300,0]
                    ,id:"configForm"
                    ,inner:configFields
                }
            ];
        }

        ,init:function(){
            this.$base();
            this.getConfig();
        }

        ,getConfig:function(){
            callService("PCIWeb.Tools.ConfigHelper","GetConfig",[this.configFile],this,function(ret){
                this.configForm.set("item",ret);
            });
        }

        ,onSave:function(){
            var cfg = this.configForm.item;
            callService("PCIWeb.Tools.ConfigHelper","SaveConfig",[this.configFile,cfg],this,function(ret){
                alert('save ok');
            });
        }

    };
});