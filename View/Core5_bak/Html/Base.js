sjs.using("Core5.Html.Tag")
.define(function(tag){
    return {
        getHtml:function(){
            return this.getHtmlNoJoin?tag.html(this,this,true):tag.html(this);
        }
        
        ,getHtmlNoJoin:false

        ,innerHtml:function(html){
            html.push(tag.itemHtml(this.inner,this));
        }
                     
        
        ,attr:function(k,v){
            if(typeof(k)=="object"){        //和jQuery尽量保持一致
                for(var p in k){
                    if(k[p]!==null){
                        this[" " + p] = k[p];
                    }
                }
            }
            else{
                this[" "+k]=v;              //用空格,分號,-開頭，都是為了直接在config中寫方便
            }
            return this;
        }
        
        ,css:function(k,v){
            if(typeof(k)=="object"){
                for(var p in k){
                    if(k[p]!==null){
                        this[";" + p] = k[p];
                    }
                }
            }
            else{
                this[";"+k]=v;
            }
            return this;
        }
        
        ,addClass:function(k){
            this["-" + k] = true;
            return this;
        }
        
        ,removeClass:function(k){
            this["-" + k] = false;      //delete沒用,因為還在prototype中存在
            return this;
        }
        
        ,setClass:function(k,v){
            v?this.addClass(k):this.removeClass(k);
            return this;
        }       
    };
});