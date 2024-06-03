sjs.using("Core2.Component")
.using("Core2.Widget.Input.Form")
.using("Core2.Widget.Input.Label2")
.using("Core2.Widget.Input.Text2")
.using("Core2.Util.DateFn")
.using("Core2.Mixin.GetShowText")
.using("Core2.Mixin.CheckInput")
.using("Core2.Bind.BindSource")
.using("Core2.Bind.Bindable")
.using("Core2.Bind.View")
.using("Core2.Bind.Manager")
.define(function(component,form,label,text,dateFn,getShowText,checkInput,bindSource,bindable,bindView,bindManager){
    return {
        $extend:component
        ,$mixin:[bindSource,bindView]
        ,rates:["USD","IDR","TWD","CNY","HKD"]
        ,IDR_NAME:"印尼盾(IDR)"
        ,TWD_NAME:"臺幣(NTD)"
        ,CNY_NAME:"人民幣(CNY)"
        ,HKD_NAME:"港幣(HKD)"
        ,USD_NAME:"美元(USD)"
        ,init:function(){
            this.$base();
            this.setRates(this.rates);
            this.getRate();
        }
        
        ,setRates:function(rates){
            var fields = [];

            var html = [];
            var rateHtml = [];
            html.push("<table>");
            html.push("<tr>");
            rateHtml.push("<tr>");
            for(var i=0;i<rates.length;i++){
                html.push("<th>");
                html.push(this[rates[i] + "_NAME"]);
                html.push("</th>");
                
                var rateClass = 'rate-' + rates[i]
                rateHtml.push("<td class='" + rateClass + "'>");
                /*
                rateHtml.push(i==0?"100":{
                    $extend:label
                    ,$mixin:[bindable,getShowText.currency]
                    ,text:{bind:rates[i]}
                    ,context:this
                });
                */
                rateHtml.push("&nbsp;");
                //debugger
                this.addViewBind(" html",{
                    jq:"." + rateClass
                    ,fields:rates[i]
                    ,convert:function(fieldValue){
                        return getShowText.currency.getShowText(fieldValue);
                    }
                });//"{{_" + rates[i] + "}}");
                rateHtml.push("</td>");
                
                fields.push({
                    $extend:text
                    ,$mixin:[bindable,getShowText.currency,checkInput.numberRange]
                    ,value:{bind:rates[i],bindBack:true}
                    //,";background-color":"{{_error?'#FFE1E1':'transparent'}}"
                    ,"-money-error":"{{_error}}"
                    ,decimalCount:2
                    ,allowMaxValue:Math.max
                });
            }
            html.push("</tr>");
            html = html.concat(rateHtml);
            var oThis = this;
            html.push({
                $extend:form
                ,fields:fields
                ,_getByRow:function(row){           //綁定邏輯實現
                    row = row || {};
                    row.set = function(key,value){
                        if(this[key]!==value){
                            this[key] = value;
                            for(var i=0;i<rates.length;i++){
                                var newKey = rates[i];
                                if(newKey !== key && oThis["_" + newKey] && oThis["_" + key]){
                                    var newValue = Math.round(value * oThis["_" + newKey] / oThis["_" + key] * 100) /100;
                                    this[newKey] = newValue;
                                    bindManager.notifyChange(this,newKey);
                                }
                            }
                        }
                    }
                    return row;
                }
            });
            html.push("</table>");
            html.push("<div class='rate-bottom'>");
            html.push("<em>更新時間：</em><font class='rate-time'></font>");
            html.push("<em>數據來源：</em><font>Yahoo.com(僅供參考)</font>");
            html.push("</div>");
            this.setInner(html);
        }
        
        ,getRate:function(){
            callService("ClientTool","Query",["Site/Rate",{}],this,this._getOK);
        }
        
        ,_getOK:function(ret){
            //alert(JsonHelper.encode(ret.Rows));
            var rows = ret.Rows;
            this.set("USD",100);
            this.set("dataTime",dateFn.formatDate(rows[0]["RATE_TIME"]));
            for(var i=0;i<rows.length;i++){
                this.set(rows[i]["CURRENCY2"],rows[i].RATE);
                //this.jq(".rate-" + name).html(getShowText.currency.getShowText.call({currency:""},rows[i]["RATE"]));
            }
        }
        
        ," html=>.rate-time":"{{_dataTime}}"
    }
});