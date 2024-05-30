/*讓prompt為一個單獨的float div，這樣最大的節儉空間，如一些查詢條件，需要默認顯示時，可用這種*/
sjs.loadCss("Core5.Layout.LabelForm")
.define(function(form) {
    return {
        "-s-label-form":true
        
        ,_itemsHtml:function(html,items){
            this.$base(html,items);
            html.push("<div style='clear:both'></div>");
        }
        
        ,_itemHtml:function(html,item){
            if(item.prompt){
                html.push("<div class='s-label-field'>");
                html.push("<div class='s-label-form-prompt'>"); 
                html.push(item.prompt);
                !item.noColon && html.push(":");
                html.push("</div>");
            }
            //不是标准对象时，请自己注意float和width
            item.addClass && item.addClass("s-label-form-content");
            if(item["-s-btn"]){
                item.size = "small";
            }
            this.$base(html,item);
            item.prompt && html.push("</div>");
        }        
    }
});