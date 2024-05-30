sjs.using("Core5.Widget.Input.Combox")
.define(function(combox,UNDEF){
    return {
        $extend:combox
        ,init:function(){
            this.items = this.getDefaultItems();
            this.$base();
        }

        ,startHour:7
    
        ,endHour:24

        ,showQuarter:true
        ,showHalf:true

        ,getDefaultItems:function(){
            var items = [];
            for (var i = this.startHour; i < this.endHour; i++) {
                var stri = i < 10 ? "0" + i : i;
                var strj = "00";
                var text = stri + ":" + strj;
                var value = stri + strj;       //時間格式包括中間的分號
                items[items.length] = { value: value, text: text };
                if(this.showQuarter){
                    strj = "15";
                    text = stri + ":" + strj;
                    value = stri  + strj;
                    items[items.length] = { value: value, text: text };
                }
                if(this.showHalf){
                    strj = "30";
                    text = stri + ":" + strj;
                    value = stri  + strj;
                    items[items.length] = { value: value, text: text };
                }
                if(this.showQuarter){
                    strj = "45";
                    text = stri + ":" + strj;
                    value = stri  + strj;
                    items[items.length] = { value: value, text: text };
                }

            }
            return items;
        }

        ,onInput:function(ipt,e,text){
            text = text.replace(":","");
            if(text.length==0){
                this.$base(ipt,e,null);
            }
            else if(text.length==4 && text>'0000' && text<'2400'){
                this.$base(ipt,e,text);
            }
            else{
                this._innerSetText();       //還原上一個值(顯示),value不變
            }
        }

        ,_setText:function(text,change){
            this.$base(text,true);
        }


        ,format:function(value){
            var ret = value;
            if(value && value.length==4){
                ret = ret.substr(0,2) + ":" + ret.substr(2,2);
            }
            return ret;
        }


    };
});