/*提供grid checkbox多選*/
sjs.using("Core5.Widget.Table.RowKey")
.define(function(rowKey){
    return {
        $extend:rowKey
        ,regUIObj:true
        //,checked:null        //數組形式的主key
        
        ,init:function(){
            this.$base();
            this._initData("checked",[]);
            //this._initData("disableChecked",{});      //私有數據，不需要從這里初始化
        }
        
        ,_getCheckKey:function(row){
            var fields = this.checkFields.split(",");
            var ret= "";
            for(var i=0;i<fields.length;i++){
                ret += (ret.length>0?this.checkedKeyJoin:"") + row[fields[i]];
            }
            return ret;
        }
        
        ,_isCheck:function(row){
            var checked = this.checked;
            if(checked){
                var cmpValue = this.getRowKey(row);
                for(var i=0;i<checked.length;i++){
                    if(cmpValue == checked[i]){
                        return true;
                    }
                }
            }
            return false;
        }
        //,noShowCheckbox:true
        ,setFields:function(fields,noRefresh){
            //this._checkIdSeed = (this._checkIdSeed || 0)+1;
            //var chkId = this._domId + "_" + this._checkIdSeed;
            
            var newFields = this.noShowCheckbox?[].concat(fields):[{
                prompt:"<input type='checkbox' s-click='checkAll'>"
                ,";text-align":"center"
                ," s-click":"checkTd"
                //," for":chkId     //無效，好像只有label才可以for
                ,noResize:true
                ,type:"cmp"
                ,inner:function(){
                    var form = this.parent;
                    var grid = form.parent;
                    var disabled = grid._isCheckedDisable(form.item);
                    var checked = disabled?false:grid._isCheck(form.item);
                    return "<input"  + (disabled?" disabled='disabled'":"") + " class='s-tbl-checkbox' " + (checked?"checked='checked'":"") + " type='checkbox'>";
                }
                ,width:27
            }].concat(fields);
            this.$base(newFields,noRefresh);
        }               
        
        ,_setChecked:function(checked){
            if(this.isRender()){
                //全部清空
                !this.noShowCheckbox && this.jq(".s-tbl-checkbox").prop("checked",false);
                this.checkTrClass && this.jq(".tr_" + this._objId).removeClass(this.checkTrClass);
                for(var i=0;i<checked.length;i++){
                    !this.noShowCheckbox && this.rowJq(checked[i],".s-tbl-checkbox").prop("checked",true);
                    this.checkTrClass && this.rowJq(checked[i]).addClass(this.checkTrClass);
                }
            }
        }       
        
        ,_addChecked:function(items,index,item){
            if(this.isRender()){            //只能在render后調用的工具方法
                !this.noShowCheckbox && this.rowJq(item,".s-tbl-checkbox").prop("checked",true);
                this.checkTrClass && this.rowJq(item).addClass(this.checkTrClass);
            }
        }
                
        ,_removeChecked:function(items,index,item){
            if(this.isRender()){            
                !this.noShowCheckbox && this.rowJq(item,".s-tbl-checkbox").prop("checked",false);
                this.checkTrClass && this.rowJq(item).removeClass(this.checkTrClass);
            }
        }
        
        ,onCheckAll:function(src){
            if(this.items){
                var isCheck = src.prop("checked");
                //this.jq("input[type='checkbox']").prop("checked",src.prop("checked"));
                //只對數據操作
                //全選，沒有則新增
                //全不選，有則移除
                for(var i=0;i<this.items.length;i++){
                    var item = this.getRowKey(this.items[i]);
                    if(!this._isCheckedDisable(this.items[i])){
                        isCheck ? this.addCheck(item,true) : this.removeCheck(item,true);
                    }
                }
            }
        }        
        
        ,onCheckTd:function(src,e){
            var chk = src.find("input");
            if(!chk.prop("disabled")){
                var isCheck = (e.srcElement || e.target).tagName.toUpperCase()=="TD"?!chk.prop("checked"):chk.prop("checked");
                var key = src.parents("tr[s-row-key]")[0].getAttribute("s-row-key");
                isCheck ? this.addCheck(key,true) : this.removeCheck(key,true);
            }
            e.stopPropagation();
        }

        ,setCheck:function(check){
            this.set("checked",check || []);
        }
           
        ,_getCheckedIndex:function(item){
            if(this.checked){
                for(var i=0;i<this.checked.length;i++){
                    if(this.checked[i] == item){
                        return i;
                    }
                }
            }
            return -1;
        }
        
        //,checkEvt:"check"
        ,addCheck:function(checked,innerAdd){
            if(this._getCheckedIndex(checked)==-1){
                this.add("checked",checked);
                innerAdd && this.checkEvt && this.report(this.checkEvt,this.checked,true,checked,this.getRowByKey(checked));
            }
        }
        
        ,removeCheck:function(checked,innerRemove){
            var index = this._getCheckedIndex(checked);
            if(index >=0){
                this.removeAt("checked",index);
                innerRemove && this.checkEvt && this.report(this.checkEvt,this.checked,false,checked,this.getRowByKey(checked));   
            }         
        }

        //_disabledChecked只是控制user不能動，但是上層控件可以動
        ,_isCheckedDisable:function(row){
            var rowKey = this.getRowKey(row);
            return this._disabledChecked && this._disabledChecked[rowKey];
        }

        ,disableChecked:function(rowKey){
            if(!this._disabledChecked){
                this._disabledChecked = {};
            }
            this._disabledChecked[rowKey] = 1;
            !this.noShowCheckbox && this.rowJq(rowKey,".s-tbl-checkbox").prop("disabled",true);
            //this.removeCheck(rowKey);
        }

        ,enableChecked:function(rowKey){
            if(this._disabledChecked){
                delete this._disabledChecked[rowKey];
            }
            !this.noShowCheckbox && this.rowJq(rowKey,".s-tbl-checkbox").prop("disabled",false);
        }

        ,clearCheckDisable:function(){
            if(this._disabledChecked){
                for(var i=0;i<this._disabledChecked.length;i++){
                    this.enableChecked(this._disabledChecked[i]);
                }
                delete this._disabledChecked;
            }
        }

        ,_fillFormMixin:function(ret){
            this.$base(ret);
            var oThis = this;
            var trItem = {
                " s-click":this.clickRowCheck?"clickRowCheck":null
                ,_setItem:function(item){
                    this.$base(item);
                    oThis.checkTrClass && this.setClass(oThis.checkTrClass,oThis._getCheckedIndex(oThis.getRowKey(item))>=0);
                }
            
            };
            trItem["-tr_" + this._objId] = true;
            ret.push(trItem);
        }

        ,onClickRowCheck:function(btnOrSrc,srcOrE,e){
            var src = btnOrSrc.jq?srcOrE:btnOrSrc;
            var selected = btnOrSrc.jq?src.parents("tr[s-row-key]")[0].getAttribute("s-row-key"):src.attr("s-row-key");
            if(this._disabledChecked && this._disabledChecked[selected]){
                return;
            }
            var index = this._getCheckedIndex(selected);
            if(index>=0){
                this.removeCheck(selected,true);
            }
            else{
                this.addCheck(selected,true);
            }
            
        }


    };
});     