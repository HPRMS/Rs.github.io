﻿sjs.loadCss("Core5.Widget.Input")
.using("Core5.Component")
.define(function(component) {
    return {
        $extend:component
        ,regUIObj:true
        ,"-s-checkbox":true
        ,checked:false           //預設值為false,避免null或其它值的出現.而在設定toggle時,請設定為false.但是從資料庫中出來綁定?
        //,checkText:
        //,noneText:""
        //,checkStyle:""
        //,noneStyle:""
        ,init:function(){
            this.$base();
            ////debugger
            //會略過_getByToggle,暫時看看會不會有影響,如果會考慮增加一個initSet方法了
            if(typeof(this.value) != "undefined"){
                this._initData("value");          //用_set,而不是set初始化,后者會判斷是否相等才執行,而這里要無條件執行
            }    
            else{
                this._initData("checked");
            }
            this._initData('text');
        }

        ,inner:function(){
            var labelId = this._domId + "_input";
            var disabled = this.isDisabled();
            return [
                {
                    tag:"input"
                    ,tagNoInner:true 
                    ,"-s-checkbox-input":true
                    ," s-change":"input"
                    ," type":"checkbox"
                    ," id":labelId
                    ," s-click":"checkClick"
                    ," checked":this.checked || null
                    ," disabled":disabled || null
                }
                ,{
                    tag:"label"
                    ,"-s-checkbox-label":true
                    ," for":labelId
                    ," disabled":disabled || null
                    ,inner:this.text
                }
            ];            
        }

        ,onDisabledChange:function(){
            var disabled = this.isDisabled();
            //this.setClass("s-readonly",disabled);
            if(this.isRender()){
                this.jq(".s-checkbox-input").prop("disabled",disabled);
                this.jq(".s-checkbox-label").prop("disabled",disabled);
            }
        }
        


          
        ,_setChecked:function(checked,change,oldValue,key,notifyFrom){    
            if(change){
                if(checked){
                    this.checkText && this.setText(this.checkText);
                    this.checkStyle && this.css(this.checkStyle);
                }
                else{
                    this.noneText && this.setText(this.noneText);                    
                    this.noneStyle && this.css(this.noneStyle);
                }
                notifyFrom != "VALUE" && this.set("value",checked?this.trueValue:this.falseValue,"CHECKED");
                this.isRender() && this.jq(".s-checkbox-input").prop("checked",checked);
                //console.log("set checked:" + this.checked);
            }        
        }

        ,_setText:function(text){
            this.isRender() && this.jq(".s-checkbox-label").html(text);
            this.attr("title",text);
        }

        /*
        ,getToggle:function(){
            return this.toggle;
        }
        */

        //不提供get方法，直接用this.toggle取資料就好
        //但是set，請使用setToggle，當然也可以用set("toggle",xxx)，但是后者代碼較多
        ,setChecked:function(checked){
            this.set("checked",checked);
            return this;
        }      
        
        ,setText:function(text){
            this.set("text",text);
            return this;
        }      

        ,onCheckClick:function(src,e){
            this.set("checked",this.jq("input").prop("checked"));
            this.onCommand(this.checked);             //用onClick而不是report,可以用配置的方式onClick直接回應事件,而不用report到上面去      
            e.stopPropagation();        //因為menu的mouseover會隱藏所有子選單，所以這里不冒泡，讓事件不執行
        }

        ," s-click":"checkConClick"
        ,onCheckConClick:function(src,e){
            if((e.srcElement || e.target) != this.jq("label")[0]){
                this.set("checked",!this.jq("input").prop("checked"));
                this.onCommand(this.checked);             //用onClick而不是report,可以用配置的方式onClick直接回應事件,而不用report到上面去      
            }
        }
        
        //默认不报事件，需要手动config后，才会报事件，防止上层误响应（因为默认bubbleResponse:true）
        //,evt:""
        
        ,onCommand:function(checked){
            //this.disable();
            this.evt && this.report(this.evt,checked);
        }
        /*
        //一般用于绑定，而对于事件，取值暂时可以不支援
        //控件数据的再次封装
        
        ,getValue:function(){
            return this.value;
        }
        */
        ,trueValue:"Y"
        ,falseValue:"N"
        
        ,_setValue:function(value,change,oldValue,key,notifyFrom){
            ////debugger
            notifyFrom != "CHECKED" && this.set("checked",value===this.trueValue,"VALUE");
        }
        
        ,setValue:function(value){
            this.set("checked",value);
            return this;
        }
        
        //其实这里也是一种绑定的关系，即让toggle绑定到value上
        //但这种原生控件，且数据关系简单的，还是直接写，绑定虽好，但是性能会有一点损失
        //,checkText:"fdafdsafdas"
        //,noneText:"none select"
        //,checked:true
       //,checkStyle:{color:"red"}
       //,noneStyle:{color:"green"}
      //  ,disabled:true
    }
});