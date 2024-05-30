sjs.define(function(){
    function setAutoFitCss(ret,isChild){
        ret.css("position",ret.relative?"relative":"absolute");
        ret.css("overflow",ret.overflow || ret[";overflow"] || "auto");
        /*
        //for 兼容有人直接用css style的寫法
        if(isChild){
            if(ret[";width"] && typeof(ret.width)=="undefined")
                ret.width = ret[";width"].indexOf("px")>=0?ret[";width"].replace("px","")*1:ret[";width"];
            if(ret[";height"] && typeof(ret.height)=="undefined")
                ret.height = ret[";height"].indexOf("px")>=0?ret[";height"].replace("px","")*1:ret[";height"];
            if(ret[";left"] && typeof(ret.left)=="undefined")
                ret.left = ret[";left"].indexOf("px")>=0?ret[";left"].replace("px","")*1:ret[";left"];
            if(ret[";right"] && typeof(ret.right)=="undefined")
                ret.right = ret[";right"].indexOf("px")>=0?ret[";right"].replace("px","")*1:ret[";right"];
            if(ret[";top"] && typeof(ret.top)=="undefined")
                ret.top = ret[";top"].indexOf("px")>=0?ret[";top"].replace("px","")*1:ret[";top"];
            if(ret[";bottom"] && typeof(ret.bottom)=="undefined")
                ret.bottom = ret[";bottom"].indexOf("px")>=0?ret[";bottom"].replace("px","")*1:ret[";bottom"];
        }
        */
        if(ret.width){
            ret.css("width",typeof(ret.width)=="number" || !isNaN(ret.width)?ret.width + "px":ret.width);
            if(typeof(ret.right) != "undefined"){          //百分比?
                ret.css("right",typeof(ret.right)=="number" || !isNaN(ret.right)?ret.right + "px":(ret.right));
                ret.css("left","auto")
            }
            else{       //默認left
                ret.css("left",typeof(ret.left)=="number" || !isNaN(ret.left)?ret.left + "px":(ret.left?ret.left:0));
                ret.css("right","auto")
            }
        }
        else{       //自適應
            ret.css("left",typeof(ret.left)=="number" || !isNaN(ret.left)?ret.left + "px":(ret.left?ret.left:0));
            ret.css("right",typeof(ret.right)=="number" || !isNaN(ret.right)?ret.right + "px":(ret.right?ret.right:0));
            ret.css("width","auto");
        }
        // if(ret.value=="201307")
        //     //debugger;
        if(ret.height){

            ret.css("height",typeof(ret.height)=="number" || !isNaN(ret.height)?ret.height + "px":ret.height);
            if(typeof(ret.bottom) != "undefined"){          //百分比?
                ret.css("bottom",typeof(ret.bottom)=="number" || !isNaN(ret.bottom)?ret.bottom + "px":(ret.bottom));
                ret.css("top","auto")
            }
            else{       //默認left
                ret.css("top",typeof(ret.top)=="number" || !isNaN(ret.top)?ret.top + "px":(ret.top?ret.top:0));
                ret.css("bottom","auto")
            }
        }
        else{       //自適應
            ret.css("top",typeof(ret.top)=="number" || !isNaN(ret.top)?ret.top + "px":(ret.top?ret.top:0));
            ret.css("bottom",typeof(ret.bottom)=="number" || !isNaN(ret.bottom)?ret.bottom + "px":(ret.bottom?ret.bottom:0));
            ret.css("height","auto");        
        }
    }
    return {
        init:function(){
            this.$base();
            this.isAutoFitLayout && setAutoFitCss(this);
        }

        ,isAutoFitLayout:true

        ,_initInnerItem:function(itemCfg,itemIndex){
            //如果這個放在最后面，則所有的返回對象都可以被addClass到
            //但是如果這個沒有用$plugin放在最后，而被放到中間，而子類的_initInnerItem又不是通過this.$base返回對象
            //則有可能用不到
            var ret= this.$base(itemCfg,itemIndex);
            this.isAutoFitLayout && !this.innerNoAutoFit && ret.css && setAutoFitCss(ret,true);
            return ret;
        }
    };
});