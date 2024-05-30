sjs.loadCss("Core5.YT.Button")
.using("Core5.Component")
.using("Core5.DomEvent.onmouseclass")
.define(function(component){
    return {
        $extend:component
        ,regUIObj:true
        ," s-click":"click"
        //,";width":"120px"
        ,"-yt-btn":true
        ," s-overClass":"yt-btn-over"

        ,inner:function(){
            return [
               "<div class='yt-btn-l'></div>" 
               ,"<div class='yt-btn-r'></div>" 
               ,"<div class='yt-btn-inner'>" + this.text + "</div>"
            ];
        }

        ,_setText:function(text){
            if(this.isRender()){
                this.jq(".yt-btn-inner").html(text);
            }
        }

        ,setText:function(text){
            this.set("text",text);
            return this;
        }

        ,onClick:function(){
            this.evt && this.report(this.evt);
        }
    }
});