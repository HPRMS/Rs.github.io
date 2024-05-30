sjs.define(function(){
    return {
        ";position":"relative"
        ,";overflow":"hidden"

        ,_initInnerItem:function(itemCfg,itemIndex){
            //如果這個放在最后面，則所有的返回對象都可以被addClass到
            //但是如果這個沒有用$plugin放在最后，而被放到中間，而子類的_initInnerItem又不是通過this.$base返回對象
            //則有可能用不到
            var ret= this.$base(itemCfg,itemIndex);
            ret.css && this._initItemCss(ret);
            return ret;
        }

        ,_initItemCss:function(ret){
            ret.css("position","absolute");//ret.position || "absolute");
            //ret.css("overflow",ret.overflow || "auto");
            if(typeof(ret.width)!="undefined"){
                ret.css("width",typeof(ret.width)=="number"?ret.width + "px":ret.width);
                if(typeof(ret.right) != "undefined"){          //百分比?
                    ret.css("right",typeof(ret.right)=="number"?ret.right + "px":(ret.right));
                    //ret.css("left",null);//"auto")
                }
                else{       //默認left
                    ret.css("left",typeof(ret.left)=="number"?ret.left + "px":(ret.left?ret.left:0));
                    //ret.css("right",null);//"auto")
                }
            }
            else{       //自適應
                ret.css("left",typeof(ret.left)=="number"?ret.left + "px":(ret.left?ret.left:0));
                ret.css("right",typeof(ret.right)=="number"?ret.right + "px":(ret.right?ret.right:0));
            }
            //if(ret.id=="label")
            //    //debugger
            //如果只是测试，请勿在样式中直接定义height，否则在想用top,bottom自适应时，没办法取消height样式的定义
            if(typeof(ret.height)!="undefined"){        //可以设定为null，因为height已经在style中定义了，不需要再重新定义一次
            //直接不定义height，如果height有在那里，也会优先使用
            //如果明确height使用css中的高度，则需要定义height:null
            //否则会强行使用top-bottom来定义，当然这种情况下要确保css中无style height定义，否则会优先使用top+height，忽略bottom
            //if(ret.height){
                ret.css("height",typeof(ret.height)=="number"?ret.height + "px":ret.height);
                if(typeof(ret.bottom) != "undefined"){          //百分比?
                    ret.css("bottom",typeof(ret.bottom)=="number"?ret.bottom + "px":(ret.bottom));
                    //ret.css("top",null);//"auto")
                }
                else{       //默認left
                    ret.css("top",typeof(ret.top)=="number"?ret.top + "px":(ret.top?ret.top:0));
                    //ret.css("bottom",null);//"auto")
                }
            }
            else{       //自適應
                //确保样式中没有height的定义，否则这边的bottom会无效，因为会优先使用top+height
                ret.css("top",typeof(ret.top)=="number"?ret.top + "px":(ret.top?ret.top:0));
                ret.css("bottom",typeof(ret.bottom)=="number"?ret.bottom + "px":(ret.bottom?ret.bottom:0));
                //如果有height定义在样式中，或定义在其它地方，height优先于bottom
                //ret.css("height","xxx");        //故意用一个非法值，以便忽略height的定义
            }
        }
    };
});