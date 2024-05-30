sjs.using("Core5.Html.Tag")
.using("Core5.Component")
.using("jQuery")
.define(function(tag,component,$){
    return {
        $extend:component
        
        ,init:function(){
            this.$base();
            this.setInner(this.inner);
        }
        
        //可以傳入一個函數進來運算
        ,setInner:function(inner){
            this._innerInit && this._disposeInner();           //放在這里，因為等下_initInnerItem有id的話會寫入parent    
            this._innerInit = true; 
            if(inner===null || typeof(inner)=="undefined"){
                inner = [];
            }
            else{
                if(typeof(inner)=="function"){
                    inner = inner.call(this);
                }
                
                if(typeof(inner) != "object" || !inner.push){
                    inner = [inner];
                }
                else{
                    //保證config的只讀，因為數據綁定的程式，可能會循環使用config來創建對象
                    //如grid,items等
                    //特別是inner是直接配置時，更要只讀，否則影響這個類的所有實例
                    inner = [].concat(inner);       //只讀this.inner配置，像grid的fields，會用一個config創建多個對象，如果不變[]，則第二行的config已變成實例了，出錯
                }
            }
            this._initInner(inner);
            this._setInner(inner);
        }

        ,_initInner:function(inner){
            for(var i=0;i<inner.length;i++){
                inner[i] = this._initInnerItem(inner[i],i);    //已經是新陣列的新元素
            }      
        }
        
        ,innerHtml:function(html){
            //this._initInner();
            this._itemsHtml(html,this.inner);
        }
        
        ,_itemsHtml:function(html,inner){
            for(var i=0;i<inner.length;i++){
                this._itemHtml(html,inner[i]);
            }
        }
        
        //可用來override inner的第一層循環(包括數據item)
        ,_itemHtml:function(html,item){
            html[html.length] = tag.itemHtml(item,this);
        }
                   
                                   
        //override tag---------------------------------------------------------------------------
        /*
        ,_setInner:function(inner){
            this.inner = inner;      
            if(this.isRender()){
                var html = [];
                this.innerHtml(html);
                this.jq().html(html.join(""));
                this._renderInner();
            }
        }
        */

        ,_setInner:function(inner){
            this.$base(inner);
            this.isRender() && this._renderInner();
        }
                
        //override component------------------------------------------------------------------------
        ,_render:function(){
            this.$base();       //放在前面，是因為主對象可能這個時候還會操作子對象，如setDay，但因為子對象還沒render，所以不會造成重複調用dom（只改變值）低性能
            //其實是一樣，setDay改變inner，和直接操作jq都是一次，所以前后順序應該關係不大，以前是以為所有的對象會在_render時初始化一次UI
            this._renderInner();       //凡是用getHtml方法調用后，必須再onRender回來
        }

        //override createChild-------------------------------------------------------------
        ,_dispose:function(noRemoveJq){
            this.$base(noRemoveJq);

            //移除在container中的inner
            if(this.container){
                var children = this.container.inner;
                var len = children.length;
                for(var i=0;i<len;i++){
                    if(children[i] == this){
                        children.splice(i,1);
                        break;
                    }
                }
            }
            this._disposeInner();
        }
        
        //不是此對象創建的Item,應該由創建者銷毀,先后次序影響不大
        ,_disposeChild:function(child){
            //container==this，所以不需要移除jq，上層會統一移除，加快dispose速度
            //child.id =="purchaseWin" && console.log("dispose by _disposeChild," + (child.container == this));

            child.dispose(child.container == this);      //誰創建，誰負責銷毀
        }
               
        //外部方法--------------------------------------------------------------------------------
        //this.createChild后用this.renderItem()，動態加入一個組件（render后有效）
        ,renderItem: function(item,append,subExp){
            if(this.isRender()){            //只能在render后調用的工具方法
                var con = "#" + this._domId + (subExp?" " + subExp:"");
                item.container = this;          //有container，所以統一放到這里來
                this.inner.push(item);         //不為展示了，只為以后setInner時，這個也會正常dispose掉
                item.renderTo(con,append);
            }
            else{
                throw new Error("只有render后才可調用renderItem方法");
            }
            return this;
        }
                
        //私有方法-----------------------------------------------------------------------------------------
        //清除inner,可在component中清空innerHTML
        //暫不要在外面調用
        ,_disposeInner:function(){
            if(this.inner && this.inner.push){          //有可能是初始化的inner值
                ////debugger
                var inner = [].concat(this.inner);      //this.inner will changed in innerItem.dispose(splice)
                for(var i=0;i<inner.length;i++){
                    var innerItem = inner[i];
                    //如果inner不小心寫成了[,xx,yy]，即前面多了一個逗號，這行就會報錯
                    if(innerItem && innerItem.dispose){              //component
                        var noRemoveJq = innerItem.container == this;
                        //delete innerItem.container;
                        //(innerItem.parent == this || this.isRender()) && innerItem.dispose(true);   //不移除jq，等下會統一innerHTML override掉
                        innerItem.dispose(noRemoveJq);   //不移除jq，等下會統一innerHTML override掉
                        
                        //because delayInit will no sjs object in this.inner, so will never execute code below
                        //innerItem.id =="purchaseWin" && console.log("dispose by _disposeInner:",noRemoveJq);
                    }
                }
            }
        }    

        ,_initDelayItem:function(itemCfg,createP){
            delete itemCfg.delayInit;
            return {
                cfg:itemCfg
                ,createP:createP
                ,oThis:this
                ,show:function(){
                    ////debugger
                    delete this.createP[this.cfg.id];
                    this.cfg.__fromDelayInit = true;
                    var ret= this.oThis._initInnerItem(this.cfg);
                    delete this.cfg.__fromDelayInit;
                    ret.renderTo(this.cfg.renderJq || "#" + this.oThis._domId,typeof(this.cfg.renderKind)=="undefined"?true:this.cfg.renderKind);
                    ret.show();
                    if(ret.dispose && $.contains(this.oThis.jq()[0], ret.jq()[0])){
                        ret.container = this.oThis;
                    }
                }
            }
        }
        
        //不允許非tag和extend的對象（含getHtml）
        //只能是字符串(數字要轉字符串)，函數，tag，component（默認對象的$extend）
        ,_initInnerItem:function(itemCfg,itemIndex){
            if(itemCfg === null || typeof(itemCfg) == "undefined"){ //占位时可以用空字符串代替
                return "";
            }
            else if(typeof(itemCfg)=="object"){
                var orgItemCfg = itemCfg;
                if(itemCfg.$extend){                   //已經實例化則不會有$extend屬性
                    if(itemCfg.delayInit && itemCfg.id){
                        ////debugger
                        var createP = this;
                        while(createP){
                            if(createP.layoutOnly){
                                createP = createP.parent;
                            }
                            else{
                                break;
                            }
                        }
                        createP[itemCfg.id] = this._initDelayItem(itemCfg,createP);
                        itemCfg = "";
                    }
                    else{
                        itemCfg = this.createChild(itemCfg.$extend,itemCfg.$mixin,itemCfg);
                    }
                }
                if(itemCfg.dispose && !orgItemCfg.__fromDelayInit){
                    itemCfg.container = this;
                }
            }
            return itemCfg;     //有getHtml就getHtml,無getHtml就是tag,無論如何都會在調用getHtml時傳入this
        }
        
        ,_renderInner:function(){
            for(var i=0;i<this.inner.length;i++){
                var innerItem = this.inner[i];
                innerItem.render && innerItem.render();
                //use contains, because has like TableLayout, will add td between this and innerItem
                //DO NOT USE .container again, use this.id or this._children instead 20210106 kevin
                //if(innerItem.dispose && $.contains(this.jq()[0], innerItem.jq()[0])){
                //    innerItem.container = this;
                //}
                //else if(innerItem.dispose){
                //    //debugger
                //    console.log("no settting container...");
                //}
            }
        }
        
        //visible和width,height,pos不一樣，后者可以通過onmouseover統一onresize,onmove等方式的捕捉
        //但是前者，則真的沒有辦法知道，當你容器隱藏或顯示（特別是顯示）時，要想辦法通知子容器，以便其能回應做事情
        ,onVisibleChange:function(visible){
            if(this.inner && this.inner.push){          //有可能是初始化的inner值
                for(var i=0;i<this.inner.length;i++){
                    var innerItem = this.inner[i];
                    //還沒初始化的時候，就會調用onVisibleChange了，結果造成這里的部份項次可能還是null或undefined
                    innerItem && innerItem.onVisibleChange && innerItem.onVisibleChange(visible);
                }
            }
        }

    };
});