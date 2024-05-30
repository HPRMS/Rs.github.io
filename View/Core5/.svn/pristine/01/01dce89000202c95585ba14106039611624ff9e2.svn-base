sjs.using("Core5.App.DataList")
.using("Core5.Widget.Table.ReportStyle")
.define(function(dataList,reportStyle){
    return {
        $extend:dataList
        ,resizeCol:false

        , _gridMixin: function () {
            var ret = this.$base();
            ret.push(reportStyle);
            return ret;
        }
    }
});