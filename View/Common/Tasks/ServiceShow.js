sjs.using("Core5.Component")
.using("Core5.Widget.Mixin.QueryGen")
.using("Core5.Util.DateFn")
.define(function(component,queryGen,dateFn){
    return {
        $extend:component
        
        ,inner:""
        
        ,$mixin:[queryGen('data')]
        
        //是否顯示時就抓資料
        ,getKind:"manual"     //init,render,manual:外部調用startGet方法
        
        ,init:function(){
            this.$base();
            this.getKind == "init" && this.startGet();
        }
        
        ,_render:function(){
            this.$base();
            (this.getKind == "render" || this.interval) && this.startGet();
        }
                
        ,startGet:function(){
            this._autoStart();            
            if(this._waiting){
                this.waiting("Loading...");
                return;
            }
            this._waiting = true;
            this.waiting();
            this.dataQuery();
        }
        
        ,_dataByRet:function(ret){
            return ret.Rows;
        }
        
        ,_queryFinish:function(ok){
            this._waiting = false;
        
        }

        ,regUIObj:true  
        
        ,onRefresh:function(){
            this.startGet();
        }
        
        ,refreshInfo:"<div class='task-time'><i en='Update Time'>更新時間</i>:" + dateFn.formatTime(dateFn.getNow()) + "<font s-click='refresh' class='refresh-font'><i en='Refresh'>刷新</i></font></div>"
        
        ,dataQueryResult:function(ret){     //這個執行結果
            this._queryFinish(true);
            var rows = this._dataByRet(ret);
            if(rows && (!rows.push || rows.length)){
                this.dataInner.data = rows;
                this.setInner([this.dataInner,this.refreshInfo]);
            }
            else{
                this.noData();
            }
        }
        
        ,dataQueryError:function(ret){     //這個執行結果
            this._queryFinish(false);
            this.error(ret.Message);
        }
        
        ,waitingInfo:"<i en='Loading...'>載入中，請稍候...</i>"
        ,waiting:function(msg){
            this.setInfo("loading",msg || this.waitingInfo,true);
        }
        
        ,noDataInfo:"<i en='No Data'>沒有數據</i>"
        ,noData:function(msg){
            this.setInfo("load-blank",(msg || this.noDataInfo));
        }
        
        ,errPrefix:"<i en='Load failed'>載入失敗</i><br>---<i en='Error Message'>錯誤信息</i>---<br>"
        ,error:function(msg){
            this.setInfo("load-fail",this.errPrefix + msg);
        }
        
        ,setInfo:function(cls,msg,noShowRefresh){
            this.setInner("<div class='" + cls + "'>" + msg + "</div>" + (noShowRefresh?"":this.refreshInfo));
        }
        
        ,interval:0         //每隔幾秒鐘自動刷新
        
        ,_nextID:null
        //自動載入
        ,auto:function(seconds){
            this.interval = seconds;
            this._autoStart();
        }
        
        ,_autoStart:function(){
            this._nextID && window.clearTimeout(this._nextID);
            if(this.interval){
                var oThis = this;
                this._nextID = window.setTimeout(function(){
                    oThis.startGet();
                },this.interval * 1000);
            }
        }
    };
});