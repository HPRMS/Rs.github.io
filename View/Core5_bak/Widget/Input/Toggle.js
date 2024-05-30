sjs.using("Core5.Widget.Button")
.define(function(button) {
    return {
        $extend:button
        ," s-click":"toggleClick"

        ,"-s-tgl":true
        ," s-overClass":"s-tgl-over"
        ," s-downClass":null
        
        ,checkIcon:"check"
        ,noneIcon:"none"
        ,toggleClass:"s-tgl-checked"
        ,toggle:false           //預設值為false,避免null或其它值的出現.而在設定toggle時,請設定為false.但是從資料庫中出來綁定?
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
                this._initData("toggle");
            }
        }
          
        ,_setToggle:function(toggle,change,oldValue,key,notifyFrom){    
            if(change){     //除非最后上的dom上的view操作，否則不要判斷此change屬性
                if(toggle){
                    this.addClass(this.toggleClass);
                    this.setIcon(this.checkIcon);
                    this.checkText && this.setText(this.checkText);
                    this.checkStyle && this.css(this.checkStyle);
                }
                else{
                    this.removeClass(this.toggleClass);
                    this.setIcon(this.noneIcon);
                    this.noneText && this.setText(this.noneText);                    
                    this.noneStyle && this.css(this.noneStyle);
                }
            }        
            notifyFrom != "VALUE" && this.set("value",toggle?this.trueValue:this.falseValue,"TOGGLE");
        }
        /*

        ,getToggle:function(){
            return this.toggle;
        }
        */
        //不提供get方法，直接用this.toggle取資料就好
        //但是set，請使用setToggle，當然也可以用set("toggle",xxx)，但是后者代碼較多
        ,setToggle:function(toggle){
            this.set("toggle",toggle);
            return this;
        }            

        ,onToggleClick:function(){
            this.set("toggle",!this.toggle);
            this.onCommand(this.toggle);             //用onClick而不是report,可以用配置的方式onClick直接回應事件,而不用report到上面去      
        }
        
        //默认不报事件，需要手动config后，才会报事件，防止上层误响应（因为默认bubbleResponse:true）
        //,evt:""
        
        ,onCommand:function(toggle){
            this.evt && this.report(this.evt,toggle);
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
            notifyFrom != "TOGGLE" && this.set("toggle",value===this.trueValue,"VALUE");
        }
        
        ,setValue:function(value){
            this.set("value",value);
            return this;
        }
        
        //其实这里也是一种绑定的关系，即让toggle绑定到value上
        //但这种原生控件，且数据关系简单的，还是直接写，绑定虽好，但是性能会有一点损失
        //,"@toggle":"this.value"

        //,text:"aaa"
        //,toggle:true

    }
});