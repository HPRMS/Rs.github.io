sjs.loadCss("Core5.Shp.Panel")
.loadCss("Core5.Shp.Icon")
.using("Core5.Container")
.using("Core5.DomEvent.onmouseclass")
.define(function(container){

    return {
    
        $extend:container
        
        ,regUIObj:true
        
        ,title:"標題..."
        ,icon:"th-list"
        
        ,"-s-panel":true
        ,showClose:true
               
        ,innerHtml:function(html){
            html.push(this.titleHtml());
            this.$base(html);
        }
        
         ,titleHtml:function(){
            var html = [];
            html.push("<div class='s-panel-title'>");
            html.push("<div class='icon icon-" + this.icon + " icon-white s-panel-title-icon'>");
            html.push("</div>");
            html.push("<div class='s-panel-title-text'>");
            html.push(this.title);
            html.push("</div>");
            if(this.showClose){
                html.push("<div s-click='close' class='icon icon-white icon-remove s-panel-title-close' s-overClass='s-panel-title-close-over' xs-downClass='s-panel-title-close-down'></div>");
            }
            html.push("</div>");
            return html.join("");
        }
        
        ,onClose:function(){
            this.hide();
        }

        ,_setTitle:function(title){
            if(this.isRender()){
                this.jq(".s-panel-title-text").html(title);
            }
        }

        ,setTitle:function(title){
            this.set("title",title);
        }

    };
});