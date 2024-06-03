sjs.using("Core5.Widget.Grid")
.using("Core5.Widget.Input.Upload")
.define(function(grid,upload){
  return {
    $extend:grid
    ,fields:[
      {
        prompt:{
          "-icon":true
          ,"-icon-plus":true
          ,";margin-left":"8px"
        }
        ,thStyle:"cursor:pointer"
        ,thAttr:"s-overClass='s-btn-over' s-click='addItem'"
        ,noGridPrompt:true
        ,type:"button"
        ,icon:"minus"
        ,evt:"remove"
        ,width:30
      }
      ,{
        $extend:upload
        ,id:"updIpt"
        ,prompt:"select file"
        ,width:360
      }
    ]
    
    ,items:[{}]
    
    ,onRemove:function(btn){
      this.remove("items",btn.parent.item);
      this._resize(true);
    }
    
    ,defaultAddItem:function(){
      return {};
    }
    
    ,onAddItem:function(){
      this.add("items",this.defaultAddItem());
      this._resize(true);
    }    
  };
});