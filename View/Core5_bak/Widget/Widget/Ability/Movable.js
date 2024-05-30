sjs.define(function(){
    return {
        init:function(){
            this.$base();
            this._initData("left",0);
            this._initData("top",0);
        }

        ,_setLeft:function(left){
            this.css("left",left?left+"px":left);       //0不用加px
        }

        ,_setTop:function(top){
            this.css("top",top?top+"px":top);
        }

        ,position:function(){
            if(this.isRender()){
                return this.jq().position();
            }
            else{
                return {
                    left:this.left
                    ,top:this.top
                };
            }
        }

        ,setLeft:function(left){
            this.set("left",left);
        }

        ,setTop:function(top){
            this.set("top",top);
        }
    }
});