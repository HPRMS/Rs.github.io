sjs.loadCss("Core5.App.Pagebar")
.using("Core5.Widget.Toolbar")
.using("Core5.Component")
.using("Core5.Widget.Input.Text")
.using("Core5.Widget.Input.Checker.Number")
.using("Core5.Widget.Input.Checker.Range")
.using("Core5.Widget.Label")
.using("Core5.Widget.Input.RadioGroup")
.using("Core5.Layout.Float")
//.using("Core5.Mixin.CheckInput")

.using("Core5.Bind.BindSource")
.using("Core5.Bind.BindTarget")
.define(function(toolbar,component,text,numberChecker,rangeChecker,label,radioGroup,floatLayout
,bindSource,bindTarget){
    return {
//        init:function(){
//            this.$base();
//            this._initData("page");
//            this._initData("totalCount");
//            this._initData("pageSize");
//            this._initData("totalPage");
//        }
        $extend:toolbar
        ,"-s-pagebar":true
        ,$mixin:[bindSource]
        ,inner:function(){  //用函數，而不是配置，因為引用會指向一個
            return [
                {
                    $extend:label
                    ,text:"<i zh='總筆數'>Total</i>:"
                }
                ,{
                    $extend:label
                    ,$mixin:[bindTarget]
                    ,";padding":"0 2px"
                    ,";color":"#000084"
                    ,"@text":"totalCount"
                    ,";font-weight":"bold"
                }
                ,"-"            
                ,{
                    icon:"step-backward"
                    ,$mixin:[bindTarget]
                    ,evt:"firstPage"
                    ,displayMode:"visible"
                    ,"@visible":"page"
                    ,bindVisibleFrom:function(page){
                        return page > 1;
                    }
                }
                ,{
                    icon:"chevron-left"
                    ,$mixin:[bindTarget]
                    ,evt:"prePage"
                    ,displayMode:"visible"
                    ,"@visible":"page"
                    ,bindVisibleFrom:function(page){
                        return page > 1;
                    }
                }
                ,{
                    $extend:text
                    ,inputAttr:" maxlength=4"
                    ,";width":"25px"
                    ,displayMode:"visible"
                    ,evt:this.pageEvt //"pageInput"
                    ,required:true
                    ,$mixin:[numberChecker,rangeChecker,bindTarget]
                    ,allowMinValueEqual:false                   //不可等于最小數（0）
                    ,"@value":"page"
                    ,"@allowMaxValue":"totalPage"            //最大數

                    ,"@visible":"totalPage"
                    ,bindVisibleFrom:function(totalPage){
                        return totalPage > 1;
                    }
                }
                ,{
                    $extend:label
                    ,$mixin:[bindTarget]

                    ,text:"/"

                    ,"@visible":"totalPage"
                    ,bindVisibleFrom:function(totalPage){
                        return totalPage > 1;
                    }

                }
                ,{
                    $extend:label
                    ,$mixin:[bindTarget]

                    ,";padding":"0 2px"
                    ,";color":"#000084"
                    ,"@text":"totalPage"
                    ,";font-weight":"bold"

                    ,"@visible":"totalPage"
                    ,bindVisibleFrom:function(totalPage){
                        return totalPage > 1;
                    }

                }
                ,{
                    icon:"chevron-right"
                    ,$mixin:[bindTarget]

                    ,evt:"nextPage"
                    ,displayMode:"visible"
                    ,"@visible":"page,totalPage"
                    ,bindVisibleFrom:function(page,totalPage){
                        return totalPage > page;
                    }
                }
                ,{
                    icon:"step-forward"
                    ,$mixin:[bindTarget]

                    ,evt:"lastPage"
                    ,displayMode:"visible"
                    ,"@visible":"page,totalPage"
                    ,bindVisibleFrom:function(page,totalPage){
                        return totalPage > page;
                    }
                }
                ,{
                    $extend:component
                    ,$mixin:[bindTarget]
                    ,";margin":"0 5px"
                    //,";padding-top":"10px"
                    ,inner:"<img style='margin-top:5px' src='" + (sjs.baseFolder || sjs.getDefaultFolder() || ".") + "/Image/Core5/wait.gif'>"
                    ,"@visible":"loading"
                }
                ,{
                    $extend:label
                    ,$mixin:[bindTarget]
                    ,"-info-label":true
                    ,"@text":"info"
                    ,";color":"#A65900"
                    //,";font-family":"arial"
                    //,";width":"300px"
                    ,";overflow":"hidden"
                    ,";text-overflow":"ellipsis"
                    //,"@visible":"info"
                    //,";border":"1px solid red"
                    ,";position":"absolute"
                    ,";left":"320px"        
                    ,";right":"180px"           //針對三個pagesize的選項,如果四個,可能要再加寬了
                }

                ,{
                    type:"group"
                    ,evt:this.pageSizeEvt//"pageSizeSet"
                    ,$mixin:[floatLayout,bindTarget]
                    ,textField:null
                    ,valueField:null
                    ,items:this.pageSizes
                    ,floatRight:true
                    ,"@selected":"pageSize"

                    ,"@visible":"pageSize,totalCount"
                    ,bindVisibleFrom:function(pageSize,totalCount){
                        return pageSize > 0 && totalCount > 0;
                    }
                }
                ,{
                    $extend:label
                    ,$mixin:[bindTarget]

                    ,text:"<i zh='每頁筆數'>Page size</i>:"
                    ,floatRight:true
                    ,"@visible":"pageSize,totalCount"
                    ,bindVisibleFrom:function(pageSize,totalCount){
                        return pageSize > 0 && totalCount > 0;
                    }
                }
            ]
        }
        
        //,pageEvt:""
        //,pageSizeEvt:""

        //pagesize(用戶選取pagesize或外部設定?) -> totalpage -> page(可能)
        //totalCount -> totalPage -> page(可能)
        //,page:1                 //不要配置，可設定(自己控制值要小于totalPage，但是如果為0時，則為1)
        //,totalCount:95           //不要配置，可設定
        //,pageSize:10            //配置，可設定(為0時表示不要分頁)
        //,totalPage:10
        ,pageSizes:[10,100,500]
        
        //UI事件回應-------------------------------------------------------------------        
        ,onLastPage:function(){
            this._innerSetPage(this.totalPage);
        }
        
        ,onNextPage:function(){
            this._innerSetPage(this.page + 1);
        }
        
        ,onFirstPage:function(){
            this._innerSetPage(1);
        }
        
        ,onPrePage:function(){
            this._innerSetPage(this.page - 1);
        }

        ,_innerSetPage:function(page){
            this.set("page",page);
            this.pageEvt && this.report(this.pageEvt,this.page);
        }
        
    };
});