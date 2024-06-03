sjs.using("Core5.App.DataList")
.using("Common.Users.Fields")
.define(function(dataList,userFields){
    return {
        $extend:dataList
        ,listQuerySql:"Common_Users_Query"
        ,listQueryMethod:"QueryPage"
        //,initQuery:true
        ,sortField:"Name"
        ,sortSeq:"asc"

        ,rowKeyFields:"user_id"

        ,queryColumnCount:3
        ,queryFields:[
            {
                prompt:"User ID"
                ,fieldNo:"user_id"
            }
            ,{
                prompt:"Account"
                ,fieldNo:"Account"
            }
            ,{
                prompt:"User Name"
                ,fieldNo:"user_desc"
            }
            ,{
                prompt:"Email"
                ,fieldNo:"email"
            }
            ,{
                prompt:"NIK"
                ,fieldNo:"emp_no"
            }
        ]

        ,fields:userFields()
    };
});