/*
彈出window控件
*/
sjs.using("Core5.Widget.Panel")
.using("Core5.Widget.Ability.Pop")
.using("Core5.Widget.Ability.TransformShowHide")
.using("Core5.Widget.Ability.DragMove")
.using("Core5.Widget.Ability.DragResize")
.using("Core5.Layout.AutoFit")
.using("Core5.Widget.Toolbar")
.define(function(panel,pop,transformShowHide,dragMove,dragResize,autoFitLayout,toolbar){
    return {
        $extend:panel
        ,$mixin:[pop,dragMove,autoFitLayout]//,dragResize.right,dragResize.bottom,dragResize.rb]//,transformShowHide
        ,visible:false      //默認不顯示(show的時候再顯示)
        //,minWidth:980
        //,minHeight:606
        ,dragDom:".s-panel-title-text"//,.s-toolbar"   //會阻擋button的動作，因為
        //,orgLeft:20
        //,orgTop:20
        ,noClickHide:true       //不要click hide
        ,mask:true      //默認顯示遮罩層(其實因為沒有最小化）
        ,top:20
        
        ,init:function(){
            this.$base();
            this.css(";margin-left",-this.width / 2 + "px");
            this.css(";left","50%");
        }

        ,show:function(){
            if(!this.isRender()){
                this.renderTo("body",true);
            }
            this.$base();
        }

        ,_initInner:function(inner){
            if(this.toolbarItems){
                var pos = this.toolbarPos || "top";
                inner.push({
                    $extend:toolbar
                    ,inner:this.toolbarItems
                    ,";border-width":pos=="top"?"0 0 1px 0":"1px 0 0 0"
                });
                if(pos=="top"){
                    inner[0].top = 24 + 32;
                    inner[1].height = 32;
                }
                else{       //bottom
                    inner[0].top = 24;
                    inner[0].bottom = 32;
                    inner[1].bottom = 0;
                    inner[1].height = 32;
                }
            }
            else{
                inner[0].top = 24;
            }
            this.$base(inner);
        }
    };
});