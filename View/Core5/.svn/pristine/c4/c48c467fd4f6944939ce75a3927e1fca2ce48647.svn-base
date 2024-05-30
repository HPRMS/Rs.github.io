sjs
//注釋這一行
.using("Core" + (qs.CORE_VER || 5) + ".Run")
.using("Core" + (qs.CORE_VER || 5) + ".All",true)

//升級時下面這兩行就好
//不要將Core5a.Upgrade放進去編譯，因為會在編譯后放到最后，導致出現問題
//.using("Core5a.Run")
//.using("Core5a.All",true)
.define(function(run){
    return run;
});