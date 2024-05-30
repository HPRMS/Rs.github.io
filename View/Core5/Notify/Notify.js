sjs.loadCss(".flashy")
   .loadJs(".flashy")
   .loadJs(".jquery")
.define(function(){
   return{
        publish:function(message,type){
            var result_type;

            if (type=="OK") result_type="flashy__success";
            if (type=="Err") result_type="flashy__danger";
            if (type=="Warn") result_type="flashy__warning";
            if (type=="Info") result_type="flashy__info";
            if (type=="Failed") result_type="flashy__failure__processing";
            if (type=="Notice") result_type="flashy__red";
            
            flashy(message, {
                type : result_type
            });
        }
   }
    
});