/*邊輸入，邊提示*/
sjs.using("Core5.Widget.Mixin.QueryGen")
.using("Core5.Widget.Table")
.using("Core5.Widget.Table.ColResizer")
.using("Core5.Widget.Ability.Pop")
.using("Core5.Container")
.using("Core5.Widget.Ability.DragResize")
.using("Core5.Widget.Table.Select")
.using("Core5.Util.StrFn")
.define(function(queryGen,table,colResizer,pop,container,dragResize,tableSelect,strFn){

    return {
        $mixin:[queryGen('prompt')]     //promptQueryService...

        ," s-keyup":"keyup"
        ,onKeyup:function(src){
            //500毫秒之后訪問資料庫，抓出資料出來
            window.clearTimeout(this._inputPromptID);
            var oThis = this;
            this._inputPromptID = window.setTimeout(function(){
                oThis._promptQuery();
            },500);
        }

        ,promptQueryMethod:"QueryPage"
        ,promptPageSize:20          //只顯示前面多少筆
        //,promptQueryField:""      //如果有，則組成{}查詢，否則直接查詢
        //,promptQueryFieldNm:""    //顯示title的字，如果沒有則prompQueryField，然後再自己抓
        
        ,_promptQuery:function(){
            var args  = this._getInputPromptQueryArgs();
            this.promptQuery.apply(this,args);
        }

        ,_getInputPromptQueryArgs:function(){
            var val = this.jq(".s-text-input").val();
            //console.log(val);
            if(this.trimInput){
                val = strFn.trim(val);
            }
            if(this.upperCase){
                val = val.toUpperCase();
            }
            if(this.promptQueryField){
                var args = {};
                args[this.promptQueryField + "__START"] = val;
                return [args,this.promptQueryField,this.promptPageSize,1];
            }
            else{
                return [val];      //服務端自己控制promptPageSize(promptPageSize配置只針對promptQueryField有效)
            }
        }

        ,_getPromptPopCreater:function(){
            return this;
        }

        ,fieldWidth:150

        ,promptQueryResult:function(ret){
            var creater = this._getPromptPopCreater();
            if(!ret.Count){
                if(creater.promptPop){
                    var grid = creater.promptPop.inner[0];
                    grid.setSelected(null);
                    grid.setItems(null);
                    creater.promptPop.jq(".s-more").html("total:0").show();
                }
                return;
            }
            var rows = ret.Rows;
            var thisJq = this.jq();
            if(!creater.promptPop){
                var fieldNo = this.promptQueryField;
                if(!fieldNo){
                    var row = rows[0];
                    for(var p in row){
                        fieldNo = p;
                        break;
                    }
                }
                var fieldName = this.promptQueryFieldNm || fieldNo;
                creater.createChild(container,pop,dragResize.rb,{
                    id:"promptPop"
                    ,width:thisJq.outerWidth()
                    ,height:150
                    ,inner:[
                        {
                            $extend:table
                            ,$mixin:[tableSelect,colResizer]
                            ,rowKeyFields:fieldNo
                            ,selectEvt:"promptSelect"
                            ,fields:[
                                {prompt:fieldName,fieldNo:fieldNo,width:this.fieldWidth}
                            ]
                            ,";position":"absolute"
                            ,";top":"0"
                            ,";left":"0"
                            ,";right":"0"
                            ,";bottom":"0"
                        }
                        ,"<div class='s-more' style='text-align:right;right:0;padding-right:25px;position:absolute;bottom:0;height:20px;xfont-size:12px;color:#A0A0A0' title='type more words to list exactly'>...</div>"
                    ]
                }).renderTo("body",true);
            }
            creater.promptPop.setResponser(this);
            var grid = creater.promptPop.inner[0];
            grid.setSelected(null);
            grid.setItems(rows);
            if(ret.Count > this.promptPageSize){
                creater.promptPop.jq(".s-more").html("list:" + this.promptPageSize + "/"  + ret.Count + "...").show();
            }
            else{
                creater.promptPop.jq(".s-more").html("total:" + ret.Count).show();
            }
            var offset = thisJq.offset();
            var left =  offset.left;
            var top =  offset.top;
            top = offset.top + thisJq.outerHeight();
            creater.promptPop.show().move(left ,top);
        }
        

        ,onPromptSelect:function(grid,selected,selectedRow){
            //console.log("select:" + selected);
            this.setValue(selected);
            this._getPromptPopCreater().promptPop.hide();
        }
    }
});