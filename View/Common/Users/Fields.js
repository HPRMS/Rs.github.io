sjs.define(function(){
    return function(){
        return [        
            {
                prompt: "User ID"
                , fieldNo: "UserID"
                ,sort:true
                ,sortField:"user_id"
                ,width:80
            }
            , {
                prompt: "Name"
                , fieldNo: "Name"
                ,align:"left"
                ,width:150
                ,paddingLeft:8
                ,sort:true
            }
            , {
                prompt: "Email"
                , fieldNo: "Email"
                ,width:190
                ,align:"left"
                ,paddingLeft:8
                ,sort:true
            }
            , {
                prompt: "Account"
                , fieldNo: "Account"
                , format: function(account) {
                    return account?account.split("@")[0]:"";
                }
                ,sort:true
                ,width:110
                ,align:"left"
                ,paddingLeft:8
            }
            , {
                prompt: "分機(Ext)"
                , fieldNo: "Phone"
                ,sort:true
                ,width:80
                ,align:"left"
                ,paddingLeft:8
            }
            , {
                prompt: "工號(NIK)"
                , fieldNo: "EmpNo"
                ,sort:true
                ,width:80
                ,align:"left"
                ,paddingLeft:8
            }
            /*
            , {
                prompt: "Disable"
                , fieldNo: "Enable"
                ,sort:true
                ,width:80
            }
            */
            , {
                prompt: "Last Login"
                , fieldNo: "LastLogin"
                ,type:"dateTime"
                ,width:150
                ,sort:true

            }
        ];
    };
});