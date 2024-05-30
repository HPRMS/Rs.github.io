sjs.loadCss("Core5.Widget.Input")
.using("Core5.Component")
.define(function(component) {
    return {
        $extend:component
        
        ,"-s-label":true
        //,mline:false
        ,init:function(){
            this.mline && this.addClass("s-label-mline");
            this.$base();
            if(typeof(this.value) != 'undefined'){
                this._initData("value");
            }
            else{
                this._initData("text");
            }
        }

        ,format:function(text){
            return text;
        }
        
        ,_setText:function(text){
            var textIsNull = text === null || typeof(text)=="undefined";
            if(this.format && (!textIsNull || this.formatNull)){
                //format不用去管null或undefined的情形了
                text = this.format(text);
            } 
            var show = text === null || typeof(text)=="undefined" ?(typeof(this.textWhenNull)=="function"?this.textWhenNull():(this.textWhenNull || "")):text;
            this.overShowTitle && this.attr("title",show);
            if(this.isRender()){
                this.jq().html(show);
            }
            else{
                this.inner = show;
            }
        }
        
        ,setText:function(text){
            this.set("text",text);
            return this;
        }

        //,text:"aaa"        
        
        ,setValue:function(value){
            this.set("value",value);
            return this;
        }
        
        ,_setValue:function(value){
            this.set("text",value);
        }
        
    }
});