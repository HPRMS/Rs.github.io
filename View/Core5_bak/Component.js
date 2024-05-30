sjs.using("jQuery")
.using("Core5.Html.Base")
.using("Core5.DataUI")
.using("Core5.Visible")
.using("Core5.Disable")
.using("Core5.CreateChild")
.using("Core5.DomEvent.DomEvent")
.using("Core5.Util.Lang")
.using("Core5.DomEvent.onclick")        //單擊是最常見的用戶交互，為避免太多，所以直接在component就引入
.define(function($,base,dataUI,visible,disable,createChild,domEvent,lang){
    //var autoIdSeed = 1000;
    var EMP_FUN = function(){
        //console.log("dispose:" + (this.id || this._objId) + ",call function name!");
    };
    //生命周期
    return {
        //单纯合并(只增加功能)
        //也是一個有getHtml的對象,同樣產生繪製UI的html字符串
        $mixin:[base,dataUI]                //setting,tag沒有init(有也沒用),因為這里的init不會有this.$base調用,是起始構建器(沒有要override,只要增加方法)
        
        //为当前component扩展功能，需要override config中的某些方法
        //,$plugin:[disable,showHide,domEvent,createChild,inner]       //在后面混合這些對象成為一個新對象(有要override方法)
        ,$plugin:[visible,disable,createChild,domEvent]//,bindSource]       //在后面混合這些對象成為一個新對象(有要override方法)
        //,typeName:"cmp"       //類型名稱:component的縮寫        
        
        ,init: function() {
            //不要自己設定html element的id，因為component允許實時創建多個和銷毀，同一個UI并不能總是得到相同的ID
            //if(!this.$DEFINE_IN)
            //    //debugger;       //寫在同一個類里引進的，沒有(如RadioGroup中的item)
            //this.$base();
            this.initDomId();
        }
        /*
        //有這兩個方法，就可以反復使用getHtml，用享元模式，節省創建對象時間
        //多次getHtml，于是就沒有了對象能力
        ,getDomId:function(){
            return this._domId;
        }
        */
        ,initDomId:function(){//domId){
            //if(!domId){
            //不能用閉包變數，因為可能函數會被執行多次，導致
            sjs._autoIdSeed = sjs._autoIdSeed || 1000;
                var typeName = this.typeName || (this.$DEFINE_IN?this.$DEFINE_IN.replace(/[\/\.]/g,""):null) || "COMP";
                //內部定義的type，如toolbar和menu，form的子項次
                //if(typeName=="COMP")
                    
                var domId = "s2_" + typeName + "_" + (sjs._autoIdSeed++);
            //}
            //this.fly(domId);
            this._domId = domId;            
            this.attr("id",domId);    //id一定要寫到getHtml中去,這樣this.jq()才抓得到
        }
        
        //不能存儲對象的數據，只能從dom上獲取值(一般也就是個index)
        //解決不了_inner,parent,container,responser這樣的關係，就談不上真正的fly，因此不用fly思想，即一個對象對應多個dom的操作
        /*
        ,fly:function(domId){
            this._domId = domId;
        }
        */
        /*
        ,initMeasureCss:function(){
            if(this.margin){        //一定是4码格式
                this.css("margin",this.margin.join("px ") + "px");
            }
            if(this.border){
                this.css("border-width",this.border.join("px ") + "px");
            }
            if(this.padding){
                this.css("padding",this.padding.join("px ") + "px");            
            }
        }
        */
        ,jq:function(subExp){
            var ret = $("#" + this._domId + (subExp?" " + subExp:""));
            var orgHtmlFn = ret.html;
            ret.html = function(){
                var args = Array.prototype.slice.call(arguments,0);
                if(typeof(args[0])=="string"){
                    args[0] = lang.parseRenderHtml(args[0]);
                    return orgHtmlFn.apply(ret,args);
                }
                else{
                    return orgHtmlFn.apply(ret,args);
                }
            }
            return ret;
        }
        
        ,INSERT_BEFORE:"insertBefore"
        ,INSERT_AFTER:"insertAfter"
        ,REPLACE_ALL:"replaceAll"
        
        //公共方法,供外部調用,子類一般只能用this.$base調用,而不能在子類其它方法中調用?--------------------------------------------
        ,renderTo: function(con,append) {
            var html=this.getHtml();

            html = lang.parseRenderHtml(html);

            if(append === this.INSERT_BEFORE){
                $(html).insertBefore($(con));
            }
            else if(append === this.INSERT_AFTER){
                $(html).insertAfter($(con));
            }
            else if(append === this.REPLACE_ALL){
                $(html).replaceAll(con);
            }
            else if(append){
                $(con).append(html);
            }
            else{
                $(con).html(html);
            }
            this.render();
            return this;
        }
        
        //沒用,因為tag中會自動添加getHtml方法,以為是htmlTag對象
        /*
        ,getHtml:function(){
            var ret = this.$base();
            this.getHtml = null;        //防止多次輸出同一個對象,造成程式bug
            return ret;
        }
        */
        
  
        //override tag---------------------------------------------------------------------------
        ,_setInner:function(inner){
            this.inner = inner;      
            if(this.isRender()){
                var htmlAry = [];
                this.innerHtml(htmlAry);
                var html = htmlAry.join("")
                //html = lang.parseRenderHtml(html);
                this.jq().html(html);
            }
        }

        ,setInner:function(inner){
            this._setInner(inner);
        }

        ,refreshInner:function(){
            this.isRender() && this._setInner(this.inner);
        }
        
        ,render:function(){
            this.render = null;         //不要多次調用render方法
            this._render();             //_render方法內判斷isRender時是true
            /*
            var jqSize = this.jq().size();
            if(jqSize!==1){
                throw new Error("jq不存在或為多個，是否將this._domId寫入(id:" + this._domId + ",個數:" + jqSize + ")");
            }
            */
            return this;            
        }
        
        //實際上是未知參數,和response一樣,只不過不愿這么復雜,所以加一個與當前AComponent無關的noRemoveJq參數,表示jq已統一移掉了,不需要單獨再移
        //這里明確表示dispose時,要不要移除jq,其實就是要調用方決定
        //dispose后,請不要再調用該對象的任何方法
        ,dispose: function(noRemoveJq){//arg1,arg2,argN) {
            //var args = Array.prototype.slice.call(arguments,0);
            //this._dispose.apply(this,args);
            //console.log("dispose:" + this._domId);
            
            this._dispose(noRemoveJq);
            for(var p in this){
                var fn = this[p];
                //會為一個對象增加很多為null的屬性
                if(typeof(fn)=="function"){
                    //不用delete,因為原型還有,永遠殺不掉
                    this[p] = EMP_FUN;//null;         //方法不能再被調用,不是為了刪除
                }
            }
        }
        
        ,isRender:function(){
            return this.render === null;                //已經render了,就會清空render方法,所以只要this.render為null,就表示render了
        }
               
        ,_render: function() {
        
        }
        
        ,_dispose:function(noRemoveJq){
            //移除dom事件
            !noRemoveJq && this.isRender() && this.jq().remove();
        }
        
        //--------------------------------------------------------------------------------------------------------
        //override tag,為tag提供不分render前后的attribute,css和class操作
        ,attr:function(k,v){
            if(this.isRender()){    
                this.jq().attr(k,v);
            }
            //else{
                this.$base(k,v);
            //}
            return this;
        }
        
        ,css:function(k,v){
            if(this.isRender()){        
                this.jq().css(k,v);
            }
            //else{
                this.$base(k,v);
            //}
            return this;
        }
        
        ,addClass:function(k){
            if(this.isRender()){        
                this.jq().addClass(k);
            }
            //else{
                this.$base(k);
            //}
            return this;
        }
        
        ,removeClass:function(k){
            if(this.isRender()){        
                this.jq().removeClass(k);
            }
            //else{
                this.$base(k);
            //}
            return this;
        }
        
    };
});